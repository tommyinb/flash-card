import { clear, list, open, put } from "./database.js";

$(async function () {
  const database = await open();

  await (async function load() {
    const data = await list(database);
    const text = JSON.stringify(data, undefined, 2);

    $(".data").text(text);
  })();

  $(".save").click(function () {
    save();

    return false;
  });
  async function save() {
    const text = $(".data").text() || "[]";

    try {
      const values = JSON.parse(text);

      await clear(database);

      for (const value of values) {
        await put(value, database);
      }

      alert("saved");
    } catch (err) {
      console.error(err);

      alert(`error: ${err}`);
    }
  }
});
