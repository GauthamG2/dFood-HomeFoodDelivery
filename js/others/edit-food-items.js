const LKR = "LKR ";
const img_URL = "http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/GourmetTraveller/2015/07/02/35275/0715GT-curry-recipes-crab.jpg?width=768&amp;height=639&amp;mode=crop&amp;quality=75&amp;anchor=middlecenter"
var kitchenID;
var categories = [];
var listLength = 0;
var selectedFoodItem;
var seller;
var sellerId;
var currentlySignedInUser;

$(document).on("pageinit", function () {
    initialize(); 
});



function initialize() {
    currentlySignedInUser = JSON.parse(localStorage.getItem("currentlySignedInUser"));
    var sellers =  JSON.parse(localStorage.getItem("sellers"));
    sellerId = sellers.findIndex(obj => obj.sellerId === currentlySignedInUser.sellerId);
    seller = sellers[sellerId];
   // Reads the kitchen id once onload to make changes on the newly added items
   if(seller.foodItems.length > 0){
        // var array = food[0].items[0].id.split('F');
        // kitchenID = array[0];

        renderList();
        initAnimationHandlers();
        $('#empty-list-image').hide();
    } else{
        $('#empty-list-image').show();
        $('#food-items-container').hide();
    }  
    $("#add_btn").on("click", function(e){
        $('.pop-up-div').popup('open');
    });
}


getSellers = function(){
    var sellers = JSON.parse(localStorage.getItem("sellers"));
    return sellers;
}


function initAnimationHandlers(){
    $('.move-up').on( 'click' , function(e){
        var item = $(this).parents().closest('li'); 
        var previousItem = item.prev();
        console.log(previousItem);
        if(previousItem[0].id !== 'food-list-divider'){
            item.animate({ top: '-186px', }, 500, false);
            item.prev().animate({top: '186px'},700, false,
            function(){
                item.prev().css('top', '0px');
                item.css('top', '0px');
                item.insertBefore(item.prev());
                swapItems({'isMovedUp' : true, 'itemID' : item[0].id});
            });
        }
    });
    
   
    $('.move-down').on( 'click' , function(e){
        var item = $(this).parents().closest('li');
        var nextItem = item.next();
        console.log(nextItem);
        if(nextItem[0] !== undefined && nextItem[0].id !== 'food-list-divider'){
            item.next().animate({ top: '-186px',  }, 500, false);
            item.animate({top: '186px'},700, false,
            function(){
                item.next().css('top', '0px');
                item.css('top', '0px');
                item.insertAfter(item.next());
                swapItems({'isMovedUp' : false, 'itemID' : item[0].id});
            });  
        }
    });

    $('.close').on('click', function(e){
        var item = $(this).parents().closest('li');
        var id = item[0].id;
        for(var i = 0; i < seller.foodItems.length; i++){
            var index = seller.foodItems[i].items.findIndex(obj => obj.id === id);
            if(index !== -1){
                seller.foodItems[i].items.splice(index,1);
            }
            if(seller.foodItems[i].items.length === 0){
                seller.foodItems.splice(i,1);
                $(item.prev()).remove();
            }
        }
        save();
       item.animate({left: '-1500px'},500,false);
       item.next().animate({ top: '-186px',  }, 700, 
            function(){
                item.next().css('top', '0px');
                item.remove();
            
                if(seller.foodItems.length === 0){
                    $('#empty-list-image').show();
                    $('#food-items-container').hide();
                }
        });
    });
    
}



function renderList(){
    listLength = 0;
    console.log(seller);
    for(var i = 0; i < seller.foodItems.length ; i++){
        $.each(seller.foodItems[i].items, function (index, data) {
            console.log(seller.foodItems[i].items);
        listLength += 1;
            if(index == 0){
                var listHeader = renderListHeader(seller.foodItems[i].category);
               $('.ul-container').append(listHeader );
            }
            listitem = renderListItem(data);   
           $('.ul-container').append(listitem );
        });
    }
}

function reRenderList(item){
    $('.ul-container').closest('li').remove();
    listitem = renderListItem(item);
}

function renderListHeader(category){
    return "<li id='food-list-divider' data-role = 'list-divider' class = 'padding-none' style = 'border-style: none;font-size: 18px;font-weight: lighter;margin-top: 30px !important;margin-bottom: 5px;'>" + category + "</li>"
}

