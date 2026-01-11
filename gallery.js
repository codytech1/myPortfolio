const grid = document.getElementById("journalGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

let allItems = [];

// Fetch Pinterest JSON
fetch("pinterest.json")
  .then(res => res.json())
  .then(data => {
    allItems = data;
    renderItems("all");
  })
  .catch(err => {
    console.error("Pinterest sync failed:", err);
  });

// Render items
function renderItems(filter) {
  grid.innerHTML = "";

  const filtered =
    filter === "all"
      ? allItems
      : allItems.filter(item => item.category === filter);

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = `journal-card ${item.category}`;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="card-meta">
        <span class="tag">${item.category.toUpperCase()}</span>
        <h3>${item.title}</h3>
        <a href="${item.link}" target="_blank">View on Pinterest →</a>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    renderItems(filter);
  });
});

// Escape key → back home
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    window.location.href = "index.html";
  }
});
