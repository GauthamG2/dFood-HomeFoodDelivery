// Array for food items

var foodItem = [{
        id: 1,
        name: 'Fruit Pancake',
        price: 225,
        foodPicture: '../images/Food_Images/1_Fruit_Pancake.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.8',
        quantity: 1
    },
    {
        id: 2,
        name: 'Mushroom Salad',
        price: 250,
        foodPicture: '../images/Food_Images/2_Mushroom_Salad.jpg',
        description: 'Mushroom Salad give u an less harsh taste than bitterness. Couples tartness with sweetness.',
        rating: '4.4',
        quantity: 1
    },
    {
        id: 3,
        name: 'Fresh Fruit Bread',
        price: 150, 
        foodPicture: '../images/Food_Images/4_Protein_Platter.jpg',
        description: 'Fresh Fruit Bread is an earthy taste reminiscent of yeast.',
        rating: '4.5',
        quantity: 1
    },
    {
        id: 4,
        name: 'Protein Platter',
        price: 375,
        foodPicture: '../images/Food_Images/3_Fresh_fruit_Bred.jpeg',
        description: 'Protein Platter, A bright flavor like that of lemons, limes, oranges, and other citrus fruits.',
        rating: '4.2',
        quantity: 1
    },
    {
        id: 5,
        name: 'Chinese Soup',
        price: 375,
        foodPicture: '../images/Food_Images/5_Chinese_Soup.jpg',
        description: 'This Chinese Soup gives taste that mimics the feeling of cold temperature.',
        rating: '3.0',
        quantity: 1
    },
    {
        id: 6,
        name: 'Chicken Kothu',
        price: 280,
        foodPicture: '../images/Food_Images/6_Chicken_Kothu.png',
        description: 'Chopped flatbread mixed and mashed together with chicken and vegetables and lots of aromatic spices.',
        rating: '4.5',
        quantity: 1
    },
    {
        id: 7,
        name: 'Oreo Milkshake',
        price: 300,
        foodPicture: '../images/Food_Images/7_Oreo_Milkshake.jpg',
        description: 'A milkshake, or simply shake, is a drink that is usually made by blending milk, ice cream, and flavorings or sweeteners',
        rating: '5.0',
        quantity: 1
    },
    {
        id: 8,
        name: 'Rice and Curry',
        price: 320,
        foodPicture: '../images/Food_Images/8_Rice_and_Curry.jpg',
        description: 'Five curry dished a full, heavy flavor. A dish youll always love',
        rating: '4.0',
        quantity: 1
    }
];

var cart = []
var foodQuantity = 1;
var foodId = 0;

$(document).ready(function() {
    console.log('food-items');
    $('#number').text(foodQuantity);
    $(window).on('resize', function() {
        var win = $(this);
        if (win.width() < 768) {
            $("#food-item-popup").popup("close");
            $('body').css('overflow', 'auto');
        }
    });

    foodId = getUrlParameter('fooditemID');

    renderFoodItem();
});

// Rendering food items on detail screen

function renderFoodItem() {
    //debugger
    var renderHtml = "";
    foodId = JSON.parse(sessionStorage.getItem('foodId'));
    if (Number(foodId) !== 0) {
        foodItem.forEach(function(foo) {
            if (foo.id == Number(foodId)) {

                console.log(foodId)
                renderHtml += `<div class="slideshow-container ui-responsive">

                <div class="mySlides-fade">
                    <img src="${foo.foodPicture}" style="width:100%; height: 320px; object-fit: cover">
                </div>

            </div>
            <div style="padding-bottom: 20px;">

         <div style="display:inline-block; vertical-align:top">
                <h2 style="padding: 10px; margin: 10px; margin-block-start: 0em; margin-block-end: 0em;">${foo.name}</h2> </div> 
                
                <div style="display:inline-block; float:right; padding: 15px 30px 0 0 ;">

                <div style="padding:5px;
                            background-color: #ffffff;
                            background-repeat:no-repeat;
                            border-radius: 4px;
                            border: 1px solid #FB752C !important;
                            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .25), 0 3px 5px 0 rgba(0, 0, 0, .2) !important;
                            color: #FB752C;">
                <a href="#" id="share" style=" padding:5px"><i class="fas fa-external-link-alt"></i></a></li> <!-- Share --> 
                </div>
                
                
                </div>

                <p style="padding: 0px; margin: 20px; margin-block-start: 0em; margin-block-end: 0em;">
                ${foo.description}</p>

                <a id="btn-view-rating" href="#popupPadded" data-rel="popup" data-position-to="window" data-transition="pop" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" 
                    style=" background-color: #ffffff;
                            background-repeat:no-repeat;
                            border: 1px solid #FB752C !important ;
                            color: #FB752C;
                            border-radius: 4px;
                            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .25), 0 3px 5px 0 rgba(0, 0, 0, .2) !important;
                            transition: 0.6s;
                            margin-top: 18px;
                            margin-left:22px;
                            padding: 7px;" >
                    
                      ${foo.rating} <span >★</span> </a>
                <span class="right" style="padding: 8px; margin: 20px; margin-block-start: 1em; margin-block-end: 0em;">LKR ${foo.price}.00</span>`
            }
        })
        $('#food-details').append(renderHtml);
    }
}

// Adding items to the cart 

function addToCart(id) {
    //debugger
    var quantityNumber = $('#number').val();
    var x = 0;
    cart = JSON.parse(sessionStorage.getItem('cart'));
    foodId = JSON.parse(sessionStorage.getItem('foodId'));
    foodItem.forEach(function(item) {
        if (item.id == id) {
            items = {
                    foodId: item.id,
                    foodName: item.name,
                    price: item.price,
                    quantity: quantityNumber,
                    totalPrice: 0
                }
                //debugger
            cart.push(items);
        }
    })
    console.log(cart);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log(sessionStorage);

}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};