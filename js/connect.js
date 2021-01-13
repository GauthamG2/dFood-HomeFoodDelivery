 // Your web app's Firebase configuration
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


 function signUp() {
     var database = firebase.database();
     console.log("Sign Up")

     var fullName = $('#full_name').val();
     var phonenumber = $('#phonenumber').val();
     var email = $('#email').val();
     var birthday = $('#birthday').val();
     var password = $('#password').val();
     var profileImage = $('#ProfileImage').val();
     var password_confirm = $('#password_confirm').val();
     var userId;
     var userObj = {};

     firebase.database().ref('users/').push({
         fullName: fullName,
         phonenumber: phonenumber,
         email: email,
         birthday: birthday,
         password: password,


     }).then(pushed_user => {
         userId = pushed_user.path.pieces_[1];
         console.log(pushed_user.path.pieces_[1]);
         userObj = {
             id: userId,
             fullName: fullName,
             phonenumber: phonenumber,
             birthday: birthday,
             email: email,

         }

         window.location.href = "signin.html";

         sessionStorage.setItem('userobj', JSON.stringify(userObj));
         sessionStorage.setItem('cart', JSON.stringify(cart));
         console.log(sessionStorage.getItem('userobj'));

     }, (error) => {
         if (error) {
             console.log("Push to firebase failed!")
         } else {
             console.log("pushed to firebase succesfully!");
         }
     });
 }