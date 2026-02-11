// quick links
document.addEventListener("DOMContentLoaded", function () {
  const activeBtn = document.querySelector(".linkButton.active");

  if (activeBtn) {
    activeBtn.click();
  } else {
    const firstBtn = document.querySelector(".linkButton");
    if (firstBtn) firstBtn.click();
  }
});

function openTab(event, tabName) {
  var sections = document.querySelectorAll(".sectionTab");

  if (tabName === "allTab") {
    sections.forEach((section) => {
      section.style.display = "block";
    });
  } else {
    sections.forEach((section) => {
      section.style.display = "none";
    });
    const target = document.getElementById(tabName);
    if (target) target.style.display = "block";
  }

  var navLinks = document.getElementsByClassName("linkButton");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].className = navLinks[i].className.replace(" active", "");
  }

  event.currentTarget.className += " active";
}

const addButtons = document.querySelectorAll(".addButton");

addButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    const productCard = event.target.closest(".product");

    const name = productCard.querySelector("h3").innerText;
    const imgSrc = productCard.querySelector("img").src;
    const priceText = productCard.querySelector(".price").innerText;
    const price = priceText.split("/")[0].replace(/[^\d.]/g, "");

    const urlParams = new URLSearchParams({
      name: name,
      price: price,
      imgSrc: imgSrc,
    });

    window.location.href = "cartPage.html?" + urlParams.toString();
  });
});

const specialButtons = document.querySelectorAll(".specialButton");
specialButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "formPage.html";
  });
});
