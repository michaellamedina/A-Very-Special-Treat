function addSafeListener(id, action) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", action);
  }
}

// Banner button
addSafeListener("bannerBtn", function () {
  window.location.href = "productPage.html";
});

// Profile icon
addSafeListener("profileBtn", function () {
  window.location.href = "loginPage.html";
});

// Cart icon
addSafeListener("cartBtn", function () {
  window.location.href = "cartPage.html";
});

// Facebook logo
addSafeListener("fbBtn", function () {
  window.open("https://facebook.com/raissa.lallana", "_blank");
});

// Mail icon
addSafeListener("mailBtn", function () {
  window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=rhaizzy@gmail.com",
    "_blank"
  );
});

// Phone icon
addSafeListener("phoneBtn", function () {
  window.location.href = "tel:+639186516133";
});

// Burger Menu
const burgerMenu = document.getElementById("burgerMenu");
const tabsMenu = document.getElementById("tabsMenu");

if (burgerMenu && tabsMenu) {
  burgerMenu.addEventListener("click", () => {
    tabsMenu.classList.toggle("active");
  });
}

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > -0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
