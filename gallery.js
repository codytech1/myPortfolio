const gallery = document.getElementById("gallery");

const BOARD_URL =
  "https://www.pinterest.com/codychukwuebuka/my-visual-journal-cody-chukwuebuka/";

const PINTEREST_FEED =
  `https://www.pinterest.com/resource/BoardFeedResource/get/?data=${encodeURIComponent(JSON.stringify({
    options: {
      board_url: BOARD_URL,
      page_size: 12
    },
    context: {}
  }))}`;

async function loadPinterest() {
  try {
    const res = await fetch(PINTEREST_FEED, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    const data = await res.json();
    const pins = data.resource_response.data;

    gallery.innerHTML = "";

    pins.forEach(pin => {
      const img = pin.images?.orig?.url;
      const link = `https://www.pinterest.com/pin/${pin.id}/`;
      const title = pin.title || "Pinterest Pin";

      if (!img) return;

      gallery.innerHTML += `
        <a class="pin-card" href="${link}" target="_blank">
          <img src="${img}" alt="${title}">
          <div class="pin-title">${title}</div>
        </a>
      `;
    });

  } catch (err) {
    gallery.innerHTML = "<p>Failed to load Pinterest pins.</p>";
    console.error(err);
  }
}

loadPinterest();
