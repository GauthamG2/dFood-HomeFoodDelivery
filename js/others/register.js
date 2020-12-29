
function register() {
    var users = JSON.parse(localStorage.getItem('users'));
    var name = document.getElementById("emailForm").value;
    var password = document.getElementById("passwordForm").value;
    var conPassword = document.getElementById("confirmPasswordForm").value;
    var contactNumber = document.getElementById("contactNumber").value;
    if (conPassword !== password) {
        showFailure("Password combinations do not match!");
        document.getElementById("confirmPasswordForm").style.border = "solid 2px red !important";
        document.getElementById("confirmPasswordForm").style.background = "red !important";
        return;
    }
    var currentUser = {
        "username": name,
        "currentPoints": 100,
        "address": "",
        "contactNumber": contactNumber,
        "password": password,
        "favouritesList": [

        ],
        'orders': [
            {
                'id': 1,
                'driverLicense': 'CAQ 1120',
                'driverName': 'Jehan',
                'isComplete': true,
                'orderDate': "12/12/2019",
                'timeLimit': '7',
                'title': "What the Crab",
                'driverTel': '0768043101',
                'total': 132,
                'imageUrl': "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/project%20prism%2Fcolor%20search%20archive%2F2ee0d7a33e80d1667d0c7f4bd262159f8da38333",
                'sellerId': 1,
                'userId': 23,
                'locationLong': 79.911245,
                'locationLat': 7.001704,
            },
        ]

    }
    //localStorage.setItem("users", JSON.stringify([]));
    var users = JSON.parse(localStorage.getItem('users'));
    var isAlreadyRegistered = false;
    if (users == null) {
        users = [];
    } else {
        users.forEach(function (user, index) {
            console.log(user)
            if (user.contactNumber == contactNumber) {
                isAlreadyRegistered = true;
                showFailure("You are already registerd. Try sigining in.");
                setTimeout(function () {
                    goBack();
                }, 2000);
                return;
            }
        })
    }

    if (!isAlreadyRegistered) {
        currentUser.userId = users.length + 1
        users.push(currentUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentlySignedInUser", JSON.stringify(currentUser));
        showSuccess("Registered")
        setTimeout(function () {
            $('#popup-introduction').popup("open");
        }, 2500);
    }

}

function goToApp() {
    window.location.href = "search_screen.php";

}

function goBack() {
    $.mobile.back();
}