let subTotal = 0;
let serviceCharges = 250;
let totalPrice = 0;
let cartItems;
let paymentMethod = 'cash';
let userPoints;
let orderPoints;
let currentUser;
let mainOrder;
let discountAdded = false;
let discount = 0;
let discountinValue = 0;
let sellerEmail;

$(document).on("pageinit", function () {
    initPage();
    loadCartItems();
});

$(document).on("ul.buttonGroup").click(function (event) {
    var selectedItem = event.target;
    if (selectedItem.tagName.toLowerCase() === 'li') {
        $("li", this)
            .removeClass("selected")
            .filter(event.target)
            .addClass("selected");
        paymentMethod = $(selectedItem).data("value");
        changePaymentMethod();
    }
});

function initPage() {
    $("#nav_bar_cart").addClass("ui-btn-active");
    currentUser = JSON.parse(localStorage.getItem('currentlySignedInUser'));
    console.log(currentUser);
    if (currentUser.address != null) {
        $("#customerAddress").html(currentUser.address)
    } else {
        $("#customerAddress").html("User address is null")
    }

    mainOrder = JSON.parse(localStorage.getItem("pendingOrder"));
    let sellers = JSON.parse(localStorage.getItem('sellers'));
    if (mainOrder != null) {
        $.each(sellers, function (key, item) {
            if (item.sellerId === mainOrder.sellerId) {
                sellerEmail = item.paymentMethod.email;
            }
        });
    }
    paypal.Buttons({
        onInit: function (data, actions) {
            // Disable the buttons
            actions.disable();
            if (cartItems != null) {
                actions.enable();
            } else {
                actions.disable();
            }
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalPrice,
                        currency: 'LKR'
                    },
                    payee: {
                        email_address: sellerEmail
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                placeOrder('approved')
            });
        },
        onCancel: function (data) {
            placeOrder('cancel');
        },
        style: {
            layout: 'horizontal',
            color: 'gold',
            shape: 'pill',
            label: 'paypal',
            tagline: 'false',
        }
    }).render('#paypal-button-container');
    paypal.Buttons({
        onInit: function (data, actions) {
            // Disable the buttons
            actions.disable();
            if (cartItems != null) {
                actions.enable();
            } else {
                actions.disable();
            }
        },
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'pill',
            label: 'paypal',
        }
    }).render('#paypal-card-container');

    userPoints = currentUser.currentPoints;
    $('#pointsContainer').text(userPoints + ' points available');
    $(window).bind("load", function () {
        var element1 = document.getElementById("paypal-button-container").childNodes;
        var element2 = document.getElementById("paypal-card-container").childNodes;
        element1[0].childNodes[1].style.zIndex = "0";
        element2[0].childNodes[1].style.zIndex = "0";
    });
}

function loadCartItems() {
    let popUp = $('#placeOrderLink');
    let title = $('#alert-popup-title');
    let body = $('#alert-popup-body');

    if (mainOrder != null) {
        cartItems = mainOrder.foods;
    }
    if (mainOrder === null) {
        title.text('Empty cart');
        body.text('Your cart is empty. Start Ordering!');
        setTimeout(function () { popUp.click(); }, 2000);
    }

    if (cartItems != null) {
        $.each(cartItems, function (key, item) {
            var listItem =
                "<li class='cart-item'>" +
                "   <div class='ui-grid-a'>" +
                    "   <select onchange='changeQuantity(\"" + key + "\", this.value)' class='ui-block-a item-quantity' style='width: 13%; margin-right: 3%;'>\n" +
                    "    <option value='1'>1</option>\n" +
                    "    <option value='2'>2</option>\n" +
                    "    <option value='3'>3</option>\n" +
                    "    <option value='4'>4</option>\n" +
                    "    <option value='5'>5</option>\n" +
                    "   </select>" +
                "       <span class='ui-block-b item-name' style='width: 70%;'> " + item.foodTitle + "</span>" +
                "       <i class='ui-block-c remove-item material-icons' onclick='removeItem(\"" + key + "\", this)' style='font-size: 20px'>close</i>" +
                "   </div> " +
                "</li>"

            $('.cart-items-container').append(listItem);
            subTotal += item.price;
            if (item.foodQuantity > 1) {
                $("select:last option[value='" + item.foodQuantity + "']").attr("selected", "selected");
            }
        });
        changePrice();
        $('#placeOrder').removeAttr("disabled");

    }
}
function changePrice() {
    subTotal = 0;
    if (cartItems != null) {
        $.each(cartItems, function (key, item) {
            subTotal += item.totalPrice;
        });
        if (subTotal === 0) {
            serviceCharges = 0;
        }
        subTotal = Math.round(subTotal);

        $('#sub-total').text("LKR " + subTotal);
        $('#service-charges').text("LKR " + serviceCharges);
        totalPrice = Math.round(subTotal + serviceCharges);
        $('#total-price').text("LKR " + totalPrice);

        orderPoints = Math.round(totalPrice * 0.01);
        $('#orderPoints').text(orderPoints);

        if (discountAdded) {
            discountinValue = (totalPrice * discount) / 100;
            totalPrice = Math.round(totalPrice - discountinValue);
            $('#total-w-discount').text("LKR " + totalPrice);
        }
        console.log(totalPrice);
        if (document.getElementById('pointsChecked').checked) {
            $('#total-w-discount').text("LKR " + (totalPrice - userPoints));
            totalPrice = totalPrice - userPoints;
        }
    }
    if (cartItems === null) {
        $('#placeOrder').attr("disabled", 'true');
        $('#sub-total').text("LKR " + '0');
        $('#service-charges').text("LKR " + '0');
        $('#total-price').text("LKR " + '0');
        $('#total-w-discount').text("LKR " + '0');
    }
}

