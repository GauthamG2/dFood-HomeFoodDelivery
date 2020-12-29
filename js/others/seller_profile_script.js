var currentlySignedInUser;
var sellers;
let userPaypalEmail;

var popupEditSellerProfileUsername = "";
var popupEditSellerProfileContactNumber = "";
var popupEditSellerProfileKitchenContactNumber = "";
var popupEditSellerProfileBusinessHours1 = "";
var popupEditSellerProfileBusinessHours2 = "";
var popupEditSellerProfilePassword = "";
var popupEditSellerProfileConfirmPassword = "";

$(document).on("pageinit", function () {
    currentlySignedInUser = JSON.parse(localStorage.getItem('currentlySignedInUser'));
    sellers = JSON.parse(localStorage.getItem('sellers'));
    $("#nav_bar_profile").addClass("ui-btn-active");
    console.log(currentlySignedInUser);
    addPaypalButton();
    getPaypal();
    init();
});

function init() {
    for (var i = 0; i < sellers.length; i++) {
        var item = sellers[i].sellerId;

        if (item == currentlySignedInUser.sellerId) {
            document.getElementById("currently-signed-in-user-kitchen-address").innerHTML = sellers[i].location.addressName;

            break;
        }
    }
}

function addPaypalButton() {
    paypal.use(['login'], function (login) {
        login.render({
            "appid": "AbH_Jnmi7kSr89TNkVxzUkiIc8L1J22tBdqSqmOtsff7Fv3R0cDjX_ceL9CUWYf8biaqDu_2hQK1_D1T",
            "authend": "sandbox",
            "scopes": "openid profile email",
            "containerid": "cwppButton",
            "responseType": "code",
            "locale": "en-us",
            "buttonType": "CWP",
            "buttonShape": "pill",
            "buttonSize": "lg",
            "fullPage": "true",
            "returnurl": "https://frese.000webhostapp.com/seller_profile.php"
        });
    });
}


function logOut() {
    currentlySignedInUser = null;
    localStorage.setItem("currentlySignedInUser", JSON.stringify(currentlySignedInUser));
    window.location.href = "index.php";
}

