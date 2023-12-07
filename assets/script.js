//Housekeeping
var openWeatherAPI = "73ae999c41edfcbe7e963963ee76ff49";
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");

// created functin to calculate distance 
// added code for map
function calcDistance(fireballs, city) {
    var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    
    for (var fireball of fireballs) {
        var distance = map.distance(fireball, city);
        console.log(distance);
    }
};


//  FIREBALL API    https://ssd-api.jpl.nasa.gov/fireball.api

//added function to retreive lat and lon information from api data
function getCityGeoData() {
    var city = searchInput.value;
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=73ae999c41edfcbe7e963963ee76ff49')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var latCity = data[0].lat;
            console.log(latCity);
            var lonCity = data[0].lon;
            console.log(lonCity);
            getFireballData({
                lat: data[0].lat,
                lng: data[0].lon,
            });
        });
}

function getFireballData(cityLatLon) {
    fetch('https://www.anthonycooper.me/nasa')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const fireballs = data.data.map(function (item) {
                var [dt, , , latitude, latDir, longitude, lonDir] = item;
                var lng = Number(longitude);
                var lat = Number(latitude);
                if (latDir === 'S') {
                    lat = lat * -1;
                }
                if (lonDir === 'W') {
                    lng = lng * -1;
                }
                console.log('DATE', dt);
                console.log('LAT', lat);
                console.log('LON', lng);
                return { lat, lng };
            });

            calcDistance(fireballs, cityLatLon);
        });
};
//added event listener to search button to run getCityGeoData function
searchButton.addEventListener('click', function (event) {
    event.preventDefault()
    getCityGeoData();
});