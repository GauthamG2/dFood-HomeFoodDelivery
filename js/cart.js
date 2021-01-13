function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}

function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
}

var foodItem = [{
        id: 1,
        name: 'Fruit Pancake',
        price: 225,
        foodPicture: '../images/1_Fruit_Pancake.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.8',
        quantity: 1
    },
    {
        id: 2,
        name: 'Mushroom Salad',
        price: 250,
        foodPicture: '../images/2_Mushroom_Salad.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.4',
        quantity: 1
    },
    {
        id: 3,
        name: 'Fresh Fruit Bread',
        price: 150,
        foodPicture: '../images/3_Fresh_fruit_Bred.jpeg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.5',
        quantity: 1
    },
    {
        id: 4,
        name: 'Protein Platter',
        price: 375,
        foodPicture: '../images/4_Protein_Platter.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.2',
        quantity: 1
    },
    {
        id: 5,
        name: 'Chinese Soup',
        price: 375,
        foodPicture: '../images/5_Chinese_Soup.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '3.0',
        quantity: 1
    },
    {
        id: 6,
        name: 'Chicken Kothu',
        price: 280,
        foodPicture: '../images/6_Chicken_Kothu.png',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.5',
        quantity: 1
    },
    {
        id: 7,
        name: 'Oreo Milkshake',
        price: 300,
        foodPicture: '../images/7_Oreo_Milkshake.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '5.0',
        quantity: 1
    },
    {
        id: 8,
        name: 'Rice and Curry',
        price: 320,
        foodPicture: '../images/8_Rice_and_Curry.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.0',
        quantity: 1
    }
];

var cart = []
var foodQuantity = 1;
var foodId = 0;

$(document).ready(function() {
    // var fooditemID = getUrlParameter('fooditemID');
    // console.log(fooditemID, 'fooditemID');
    // debugger;

    var status = document.getElementById('cart-filled');
    var status1 = document.getElementById('cart-empty');
    cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log(cart);
    if (cart.length == 0) {
        status.style.display = "none";
        status1.style.display = "block";
    } else {
        status1.style.display = "none";
        if ($(window).width() < 768) {
            status.style.display = "block";
        } else {
            status.style.display = "grid";
        }
    }
    renderCartItem();
});


// This is getting food items added to the card

function renderCartItem() {
    totalPrice = 0;
    subTotal = 0;
    var status = document.getElementById('totalPrice');
    $(".cart-item").remove();

    var renderHtml = "";
    if (cart.length > 0) {
        cart.forEach(function(item) {
            totalPrice = totalPrice + (item.price * item.quantity);
            $('#totalPrice').text('Rs' + totalPrice);
            item.totalPrice = totalPrice + 250;
            renderHtml += 1 `<p style="font-size: 16px; font-weight: bold; text-align: left; padding-left: 10px; margin-bottom: 10px;">
            ${item.name}
        </p>
        <fieldset class="ui-grid-a">
            <div class="ui-block-a" style="width: 40%;">
                <p style="padding-left: 25px; font-size: 16px; text-align: left; margin: 0">${item.foodQuantity}</p>
                <p style="padding-left: 25px; font-size: 16px; font-weight: bold; text-align: left; margin-top:5px;">
                    LKR 450
                </p>
            </div>
            <div class="ui-block-b" style="width: 20%; margin-top: -18px; ">
                <form style="margin-left: 10px;">
                    <div class="ui-block-a" style="width: 30%">
                        <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                    </div>
                    <div class="ui-block-b" style="width: 40%">
                        <input type="number" id="number" value="1" />
                    </div>
                    <div class="ui-block-c" style="width: 30%">
                        <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                    </div>
                </form>
            </div>
            <a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop"><img src="../images/icons/Icon material-delete.png" style="float: right; margin-right: 20px; "> </a>
        </fieldset>`
        });

        $('#repeat').append(renderHtml);
        subTotal = totalPrice + 50;
        $('#subTotal').text('Rs' + subTotal);
    }
}


function calculateTotal(value, id) {
    totalPrice = 0;
    cart.forEach(function(item) {
        if (item.foodID == id) {
            // debugger;
            totalPrice = totalPrice + (item.price * value);
            $('#totalPrice').text('Rs' + totalPrice);
            subTotal = totalPrice + 50;
            $('#subTotal').text('Rs' + subTotal);
            item.quantity = value;
            item.totalPrice = subTotal;
            // cartItem = {
            //     vendorName: item.vendorName
            // }
        }
    })
}

function clearCart() {
    console.log("clear cart");
    var status = document.getElementById('cart-filled');
    var status1 = document.getElementById('cart-empty');
    status.style.display = "none";
    status1.style.display = "grid";
    cart = [];
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log(sessionStorage);
}