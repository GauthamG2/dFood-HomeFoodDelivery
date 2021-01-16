const foodItems = [{
        id: "1",
        name: "Fruit Pancake",
        price: 225,
        foodPicture: "../images/Food_Images/1_Fruit_Pancake.jpg",
        description: "Fruit pancakes are greate canvas upon which to build bold breakfast flavours.",
        rating: "4.8",
        quantity: 1,
    },
    {
        id: "2",
        name: "Mushroom Salad",
        price: 250,
        foodPicture: "../images/Food_Images/2_Mushroom_Salad.jpg",
        description: "Mushroom Salad give u an less harsh taste than bitterness. Couples tartness with sweetness.",
        rating: "4.4",
        quantity: 1,
    },
    {
        id: "3",
        name: "Fresh Fruit Bread",
        price: 150,
        foodPicture: "../images/Food_Images/4_Protein_Platter.jpg",
        description: "Fresh Fruit Bread is an earthy taste reminiscent of yeast.",
        rating: "4.5",
        quantity: 1,
    },
    {
        id: "4",
        name: "Protein Platter",
        price: 375,
        foodPicture: "../images/Food_Images/3_Fresh_fruit_Bred.jpeg",
        description: "Protein Platter, A bright flavor like that of lemons, limes, oranges, and other citrus fruits.",
        rating: "4.2",
        quantity: 1,
    },
    {
        id: "5",
        name: "Chinese Soup",
        price: 375,
        foodPicture: "../images/Food_Images/5_Chinese_Soup.jpg",
        description: "This Chinese Soup gives taste that mimics the feeling of cold temperature.",
        rating: "3.0",
        quantity: 1,
    },
    {
        id: "6",
        name: "Chicken Kothu",
        price: 280,
        foodPicture: "../images/Food_Images/6_Chicken_Kothu.png",
        description: "Chopped flatbread mixed and mashed together with chicken and vegetables and lots of aromatic spices.",
        rating: "4.5",
        quantity: 1,
    },
    {
        id: "7",
        name: "Oreo Milkshake",
        price: 300,
        foodPicture: "../images/Food_Images/7_Oreo_Milkshake.jpg",
        description: "A milkshake, or simply shake, is a drink that is usually made by blending milk, ice cream, and flavorings or sweeteners",
        rating: "5.0",
        quantity: 1,
    },
    {
        id: "8",
        name: "Rice and Curry",
        price: 320,
        foodPicture: "../images/Food_Images/8_Rice_and_Curry.jpg",
        description: "Five curry dished a full, heavy flavor. A dish youll always love",
        rating: "4.0",
        quantity: 1,
    },
];

var items = []


$(document).ready(function() {
    renderFavItem();
});

function getFavourites() {
    const items = sessionStorage.getItem("favourites");

    if (items !== null) return JSON.parse(items);

    return [];
}

function renderFavItem() {
    //debugger
    const favourites = getFavourites();
    var renderHtml = "";

    if (foodItems.length > 0) {
        foodItems.forEach(function(item, index) {
            const isExists = favourites.some(
                (el) => el.user_id === 12 && el.food_id == item.id && el.state
            );

            if (!isExists) return false;
            console.log(foodItems);
            //debugger
            renderHtml += `
      <div class="ui-block-${
        (index + 1) % 2 ? "a" : "b"
      }" style="padding: 10px;" >    
         <div class="ui-body ui-body-d shadow" style="background-color: #ffffff; border: none ; border-radius: 10px;padding: 10px;box-shadow: 0 0 10px #8a795d;">
            <div>
                <div class="favHeart">
                    <a href="#" id="hamburger" target="_self">
                    
                        <a onclick="removeItem('${item.id}')" data-rel="popup" data-position-to="window" data-transition="pop"><img src="../images/icons_svg/Icon feather-heart.svg" style="position: absolute; right:1rem; top:1rem;">
                        </a>
                    </a>
                </div>

                <a href="#" target="_self">
                    <img id="1_Grill_Chicken_Burger.jpg" class="responsive img-ui" src="${
                      item.foodPicture
                    }" height="100%" width="100%" style="border-radius: 10px;" /></a>
            </div>

            <fieldset class="ui-grid-a">
                <div class="ui-block-a" style="width: 110% !important;">
                    <div class="ui-block-a" style="width: 80% !important;">
                        <h3 style="text-align: left !important;margin:10px 0px 2px 0px !important;">${
                          item.name
                        }</h3>
                    </div>

                    <div class="ui-block-a" style="width: 100% !important;">
                        <div style="width: 70%; float:left;margin-left: 0px">
                            <h4 style="margin-top: 5px !important; text-align: left !important;margin:5px !important;margin-left: 0px !important;
                            width: 100% !important;font-weight: 500;">LKR ${
                              item.price
                            }</h4>
                            <h4 class="rating-star" style="text-align: left !important; margin-top: 5px;">${
                              item.rating
                            }<span style="color: #FB752C">★</span></h4>
                        </div>

                        <div class="column right" style="padding-left: 1px!important;"></div>
                    </div>
            </fieldset>

            </div>
        </div>
     </div>`;
        });

        $("#favourite-list").append(renderHtml);
    }
}


function removeItem(id) {

    window.location.href = "favourite-removed.html";
    // debugger
    // console.log('removeItem')
    // items = items.filter(function(item) { return item.foodId !== id });
    // renderFavItem();
    // sessionStorage.setItem('items', JSON.stringify(items));
    // location.reload();
}