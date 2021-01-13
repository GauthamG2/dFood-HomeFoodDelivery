


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


var reviews = [];


$(document).ready(function () {

  var foodItemID = '-MQIVU18l9mKwEdlWQ3I';
  firebase.database().ref('Vendors/' + 1).child('foodItem/' + foodItemID).child('reviews').once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      //   var childData = childSnapshot.val();

      //   console.log(childData);
      // reviews.push(childData);
      var item = {
        key: childSnapshot.key,
        date: childData.date,
        rating: childData.rating,
        review: childData.review,
        reviewResponse: childData.reviewResponse,
        userObj: {
          name: childData.userObj.name
          //   profilepicLink: childData.userobj.profilepicLink
        }
      }
      reviews.push(item);
    })
    console.log(reviews);
    repeat();
  })


});


function repeat() {

  var rendorHtml = "";
  if (reviews.length > 0) {
    reviews.forEach(function (item) {
      rendorHtml += `

		
					 
              <div>
              
              
              <p style="float:left; margin: auto; font-size: 17px; font-weight:bold"> ${item.userObj.name}</p>
              <span class="stars-container stars-${item.rating}" style="font-size:1.2em; float: right"> ★★★★★ </span>
          </div>
<br> 					
							<p style="margin-top:7px;"> ${item.review} </p>
							<input type="text" name="comment" id="vendor_response-${item.key}"  style="
                            border: 2px solid #FB752C !important; 
                            border-radius:8px; margin: auto auto auto 10px; 
                            padding: 4px;
                            width:80%" placeholder="Add reply" required> 
                           
                            <a onclick="writeVendorData('${item.key}')" style="margin: auto 5px  ;"> 
                            <img src="../images/icons/Icon ionic-ios-add-circle.png"  class="ui-li-icon ui-corner-none" >  </a> 
                        <hr style="  height:2px; border-width:0; background-color:#FB752C; margin: 20px auto;">
                        

                        
                  `

    })

    $('#repeat').append(rendorHtml);
  }

}


function writeVendorData(id) {
  console.log(id)
  var database = firebase.database();
  var userObj = sessionStorage.getItem('userobj');

  var vendor_cmt = $(`#vendor_response-${id}`).val();
  console.log(vendor_cmt, "vendor comment")



  var foodItemID = '-MQIVU18l9mKwEdlWQ3I';


  firebase.database().ref('Vendors/' + 1).child('foodItem/' + foodItemID).child('reviews/' + id).update({
  
    reviewResponse: vendor_cmt,
  }
    , (error) => {
      if (error) {
        console.log("Push to firebase failed!")
      } else {
        console.log("pushed to firebase succesfully!");
      }
    });





}