var passedItem = {};
var newItemCategory;
var categoryList=[]; 
var tempCategoryList = [];// temp category list holds the categories added by the user and categoryList holds the original categories
var currentUIState = { 'isCategoryPopup': true, 'isAddItemPopup': false };
var storageRef;
var imageFile;
var kitchenId;
var latestFoodId;

$(document).on('popupbeforeposition', '#add_item', function (event, ui) {
    $('.outer-loading-div').hide();
    storageRef = firebase.storage().ref();
    passedItem = $(this).data('item');
    kitchenId = $(this).data('kitchenId');
    latestFoodId = $(this).data('latestFoodId');
    popUpInit();
    if (passedItem === null && currentUIState.isCategoryPopup === true) {
        if (categoryList.length === 0) {
            categoryList = $(this).data('categories');
            renderAddCategoryPopup(categoryList);
        }
    } else if (currentUIState.isAddItemPopup === true) {
        renderAddItemPopup();
    } else {
        $('#popup-1').show();
        renderEditPopup();
    }
});



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


$(document).on(".buttonGroup").click(function (event) {
    var selectedItem = event.target;
    if (selectedItem.tagName.toLowerCase() == 'li') {
        $("li", this)
            .removeClass("selected")
            .filter(event.target)
            .addClass("selected");
        newItemCategory = $(selectedItem).data("value");
        $('#nextBtn').prop("disabled", false);
    }
});


function renderAddCategoryPopup(array) {
    if (newItemCategory === undefined) {
        $('#nextBtn').prop("disabled", true); //should be disabled rather hiding
    }
    if (categoryList.length == 0) {
        $('#no-categories-text').show();
        $('#category-list').hide();
    } else {
        $('#category-list').show();
        $('#no-categories-text').hide();
        $('#category-list').append("<ul class='buttonGroup' id = 'ul-categories'></ul>");
        renderCategoryListItem(array);
    }
    $('#popup-2').show();
    hidePopup1();
}

// Add popup opens when add button is clicked
function renderAddItemPopup() {
    currentUIState.isCategoryPopup = false;
    currentUIState.isAddItemPopup = true;
    $('#popup-heading-text').text("Add Item");
    $('#txttitle').val('');
    $('#txtprice').val('');
    $('#txtdescription').val('');
    $('#picked-image').hide();
    $('#remove-image-icon').hide();
    $('#confirm-button').hide();
    $('#add-button').show();
    $('.header-back-icon').show();
}

// Edit popup opens when edit button is clicked
function renderEditPopup() {
    $('#popup-2').hide();
    $('#popup-heading-text').text("Edit Food Details");
    $('#txttitle').val(passedItem.name);
    $('#txtprice').val(passedItem.price);
    $('#txtdescription').val(passedItem.description);
    $('#picked-image').attr('src', passedItem.img);
    $('.header-back-icon').hide();
    $('#picked-image').show();
    $('#remove-image-icon').show();
    $('#add-button').hide();
    $('#confirm-button').show();
}


function renderCategoryListItem(categories) {
    if (categories.length > 0) {
        for (var i = 0; i < categories.length; i++) {
            var categoryItem = "<li data-value = '" + categories[i] + "'>" + categories[i] + "</li>"
            $('#ul-categories').append(categoryItem);
        }
    }
}


// Button Event Handlers
function pickImage() {
    $('#fileSelector').click();
    $('#fileSelector').change(function (e) {
        if (e.target.files.length != 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#picked-image').attr('src', e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            imageFile = e.target.files[0];
            $('#picked-image').show();
            $('#remove-image-icon').show();
        }
    });
}


