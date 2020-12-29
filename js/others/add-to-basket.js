var quantity = 1;
var portionSize = 'Small';
var foodItems = [];
const DECREASE_COMMAND = 'D';
const INCREASE_COMMAND = 'I';
var pendingOrder = {
    "sellerId": '',
    "userId": '',
    "kitchenName": '',
    "kitchenImage": '',
    "foods": []
}


$(document).on('popupbeforeposition', '#order_popup', function (event, ui) {
    console.log(selectedFoodItem.title);
    $('#food_title').text(selectedFoodItem.title);
    $('#food_image').attr('src', selectedFoodItem.image);
    $('#food_image').attr('alt', selectedFoodItem.title);
});

$(document).on(".buttonGroup").click(function (event) {
    var selectedItem = event.target;
    if (selectedItem.tagName.toLowerCase() == 'li') {
        $("li", this)
            .removeClass("selected")
            .filter(event.target)
            .addClass("selected");

        portionSize = $(selectedItem).data("value");
        console.log(portionSize);
    }
});


function dismiss() {
    intializeafterdismissed();
    $('.pop-up-div').popup('close');
}


function updateQuantity(value) {
    if (value == DECREASE_COMMAND && quantity != 1) {
        quantity = quantity - 1;
    } else if (value == INCREASE_COMMAND) {
        quantity = quantity + 1;
    }
    $('#quantity').text(quantity);
}


function addToBasket() {
    var instructions = $('#txt-instructions').val();
    var comments = $('#txt-comments').val();

    var foodItem = {
        "foodId": selectedFoodItem.id,
        "foodTitle": selectedFoodItem.title,
        "foodQuantity": quantity,
        "portionSize": portionSize,
        "specialInstructions": instructions,
        "comments": comments,
        'imageUrl': selectedFoodItem.image,
        "totalPrice": quantity * selectedFoodItem.price,
    }

    var currentlySignedInUser = JSON.parse(localStorage.getItem('currentlySignedInUser'));
    var previousOrders = JSON.parse(localStorage.getItem("pendingOrder"));

    if (previousOrders === null || previousOrders.sellerId === undefined || previousOrders.sellerId === kitchenId) {
        if (previousOrders === null  || previousOrders.sellerId == undefined) {
            pendingOrder.kitchenName = seller.kitchenName;
            pendingOrder.sellerId = kitchenId;
            pendingOrder.userId = currentlySignedInUser.userId;
            pendingOrder.kitchenImage = seller.kitchenImage;
        } else {
            pendingOrder = previousOrders;
        }

        if (pendingOrder.foods === undefined) {
            pendingOrder.foods.push(foodItem);
        } else {
            var item = pendingOrder.foods.findIndex(obj => obj.foodId === selectedFoodItem.id);
            if (item === -1) {
                pendingOrder.foods.push(foodItem);
            } else {
                if (pendingOrder.foods[item].portionSize.toLowerCase() === portionSize.toLowerCase()) {
                    var prevQuantity = pendingOrder.foods[item].foodQuantity;
                    var prevPrice = pendingOrder.foods[item].totalPrice;
                    pendingOrder.foods[item].foodQuantity = (prevQuantity + quantity);
                    pendingOrder.foods[item].totalPrice = (prevPrice + (quantity * selectedFoodItem.price));
                } else {
                    pendingOrder.foods.push(foodItem);
                }
            }
        }
        showSuccess("Item added to Cart.<br><br><i class='material-icons'>shopping_cart</i> ")
        localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));
        dismiss();
    } else {
        showFailure("Cart is already occupied, cannot add items to the cart from different kitchens.");
    }
}

function intializeafterdismissed() {
    quantity = 1;
    $('#quantity').text(quantity);
}