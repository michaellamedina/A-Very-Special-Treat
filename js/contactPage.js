const form = document.getElementById("mycontactform");

const fields = {
  firstName: /^[A-Za-z\s]{2,30}$/,
  lastName: /^[A-Za-z\s]{2,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{7,15}$/,
  message: /^.{10,500}$/
};

function validateField(input, regex) {
  if (regex.test(input.value.trim())) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    return true;
  } else {
    input.classList.add("invalid");
    input.classList.remove("valid");
    return false;
  }
}

document.querySelector("[name='firstName']").addEventListener("keyup", (e) => {
  validateField(e.target, fields.firstName);
});

document.querySelector("[name='lastName']").addEventListener("keyup", (e) => {
  validateField(e.target, fields.lastName);
});

document.querySelector("[name='email']").addEventListener("keyup", (e) => {
  validateField(e.target, fields.email);
});

document.querySelector("[name='phone']").addEventListener("keyup", (e) => {
  validateField(e.target, fields.phone);
});

document.querySelector("[name='message']").addEventListener("keyup", (e) => {
  validateField(e.target, fields.message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  valid &= validateField(document.querySelector("[name='firstName']"), fields.firstName);
  valid &= validateField(document.querySelector("[name='lastName']"), fields.lastName);
  valid &= validateField(document.querySelector("[name='email']"), fields.email);
  valid &= validateField(document.querySelector("[name='phone']"), fields.phone);
  valid &= validateField(document.querySelector("[name='message']"), fields.message);

  if (valid) {
    alert("Message submitted successfully!");
    form.reset();

    form.querySelectorAll("input, textarea").forEach(i => i.classList.remove("valid"));
  } else {
    alert("Please correct the errors before submitting.");
  }
});
