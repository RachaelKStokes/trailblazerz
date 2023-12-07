//Housekeeping
var openWeatherAPI = "73ae999c41edfcbe7e963963ee76ff49";
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
});
var storedFireballData;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// created functin to calculate distance 
// added code for map
function calcDistance(fireballs, city) {
  
    for (var fireball of fireballs) {
        console.log("1");
        var distance = map.distance(fireball, city);
        console.log(distance);
    }
    map.panTo(new L.LatLng(city.lat, city.lng));
};


// rearranged and simplified existing code and continued work on distance calculators

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

function mapFireballData(data) {
    return data.map(function (item) {
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
         // var marker = L.marker([city.lat, city.lng]).update(marker);
        return { lat, lng };
    });
}

function getFireballData(cityLatLon) {
    if (storedFireballData) {
        return calcDistance(storedFireballData, cityLatLon);
    }
    fetch('https://www.anthonycooper.me/nasa')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const fireballs = mapFireballData(data.data);
            storedFireballData = fireballs;
            calcDistance(storedFireballData, cityLatLon);
        });
};
//added event listener to search button to run getCityGeoData function
searchButton.addEventListener('click', function (event) {
    event.preventDefault()
    getCityGeoData();
});