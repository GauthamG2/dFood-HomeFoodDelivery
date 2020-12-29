var kitchenDB = [];

var defaultKitchenDB = [];

$(document).on("pagecreate", "#browse_kitchen", function (event) {
    browseKitchenFilterInit();
    $("#nav_bar_search").addClass("ui-btn-active");

    browseKitchenInit1();
});

function browseKitchenFilterInit() {
    var defaultFilterDB = {
        "filterMinPrice": "1",
        "filterMaxPrice": "5000",
        "ascendingOrDescendingOrder": "ascending",
        "priceRange": "3",
        "ratings": "1",
        "dietaryRestriction": [
            {
                "vegetarian": "false",
                "glutenFree": "false",
                "vegan": "false"
            }
        ]
    };

    var filterDB = JSON.parse(localStorage.getItem("filterDB"));

    if (filterDB == null) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("filterDB", JSON.stringify(defaultFilterDB));

            filterDB = defaultFilterDB;
        } else {
            showFailure("Sorry, your browser does not support Frese")
        }
    }
}


function addFavourite(id) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation)
        e.stopPropagation();

    var favVal = $("#" + id).html();
    var users = JSON.parse(localStorage.getItem('users'));
    var sellers = JSON.parse(localStorage.getItem('sellers'));

    var currentlySignedInUser = JSON.parse(localStorage.getItem('currentlySignedInUser'));
    if (favVal == "favorite") {
        $.each(sellers, function (key, seller) {
            if (seller.sellerId == id.replace("favourite", "")) {
                $.each(users, function (key, user) {
                    if (user.contactNumber == currentlySignedInUser.contactNumber) {

                        var filteredUser = user.favouritesList.filter(function (value, index, arr) {
                            return value.sellerId != seller.sellerId

                        });
                        user.favouritesList = filteredUser;
                        var filteredCurrentUser = currentlySignedInUser.favouritesList.filter(function (value, index, arr) {
                            return value.sellerId != seller.sellerId
                        });
                        currentlySignedInUser.favouritesList = filteredCurrentUser;
                        localStorage.setItem("users", JSON.stringify(users));
                        localStorage.setItem("currentlySignedInUser", JSON.stringify(currentlySignedInUser));
                        $("#" + id).html("favorite_border");
                    }
                });
            }
        });
    } else {
        console.log(sellers);
        $.each(sellers, function (key, seller) {
            if (seller.sellerId == id.replace("favourite", "")) {
                $.each(users, function (key, user) {
                    if (user.contactNumber == currentlySignedInUser.contactNumber) {
                        user.favouritesList.push({ 'sellerId': seller.sellerId, 'kitchenName': seller.kitchenName });
                        currentlySignedInUser.favouritesList.push({ 'sellerId': seller.sellerId, 'kitchenName': seller.kitchenName });
                        localStorage.setItem("users", JSON.stringify(users));
                        localStorage.setItem("currentlySignedInUser", JSON.stringify(currentlySignedInUser));
                        $("#" + id).html("favorite");
                        showSuccess("Added to Favourites List")

                    }
                });
            }
        });


    }

}

function browseKitchenInit1() {
    -
        $.getJSON("json-files/sellers.json", function (jsonFile) {
            defaultKitchenDB = jsonFile;

            browseKitchenInit2();
        });
}

