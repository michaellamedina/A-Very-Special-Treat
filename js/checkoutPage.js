document
  .getElementById("backToHomePage")
  .addEventListener("click", function () {
    window.location.href = "cartPage.html";
  });

document.addEventListener("DOMContentLoaded", () => {
  const purchaseSection = document.querySelector(".purchase");
  const cart = JSON.parse(localStorage.getItem("myShoppingCart")) || [];

  let itemsHtml = '<p class="purchase-details">Purchase Details</p>';
  let total = 0;

  if (cart.length === 0) {
    itemsHtml +=
      '<div class="item-row"><span class="food">Cart is empty</span></div>';
  } else {
    cart.forEach((item) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      itemsHtml += `
        <div class="item-row">
          <span class="food">${item.name} x${item.qty}</span>
          <span class="food-price">₱${itemTotal.toFixed(2)}</span>
        </div>
      `;
    });
  }

  itemsHtml += `
    <div class="total-row">
      <span class="total">Total</span>
      <span class="price">₱${total.toFixed(2)}</span>
    </div>
  `;

  if (purchaseSection) {
    purchaseSection.innerHTML = itemsHtml;
  }

  const selectors = {
    phone: ".phone-number",
    zip: ".zip-code",
    card: ".card-number",
    mm: ".exp-month",
    yy: ".exp-year",
    cvv: ".cvv",
  };

  const patterns = {
    phone: /^[0-9]{10}$/,
    zip: /^[0-9]{4}$/,
    card: /^[0-9]{16}$/,
    mm: /^(0[1-9]|1[0-2])$/,
    yy: /^[0-9]{2}$/,
    cvv: /^[0-9]{3,4}$/,
  };

  const inputs = Object.fromEntries(
    Object.entries(selectors).map(([k, sel]) => [
      k,
      document.querySelector(sel),
    ])
  );

  function validate(key) {
    const el = inputs[key];
    if (!el) return true;
    const ok = patterns[key].test(el.value);
    el.classList.toggle("error", !ok && el.value.length > 0);
    return ok;
  }

  Object.keys(inputs).forEach((key) => {
    const el = inputs[key];
    if (!el) return;
    ["input", "blur"].forEach((evt) =>
      el.addEventListener(evt, () => validate(key))
    );
  });

  const form = document.querySelector(".checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const allFieldsValid = Object.keys(inputs).every((k) => validate(k));

      window.location.href = "confirmationPage.html";
      const isChecked = termsCheckbox ? termsCheckbox.checked : true;

      if (allFieldsValid && isChecked) {
        localStorage.removeItem("myShoppingCart");
        window.location.href = "confirmationPage.html";
      } else {
        alert("Please check your input details and agree to the terms.");
      }
    });
  }
});
