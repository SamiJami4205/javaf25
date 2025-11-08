document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById("openModalButton");
    const modal = document.getElementById("myModal");
    const closeModal = document.getElementById("closeModal");

    // Function to open the modal
    function openModal() {
        modal.style.display = "block";
    }

    // Function to close the modal
    function closeModalFunction() {
        modal.style.display = "none";
    }

    // Event listener for opening the modal
    openModalButton.addEventListener("click", openModal);

    // Event listener for closing the modal
    closeModal.addEventListener("click", closeModalFunction);

    // Close modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