function browseKitchenInit2() {
    kitchenDB = JSON.parse(localStorage.getItem("sellers"));

    if (kitchenDB == "") {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("sellers", JSON.stringify(defaultKitchenDB));
            kitchenDB = defaultKitchenDB;
        } else {
            showFailure("Sorry, your browser does not support Frese")
        }
    }

    if (typeof (Storage) !== "undefined") {
        var searchResult = JSON.parse(localStorage.getItem("userSearchValue"));
        var updatedKitchenDB = [];
        if (searchResult != null) {
            // Check "tags"
            for (var i = 0; i < kitchenDB.length; i++) {
                if (searchResult.type == "search") {
                    var allTags = kitchenDB[i].tags;
                    for (var x = 0; x < allTags.length; x++) {
                        var tag = allTags[x].toLowerCase();
                        if (tag.includes(searchResult.value.toLowerCase())) {
                            updatedKitchenDB.push(kitchenDB[i]);
                            break;
                        }
                    }
                } else if (searchResult.type == "category") {
                    var allcategories = kitchenDB[i].categories;
                    for (var x = 0; x < allcategories.length; x++) {
                        var category = allcategories[x].toLowerCase();
                        if (category == searchResult.value.toLowerCase()) {
                            updatedKitchenDB.push(kitchenDB[i]);
                            break;
                        }
                    }
                }

            }

            // Check "kitchenName"
            for (var y = 0; y < kitchenDB.length; y++) {
                var kitchenDuplicate = false; // Default value

                var item = kitchenDB[y].kitchenName.toLowerCase();

                if (item.includes(searchResult.value.toLowerCase())) {
                    for (var z = 0; z < updatedKitchenDB.length; z++) {
                        var updatedItem = updatedKitchenDB[z].sellerId;

                        if (updatedItem == kitchenDB[y].sellerId) { // Duplicate found
                            kitchenDuplicate = true;

                            break;
                        }
                    }

                    if (kitchenDuplicate == false) {
                        updatedKitchenDB.push(kitchenDB[y]);
                    }
                }
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var filterDB = JSON.parse(localStorage.getItem("filterDB"));

            // Check "priceRange"
            if (filterDB.priceRange == "3") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if (updatedKitchenDB[i].priceRange != "expensive" && updatedKitchenDB[i].priceRange != "medium" && updatedKitchenDB[i].priceRange != "cheap") {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            } else if (filterDB.priceRange == "2") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if (updatedKitchenDB[i].priceRange != "medium" && updatedKitchenDB[i].priceRange != "cheap") {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            } else if (filterDB.priceRange == "1") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if (updatedKitchenDB[i].priceRange != "cheap") {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // Check "ratings"
            if (filterDB.ratings == "5") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if ((updatedKitchenDB[i].kitchenRatingTotal / updatedKitchenDB[i].kitchenRatingUserNumber).toFixed(1) < 5) {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            } else if (filterDB.ratings == "4") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if ((updatedKitchenDB[i].kitchenRatingTotal / updatedKitchenDB[i].kitchenRatingUserNumber).toFixed(1) < 4) {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            } else if (filterDB.ratings == "3") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if ((updatedKitchenDB[i].kitchenRatingTotal / updatedKitchenDB[i].kitchenRatingUserNumber).toFixed(1) < 3) {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            } else if (filterDB.ratings == "2") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if ((updatedKitchenDB[i].kitchenRatingTotal / updatedKitchenDB[i].kitchenRatingUserNumber).toFixed(1) < 2) {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            } else if (filterDB.ratings == "1") {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    if ((updatedKitchenDB[i].kitchenRatingTotal / updatedKitchenDB[i].kitchenRatingUserNumber).toFixed(1) < 1) {
                        updatedKitchenDB.splice(i, 1);
                    }
                }
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var vegetarianOrNot = false; // Default value
            var glutenFreeOrNot = false; // Default value
            var veganOrNot = false; // Default value

            // Check "dietaryRestriction - vegetarian"
            if (filterDB.dietaryRestriction[0].vegetarian == true) {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    for (var x = 0; x < updatedKitchenDB[i].restrictions.length; x++) {
                        if (updatedKitchenDB[i].restrictions[x] == "vegetarian") {
                            vegetarianOrNot = true;
                            break;
                        }
                    }

                    if (vegetarianOrNot != true) {
                        updatedKitchenDB.splice(i, 1);
                        vegetarianOrNot = false;
                    }

                    vegetarianOrNot = false;
                }
            }

            // Check "dietaryRestriction - glutenFree"
            if (filterDB.dietaryRestriction[0].glutenFree == true) {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    for (var x = 0; x < updatedKitchenDB[i].restrictions.length; x++) {
                        if (updatedKitchenDB[i].restrictions[x] == "gluten-free") {
                            glutenFreeOrNot = true;
                            break;
                        }
                    }

                    if (glutenFreeOrNot != true) {
                        updatedKitchenDB.splice(i, 1);
                        glutenFreeOrNot = false;
                    }

                    glutenFreeOrNot = false;
                }
            }

            // Check "dietaryRestriction - vegan"
            if (filterDB.dietaryRestriction[0].vegan == true) {
                for (var i = updatedKitchenDB.length - 1; i >= 0; --i) { // Walking through the array in reverse
                    for (var x = 0; x < updatedKitchenDB[i].restrictions.length; x++) {
                        if (updatedKitchenDB[i].restrictions[x] == "vegan") {
                            veganOrNot = true;
                            break;
                        }
                    }

                    if (veganOrNot != true) {
                        updatedKitchenDB.splice(i, 1);
                        veganOrNot = false;
                    }

                    veganOrNot = false;
                }
            }

            if (filterDB.ascendingOrDescendingOrder == "ascending") {
                updatedKitchenDB.sort(compareAscendingOrder);
            } else {
                updatedKitchenDB.sort(compareDescendingOrder);
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            for (var i = 0; i < updatedKitchenDB.length; i++) {
                document.getElementById("kitchen-image-script").src = updatedKitchenDB[i].kitchenImage;
                document.getElementById("kitchen-name-script").innerHTML = updatedKitchenDB[i].kitchenName;
                document.getElementById("kitchen-description-script").innerHTML = updatedKitchenDB[i].kitchenDescription;
                document.getElementById("kitchen-rating-script").innerHTML = (updatedKitchenDB[i].kitchenRatingTotal / updatedKitchenDB[i].kitchenRatingUserNumber).toFixed(1);

                $("#kitchen-script-1").clone().appendTo("#kitchen-script-2"); // Clone 'kitchen-script-1'
            }

            deleteDuplicateKitchens();

            for (var i = 0; i < updatedKitchenDB.length; i++) {
                document.getElementById("clickedId").id = updatedKitchenDB[i].sellerId;
            }

            var currentlySignedInUser = JSON.parse(localStorage.getItem('currentlySignedInUser'));
            console.log(currentlySignedInUser);
            for (var i = 0; i < updatedKitchenDB.length; i++) {
                document.getElementById("favouriteId").id = updatedKitchenDB[i].sellerId + "favourite";
                $.each(currentlySignedInUser.favouritesList, function (key, item) {
                    if (item.sellerId == updatedKitchenDB[i].sellerId) {
                        console.log(item.sellerId);
                        console.log("Found Fav")
                        $("#" + item.sellerId + "favourite").html('favorite');
                    }
                });
            }

            if (updatedKitchenDB.length == 0) {
                document.getElementById("placeholder-image-for-browse-kitchen").style.display = "block"; // Show placeholder image
            }

            var grammerCorrectionKitchen = "";

            if (updatedKitchenDB.length == 1) {
                grammerCorrectionKitchen = "Kitchen";
            } else {
                grammerCorrectionKitchen = "Kitchens";
            }

            document.getElementById("browse-kitchen-search-results-number").innerHTML = updatedKitchenDB.length + " " + grammerCorrectionKitchen + " Found : " + searchResult.value;
        } else {
            deleteDuplicateKitchens();
        }
    } else {
        showFailure("Sorry, your browser does not support Frese")
    };
}

