//Housekeeping
var openWeatherAPI = "73ae999c41edfcbe7e963963ee76ff49";
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");

//  FIREBALL API    https://ssd-api.jpl.nasa.gov/fireball.api

//added function to retreive lat and lon information from api data
function getCityGeoData() {
    var city = searchInput.value;
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=73ae999c41edfcbe7e963963ee76ff49' )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
                var lat = data[0].lat;
                console.log(lat);
                var lon = data[0].lon;
                console.log(lon);
        });
    }

function getFireballData() {
    fetch('https://ssd-api.jpl.nasa.gov/fireball.api?req-loc=true')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

// script example for map
// var map = L.map('map', {
//     center: [51.505, -0.09],
//     zoom: 13
// });
// undefined
// script example to calculate distance
// map
// e {options: {…}, _handlers: Array(7), _layers: {…}, _zoomBoundLayers: {…}, _sizeChanged: false, …}
// map.distance({lat: -9.4, lng: 17.4}, {lat: 0, lng: 0});
// 2191363.956095504
// map.distance({lat: -9.4, lng: 17.4}, {lat: 41.878113, lng: -87.629799});
// 11945516.868386751

        const item = data.data.map(function(item) {
            var [dt,,,latitude,latDir, longitude, lonDir] = item;
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
            return { lat, lng }
        });

        console.log('ITEM', item);
    });

    [0][5]
};
//added event listener to search button to run getCityGeoData function
    searchButton.addEventListener('click', function(event) {
        event.preventDefault()
        //getCityGeoData();
        getFireballData();
       });