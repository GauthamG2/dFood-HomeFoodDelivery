var imageFile;
var imageFileUrl;
var kitchenName;
var kitchenTag;
var kitchenCategory;
var kitchenDescription;
var kitchenContactNumber;
var businessHours1;
var businessHours2;
var kitchenTargetPriceRangeCheap;
var kitchenTargetPriceRangeNormal;
var kitchenTargetPriceRangeExpensive;

var boolUniqueKey = false; // Default value

$(document).on("pageinit", function () {
    var currentUsersDB = JSON.parse(localStorage.getItem("currentlySignedInUser"));

    if (currentUsersDB.sellerId !== undefined) {
        document.getElementById("registration-create-account-button").disabled = true;

        showFailure("You already have a seller account.");
    }

    initFirebase();
});

function initFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyCBVsF5j5hL9oKUwBke6aCo5wcyOi8Dmfw",
        authDomain: "frese-7bdad.firebaseapp.com",
        databaseURL: "https://frese-7bdad.firebaseio.com",
        storageBucket: "frese-7bdad.appspot.com"
    };

    firebase.initializeApp(firebaseConfig);
}

function readImageURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#kitchen-file-image-change').attr('src', e.target.result);
        };

        imageFile = input.files[0];

        reader.readAsDataURL(imageFile);
    }
}

function createAccountButton() {
    kitchenName = document.getElementById("kitchen-name").value;
    kitchenTag = document.getElementById("kitchen-tag").value;
    kitchenCategory = document.getElementById("kitchen-category").value;
    kitchenDescription = document.getElementById("kitchen-address").value;
    kitchenContactNumber = document.getElementById("kitchen-contact-number").value;
    businessHours1 = document.getElementById("business-hours-1").value;
    businessHours2 = document.getElementById("business-hours-2").value;

    kitchenTargetPriceRangeCheap = document.getElementById("kitchen-target-price-range-cheap").checked;
    kitchenTargetPriceRangeNormal = document.getElementById("kitchen-target-price-range-normal").checked;
    kitchenTargetPriceRangeExpensive = document.getElementById("kitchen-target-price-range-expensive").checked;

    if (imageFile == undefined) {
        showFailure("Add a kitchen image.");
    } else {
        if (kitchenName == "") {
            showFailure("Enter a kitchen name.");
        } else {
            if (kitchenTag == "") {
                showFailure("Enter a kitchen tag.");
            } else {
                if (kitchenCategory == "") {
                    showFailure("Enter a kitchen category.");
                } else {
                    if (kitchenDescription == "") {
                        showFailure("Enter a kitchen description.");
                    } else {
                        if (kitchenContactNumber == "") {
                            showFailure("Enter a kitchen contact number.");
                        } else {
                            if (isNaN(kitchenContactNumber) == true) {
                                showFailure("Kitchen contact number must be a number.");
                            } else {
                                if (businessHours1 == "") {
                                    showFailure("Enter the opening time.");
                                } else {
                                    if (businessHours2 == "") {
                                        showFailure("Enter the closing time.");
                                    } else {
                                        allConditionsMet();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function allConditionsMet() {
    showLoading();
    uploadKitchenImage();
}

function showLoading() {
    $.mobile.loading("show", {
        theme: "b",
        text: "Please wait...",
        textVisible: true,
        textonly: false,
        html: $(".create-account-btn").jqmData("html")
    });
}

function uploadKitchenImage() {
    var storageRef = firebase.storage().ref("kitchenImages/" + imageFile.name);
    var uploadTask = storageRef.put(imageFile);

    uploadTask.on("state_changed",
        function progress(snapshot) {
            // No action needed
        },

        function error(error) {
            console.log(error);

            $.mobile.loading("hide");

            showFailure("Network issue, please try again later.");
        },

        function complete() {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                imageFileUrl = downloadURL;

                uniqueKeyGenerator();
            });
        });
}

function uniqueKeyGenerator() {
    if (typeof (Storage) !== "undefined") {
        boolUniqueKey = true;

        var uniqueKey = "kitchenId" + Math.floor(Math.random() * 1000);

        var sellersDB = JSON.parse(localStorage.getItem('sellers'));

        for (var i = 0; i < sellersDB.length; i++) {
            var item = sellersDB[i].sellerId;

            if (item.includes(uniqueKey)) {
                boolUniqueKey = false;

                uniqueKeyGenerator();

                break;
            }
        }

        if (boolUniqueKey == true) {
            boolUniqueKey = false;

            var priceRange = "cheap"; // Default value

            if (kitchenTargetPriceRangeCheap == true) {
                priceRange = "cheap";
            } else if (kitchenTargetPriceRangeNormal == true) {
                priceRange = "medium";
            } else if (kitchenTargetPriceRangeExpensive == true) {
                priceRange = "expensive";
            }

            // Save to "sellers"
            var sellersDBNew = {
                "sellerId": uniqueKey,
                "kitchenName": kitchenName,
                "kitchenImage": imageFileUrl,
                "kitchenDescription": kitchenDescription,
                "kitchenRatingTotal": 5,
                "kitchenRatingUserNumber": 1,
                "location": {
                    "addressName": "N/A",
                    "latLocation": 43.6532,
                    "longLocation": 79.3832
                },
                "categories": [kitchenCategory],
                "priceRange": priceRange,
                "tags": [kitchenTag],
                'restrictions': [],
                "time": businessHours1 + " to " + businessHours2,
                "paymentMethod": {
                    'email': "frese-facilitator@gmail.com",
                    'accountNumber': "",
                    'type': "",
                    'CVC': "",
                    'exiprationDate': ""
                },
                "foodItems": []
            };

            sellersDB.push(sellersDBNew);

            localStorage.setItem("sellers", JSON.stringify(sellersDB));

            saveToCurrentlySignedInUserAndUsers(uniqueKey);

            var createSellerOrder = {
                "sellerId": uniqueKey,
                "outstandingOrders": [],
                "completedOrders": []
            };

            var sellerOrders = JSON.parse(localStorage.getItem('sellerOrders'));
            sellerOrders.push(createSellerOrder);
            localStorage.setItem('sellerOrders', JSON.stringify(sellerOrders));

            $.mobile.loading("hide");

            showSuccess("Seller Account Successfully Created");

            setTimeout(function () {
                window.location = "welcome_seller_profile.php";
            }, 2000);
        }
    } else {
        showFailure("Sorry, your browser does not support Frese. ")
    }
}

function saveToCurrentlySignedInUserAndUsers(uniqueKey) {
    // Save to "currentlySignedInUser"
    var currentUsersDB = JSON.parse(localStorage.getItem("currentlySignedInUser"));

    currentUsersDB.sellerId = uniqueKey;

    localStorage.setItem("currentlySignedInUser", JSON.stringify(currentUsersDB));

    // Save to "users"
    var usersDB = JSON.parse(localStorage.getItem("users"));

    for (var i = 0; i < usersDB.length; i++) {
        var item = usersDB[i].userId;

        if (item == currentUsersDB.userId) {
            usersDB[i].sellerId = uniqueKey;

            localStorage.setItem("users", JSON.stringify(usersDB));

            break;
        }
    }
}
