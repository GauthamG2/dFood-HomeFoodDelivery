 $(document).readyState(function() {});

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


 //  function addToCart() {
 //      var database = firebase.database();
 //      console.log("Add to cart")

 //      var itemName = $('#itemName').text();
 //      var itemPrice = $('#iitemPrice').text();
 //      var itemQuantity = $('#number').val();

 //      debugger
 //      console.log(itemPrice)
 //      console.log(itemName)
 //      console.log(itemQuantity)
 //      var itemId;
 //      var itemObj = {};

 //      firebase.database().ref('foodItem').push({
 //          itemName: itemName,
 //          itemPrice: itemPrice,
 //          itemQuantity: itemQuantity,

 //      }).then(pushed_item => {
 //          itemId = pushed_item.path.pieces_[1];
 //          console.log(pushed_item.path.pieces_[1]);
 //          itemObj = {
 //              id: itemId,
 //              itemName: itemName,
 //              itemPrice: itemPrice,
 //              itemQuantity: itemQuantity,

 //          }

 //          sessionStorage.setItem('itemobj', JSON.stringify(itemObj));
 //          //  sessionStorage.setItem('cart', JSON.stringify(cart));
 //          console.log(sessionStorage.getItem('itemobj'));
 //      }, (error) => {
 //          if (error) {
 //              console.log("Failed")
 //          } else {
 //              console.log("Success")
 //          }
 //      });
 //  }


 function addToCart(id) {
     var x = 0;
     cart = JSON.parse(sessionStorage.getItem('cart'));
     foodId = JSON.parse(sessionStorage.getItem('foodId'));
     fooditem.forEach(function(item) {
         if (item.id == id) {
             items = {
                 foodId: item.id,
                 foodName: item.name,
                 price: item.price,
                 quantity: item.quantity,
                 totalPrice: 0
             }
             cart.push(items);
         }
     })
     console.log(cart);
     sessionStorage.setItem('cart', JSON.stringify(cart));
     console.log(sessionStorage);

 }