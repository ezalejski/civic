(function () {
  document.querySelectorAll(".gallery").forEach(function (gallery) {
    var links = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-item"));
    if (!links.length) return;

    var overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Zamknij">&times;</button>' +
      '<button class="lightbox-prev" aria-label="Poprzednie">&#8249;</button>' +
      '<img class="lightbox-img" alt="">' +
      '<button class="lightbox-next" aria-label="Następne">&#8250;</button>' +
      '<div class="lightbox-count"></div>';
    document.body.appendChild(overlay);

    var img = overlay.querySelector(".lightbox-img");
    var count = overlay.querySelector(".lightbox-count");
    var idx = 0;

    function show(i) {
      idx = (i + links.length) % links.length;
      img.src = links[idx].getAttribute("href");
      count.textContent = (idx + 1) + " / " + links.length;
    }
    function open(i) {
      show(i);
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    links.forEach(function (link, i) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });

    overlay.querySelector(".lightbox-close").addEventListener("click", close);
    overlay.querySelector(".lightbox-prev").addEventListener("click", function () { show(idx - 1); });
    overlay.querySelector(".lightbox-next").addEventListener("click", function () { show(idx + 1); });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  });
})();
