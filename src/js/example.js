$(function () {
  if (window.location.search !== "?example") {
    return;
  }

  $(".title").attr("href", "?");

  const cards = [
    { front: "This", back: "Meaning" },
    { front: "is a", back: "that" },
    { front: "PWA", back: "you" },
    { front: "Progressive", back: "can" },
    { front: "Web", back: "simply" },
    { front: "App", back: "install" },
    { front: "!", back: "it" },
  ];

  cards.forEach(({ front, back }) => {
    const card = $("#template").clone(true).addClass("example");

    card.attr("id", "example");

    card.find(".front .content").text(front);
    card.find(".back .content").text(back);

    return card.appendTo(".cards");
  });
});