function renderListItem(data){
    console.log(data.img);

    return " <li id = '"+ data.id +"' class = 'list-item' data-icon='false' style='margin-right:10px;padding-right: 10px;background-color:white;border-radius: 10px;margin-bottom:15px'>\
        <div style = 'background-color: #eeeeee; width: 100%;overflow:hidden;border-top-left-radius: 10px;border-top-right-radius:10px;padding-top: 6px; padding-bottom: 6px;'>\
            <i class='close material-icons teal' style = 'margin-right: 10px;float:right'>close</i>\
            <i class='material-icons teal' style = 'float:right;margin-right: 10px' onclick = 'onFoodItemClicked("+ JSON.stringify(data) + ")' >edit</i>\
        </div>\
        <a id = 'food-item' data-rel = 'popup' data-transition = 'pop' style='padding-left:0;padding-right:0;padding-top: 0;padding-bottom:0; margin-bottom: 10px' class='ui-btn'>\
            <div class='list-item-image-div'>\
                <img class='ui-li-thumb food-img' src='"+ data.img +"'>\
            </div>\
            <div class='list-item-text-div'>\
                <div class = 'ui-grid-a'>\
                    <div class = 'ui-block-a' style = 'width: 90%;'>\
                    <p id='food-title' style='font-size: 18px;color:black;margin-top:6px;padding: 0px;'>"+ data.name +"</p>"+
                        "<p style='font-size: 13px;color: #999999;margin-top: 22px;font-family: Montserrat;'> "+ data.description + "</p>\
                        <p style='font-size: 13px;color:#007aff;margin-top: 22px;font-family: Montserrat;'> " + LKR + data.price +" </p>\
                    </div>\
                    <div class = 'ui-block-b' style = 'width: 10%;'>\
                        <div class = 'ui-grid-a' style = 'float:right'>\
                               <div class = 'ui-block-a' style = 'width:30px;'>\
                                <i class='move-up material-icons teal' style = 'display:block;'>arrow_drop_up</i>\
                                <i class='move-down material-icons teal' style = 'display:block'>arrow_drop_down</i>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </a>\
        <div class='list-item-divider'></div>\
    </li>" ;
}



function onFoodItemClicked(item){
    selectedFoodItem = item;
    $('.pop-up-div').data({'item':item,'kitchenId': seller.sellerId}).popup('open');
}


function handlePopupResult({'foodItem': foodItem , 'isNewItem' : isNewItem, 'newCategory' : newCategory , 'categoryIndex' : index}){
    console.log(foodItem);
    if(isNewItem){
        $('#empty-list-image').hide();
        $('#food-items-container').show();
        // foodItem = generateID(foodItem);
        if(index === -1  || seller.foodItems.length === 0 ||  seller.foodItems[index] === undefined){
            var json = {'category':newCategory,'items' : []};
            seller.foodItems.push(json);
            seller.foodItems[seller.foodItems.length-1].items.push(foodItem);  
        }else{
            seller.foodItems[index].items.push(foodItem);
        } 

    }else if(!isNewItem){
        for(var i = 0; i < seller.foodItems.length; i++){
            $.each(seller.foodItems[i].items, function(index,item){
                if(foodItem.id === item.id){
                    seller.foodItems[i].items[index] = foodItem;
                    console.log(foodItem);
                }
            });
        }
    }
    save();
    $('.ul-container').empty();
    renderList()
    $('.ul-container').listview('refresh');
    initAnimationHandlers();
}


function save(){
    var sellers = getSellers();
    sellers[sellerId] = seller;
    localStorage.setItem("sellers", JSON.stringify(sellers));
}


function onAddItemButtonClicked(){
    categories = [];
    for(var i = 0; i < seller.foodItems.length; i++){
        categories.push(seller.foodItems[i].category);
    }
    var latestFoodItemID = getId();
    $('.pop-up-div').data({'item':null,'categories': categories, 'kitchenId': seller.sellerId, 
    'latestFoodId' : latestFoodItemID}).popup('open');
}



function getId(){
    var itemsArrayLength = 0;
    for(var category = 0; category < seller.foodItems.length; category++){
        for(var i = 0; i < seller.foodItems[category].items.length; i++){
            var itemCount = seller.foodItems[category].items[i].id.split('F');
            if(itemsArrayLength < parseInt(itemCount[1])){
                itemsArrayLength =  parseInt(itemCount[1]);
            }
        }
    }
    return itemsArrayLength;
}

function swapItems({'isMovedUp' : isMovedUp, 'itemID' : itemID}){
    //isMovedUp is true if the current item has switched it's place with the item just above it
    //isMovedUp is false if the current item has switched it's positions with the item just below it
  
    var positionInArray = 0;
    var i = 0;

    for(i; i < seller.foodItems.length; i++){
        positionInArray = seller.foodItems[i].items.findIndex(obj => obj.id == itemID);
        if(positionInArray != -1 ){
            break;
        }
    }

    let foodItem = seller.foodItems[i].items[positionInArray];
    if(isMovedUp){
        seller.foodItems[i].items[positionInArray] = seller.foodItems[i].items[positionInArray - 1];
        seller.foodItems[i].items[positionInArray - 1] = foodItem;
    }else if(!isMovedUp){
        seller.foodItems[i].items[positionInArray] = seller.foodItems[i].items[positionInArray + 1];
        seller.foodItems[i].items[positionInArray + 1] = foodItem;
    }

    save();
}