function popupEditSellerProfileUpdateButtonFunction() {
    popupEditSellerProfileUsername = document.getElementById("popup-edit-seller-profile-username").value;
    popupEditSellerProfileContactNumber = document.getElementById("popup-edit-seller-profile-contact-number").value;
    popupEditSellerProfileKitchenContactNumber = document.getElementById("popup-edit-seller-profile-kitchen-contact-number").value;
    popupEditSellerProfileBusinessHours1 = document.getElementById("popup-edit-seller-profile-business-hours-1").value;
    popupEditSellerProfileBusinessHours2 = document.getElementById("popup-edit-seller-profile-business-hours-2").value;
    popupEditSellerProfilePassword = document.getElementById("popup-edit-seller-profile-password").value;
    popupEditSellerProfileConfirmPassword = document.getElementById("popup-edit-seller-profile-confirm-password").value;

    if (popupEditSellerProfileUsername == "") {
        showFailure("Username is empty!")
    } else {
        if (popupEditSellerProfileContactNumber == "") {
            showFailure("Contact Number is empty!")
        } else {
            if (isNaN(popupEditSellerProfileContactNumber) == true) {
                showFailure("Contact Number must be a number!")
            } else {
                if (popupEditSellerProfileKitchenContactNumber == "") {
                    showFailure("Kitchen Contact Number is empty!")
                } else {
                    if (isNaN(popupEditSellerProfileKitchenContactNumber) == true) {
                        showFailure("Kitchen Contact Number must be a number!")
                    } else {
                        if (popupEditSellerProfileBusinessHours1 == "") {
                            showFailure("Kitchen Opening Hours is empty!")
                        } else {
                            if (popupEditSellerProfileBusinessHours2 == "") {
                                showFailure("Kitchen Closing Hours is empty!")
                            } else {
                                if (popupEditSellerProfilePassword == "") {
                                    showFailure("Password is empty!")
                                } else {
                                    if (popupEditSellerProfilePassword.length < 6) {
                                        showFailure("Password must have minimum 6 characters!")
                                    } else {
                                        if (popupEditSellerProfileConfirmPassword == "") {
                                            showFailure("Confirm Password is empty!")
                                        } else {
                                            if (popupEditSellerProfilePassword != popupEditSellerProfileConfirmPassword) {
                                                showFailure("Password and Confirm Password are different!")
                                            } else {
                                                popupEditSellerProfileAllConditionsMet();
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
    }
}

function popupEditSellerProfileAllConditionsMet() {
    if (typeof (Storage) !== "undefined") {
        // Save to "currentlySignedInUser"
        var currentUsersDB = JSON.parse(localStorage.getItem("currentlySignedInUser"));

        currentUsersDB.username = popupEditSellerProfileUsername;
        currentUsersDB.contactNumber = popupEditSellerProfileContactNumber;
        currentUsersDB.password = popupEditSellerProfilePassword;

        localStorage.setItem("currentlySignedInUser", JSON.stringify(currentUsersDB));

        // Save to "users"
        var usersDB = JSON.parse(localStorage.getItem("users"));

        for (var i = 0; i < usersDB.length; i++) {
            var item = usersDB[i].userId;

            if (item == currentlySignedInUser.userId) {
                usersDB[i].username = popupEditSellerProfileUsername;
                usersDB[i].contactNumber = popupEditSellerProfileContactNumber;
                usersDB[i].password = popupEditSellerProfilePassword;

                localStorage.setItem("users", JSON.stringify(usersDB));

                break;
            }
        }

        // Save to "sellers"
        var sellersDB = JSON.parse(localStorage.getItem("sellers"));

        for (var i = 0; i < sellersDB.length; i++) {
            var item = sellersDB[i].sellerId;

            if (item == currentlySignedInUser.sellerId) {
                sellersDB[i].time = popupEditSellerProfileBusinessHours1 + " to " + popupEditSellerProfileBusinessHours2;

                localStorage.setItem("sellers", JSON.stringify(sellersDB));

                break;
            }
        }

        showSuccess("Seller Account Details Saved!")
    } else {
        showFailure("Your browser does not support Frese")
    }

    $.mobile.back(); // Close popup
}

function popupEditAddressUpdateButtonFunction() {

}

function getPaypal() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("code");

    if (c != null) {
        const userAction = async () => {
            var formBody = new FormData();
            formBody.set("grant_type", "authorization_code");
            formBody.set("code", c);

            const response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
                method: 'POST',
                body: 'grant_type=authorization_code&code=' + c, // string or object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic QWJIX0pubWk3a1NyODlUTmtWeHpVa2lJYzhMMUoyMnRCZHFTcW1PdHNmZjdGdjNSMGNEalhfY2VMOUNVV1lmOGJpYXFEdV8yaFFLMV9EMVQ6RUtWcGlJRS1YRzhMRW9FUnpreUs4SXJwU1Q2R3laLVpKWkM2eW1saUI4Z1dkdE45NTY4ZlBKTGlMa2d2MTFkNUhKeURFbHhQWGRlRDNRUVM='
                }
            });
            const myJson = await response.json(); //extract JSON from the http response
            const accessToken = myJson.access_token;
            console.log(myJson);

            const response2 = await fetch('https://api.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=paypalv1.1', {
                method: 'GET',
                headers: {
                    'Content-Type': ' application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            const myJson2 = await response2.json();
            userPaypalEmail = myJson2.emails[0].value;
            console.log(userPaypalEmail);

            $.each(sellers, function (key, item) {
                if (item.sellerId == currentlySignedInUser.sellerId) {
                    sellers[key].paymentMethod.email = userPaypalEmail;
                    localStorage.setItem('sellers', JSON.stringify(sellers));
                    $('#popup-edit-payment-method-link').click();
                    $('#popup-edit-payment-method-email-address').val(userPaypalEmail);
                    console.log(sellers);
                }
            });
        };
        userAction().then(r => { });
    }

}
