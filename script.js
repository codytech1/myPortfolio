const toggleBtn = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const backdrop = document.querySelector(".menu-backdrop");

function closeMenu() {
  mobileMenu.classList.remove("active");
  toggleBtn.classList.remove("active");
  backdrop.classList.remove("active");
  toggleBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const isOpen = mobileMenu.classList.toggle("active");
  toggleBtn.classList.toggle("active");
  backdrop.classList.toggle("active");

  toggleBtn.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

backdrop.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
    closeMenu();
  }
});

    document.addEventListener('DOMContentLoaded', () => {
      const videos = document.querySelectorAll('.auto-video');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      }, { threshold: [0.5] });

      videos.forEach(video => observer.observe(video));
    });


  const scrollContainer = document.getElementById("videoScroll");
  const scrollAmount = 420;

  document.querySelector(".scroll-btn.left").addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  document.querySelector(".scroll-btn.right").addEventListener("click", () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });


  const container = document.querySelector(".video-scroll");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");

  function updateButtons() {
    leftBtn.disabled = container.scrollLeft <= 0;
    rightBtn.disabled =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 5;
  }

  leftBtn.onclick = () =>
    container.scrollBy({ left: -480, behavior: "smooth" });

  rightBtn.onclick = () =>
    container.scrollBy({ left: 480, behavior: "smooth" });

  container.addEventListener("scroll", updateButtons);
  window.addEventListener("load", updateButtons);


  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
