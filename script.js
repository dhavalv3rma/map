
// Init Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBY7di1IRJOypSd0P2CpIb1PQYZnw-iUhA",
  authDomain: "dilate-maps.firebaseapp.com",
  databaseURL: "https://dilate-maps-default-rtdb.firebaseio.com",
  projectId: "dilate-maps",
  storageBucket: "dilate-maps.appspot.com",
  messagingSenderId: "460081151258",
  appId: "1:460081151258:web:20effde8e1f168fca0c0a3",
  measurementId: "G-JMY3H48LGR"
};
firebase.initializeApp(firebaseConfig);

// // Initialize Firebase Writing
// var database = firebase.database();
// var playersRef = firebase.database().ref("data/");
 
// playersRef.set ({
//   features,
//   icons
// });

var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
   var userData = snapshot.val();
  var features = userData.data.features;
  var icons = userData.data.icons;


// update firebase
// var johnRef = firebase.database().ref("players/John");
// johnRef.update ({
//    "number": 10
// });

//########################################################## Map and Dom 

// Map Initialisation 
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(12.1701436, 97.5931023),
    zoom: 3,
  });

  const markers = features.map((feature) => {
    const marker = new google.maps.Marker({
      position: { lat: feature.lat, lng: feature.lng },
      title: feature.name,
      icon: icons[feature.type].icon,
      country: feature.country,
      map: map,
    });

    // Create/interact InfoWindow
    const infowindow = new google.maps.InfoWindow({
      content:
        "<p class='name'>" +
        feature.name +
        "</p>" +
        "<p class='role'>" +
        feature.role +
        "</p>",
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
      setTimeout(() => {
        infowindow.close(map, marker);
      }, 1000);
    });

    return marker;
  });

  // Clustering pins
  const imagePath = "./clusters/m";
  const markerClusterer = new MarkerClusterer(map, markers, {
    imagePath: imagePath,
    textColor: "#ffffff",
  });
}
initMap();

// Fetching and seeding countries in
var countries = [];
for (var i = 0, j = features.length; i < j; i++) {
  if (features[i].country != null ) {
    countries.push(features[i].country)
  }
};

function allCountries(array){
  var country = [];

  // pushing unique country to dom
  for(i=0; i < array.length; i++){
      if(country.indexOf(array[i]) === -1) {
          country.push(array[i]);
      }
  }

  for(i=0; i < country.length; i++){
    $(".countries").append(`<div class="accordion `+ country[i] +` ">
    <h4>`+ country[i] + `</h4> :<span class="count"> </span>
  </div>
  <div class="panel">
  </div>`);
  }  
}
allCountries(countries);


// Accordion
$(document).ready(function () {
  var panels = $(".countries > .panel").hide();
  $(".accordion").click(function () {
    panels.slideUp();
    $(this).next().slideDown();
    return false;
  });
});

var x = 0,
  y = 0,
  z = 0,
  p = 0;
for (var i = 0, j = features.length; i < j; i++) {
  if (features[i].country != null && features[i].country == "Australia") {
    $(".Australia .count").html(` `+ ++x);
    $(".Australia").next().append("<p>" + features[i].name + "</p>");
  } else if (features[i].country != null && features[i].country == "India") {
    $(".India .count").html(` `+ ++y);
    $(".India").next().append("<p>" + features[i].name + "</p>");
  } else if (features[i].country != null && features[i].country == "Philippines") {
    $(".Philippines .count").html(` `+ ++z);
    $(".Philippines").next().append("<p>" + features[i].name + "</p>");
  } else if (features[i].country != null && features[i].country == "Pakistan") {
    $(".Pakistan .count").html(` `+ ++p);
    $(".Pakistan").next().append("<p>" + features[i].name + "</p>");
  }
};

}, function (error) {
  console.log("Error: " + error.code);
});
