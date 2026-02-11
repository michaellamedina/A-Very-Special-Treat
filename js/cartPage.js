document.addEventListener("DOMContentLoaded", () => {
  const cartTableBody = document.querySelector(".cartTable tbody");
  const subtotalDisplay = document.querySelector(".subtotalValue");

  const checkoutBtn = document.querySelector(".checkoutBtn");

  let cart = JSON.parse(localStorage.getItem("myShoppingCart")) || [];

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const price = parseFloat(urlParams.get("price"));
  const imgSrc = urlParams.get("imgSrc");

  if (name && !isNaN(price) && imgSrc) {
    const existingItem = cart.find(
      (item) => item.name === decodeURIComponent(name)
    );
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        name: decodeURIComponent(name),
        price: price,
        imgSrc: decodeURIComponent(imgSrc),
        qty: 1,
      });
    }
    saveCart();
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        window.location.href = "checkoutPage.html";
      }
    });
  }

  function saveCart() {
    localStorage.setItem("myShoppingCart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    cartTableBody.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      const row = document.createElement("tr");
      row.classList.add("productRow");
      row.innerHTML = `
        <td class="td-product">
          <img src="${item.imgSrc}" alt="${item.name}" class="productImg" />
          <div class="productDetails">
            <h2 class="productName">${item.name}</h2>
            <p class="unitPrice">₱${item.price.toFixed(2)}</p>
          </div>
        </td>
        <td class="td-qty">
          <div class="qtyBox">
        <button class="qtyBtn minus" data-index="${index}">-</button>
        
        <input type="number" class="qtyInput" value="${
          item.qty
        }" min="1" data-index="${index}" />
        
        <button class="qtyBtn plus" data-index="${index}">+</button>
      </div>
        </td>
        <td class="td-total">
          <span class="itemTotal">₱${itemTotal.toFixed(2)}</span>
          <img src="/images/icons/trashCan.svg" alt="Delete" class="deleteIcon" data-index="${index}" />
        </td>
      `;
      cartTableBody.appendChild(row);
    });

    if (subtotalDisplay) {
      subtotalDisplay.textContent = `₱${subtotal.toFixed(2)}`;
    }
    attachListeners();
  }

  function attachListeners() {
    document.querySelectorAll(".qtyInput").forEach((input) => {
      input.addEventListener("change", (e) => {
        const index = e.target.getAttribute("data-index");
        let newQty = parseInt(e.target.value);

        if (isNaN(newQty) || newQty < 1) {
          alert("Quantity must be at least 1");
          newQty = 1;
        }

        cart[index].qty = newQty;
        saveCart();
      });
    });

    document.querySelectorAll(".plus").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart[index].qty++;
        saveCart();
      });
    });

    document.querySelectorAll(".minus").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (cart[index].qty > 1) {
          cart[index].qty--;
          saveCart();
        }
      });
    });
    document.querySelectorAll(".deleteIcon").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        saveCart();
      });
    });
  }

  renderCart();
});
