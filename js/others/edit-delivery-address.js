var currentAddress = ""
var markers = []
var element = document.getElementById("map");
var defaultLatLng;
var geocoder;
var map;
var marker;
var infowindow;
var ad;
var users;
var currentlySignedInUser;


const ADDRESS_STATUS_CODE = Object.freeze({
    OK: { status: 'ok', message: 'Pointer placed successfully' },
    NOT_FOUND: { status: 'Not Found', message: 'Address Not Found.' },
    ERROR: { status: 'Error', message: 'Please try again later.' }
});

var markerLocation = { lat: 0, long: 0 };


$(document).on("pageinit", "#edit_address_screen", function () {
    console.log("Initializing")
    users = JSON.parse(localStorage.getItem('users'));
    currentlySignedInUser = JSON.parse(localStorage.getItem('currentlySignedInUser'));
    console.log(currentlySignedInUser)
    //currentAddress = currentlySignedInUser.address;

    geocoder = new google.maps.Geocoder();
    getCurrentAddress().then(function (result) {
        mapInit(result);
        placeMarker(result, "Current Location")

        google.maps.event.addListener(map, 'click', function (e) {
            var latLng = e['latLng'];
            console.log(e);
            getNameFromLatLng(latLng).then(function (result, status) {
                console.log(result.title);
                placeMarker(result.location, result.title);
                currentAddress = result.title;

                $("#txtaddress").val(currentAddress);
            });

        });
    });




});

function mapInit(centerLoc) {
    console.log(centerLoc)
    var options = {
        center: centerLoc,
        zoom: 10,
        backgroundColor: '#fffff',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
    };
    map = new google.maps.Map(document.getElementById("map"), options);
}

async function getCurrentAddress() {
    let promise = new Promise(function (reslove, reject) {
        navigator.geolocation.getCurrentPosition(function success(pos) {
            var latLongLoc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            console.log(latLongLoc.promiseValue)
            reslove(latLongLoc)
        }, function fail(error) {
            reject(error);
        }, { maximumAge: 500000, enableHighAccuracy: true, timeout: 6000 }
        );
    });
    return promise;
}

async function getNameFromLatLng(latLng) {
    let promise = new Promise(function (reslove, reject) {
        geocoder.geocode({ latLng: latLng }, function (result, status) {
            if (status === "OK") {
                reslove({ "location": result[0].geometry.location, "title": result[0].formatted_address })
            } else {
                reject(status);
            }
        });
    });
    return promise;
}

function placeMarker(latLng, text) {
    // Checks for previous markers and remove the markers from the map if exists
    if (marker != null) {
        marker.setMap(null);
    }
    console.log("Placing")

    marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.BOUNCE,
    });
    marker.setMap(map); // place the marker on app

    infowindow = new google.maps.InfoWindow({
        content: "<div style='float:left;border-radius:20px;height: 40px; width:40px;overflow:hidden'>" +
            "<img src='https://www.rawsonhomes.com.au/-/media/rawson-homes/home-designs/balmoral/facades/balmoral-hero-8-5.ashx?h=452&w=723&la=en&hash=AF8E5A7EE9B8D3C24844A70BFE2AD4FD' " +
            "style='height: 40px; width:40px;'></div><div style='float:right; padding: 10px;'>" + text + "</div>"
    });
    infowindow.open(map, marker);

    markerLocation = {
        lat: marker.getPosition().lat(),
        long: marker.getPosition().lng()
    }


    map.panTo(latLng)
    stopAnimation();
}

function stopAnimation() {
    setTimeout(function () {
        marker.setAnimation(null);
    }, 5000);
}

async function getLngLatFromAddress(address) {
    let promise = new Promise(function (reslove, reject) {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                console.log(results)
                reslove({ "location": results[0].geometry.location, "title": results[0].formatted_address })
            } else if (status === 'ZERO_RESULTS') {
                console.log(ADDRESS_STATUS_CODE.NOT_FOUND.message);
                reject();
            } else {
                console.log(ADDRESS_STATUS_CODE.ERROR.message);
                reject(status);
            }
        });
    })
    return promise;
}

function saveAddress() {
    if (currentAddress == "") {
        showFailure("Enter a delivery address.")
    } else {
        $.each(users, function (key, user) {
            if (user.contactNumber === currentlySignedInUser.contactNumber) {
                currentlySignedInUser.address = currentAddress;
                console.log(currentAddress);
            }
        });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentlySignedInUser", JSON.stringify(currentlySignedInUser));
        console.log("Saved users details");
        console.log(currentlySignedInUser)
        showSuccess("Saved Address")
        setTimeout(function () {
            $.mobile.back();
        }, 2000);
    }
}

function searchAddressFromText() {
    var address = $("#txtaddress").val();
    console.log(address);
    if (address != "") {
        getLngLatFromAddress(address).then(function (results) {
            if (results != null) {
                placeMarker(results.location, results.title);
                currentAddress = results.title;
                $("#location_text").val(currentAddress);
            } else {
                console.log("results are null")
            }
        }, function () {
            $("#location_text").text("Location could not be found, try again.");
        });
    } else {
        $("#location_text").text("Enter an address to search");
    }
}

// Seller profile
function saveKitchenAddress() {
    if (typeof (Storage) !== "undefined") {
        var currentUsersDB = JSON.parse(localStorage.getItem("currentlySignedInUser"));

        // Save to "sellers"
        var sellersDB = JSON.parse(localStorage.getItem("sellers"));

        for (var i = 0; i < sellersDB.length; i++) {
            var item = sellersDB[i].sellerId;

            if (item == currentUsersDB.sellerId) {
                sellersDB[i].location.addressName = currentAddress;
                sellersDB[i].location.latLocation = markerLocation.lat;
                sellersDB[i].location.longLocation = markerLocation.long;

                localStorage.setItem("sellers", JSON.stringify(sellersDB));

                break;
            }
        }

        showSuccess("Saved");
        setTimeout(function () {
            window.location = "seller_profile.php";
        }, 2000);
    } else {
        showFailure("Your browser does not support Frese.")
    }
}
