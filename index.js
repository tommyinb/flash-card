import { list, open, put, remove } from "./database.js";

$(async function () {
  const database = await open();

  $(".card").click(function () {
    if ($(this).hasClass("editing")) {
      return false;
    }

    $(this).toggleClass("flip");
    return false;
  });

  $(".card .edit").click(function () {
    const card = $(this).closest(".card");
    setEdit(card);

    return false;
  });
  function setEdit(card) {
    card.addClass("editing");
    card.find(".front, .back").find(".content").attr("contentEditable", true);
  }

  $(".card .tick").click(function () {
    const card = $(this).closest(".card");
    card.removeClass("editing");

    card.find(".front, .back").find(".content").attr("contentEditable", false);

    const id = card.attr("id");
    const front = card.find(".front .content").text();
    const back = card.find(".back .content").text();

    if (front.trim() || back.trim()) {
      put({ id, front, back }, database);
    } else {
      remove(id, database);
    }

    return false;
  });

  $(".card .cross").click(function () {
    const card = $(this).closest(".card");
    card.remove();

    const id = card.attr("id");
    remove(id, database);

    return false;
  });

  const template = $("#template");

  await (async function () {
    const oldCards = await list(database);

    if (oldCards.length <= 0) {
      add();
      return;
    }

    oldCards.forEach(({ id, front, back }) => {
      const oldCard = template.clone(true).attr("id", id).prependTo(".cards");

      oldCard.find(".front .content").text(front);
      oldCard.find(".back .content").text(back);
    });
  })();

  $(".add").click(function () {
    const card = add();

    setEdit(card);
    return false;
  });
  function add() {
    const id = `${Date.now()}-${Math.ceil(Math.random() * 999)}`;
    return template.clone(true).attr("id", id).prependTo(".cards");
  }

  $(".shuffle").click(shuffle);

  shuffle();
  function shuffle() {
    const oldCards = $(".card:not(#template)").toArray();

    const newCards = oldCards
      .map((t) => $(t).clone(true))
      .map((t) => ({ item: t, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map((t) => t.item);

    oldCards.forEach((t, i) => $(t).replaceWith(newCards[i]));
  }
});