// Delete 'kitchen-script-1'
function deleteDuplicateKitchens() {
    var id = document.getElementById("kitchen-script-1");
    id.parentNode.removeChild(id);
}

function popupBrowseKitchenFilterRestoreDefault() {
    restoreDefaultFilter(); // This function can be found in "browse_kitchen_filter_popup_script.js" file
}

function setClickedKitchenObject(clickedId) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("clickedSellerId", clickedId);
        window.location = "kitchen_screen.php";
    } else {
        showFailure("Sorry, your browser does not support Frese")
    }
}

function compareAscendingOrder(a, b) {
    const kitchenA = a.kitchenName.toUpperCase(); // Use toUpperCase() to ignore character casing
    const kitchenB = b.kitchenName.toUpperCase(); // Use toUpperCase() to ignore character casing

    let comparison = 0;

    if (kitchenA > kitchenB) {
        comparison = 1;
    } else if (kitchenA < kitchenB) {
        comparison = -1;
    }

    return comparison;
}

function compareDescendingOrder(a, b) {
    const kitchenA = a.kitchenName.toUpperCase(); // Use toUpperCase() to ignore character casing
    const kitchenB = b.kitchenName.toUpperCase(); // Use toUpperCase() to ignore character casing

    let comparison = 0;

    if (kitchenA > kitchenB) {
        comparison = 1;
    } else if (kitchenA < kitchenB) {
        comparison = -1;
    }

    return comparison * -1; // Invert the return value by multiplying by -1
}

function alphabeticalOrderIconClicked() {
    var filterDB = JSON.parse(localStorage.getItem("filterDB"));

    if (filterDB.ascendingOrDescendingOrder == "ascending") {
        filterDB.ascendingOrDescendingOrder = "descending";
    } else if (filterDB.ascendingOrDescendingOrder = "descending") {
        filterDB.ascendingOrDescendingOrder = "ascending";
    }

    localStorage.setItem("filterDB", JSON.stringify(filterDB));

    location.reload();
}
