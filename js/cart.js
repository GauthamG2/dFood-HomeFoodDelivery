// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// const express = require('express');
// const app = express();
// app.use(express.static('.'));

// const YOUR_DOMAIN = 'http://localhost:5051';

// app.post('/create-checkout-session', async(req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [{
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: 'Stubborn Attachments',
//                     images: ['https://i.imgur.com/EHyR2nP.png'],
//                 },
//                 unit_amount: 2000,
//             },
//             quantity: 1,
//         }, ],

//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}/html/success.html`,
//         cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });

//     res.json({ id: session.id });
// });

// app.listen(5051, () => console.log('Running on port 5051'));

var foodItem = [{
        id: '1',
        name: 'Fruit Pancake',
        price: 225,
        foodPicture: '../images/1_Fruit_Pancake.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.8',
        quantity: 1
    },
    {
        id: '2',
        name: 'Mushroom Salad',
        price: 250,
        foodPicture: '../images/2_Mushroom_Salad.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.4',
        quantity: 1
    },
    {
        id: '3',
        name: 'Fresh Fruit Bread',
        price: 150,
        foodPicture: '../images/3_Fresh_fruit_Bred.jpeg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.5',
        quantity: 1
    },
    {
        id: '4',
        name: 'Protein Platter',
        price: 375,
        foodPicture: '../images/4_Protein_Platter.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.2',
        quantity: 1
    },
    {
        id: '5',
        name: 'Chinese Soup',
        price: 375,
        foodPicture: '../images/5_Chinese_Soup.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '3.0',
        quantity: 1
    },
    {
        id: '6',
        name: 'Chicken Kothu',
        price: 280,
        foodPicture: '../images/6_Chicken_Kothu.png',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '4.5',
        quantity: 1
    },
    {
        id: '7',
        name: 'Oreo Milkshake',
        price: 300,
        foodPicture: '../images/7_Oreo_Milkshake.jpg',
        description: 'Fruit pancakes are greate canvas upon which to build bold breakfast flavours.',
        rating: '5.0',
        quantity: 1
    },
    {
        id: '8',
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
var totalPrice = 0;
var subTotal = 0;
var points = 0;

$(document).ready(function() {
    // var fooditemID = getUrlParameter('fooditemID');
    // console.log(fooditemID, 'fooditemID');
    // debugger;

    var status = document.getElementById('cart-filled');
    var status1 = document.getElementById('cart-empty');
    cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log(cart);
    if (cart.length == 0) {

    } else {
        // status1.style.display = "none";
        // if ($(window).width() < 768) {
        //     status.style.display = "block";
        // } else {
        //     status.style.display = "grid";
        // }
    }
    renderCartItem();

});


// This is getting food items added to the card

function renderCartItem() {
    removeOrderButton();

    // debugger
    totalPrice = 0;
    subTotal = 0;
    points = 0;

    var quantityNumber = $('#number').val();
    var status = document.getElementById('totalPrice');
    $(".cart-item").remove();

    var renderHtml = "";
    if (cart.length > 0) {
        cart.forEach(function(item) {
            //debugger
            totalPrice = totalPrice + (item.price * item.quantity);
            $('#totalPrice').text('LKR ' + totalPrice);
            item.totalPrice = totalPrice + 50;
            renderHtml += `<div>

            <p style="font-size: 16px; font-weight: bold; text-align: left; padding-left: 10px; margin-bottom: 10px;">
                ${item.foodName}
            </p>
            <fieldset class="ui-grid-a">
                <div class="ui-block-a" style="width: 40%;">
                    <p style="padding-left: 25px; font-size: 16px; text-align: left; margin: 0">Quantity</p>
                    <p style="padding-left: 25px; font-size: 16px; font-weight: bold; text-align: left; margin-top:5px;">
                        LKR ${item.price}
                    </p>
                </div>
                <div class="adjust-quantity food-item-page-quantity">
                <button class="quantity-minus" id="dec-${item.foodId}" onclick=decQuantity('${item.foodId}')>
                    <i class="material-icons"> - </i>
                </button>
                <span id="display-quantity-${item.foodId}">${item.quantity}</span>
                <button class="quantity-plus" id="inc-${item.foodId}" onclick=incQuantity('${item.foodId}')>
                    <i class="material-icons"> + </i>
                </button>
            </div>
                <a onclick="removeItem('${item.foodId}')" ><img src="../images/icons/Icon material-delete.png" style="float: right; margin-right: 20px; margin-top: -25px;"> </a>
            </fieldset>
        </div>
        </br>`
        });

        $('#repeat').append(renderHtml);
        subTotal = totalPrice + 50;
        $('#subTotal').text('LKR ' + subTotal);
        points = totalPrice / 20;
        $('#points').text(points);
    }



}


function calculateTotal(value, foodId) {
    //debugger
    totalPrice = 0;
    cart.forEach(function(item) {
        if (item.foodId == foodId) {
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
    points = totalPrice / 20;
    $('#points').text(points);
}

function clearCart() {
    console.log("clear cart");
    var status = document.getElementById('cart-filled');
    var status1 = document.getElementById('cart-empty');
    // status.display = "none";
    // status1.display = "grid";
    cart = [];
    //debugger
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log(sessionStorage);

    location.reload();

}

function removeItem(foodId) {
    // debugger
    console.log('removeItem')
    cart = cart.filter(function(item) { return item.foodId !== foodId });
    renderCartItem();
    sessionStorage.setItem('cart', JSON.stringify(cart));
    location.reload();

}

function incQuantity(foodId) {
    // debugger
    var vallue = $(`#display-quantity-${foodId}`).html();
    console.log(vallue, 'val');
    x = vallue + 1;
    console.log(x);
    $(`#display-quantity-${foodId}`).text(Number(vallue) + 1);
    calculateTotal(Number(vallue) + 1, foodId);
}

function decQuantity(foodId) {
    var vallue = $(`#display-quantity-${foodId}`).html();
    console.log(vallue, 'val');
    x = vallue - 1;
    console.log(x);
    $(`#display-quantity-${foodId}`).text(Number(vallue) - 1);
    calculateTotal(Number(vallue) - 1, foodId);
}

function redeemPoints() {
    //debugger
    //  afterRedeem = subTotal - points;
    // $(document).ready(function() {
    //     $("#redeem").click(function() {
    $("#subTotal").text('Rs ' + (subTotal - points));
    $("#points").text('0.00');
    document.getElementById('#redeem').disabled = true;
    disableButton();
    //     });
    // });
    disableButton();
}

function disableButton() {
    // document.getElementById("#redeem").disabled = true;
    $('#redeem').on('click', function() {
        $(this).prop("disabled", true);
    });
}

function disableOrderButton() {
    // document.getElementById("#redeem").disabled = true;
    $('#PlaceOrder').on('click', function() {
        $(this).prop("disabled", true);
    });
}

function removeOrderButton() {
    if (cart.length == 0) {
        //debugger
        var myobj = document.getElementById("PlaceOrder");
        myobj.remove();
        var redeem = document.getElementById("redeem");
        redeem.remove();
        var AddPromoCode = document.getElementById("AddPromoCode");
        AddPromoCode.remove();

        location.reload
    }
}

function reloadScreen() {
    if (cart.length > 0) {
        location.reload();
    }
}