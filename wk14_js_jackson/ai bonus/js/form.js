// js/form.js
// Validates that the email contains an @ symbol.

document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("email");
  const submitBtn = document.getElementById("submitBtn");
  const errorMsg = document.getElementById("error");
  const successMsg = document.getElementById("success");

  submitBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    // Check for @ symbol
    if (!email.includes("@")) {
      errorMsg.style.display = "block";
      successMsg.style.display = "none";
    } else {
      errorMsg.style.display = "none";
      successMsg.style.display = "block";
    }
  });

});
