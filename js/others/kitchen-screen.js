const LKR = "LKR "
var selectedFoodItem = {
    image: '',
    id: '',
    title: '',
    price: 0
}
var kitchenId;
var seller;

$(document).on("pageinit", function () {
    initialize();
    $("#nav_bar_search").addClass("ui-btn-active");

});


function initialize() {
    kitchenId = localStorage.getItem("clickedSellerId");
    console.log(kitchenId);
    var sellers = JSON.parse(localStorage.getItem("sellers"));
    seller = sellers.find(obj => obj.sellerId === kitchenId);
    bindData();
    renderList();
    setHeight();
    // document.getElementById("#nav_bar_search").classList.add("ui-btn-active");
}



function bindData(){
    $('.kitchen-image').attr('src',seller.kitchenImage);
    $('#kitchen-title').text(seller.kitchenName);
    var categoryText = '';
    $.each(seller.categories,function(index, category){
        // $('#kitchen-category').text();
        categoryText += '\u25CF' + "\xa0" +category + "\xa0\xa0\xa0\xa0";
        console.log(categoryText);
    });
    $('#kitchen-category').text(categoryText);
    $('#kitchen-description').text(seller.kitchenDescription);
    $('#kitchen-time').text(seller.time);
    $('#kitchen-ratings').text((seller.kitchenRatingTotal/seller.kitchenRatingUserNumber).toFixed(1));
    $('#kitchen-address').text(seller.location.addressName);
}


function renderList(){
    // console.log( seller.foodItems.length)
    for(var i = 0; i < seller.foodItems.length; i++)
    {
        $.each(seller.foodItems[i].items, function (index, data) {
            if(index == 0)
            {
                var listHeader = "<li data-role = 'list-divider' class = 'padding-none' style = 'border-style: none;font-size: 18px;font-weight: lighter;margin-top: 30px !important;'>" + seller.foodItems[i].category + "</li>"
                $('.ul-container').append(listHeader );
            }
            var listitem = 
                        "<li data-icon='false' style='margin-right:10px;padding-right: 10px;'" + 
                        "onclick = 'onFoodItemClicked(\"" + data.name +"\"," + data.price + ",\"" + data.id + "\",\"" + data.img +"\");'>\
                            <a href='#order_popup' id = 'food-item' data-rel = 'popup' data-transition = 'pop' style='padding-left:0;padding-right:0' class='ui-btn'>\
                                <div class='list-item-image-div'>\
                                    <img class='ui-li-thumb food-img' src='" + data.img + "'>\
                                </div>\
                                <div class='list-item-text-div'>\
                                    <p style='font-size: 18px;color:black;margin-top:6px;padding: 0px;white-space: normal !important'>" + data.name + "</p>\
                                    <p style='font-size: 13px;color: #999999;margin-top: 22px;font-family: Montserrat;white-space: normal !important'>" + data.description + "</p>\
                                    <p style='font-size: 13px;color:#007aff;margin-top: 22px;font-family: Montserrat;white-space: normal !important'>"+ LKR + data.price + "</p>\
                                </div>\
                            </a>\
                            <div class='list-item-divider'>\
                        </div></li>";
            $('.ul-container').append(listitem);
        });
    }
}



function setHeight() {
    var height = $(window).height();
    var width = $(window).height();

    var popUpHeight = height - 50;

    $('.pop-up-div').css('height', popUpHeight);
    $('.inner-pop-up-div').css('height', popUpHeight - 50);
    popUpInit();
}

function popUpInit() {
    $('.pop-up-div').popup({
        afteropen: function (e) {
            $('body').css('overflow-y', 'hidden')
        },
        afterclose: function (e) {
            $('body').css('overflow-y', 'auto')
        }
    })
}

function dismiss() {
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


function onFoodItemClicked(foodTitle, price, foodId, url) {
    console.log(foodTitle);
    selectedFoodItem.id = foodId;
    selectedFoodItem.image = url;
    selectedFoodItem.title = foodTitle;
    selectedFoodItem.price = price;
}