function usePoints() {
    let checked = document.getElementById('pointsChecked').checked;
    if (checked && subTotal !== 0) {
        document.getElementById('total-w-discount').style.opacity = "1";
        document.getElementById('total-w-discount-text').style.opacity = "1";
        document.getElementById("total-price").style.textDecoration = 'line-through';
    } else if (!discountAdded) {
        document.getElementById('total-w-discount').style.opacity = "0";
        document.getElementById('total-w-discount-text').style.opacity = "0";
        document.getElementById("total-price").style.textDecoration = 'none';
    }
    changePrice();
}

function changeQuantity(key, value) {
    console.log(cartItems);
    let pricePerItem = cartItems[key].totalPrice / cartItems[key].foodQuantity;
    cartItems[key].foodQuantity = value;
    cartItems[key].totalPrice = value * pricePerItem;
    changePrice();
    console.log(cartItems);
    mainOrder.foods = cartItems;
    localStorage.setItem("pendingOrder", JSON.stringify(mainOrder));
}
function removeItem(key, e) {
    console.log(key);
    if (key == 0) {
        cartItems.splice(-1, 1);
        console.log('elemet 0')
    } else {
        console.log('elemet other')
        cartItems.splice(key, 1);
    }
    console.log(cartItems);
    e.parentElement.parentElement.parentElement.innerHTML = '';
    mainOrder.foods = cartItems;
    localStorage.setItem("pendingOrder", JSON.stringify(mainOrder));
    loadCartItems();
}
function changePaymentMethod() {
    if (paymentMethod === 'paypal') {
        $('#paypal-button-container').show();
        $('#placeOrder').hide();
        $('#paypal-card-container').hide();
    }
    if (paymentMethod === 'cash') {
        $('#paypal-button-container').hide();
        $('#paypal-card-container').hide();
        $('#placeOrder').show();
    }
    if (paymentMethod === 'credit-card') {
        $('#paypal-button-container').hide();
        $('#paypal-card-container').show();
        $('#placeOrder').hide();
    }
}
function addDiscountCode() {
    let code = $('#discountCode').val();
    let articles = JSON.parse(localStorage.getItem('articles'));
    var codeWorked = false;
    if (subTotal != 0) {
        $.each(articles, function (key, item) {
            if (item.sellerId === mainOrder.sellerId) {
                if (item.code === code) {
                    document.getElementById('total-w-discount').style.opacity = "1";
                    document.getElementById('total-w-discount-text').style.opacity = "1";
                    document.getElementById("total-price").style.textDecoration = 'line-through';
                    discount = item.discount;
                    discountAdded = true;
                    codeWorked = true;
                    showSuccess("Discount Added")
                    changePrice();
                }
            }
        });
        if (!codeWorked) {
            showFailure("Invalid code.")
        }
    }
}
function placeOrder(status) {
    if (status === 'approved') {
        let sellerOrders = JSON.parse(localStorage.getItem('sellerOrders'));
        let orders = JSON.parse(localStorage.getItem('currentlySignedInUser')).orders;
        console.log(orders);
        let lastOrderId;
        if (orders != null && orders.length > 0) {
            lastOrderId = orders[orders.length - 1].id;
        } else {
            lastOrderId = 1;
        }
        let date = new Date();
        let newOrder = {
            'id': lastOrderId + 1,
            'driverLicense': 'CAQ 1120',
            'driverName': 'Jehan',
            'isComplete': false,
            'orderDate': date,
            'timeLimit': '7',
            'title': mainOrder.kitchenName,
            'driverTel': '0768043101',
            'total': totalPrice,
            'imageUrl': mainOrder.kitchenImage,
            'sellerId': mainOrder.sellerId,
            'userId': mainOrder.userId,
            'locationLong': 79.911245,
            'locationLat': 7.001704,
        };
        orders.push(newOrder);

        if (document.getElementById('pointsChecked').checked) {
            userPoints = 0;
        }

        currentUser.currentPoints = userPoints + orderPoints;
        currentUser.orders = orders;


        var users = JSON.parse(localStorage.getItem('users'));
        $.each(users, function (key, user) {
            if (user.userId === currentUser.userId) {
                users[key] = currentUser;
                users[key].orders = orders;
            }
        });
        localStorage.setItem('currentlySignedInUser', JSON.stringify(currentUser));
        localStorage.setItem("users", JSON.stringify(users));

        $.each(sellerOrders, function (key, value) {
            if (value.sellerId === mainOrder.sellerId) {
                let sellerOrder;
                $.each(cartItems, function (key, item) {
                    sellerOrder = {
                        "foodId": cartItems[key].foodId,
                        "foodTitle": cartItems[key].foodTitle,
                        "orderStatus": "Pending",
                        "foodQuantity": cartItems[key].foodQuantity,
                        "portionSize": cartItems[key].portionSize,
                        "specialInstructions": cartItems[key].specialInstructions,
                        "comments": cartItems[key].comments,
                        "totalPrice": cartItems[key].totalPrice
                    };
                    value.outstandingOrders.push(sellerOrder);
                });
            }
        });
        localStorage.setItem('sellerOrders',JSON.stringify(sellerOrders));

        localStorage.removeItem('pendingOrder');
        showSuccess("Order placed, see it in upcoming orders.")
        setTimeout(function () { window.location.replace('orders_screen.php'); }, 3000);
    }
    if (status === 'cancel') {
        showFailure('Payment Failed');
    }
}