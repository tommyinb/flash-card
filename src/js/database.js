export async function open() {
  return await new Promise((resolve, reject) => {
    var request = window.indexedDB.open("database", 3);

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("cards", { keyPath: "id" });
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export async function list(database) {
  return await run(database, "readonly", (objectStore) => objectStore.getAll());
}
export async function put(card, database) {
  return await run(database, "readwrite", (objectStore) =>
    objectStore.put(card)
  );
}
export async function remove(id, database) {
  return await run(database, "readwrite", (objectStore) =>
    objectStore.delete(id)
  );
}
export async function clear(database) {
  return await run(database, "readwrite", (objectStore) => objectStore.clear());
}

export async function run(database, mode, runner) {
  return new Promise((resolve) => {
    const transaction = database.transaction("cards", mode);
    const objectStore = transaction.objectStore("cards");
    const request = runner(objectStore);

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}
