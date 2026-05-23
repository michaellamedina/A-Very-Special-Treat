document.addEventListener("DOMContentLoaded", function () {
  const allBtn = document.getElementById("allBtn");
  const pastriesBtn = document.getElementById("pastriesBtn");
  const foodsBtn = document.getElementById("foodsBtn");
  const rows = document.querySelectorAll(".productRow");
  const btns = [allBtn, pastriesBtn, foodsBtn];

  const checkoutBtn = document.querySelector(".checkoutBtn");
  const popupContainer = document.getElementById("popupContainer");

  function setActiveBtn(activeBtn) {
    btns.forEach((btn) => btn.classList.remove("activeBtn"));
    activeBtn.classList.add("activeBtn");
  }

  if (allBtn) {
    allBtn.addEventListener("click", () => {
      setActiveBtn(allBtn);
      rows.forEach((row) => (row.style.display = "table-row"));
    });
  }

  if (pastriesBtn) {
    pastriesBtn.addEventListener("click", () => {
      setActiveBtn(pastriesBtn);
      rows.forEach((row) => {
        row.style.display = row.classList.contains("pastries")
          ? "table-row"
          : "none";
      });
    });
  }

  if (foodsBtn) {
    foodsBtn.addEventListener("click", () => {
      setActiveBtn(foodsBtn);
      rows.forEach((row) => {
        row.style.display = row.classList.contains("foods")
          ? "table-row"
          : "none";
      });
    });
  }

  function updateSubtotal() {
    let subtotal = 0;

    rows.forEach((row) => {
      const checkbox = row.querySelector(".rowCheckbox");
      const totalCell = row.querySelector(".itemTotal");

      if (checkbox && checkbox.checked) {
        const amount = parseFloat(totalCell.textContent.replace(/[^\d.]/g, ""));
        if (!isNaN(amount)) {
          subtotal += amount;
        }
      }
    });

    const subtotalDisplay = document.querySelector(".subtotalValue");
    if (subtotalDisplay) {
      subtotalDisplay.textContent = `₱${subtotal.toFixed(2)}`;
    }
  }

  rows.forEach((row) => {
    const priceElement = row.querySelector(".unitPrice");
    const qtyInput = row.querySelector(".qtyInput");
    const totalCell = row.querySelector(".itemTotal");
    const decreaseBtn = row.querySelector(".minus");
    const increaseBtn = row.querySelector(".plus");
    const checkboxInput = row.querySelector(".rowCheckbox");
    const sizeSelect = row.querySelector(".sizeSelect");

    function getCurrentPrice() {
      if (sizeSelect) {
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        return parseFloat(selectedOption.getAttribute("data-price"));
      } else {
        if (priceElement.dataset.basePrice) {
          return parseFloat(priceElement.dataset.basePrice);
        }
        return parseFloat(priceElement.textContent.replace(/[^\d.]/g, ""));
      }
    }

    function updateRowTotal() {
      const unitPrice = getCurrentPrice();
      const qty = parseInt(qtyInput.value, 10) || 0;

      if (sizeSelect) {
        priceElement.textContent = `P${unitPrice.toFixed(2)}`;
      }

      const total = unitPrice * qty;
      totalCell.textContent = `₱${total.toFixed(2)}`;

      updateSubtotal();
    }

    decreaseBtn.addEventListener("click", () => {
      let qty = parseInt(qtyInput.value, 10);
      if (qty > 1) {
        qtyInput.value = qty - 1;
      } else {
        qtyInput.value = 1;
      }
      updateRowTotal();
    });

    increaseBtn.addEventListener("click", () => {
      let qty = parseInt(qtyInput.value, 10);
      qtyInput.value = qty + 1;
      updateRowTotal();
    });

    qtyInput.addEventListener("input", () => {
      let value = parseInt(qtyInput.value, 10);
      if (isNaN(value) || value < 1) qtyInput.value = 1;
      updateRowTotal();
    });

    if (checkboxInput) {
      checkboxInput.addEventListener("change", () => {
        updateSubtotal();
      });
    }

    if (sizeSelect) {
      sizeSelect.addEventListener("change", () => {
        updateRowTotal();
      });
    }

    updateRowTotal();
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const subtotalText = document.querySelector(".subtotalValue").textContent;
      const subtotalVal = parseFloat(subtotalText.replace(/[^\d.]/g, ""));

      if (subtotalVal <= 0) {
        alert("Please select at least one item to checkout.");
        return;
      }

      showThankYouPopup();
      resetForm();
    });
  }

  function showThankYouPopup() {
    popupContainer.innerHTML = "";

    const popup = document.createElement("div");
    popup.classList.add("popup");

    const title = document.createElement("h2");
    title.textContent = "Thank you!";

    const message = document.createElement("p");
    message.textContent =
      "This is an order form, please wait for the owner's response to your form.";

    const okBtn = document.createElement("button");
    okBtn.textContent = "OK";
    okBtn.classList.add("ok");

    okBtn.addEventListener("click", () => {
      popupContainer.style.display = "none";
    });

    popup.appendChild(title);
    popup.appendChild(message);
    popup.appendChild(okBtn);
    popupContainer.appendChild(popup);

    popupContainer.style.display = "flex";
  }

  function resetForm() {
    const qtyInputs = document.querySelectorAll(".qtyInput");
    qtyInputs.forEach((input) => (input.value = 1));

    const rowCheckboxes = document.querySelectorAll(".rowCheckbox");
    rowCheckboxes.forEach((checkbox) => (checkbox.checked = false));

    const sizeSelects = document.querySelectorAll(".sizeSelect");
    sizeSelects.forEach((select) => (select.selectedIndex = 0));

    rows.forEach((row) => {
      const qtyInput = row.querySelector(".qtyInput");
      if (qtyInput) {
        const event = new Event("input");
        qtyInput.dispatchEvent(event);
      }
    });

    updateSubtotal();

    const instructionArea = document.querySelector(".instructionArea");
    if (instructionArea) instructionArea.value = "";
  }
});
