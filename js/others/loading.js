let sellerArray;
window.onload = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
         staticLoadPlaces(position).then(r => {
             localStorage.setItem('places', JSON.stringify(sellerArray));
             window.location.replace('ar-screen.php');
             console.log(sellerArray);
         });
     });

};

async function staticLoadPlaces(currentPosition) {
    let sellers = JSON.parse(localStorage.getItem('sellers'));
    let radius = 10;
    let currentLat = currentPosition.coords.latitude;
    let currentLong = currentPosition.coords.longitude;
    let distance;
    let sellerLat;
    let sellerLong;
    let placesArray = [

    ];
    console.log('currentlat ' +currentLat);
    console.log('currentlong ' +currentLong);

    console.log(sellers.length);
    for (i=0; i< sellers.length;i++){
        let seller = sellers[i];

        sellerLat = seller.location.latLocation;
        sellerLong = seller.location.longLocation;

        distance = getDistanceFromLatLonInKm(currentLat,currentLong,sellerLat,sellerLong);
        console.log(distance);
        if (distance < radius) {
            console.log('close place');
            placesArray.push(
                {
                    name: seller.kitchenName,
                    location: {
                        lat: sellerLat, // change here latitude if using static data
                        lng: sellerLong, // change here longitude if using static data
                    }
                }
            )
        }
    }

    // sellers.forEach((seller) => {
    //     sellerLat = seller.location.latLocation;
    //     sellerLong = seller.location.longLocation;
    //
    //     distance = getDistanceFromLatLonInKm(currentLat,currentLong,sellerLat,sellerLong);
    //     console.log(distance);
    //     if (distance < radius) {
    //         console.log('close place');
    //         placesArray.push(
    //             {
    //                 name: seller.kitchenName,
    //                 location: {
    //                     lat: sellerLat, // change here latitude if using static data
    //                     lng: sellerLong, // change here longitude if using static data
    //                 }
    //             }
    //         )
    //     }
    // });
    sellerArray = placesArray;
    return placesArray;
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a));
}