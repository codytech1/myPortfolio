const featuredContainer = document.querySelector(".featured-content");
const productsGrid = document.querySelector(".products-grid");

PRODUCTS.forEach(product => {
  const card = document.createElement("article");
  card.className = `product-card ${product.comingSoon ? "coming-soon" : ""}`;

  card.innerHTML = `
    <div class="product-info">
      <span class="product-type ${product.type}">
        ${product.type === "free" ? "Free" : "Paid"}
      </span>

      <h3>${product.title}</h3>
      <p>${product.description}</p>

      <a href="${product.link || '#'}"
         class="btn secondary"
         ${product.comingSoon ? "tabindex='-1'" : ""}>
        ${product.type === "free" ? "Download →" : "View Product →"}
      </a>

      ${product.comingSoon ? `<div class="coming-soon-overlay">COMING SOON</div>` : ""}
    </div>
  `;

  productsGrid.appendChild(card);
});

// Featured product
const featured = PRODUCTS.find(p => p.featured);
if (featured && featuredContainer) {
  featuredContainer.querySelector("h2").textContent = featured.title;
  featuredContainer.querySelector("p").textContent = featured.description;
}