let sellerId;
let sellerKey;
let outstandingOrders;
let completedOrders;
let sellerOrders;
let orderStatus;


$(document).on("pageinit", function () {
    initPage();
    loadOutstandingOrders();
});

$(document).on("#tabIcons").click(function (event) {
    var selectedItem = event.target;
    if(selectedItem.tagName.toLowerCase() === 'a') {
        $("a", this)
            .removeClass("selected")
            .filter(event.target)
            .addClass("selected");
    }
});
function initPage() {
    $("#nav_bar_profile").addClass("ui-btn-active");
    sellerOrders = JSON.parse(localStorage.getItem('sellerOrders'));
    console.log(sellerOrders);
    sellerId = JSON.parse(localStorage.getItem('currentlySignedInUser')).sellerId;
}

function loadOutstandingOrders() {
    $('.outstanding-container').empty();
    if (sellerOrders != null && sellerOrders.length > 0){
        $.each(sellerOrders, function (key, seller) {
            if(sellerOrders[key].sellerId === sellerId) {
                sellerKey = key;
                outstandingOrders = sellerOrders[key].outstandingOrders;
            }
        })
    }
    if (outstandingOrders !=null && outstandingOrders.length > 0) {
        document.getElementById('emptyList1').style.display = 'none';
        $.each(outstandingOrders, function (key, item) {
            let listItem =
                "<li class='ui-grid-a orderItem'>" +
                    "<div style='width: 100%'>" +
                        "<div class='ui-block-a left-panel'>" +
                            "<p style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'>"+ item.foodQuantity + "x " + item.foodTitle +"</p>" +
                            "<span style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'><b>Portion: </b><b style='color: red'>"+ item.portionSize +"</b></span>" +
                            "<br>" +
                            "<span style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'><b>Instructions: </b><b style='color: red;'>"+ item.specialInstructions +"</b></span>" +
                            "<br>" +
                            "<span style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'><b style='color: red'>"+ item.orderStatus +"...</b></span>" +
                        "</div>" +
                        "<div class='ui-block-b right-panel'>" +
                            "<div class='buttonBlock'>" +
                                "<button class='accept-button' onclick='acceptOrder(this,"+ JSON.stringify(item) +"," + key +");'>Accept</button>" +
                                "<button class='reject-button' onclick='rejectOrder(this,"+ JSON.stringify(item) +"," + key +")'>Reject</button>" +
                            "</div> " +
                        "</div>" +
                    "</div>" +
                "</li>";
            listItem = checkOrderStatus(item,listItem,key);

            $('.outstanding-container').append(listItem);
        });
    } else if(outstandingOrders.length ==0) {
        changeBackground('outstanding');
    }

}
function loadCompletedOrders() {
    $('.completed-container').empty();
    if (sellerOrders != null && sellerOrders.length > 0){
        $.each(sellerOrders, function (key, seller) {
            if(sellerOrders[key].sellerId === sellerId) {
                completedOrders = sellerOrders[key].completedOrders;
            }
        })
    }
    if (completedOrders !=null && completedOrders.length > 0) {
        document.getElementById('emptyList2').style.display = 'none';
        $.each(completedOrders, function (key, item) {
            let listItem =
                "<li class='ui-grid-a orderItem'>" +
                    "<div style='width: 100%;'>" +
                        "<div class='ui-block-a left-panel'>" +
                            "<p style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'>"+ item.foodQuantity + "x " + item.foodTitle +"</p>" +
                            "<p style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'>Comments: <b style='color: green'>"+ item.comments +"</b></p>" +
                            "<p style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'>Earnings: LKR "+ item.totalPrice +"</p>" +
                        "</div>" +
                        "<div class='ui-block-b right-panel' style='padding-top: 50px !important;'>" +
                            "<span>"+ item.orderStatus +"</span>" +
                        "</div>" +
                    "</div>" +
                "</li>";
            $('.completed-container').append(listItem);
        });
    } else if(completedOrders.length ==0){
        changeBackground('completed');
    }
}
function checkOrderStatus(item,listItem,key) {
    if(item.orderStatus == 'Accepted') {
        listItem =
            "<li class='ui-grid-a orderItem'>" +
                "<div style='width: 100%'>" +
                    "<div class='ui-block-a left-panel'>" +
                        "<p style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'>"+ item.foodQuantity + "x " + item.foodTitle +"</p>" +
                        "<span style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'><b>Portion: </b><b style='color: red'>"+ item.portionSize +"</b></span>" +
                        "<br>" +
                        "<span style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'><b>Instructions: </b><b style='color: red;'>"+ item.specialInstructions +"</b></span>" +
                        "<br>" +
                        "<span style='width: 100% !important;font-weight: 900; margin-top:0; margin-bottom: 5px'><b style='color: red'>"+ item.orderStatus +"...</b></span>" +
                    "</div>" +
                    "<div class='ui-block-b right-panel'>" +
                        "<div class='buttonBlock'>" +
                            "<button class='accept-button' onclick='completeOrder(\"" + 'Completed' + "\"," + JSON.stringify(item) +",this,"+key+");'>Complete</button>" +
                        "</div> " +
                    "</div>" +
                "</div>" +
            "</li>";
    }

    return listItem;

}

function acceptOrder(e,item,key) {
    let completeButton = "<button class='accept-button' onclick='completeOrder(\"" + 'Completed' + "\"," + JSON.stringify(item) +",this,"+key+");'>Complete</button>";
    e.parentElement.parentElement.parentElement.children[0].children[5].innerHTML = 'Accepted';
    e.parentElement.parentElement.parentElement.children[0].children[5].style.color = 'green';
    e.parentElement.children[1].remove();
    $(e.parentElement).append(completeButton);
    sellerOrders[sellerKey].outstandingOrders[key].orderStatus = 'Accepted';
    localStorage.setItem('sellerOrders',JSON.stringify(sellerOrders));
    e.remove();
}
function rejectOrder(e,item,key) {
    e.parentElement.parentElement.parentElement.children[0].children[5].innerHTML = 'Rejected';
    e.parentElement.parentElement.parentElement.children[0].children[5].style.color = 'red';
    e.parentElement.children[0].remove();
    completeOrder('Rejected',item,e,key);
    e.remove();
}
function completeOrder(status,item,e,key) {
    item['orderStatus'] = status;
    sellerOrders[sellerKey].outstandingOrders.splice(key,1);
    sellerOrders[sellerKey].completedOrders.push(item);
    localStorage.setItem('sellerOrders',JSON.stringify(sellerOrders));
    e.parentElement.parentElement.parentElement.parentElement.remove();
    if (sellerOrders[sellerKey].outstandingOrders.length==0){
        changeBackground('outstanding');
    }
    loadOutstandingOrders();
}
function changeBackground(list) {
    if (list == 'outstanding') {
        document.getElementById('emptyList1').style.display = 'block';
    }
    if (list == 'completed') {
        document.getElementById('emptyList2').style.display = 'block';
    }
}