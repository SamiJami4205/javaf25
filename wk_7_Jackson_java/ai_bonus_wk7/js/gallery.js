// Elements
const mainImage = document.getElementById("mainImage");
const thumbList = document.getElementById("thumbList");

// Event delegation: listen once on the <ul>, handle clicks on any thumbnail button.
thumbList.addEventListener("click", (e) => {
  // Find the closest .thumb button from where the click happened
    const btn = e.target.closest("button.thumb");
  if (!btn) return; // Click wasn't on a thumbnail

    switchTo(btn);
});

// Optional: keyboard arrows to move between thumbnails when a thumb is focused
thumbList.addEventListener("keydown", (e) => {
    const allThumbs = Array.from(thumbList.querySelectorAll("button.thumb"));
    const currentIndex = allThumbs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        allThumbs[(currentIndex + 1) % allThumbs.length].focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        allThumbs[(currentIndex - 1 + allThumbs.length) % allThumbs.length].focus();
    } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchTo(document.activeElement);
    }
});

// Swap the main image and manage selected state
function switchTo(btn) {
    const large = btn.dataset.large;
    const alt = btn.dataset.alt || "";

    // Update main image src + alt (accessibility-friendly)
    mainImage.src = large;
    mainImage.alt = alt;

    // Update selected styling/ARIA
    thumbList.querySelectorAll("button.thumb").forEach(b => b.setAttribute("aria-current", "false"));
    btn.setAttribute("aria-current", "true");
}

// (Optional) Preload large images for snappier swaps
preloadLargeImages();
function preloadLargeImages() {
    const urls = Array.from(thumbList.querySelectorAll("button.thumb"))
        .map(b => b.dataset.large);
    urls.forEach(u => {
        const img = new Image();
        img.src = u;
    });
}
