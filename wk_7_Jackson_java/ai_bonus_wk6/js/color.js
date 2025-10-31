// Grab elements
const changeBtn = document.getElementById("changeColorBtn");
const copyBtn = document.getElementById("copyHexBtn");
const rgbText = document.getElementById("rgbText");
const hexText = document.getElementById("hexText");
const copyStatus = document.getElementById("copyStatus");

// Events
changeBtn.addEventListener("click", changeBackgroundColor);
copyBtn.addEventListener("click", copyHexToClipboard);

// On load, enable copy button for initial color
document.addEventListener("DOMContentLoaded", () => {
    copyBtn.disabled = false;
});

// Change background + update labels
function changeBackgroundColor() {
    const r = rand255();
    const g = rand255();
    const b = rand255();

    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    const hexColor = rgbToHex(r, g, b);

    document.body.style.backgroundColor = rgbColor;
    rgbText.textContent = rgbColor;
    hexText.textContent = hexColor;

    // Clear any previous status text
    copyStatus.textContent = "";
}

// Copy HEX to clipboard with graceful fallback
async function copyHexToClipboard() {
    const hex = hexText.textContent.trim();
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(hex);
        } else {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = hex;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        }
        flashCopiedUI();
    } catch (err) {
        copyStatus.textContent = "Could not copy. Try selecting the HEX and copying manually.";
    }
}

// Small UI feedback
function flashCopiedUI() {
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyStatus.textContent = "HEX color copied to clipboard.";
    setTimeout(() => {
        copyBtn.textContent = original;
        copyStatus.textContent = "";
    }, 1200);
}

// Helpers
function rand255() {
    return Math.floor(Math.random() * 256);
}

function rgbToHex(r, g, b) {
    const toHex = (v) => v.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
