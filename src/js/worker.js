self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("flash-card")
      .then((cache) =>
        cache.addAll([
          "database.js",
          "../index.html",
          "index.js",
          "../css/index.css",
          "jquery-3.6.0.min.js",
          "../images/shuffle.png",
          "../images/plus.png",
          "../images/edit.png",
          "../images/tick.png",
          "../images/cross.png",
        ])
      )
  );
});
