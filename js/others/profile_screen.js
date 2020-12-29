
var currentlySignedInUser;
var users;
$(document).on("pageinit", function () {
    currentlySignedInUser = JSON.parse(localStorage.getItem('currentlySignedInUser'));
    populateUserFields();
    $("#nav_bar_profile").addClass("ui-btn-active");
    users = JSON.parse(localStorage.getItem('users'));
    if (currentlySignedInUser.sellerId != null) {
        $("#switchSellerBtn").css('display', 'block')

        $("#createSellerBtn").css('display', 'none')

    } else {
        $("#switchSellerBtn").css('display', 'none')
        $("#createSellerBtn").css('display', 'block')


    }
});

function showProfileMethod() {
    $("#popupBasic").popup("open");
    $("#nameForm").val(currentlySignedInUser.username);
    $("#contactNumberForm").val(currentlySignedInUser.contactNumber);
}

function sendFeedback() {
    showSuccess("Thanks for the Feedback");
    $("#feedbackPopup").popup("close");

}

function closeFeedbackPopup() {
    $("#feedbackPopup").popup("close");

}

function showFeedbackPopup() {
    $("#feedbackPopup").popup("open");

}

function populateUserFields() {
    $("#profile_username_field").html("<b class='bold'>Profile | </b>" + currentlySignedInUser.username);
    $("#profile_current_points_field").html("<b class='bold'>Current Points | </b> " + currentlySignedInUser.currentPoints);
    $("#profile_favourites_field").html("<h4 style='margin: 0px;' class='bold'><b class='bold'>Favourites List</b></h4>");
    console.log(currentlySignedInUser.favouritesList);
    $.each(currentlySignedInUser.favouritesList, function (key, val) {
        console.log(val)
        $(".profile_favourite_list").append("<h5 style='margin: 5px;' class='thin blue'><a id='" + val.sellerId + "' onclick='favouritesListClick(this.id)'>" + val.kitchenName + "</a> </h5>");
    });
}

function closeProfileInformation() {
    $('#popupBasic').popup('close');
}

function closeFavoritesList() {
    $('#emailPopup').popup('close');
}


function saveProfileInformation() {
    var previousNumber = currentlySignedInUser.contactNumber;

    var name = $("#nameForm").val();
    var phoneNumber = $("#contactNumberForm").val();
    var password = $("#passwordForm").val()
    var confirmPassword = $("#confirmPasswordForm").val();
    if (name) {
        console.log("Set Name: " + name)
        currentlySignedInUser.username = name;
    }
    if (phoneNumber) {
        console.log("Set Phone: " + phoneNumber)
        currentlySignedInUser.contactNumber = phoneNumber;
    }

    if (password) {
        if (password === confirmPassword) {
            currentlySignedInUser.password = password;
        } else {
            showFailure("Passwords are invalid.")
            return;
        }
    }
    console.log(currentlySignedInUser);

    var users = JSON.parse(localStorage.getItem('users'));
    $.each(users, function (key, user) {
        if (user.contactNumber === previousNumber) {
            users[key] = currentlySignedInUser;
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentlySignedInUser", JSON.stringify(currentlySignedInUser));

    $("#popupBasic").popup("close");
    showSuccess("Updated your info.")
    setTimeout(function () {
        location.reload()
    }, 2000);

}

function favouritesListClick(id) {
    console.log(id);
    localStorage.setItem("clickedSellerId", id);
    window.location = "kitchen_screen.php";
}

function showEmailPopup() {
    $('#emailPopup').popup('open');
}

function closeEmailPopup() {
    $('#emailPopup').popup('close');
}
function sendEmail() {
    var email = $("#emailFormShare").val();
    $("#sendBtn").html('Sending....')
    var favourites = "Hey, here are my favourite kitchens on FRESE.\nCheck them out:\n";
    $.each(currentlySignedInUser.favouritesList, function (key, item) {
        favourites += item.kitchenName + ",\n"
    });
    jQuery.ajax({
        type: "POST",
        url: 'php/send_mail_script.php',
        data: { email: email, list: favourites },
        dataType: "json",
        complete: function (response) {
            console.log("done")
            $("#sendBtn").html('Send')
            showSuccess("Favourites Sent")
            closeEmailPopup();

        },
    }
    )
}


function logOut() {
    currentlySignedInUser = null;
    localStorage.setItem("currentlySignedInUser", JSON.stringify(currentlySignedInUser));
    window.location = "index.php";
}