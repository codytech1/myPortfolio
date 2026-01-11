    const toggleBtn = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      // keep aria-hidden synced
      mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('active') ? 'false' : 'true');
    });

    document.addEventListener('click', function (event) {
      const isClickInside = mobileMenu.contains(event.target) || toggleBtn.contains(event.target);
      if (!isClickInside && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
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
