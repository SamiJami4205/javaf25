// debug.js (broken on purpose)

// get the button and the message elements
const showBtn = document.getElementById("showBtn");
const message = document.getElementById("message");

// add a click listener
showBtn.addEventListener("click", function () {
  // DELIBERATE ERROR: 'mesage' is misspelled
  mesage.textContent = "Hello from JavaScript!";
});


// debug.js (fixed)

// get the button and the message elements
//const showBtn = document.getElementById("showBtn");
//const message = document.getElementById("message");

// add a click listener
//showBtn.addEventListener("click", function () {
  // FIX: use the variable we actually defined above
  //message.textContent = "Hello from JavaScript!";
//});


// The original code failed because the variable name used inside the click event (mesage) did not match the variable that was declared (message).
//  Since JavaScript couldn’t find a variable called mesage, it threw a ReferenceError and stopped running the rest of the function. 
// The fix was to use the correct variable name (message) inside the event handler so the code updates the paragraph text as intended.