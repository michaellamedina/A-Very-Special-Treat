document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const phoneInput = document.getElementById("phoneNumber");

  const termsCheckbox = document.querySelector('input[name="compliance"]');
  const termsCircle = document.querySelector(".checkmark");

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

  //  checking phone number
  function validatePhPhone(phone) {
    const phonePattern = /^(09|\+639)\d{9}$/; // PH number
    return phonePattern.test(phone);
  }

  //  checking password
  function checkPasswordIssues(pass) {
    const passCheck = [];
    if (pass.length < 6) {
      passCheck.push("be at least 6 characters long");
    }
    if (!/[!@#$%^&*.,?_]/.test(pass)) {
      passCheck.push("contain at least one special character (!@#$%^&*.,?_)");
    }
    return passCheck;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let errorMessages = [];
    let isValid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const phone = phoneInput.value.trim();

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
    const passwordIssues = checkPasswordIssues(password);

    if (password === "") {
      showError(passwordInput);
      isValid = false;
      errorMessages.push("• Password cannot be empty");
    } else if (passwordIssues.length > 0) {
      showError(passwordInput);
      isValid = false;
      errorMessages.push("• Password must " + passwordIssues.join(" and "));
    }

    if (confirmPassword === "") {
      showError(confirmPasswordInput);
      isValid = false;
    } else if (confirmPassword !== password) {
      showError(confirmPasswordInput);
      showError(passwordInput);
      isValid = false;
      errorMessages.push("• Passwords do not match");
    }

    //  checking phone number
    if (phone === "") {
      showError(phoneInput);
      isValid = false;
      errorMessages.push("• Phone Number cannot be empty");
    } else if (!validatePhPhone(phone)) {
      showError(phoneInput);
      isValid = false;
      errorMessages.push("• Invalid PH Phone Number (Use 09xxxxxxxxx or +639)");
    }

    //  checking compliance
    if (!termsCheckbox.checked) {
      termsCircle.classList.add("error");
      isValid = false;
      errorMessages.push("• You must agree to the Terms & Conditions");
    }

    // alert
    if (!isValid) {
      alert("Please fix the following errors:\n\n" + errorMessages.join("\n"));
    } else {
      alert("Sign Up Successful!");
      window.location.href = "index.html";
    }
  });

  // removes error
  const textInputs = [
    emailInput,
    passwordInput,
    confirmPasswordInput,
    phoneInput,
  ];

  textInputs.forEach((input) => {
    input.addEventListener("input", function () {
      clearError(input);
    });
  });

  termsCheckbox.addEventListener("change", function () {
    if (termsCheckbox.checked) {
      termsCircle.classList.remove("error");
    }
  });
});
