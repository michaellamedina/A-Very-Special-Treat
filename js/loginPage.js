document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // for errors
  function showError(input) {
    input.classList.add("error");
  }

  function clearError(input) {
    input.classList.remove("error");
  }

  //  checking email
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  //  checking password
  function checkPassword(pass) {
    const passCheck = [];
    // at least 6 characters
    if (pass.length < 6) {
      passCheck.push("be at least 6 characters long");
    }
    // at least 1 special character
    if (!/[!@#$%^&*.,?_]/.test(pass)) {
      passCheck.push("contain at least one special character (!@#$%^&*.,?_)");
    }
    return passCheck;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let errorMessages = [];
    let isValid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    //  checking email
    if (email === "") {
      showError(emailInput);
      isValid = false;
      errorMessages.push("• Email Address cannot be empty");
    } else if (!validateEmail(email)) {
      showError(emailInput);
      isValid = false;
      errorMessages.push("• Invalid Email Address");
    }

    //  checking password
    const passwordIssues = checkPassword(password);

    if (password === "") {
      showError(passwordInput);
      isValid = false;
      errorMessages.push("• Password cannot be empty");
    } else if (passwordIssues.length > 0) {
      showError(passwordInput);
      isValid = false;
      errorMessages.push("• Password must " + passwordIssues.join(" and "));
    }

    // alert
    if (!isValid) {
      alert("Please fix the following errors:\n\n" + errorMessages.join("\n"));
    } else {
      alert("Login Successful!");
      window.location.href = "index.html";
    }
  });

  // removes error
  emailInput.addEventListener("input", function () {
    clearError(emailInput);
  });

  passwordInput.addEventListener("input", function () {
    clearError(passwordInput);
  });
});