function onAddButtonClicked() {

    passedItem = { id: '', name: '', description: '', img: '', price: 0 };
    passedItem.name = $('#txttitle').val();
    passedItem.description = $('#txtdescription').val();
    passedItem.price = $('#txtprice').val();

    if (passedItem.name != '' & passedItem.description != '' & passedItem.price != 0 & imageFile !== undefined) {
        var index = categoryList.findIndex(obj => obj.toLowerCase() === newItemCategory.toLowerCase());
        passedItem.id = "F" + (latestFoodId + 1);
        uploadImage({ 'isNewItem': false })
            .then(function (result) {
                window.parent.handlePopupResult({
                    'foodItem': passedItem, 'isNewItem': true, 'newCategory': newItemCategory,
                    'categoryIndex': index
                });
                showSuccess("Food Item added successfully");
            }).then(function () {
                dismiss();
            }).catch(function(error){
                $('.outer-loading-div').hide();
                showFailure("Connection Issue. Please try again later");
            });
    } else {
        showFailure("Enter the required fields.");
    }
}


function onNextButtonClicked() {
    if (newItemCategory !== '') {
        $('#popup-2').hide();
        $('#popup-1').show();
        renderAddItemPopup();
        $('.pop-up-div').popup('reposition', { positionTo: 'window' });
    }

}


function onConfirmButtonClicked() {
    passedItem.name = $('#txttitle').val();
    passedItem.description = $('#txtdescription').val();
    passedItem.price = $('#txtprice').val();
    if (passedItem.name != '' & passedItem.description != '' && passedItem.price != '') {
        uploadImage({ 'isNewItem': false })
            .then(function (result) {
                $('.outer-loading-div').hide();
                window.parent.handlePopupResult({ 'foodItem': passedItem, 'isNewItem': false });
                showSuccess("Food Item edited successfully");
            }).then(function () {
                dismiss();
            }).catch(function(error){
                $('.outer-loading-div').hide();
                showFailure("Connection Issue. Please try again later");
            });

    } else {
        showFailure("Enter the required fields.");
    }
}


function onBackButtonClicked(){
    $('#popup-1').hide();
    $('#popup-2').show();
    $( '.pop-up-div' ).popup( 'reposition', {positionTo: 'window'});
}



function uploadImage({ 'isNewItem': isNewItem }) {
    var imageURL;
    if (isNewItem) {
        imageURL = 'images/' + kitchenId + (latestFoodId + 1) + '.jpg';
    } else {
        imageURL = 'images/' + kitchenId + passedItem.id + '.jpg';
    }

    var imageRef = storageRef.child(imageURL);
    var uploadTask = imageRef.put(imageFile);
    return new Promise(function (resolve, reject) {
        uploadTask.on('state_changed', function (snapshot) {
            $('.outer-loading-div').show();
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (err) {
            console.log(err);
            reject(err);
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                passedItem.img = downloadURL;
                resolve(passedItem);
            }).catch(function(err){
                console.log("Error: " + err );
            });
        });
    });

}


function onAddNewCategoryClicked() {
    var val = $('#txtcategory').val();
    if (val !== '') {
        var index = categoryList.findIndex(obj => obj.toLowerCase() === val.toLowerCase());
        $('#category-list').show();
        $('#no-categories-text').hide();
        if (index === -1) {
            categoryList.push(val);
            if(categoryList.length === 1){
                $('#category-list').append("<ul class='buttonGroup' id = 'ul-categories'></ul>");
            }
            var categoryItem = "<li data-value = '" + val + "'>" + val + "</li>"
            $('#ul-categories').append(categoryItem);
            $( '.pop-up-div' ).popup( 'reposition', {positionTo: 'window'});
        } else {
            showFailure("The category has already been created.");
        }
    }
}


// Hiding Elements
function hidePopup1() {
    $('#add-button').hide();
    $('#popup-1').hide();
    $('#confirm-button').hide();
}

function dismiss() {
    newItemCategory = undefined;
    categoryList = [];
    currentUIState.isCategoryPopup = true;
    currentUIState.isAddItemPopup = false;
    $('#ul-categories').remove();
    $('#txtcategory').val('');
    $('.pop-up-div').popup('close');
}



function removeImage() {
    $('#picked-image').hide();
    $('#remove-image-icon').hide();
}

