// Filters the <li> items as the user types in the search box.

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const clearBtn = document.getElementById("clearBtn");
  const list = document.getElementById("items");
  const emptyState = document.getElementById("emptyState");
  const items = Array.from(list.querySelectorAll("li"));

  function applyFilter() {
    const q = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((li) => {
      const text = li.textContent.toLowerCase();
      const match = text.includes(q);
      li.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  }

  // Filter on every keystroke
  searchInput.addEventListener("input", applyFilter);

  // Clear the search quickly
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    applyFilter();
    searchInput.focus();
  });

  // Bonus: ESC clears the search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      applyFilter();
    }
  });

  // Initial state
  applyFilter();
});
