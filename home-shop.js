const featuredProduct = PRODUCTS.find(p => p.featured);

if (featuredProduct) {
  const featuredCard = document.querySelector(".shop-featured-card");
  const miniGrid = document.querySelector(".shop-mini-grid");

  // Featured card
  featuredCard.querySelector("h3").textContent = featuredProduct.title;
  featuredCard.querySelector("p").textContent = featuredProduct.description;
  featuredCard.href = featuredProduct.link || "shop.html";

  // Mini products (exclude featured)
  const miniProducts = PRODUCTS.filter(p => !p.featured).slice(0, 3);

  miniGrid.innerHTML = miniProducts.map(product => `
    <a href="${product.link || 'shop.html'}" class="shop-mini-card">
      <span class="mini-type ${product.type}">
        ${product.type === "free" ? "Free" : "Paid"}
      </span>
      <h4>${product.title}</h4>
      <p>${product.description}</p>
    </a>
  `).join("");
}