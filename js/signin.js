var userExists = false;
var firebaseConfig = {
    apiKey: "AIzaSyCaz3jxfddaasAJLueb9lP9qfUblutlWHY",
    authDomain: "dfood-6b02c.firebaseapp.com",
    projectId: "dfood-6b02c",
    storageBucket: "dfood-6b02c.appspot.com",
    messagingSenderId: "414378093119",
    appId: "1:414378093119:web:db24e2caa44942abc8268a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var users = [];
var chats = [];

$(document).ready(function() {
    console.log(sessionStorage);
    firebase.database().ref('users/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData);
            var item = {
                key: childSnapshot.key,
                email: childData.email,
                phonenumber: childData.phonenumber,
                fullName: childData.fullName,
                password: childData.password,
                // favourites: childData.favourites
            }
            users.push(item);
        })
        console.log(users);
        // repeat();
    })
});

function login() {
    debugger
    cart = [];
    var email = $('#email').val();
    var password = $('#password').val();
    var loyaltyPoints = 0;
    var loyaltyPointsArray = [];

    if (!email || email.trim() === '') {
        toastr.warning('Please Enter Email', 'Warning');
    } else if (!password || password === '') {
        toastr.warning('Please Enter Password', 'Warning');
    } else {
        users.forEach(function(user) {
            if (user.email == email && user.password == password) {
                console.log(user)
                userObj = {
                    id: user.key,
                    fullName: user.fullName,
                    phonenumber: user.phonenumber,
                    email: user.email,
                    profilePic: ''
                }

                // userObj['favourites'] = user.favourites
                // sessionStorage.setItem('userobj', JSON.stringify(userObj));
                // sessionStorage.setItem('cart', JSON.stringify(cart));
                // sessionStorage.setItem('chats', JSON.stringify(chats));
                // sessionStorage.setItem('loyaltyPoints', JSON.stringify(loyaltyPoints));
                // sessionStorage.setItem('loyaltyPointsArray', JSON.stringify(loyaltyPointsArray));
                console.log(sessionStorage.getItem('userobj'));
                document.location.href = "./home.html";
            } else {
                userExists = true
            }
        });
        if (userExists == true) {
            toastr.error('User Does Not Exist', 'Error');
            userExists = false;
        }
    }
}