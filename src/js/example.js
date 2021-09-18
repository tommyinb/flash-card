$(function () {
  if (window.location.search !== "?example") {
    return;
  }

  const cards = [
    { id: "1", front: "Abc", back: "Bcd" },
    { id: "1", front: "Abc", back: "Bcd" },
    { id: "1", front: "Abc", back: "Bcd" },
  ];

  cards.forEach(({ id, front, back }) => {
    const card = $("#template").clone(true).addClass("example");

    card.attr("id", id || `${Date.now()}-${Math.ceil(Math.random() * 999)}`);

    card.find(".front .content").text(front || "");
    card.find(".back .content").text(back || "");

    return card.prependTo(".cards");
  });
});
