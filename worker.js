self.addEventListener("install", (event) => {
  console.log("installing…");

  const filesToCache = [
    "/flash-card/",
    "/flash-card/database.js",
    "/flash-card/jquery-3.6.0.min.js",
    "/flash-card/index.html",
    "/flash-card/index.js",
    "/flash-card/index.css",
    "/flash-card/data.html",
    "/flash-card/data.js",
    "/flash-card/data.css",
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
