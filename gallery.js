const grid = document.getElementById("journalGrid");
const emptyState = document.getElementById("journalEmpty");
const filterButtons = document.querySelectorAll(".filter-btn");

let allItems = [];

/* =========================
   Helpers
========================= */

function clearSkeletons() {
  const skeletons = document.querySelectorAll(".skeleton");
  skeletons.forEach(el => el.remove());
}

function showEmpty() {
  clearSkeletons();
  if (emptyState) emptyState.style.display = "block";
}

function hideEmpty() {
  if (emptyState) emptyState.style.display = "none";
}

/* =========================
   Fetch Pinterest JSON
========================= */

fetch("pinterest.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to load pinterest.json");
    return res.json();
  })
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      showEmpty();
      return;
    }

    allItems = data;
    hideEmpty();
    renderItems("all");
  })
  .catch(err => {
    console.error("Pinterest sync failed:", err);
    showEmpty();
  });

/* =========================
   Render Items
========================= */

function renderItems(filter) {
  clearSkeletons();
  grid.innerHTML = "";
  hideEmpty();

  const filtered =
    filter === "all"
      ? allItems
      : allItems.filter(item => item.category === filter);

  if (filtered.length === 0) {
    showEmpty();
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = `journal-card ${item.category || ""}`;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title || "Journal entry"}">
      <div class="card-meta">
        <span class="tag">${(item.category || "journal").toUpperCase()}</span>
        <h3>${item.title || "Untitled Moment"}</h3>
        <a href="${item.link}" target="_blank" rel="noopener">
          View on Pinterest →
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* =========================
   Filters
========================= */

filterButtons.forEach(btn => {
  if (!btn.dataset.filter) return;

  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    renderItems(filter);
  });
});

/* =========================
   Keyboard Shortcut
========================= */

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    window.location.href = "index.html";
  }
});
