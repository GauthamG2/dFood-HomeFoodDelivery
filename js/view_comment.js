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


var reviews=[];


  $(document).ready(function(){

    var foodItemID = '-MQIVU18l9mKwEdlWQ3I';
    firebase.database().ref('Vendors/'+ 1).child('foodItem/'+ foodItemID).child('reviews').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
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
            userObj : {
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


  function repeat(){

var rendorHtml = "";
if(reviews.length>0){
    reviews.forEach(function(item){
        rendorHtml += `



        <div>
            <p style="float:left; margin: auto; font-size: 17px; font-weight:bold"> ${item.userObj.name}</p>
            <span class="stars-container stars-${item.rating}" style="font-size:1.2em; float: right"> ★★★★★ </span>
        </div>
        
        <br> 
        <p style=" margin: 12px auto 0 auto;"> ${item.review} </p>
        <br> 
        <img src="../images/icons/Icon awesome-reply.png"
        style="float: left; margin: 0 10px 0 30px;"> 
        <p style="margin: auto; font-size: 17px; font-weight:bold; color:#FB752C; "> 
        Momo </p> 

        <p style=" margin: 4px 0 0 53px; color:#FB752C; "> ${item.reviewResponse}</p>
        <hr style="  height:1px; border-width:0; background-color:#FB752C;"> 
       </div> `

    })

    $('#repeat').append(rendorHtml);
}

  }