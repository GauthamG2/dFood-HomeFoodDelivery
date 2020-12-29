window.onload = () => {
    let method = 'dynamic';
    console.log('hello');
    // if you want to statically add places, de-comment following line:
    method = 'static';
    if (method === 'static') {
        let places = JSON.parse(localStorage.getItem('places'));
        return renderPlaces(places);
    }
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    return navigator.geolocation.getCurrentPosition(function (position) {
        places.forEach((place) => {
            console.log(place);
            let latitude = place.location.lat;
            let longitude = place.location.lng;

            // add place name
            let text = document.createElement('a-link');
            text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            text.setAttribute('title', place.name);
            text.setAttribute('href', 'http://www.example.com/');
            text.setAttribute('scale', '15 15 15');

            text.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(text);
        });
    });
}