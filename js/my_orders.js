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




$(document).ready(function () {

  /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function () {
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function (e) {
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });

  }).on('mouseout', function () {
    $(this).parent().children('li.star').each(function (e) {
      $(this).removeClass('hover');
    });
  });


  /* 2. Action to perform on click */
  $('#stars li').on('click', function () {
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }

    // JUST RESPONSE (Not needed)
    ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    var msg = "";
    console.log(ratingValue, "rating value");
    if (ratingValue > 1) {
      msg = "Thanks! You rated this " + ratingValue + " stars.";
    }
    else {
      msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
    }
    responseMessage(msg);
  });





});



function writeUserData() {
  var database = firebase.database();
  var userObj = sessionStorage.getItem('userobj');
  console.log(ratingValue, "rating value")
  var user_cmt = $('#user_comment').val();

  console.log(user_cmt, "user comment")



  // var vendor_cmt = $('#vendor_comment').val();
  // console.log(vendor_cmt, "vendor comment")


  var foodItemID = '-MQIVU18l9mKwEdlWQ3I';
  firebase.database().ref('Vendors/' + 1).child('foodItem/' + foodItemID).child('reviews').push({
    // name: 'Melt House',
    rating: ratingValue,
    review: user_cmt,
    reviewResponse: '',
    date: '20/20/20',
    userObj: {
      name: 'Leesha'
    }
  }, (error) => {
    if (error) {
      console.log("Push to firebase failed!")
    } else {
      console.log("pushed to firebase succesfully!");
    }
  });


  // firebase.database().ref('customer/').push({
  // name: 'Sarah',
  // dob: '7/8/2019',




  // })



}