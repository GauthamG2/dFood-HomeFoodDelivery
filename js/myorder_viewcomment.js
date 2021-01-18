var reviews = [];


$(document).ready(function() {

    var foodItemID = '-MQIVU18l9mKwEdlWQ3I';
    firebase.database().ref('Vendors/' + 1).child('foodItem/' + foodItemID).child('reviews').once('value', function(snapshot) {
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
        reviews.forEach(function(item) {
            rendorHtml += `
        <div id="FR" style="margin-top: 10px;" >
        <div> 
				<div id="ordered-food-image-container" style="display:inline-block; vertical-align:top">
					<img id="image" src="../images/Food_Images/1_Fruit_Pancake.jpg">
				</div>
					<div style="display:inline-block; margin: 15px 0 0 15px;">
					<h4 style="margin: auto"> Your order in Momo </h4>
					<p style="margin: 5px auto 0 auto;"> Ordered on 05/07/2020 <br> LKR 2,340.00 </p>
					</div>
					
			</div>	
        
      
        <p style=" margin: 10px auto 0 auto;"> ${item.review}</p>
        </div>
      `

        })

        $('#repeat').append(rendorHtml);
    }

}