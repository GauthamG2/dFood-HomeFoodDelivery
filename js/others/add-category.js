var newItemCategory;
var categoryList, tempCategoryList = [];

$(document).on('popupbeforeposition', '#add_category', function(event,ui){
    console.log(categoryList);
    // passedItem = $(this).data('item');
    console.log($(this).data('item'));    
    // if(passedItem === null){
        // if(categoryList === null){
            tempCategoryList,categoryList = $(this).data('categories');
            console.log(categoryList);
            renderAddCategoryPopup(categoryList);
        // }
    // }
});

function renderAddCategoryPopup(array){
    console.log($('#nextBtn'));
    if(newItemCategory === undefined){
         $('#nextBtn').hide(); //should be disabled rather hiding
    }
    // hidePopup1();
    // $('#popup-2').show();
    $('.scrolling-wrapper').append("<ul class='buttonGroup' id = 'ul-categories'></ul>");
    renderCategoryListItem(array);
}


$(document).on(".buttonGroup").click(function (event) {
    var selectedItem = event.target;
    if(selectedItem.tagName.toLowerCase() == 'li'){
        $("li", this)
        .removeClass("selected")
        .filter(event.target)
        .addClass("selected");

        newItemCategory = $(selectedItem).data("value");
        $('#nextBtn').show();
        console.log(newItemCategory);
    }   
});

function onNextButtonClicked(){
    console.log("here: " , newItemCategory);
    if(newItemCategory !== ''){
        $('.pop-up-div').popup('open');
        $('.add-category-popup').popup('close');
        
    }
    
}


function renderCategoryListItem(categories){
    console.log($('#ul-container'));
    if(categories.length > 0){
        for(var i = 0; i < categories.length; i++){
            var categoryItem = "<li data-value = '"+ categories[i] + "'>" + categories[i] + "</li>"
            $('#ul-categories').append(categoryItem);
        }
    }
}