// Wait until the DOM is fully loaded
$(document).ready(function () {
    // When the button is clicked...
    $("#toggleButton").on("click", function () {
        // Toggle the visibility of the paragraph
        $("#message").toggle(500); // 500ms = half-second animation
    });
});
