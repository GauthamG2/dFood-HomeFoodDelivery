$(document).ready(function () {
  syncFavourite();

  $(".favourite").click((e) => {
    const $this = $(e.target),
      state = $this.data("state"),
      food_id = $this.closest("div").next().data("item-id");
    let icon = "";

    if (state) icon = "/images/icons_svg/Icon feather-heart-1.svg";
    else icon = "/images/icons_svg/Icon%20feather-heart.svg";

    $this.data("state", !state);
    $this.attr("src", icon).fadeIn(500);

    setFavourite(food_id, !state);
  });
});

function goToFood(foodId) {
  console.log(foodId);
  sessionStorage.setItem("foodId", foodId);

  document.location.href = "../html/food-detail.html?foodId=" + foodId;
}

/**
 *
 * @param {number} id
 * @param {boolean} state
 */
function setFavourite(id, state) {
  const favourites = getFavourites();
  const isExists = favourites.some(
    (el) => el.user_id === 12 && el.food_id === id
  );

  if (isExists) {
    const items = favourites.map((item) =>
      item.user_id === 12 && item.food_id === id
        ? { ...item, state: state }
        : item
    );
    return sessionStorage.setItem("favourites", JSON.stringify(items));
  }

  favourites.push({
    __id: Date.now(),
    food_id: id,
    state: state,
    user_id: 12,
  });

  return sessionStorage.setItem("favourites", JSON.stringify(favourites));
}

function getFavourites() {
  const items = sessionStorage.getItem("favourites");

  if (items !== null) return JSON.parse(items);

  return [];
}

function syncFavourite() {
  const favourites = getFavourites();

  $(".favourite").each((i, el) => {
    const food_id = $(el).closest("div").next().data("item-id");

    const isFavaoruite = favourites.some(
      (item) => item.user_id === 12 && item.food_id === food_id && item.state
    );

    if (isFavaoruite) {
      $(el)
        .attr("src", "/images/icons_svg/Icon%20feather-heart.svg")
        .fadeIn(500);
    }
  });
}
