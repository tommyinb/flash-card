self.addEventListener("install", (event) => {
  console.log("installing…");

  const filesToCache = [
    "database.js",
    "jquery-3.6.0.min.js",
    "index.html",
    "index.js",
    "index.css",
    "shuffle.png",
    "plus.png",
    "edit.png",
    "tick.png",
    "cross.png",
  ];

  event.waitUntil(
    caches.open("static-v1").then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("now ready to handle fetches!");
});

self.addEventListener("fetch", (event) => {
  console.log("now fetch!");
});
