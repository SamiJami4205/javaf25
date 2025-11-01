// dog.js

// 1. Get references to the elements we want to control
const dogImage = document.getElementById("dogImage");
const statusText = document.getElementById("status");
const newDogBtn = document.getElementById("newDogBtn");

// 2. Function that actually talks to the Dog API and updates the page
async function getRandomDog() {
    try {
        // Let the user know something is happening
        statusText.textContent = "Fetching a very good dog...";
        newDogBtn.disabled = true;

        // Call the Dog API (returns JSON)
        const response = await fetch("https://dog.ceo/api/breeds/image/random");

        // Turn the response into a normal JS object
        const data = await response.json();

        // The API gives us an image URL in data.message
        // Example: data = { message: "https://images.dog.ceo/breeds/pitbull/niceDog.jpg", status: "success" }
        dogImage.src = data.message;
        dogImage.alt = "A random dog from the Dog API";

        // Clear the status text
        statusText.textContent = "";
    } catch (error) {
        // If something fails (no internet, API down, etc.)
        statusText.textContent = "Sorry, couldn't load a dog 😭. Try again.";
        console.error("Dog fetch failed:", error);
    } finally {
        // Re-enable the button no matter what
        newDogBtn.disabled = false;
    }
}

// 3. When the button is clicked, get a new dog
newDogBtn.addEventListener("click", getRandomDog);

// 4. OPTIONAL: load a dog immediately on first page load
getRandomDog();
