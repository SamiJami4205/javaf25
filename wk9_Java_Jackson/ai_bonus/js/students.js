// js/students.js

document.getElementById("loadBtn").addEventListener("click", loadStudents);

function loadStudents() {
  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Open a GET request to load the JSON file
  xhr.open("GET", "students.json", true);

  // When the data loads successfully
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parse the JSON text into a JavaScript array/object
      const students = JSON.parse(xhr.responseText);

      // Build an HTML table dynamically
      let output = "<table><tr><th>Name</th><th>Grade</th></tr>";
      students.forEach(function (student) {
        output += `<tr><td>${student.name}</td><td>${student.grade}</td></tr>`;
      });
      output += "</table>";

      // Insert the table into the page
      document.getElementById("studentTable").innerHTML = output;
    } else {
      document.getElementById("studentTable").innerHTML =
        "Error loading student data.";
    }
  };

  // Handle network or file errors
  xhr.onerror = function () {
    document.getElementById("studentTable").innerHTML =
      "Network error. Please try again.";
  };

  // Send the request
  xhr.send();
}
