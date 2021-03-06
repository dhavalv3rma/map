
// @########################################################### loading screen
$(window).on("load", function () {
  $(".loader-container").fadeOut("slow");
  $("#map").removeClass("hide");
});

// ############################################################ Handling Data-set

// Initialize Firebase Writing
var database = firebase.database();
var usersRef = database.ref();
// usersRef.set({
// features,
// icons
// });

var ref = database.ref();

ref.on(
  "value",
  function (snapshot) {
    var user = snapshot.val();
    var features = user.features.filter(function (el) {
      return el != null;
    });
    
    var icons = user.icons;

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

    // Fetching and seeding countries in
    var countries = [];
    for (var i = 0, j = features.length; i < j; i++) {
      if (features[i].country != null) {
        countries.push(features[i].country);
      }
    }

    function allCountries(array) {
      var country = [];

      // pushing unique country to dom
      for (i = 0; i < array.length; i++) {
        if (country.indexOf(array[i]) === -1) {
          country.push(array[i]);
        }
      }

      for (i = 0; i < country.length; i++) {
        $(".countries").append(
          `<div class="accordion ` +
            country[i] +
            `"><h4>` +
            country[i] +
            `</h4> :<span class="count"> </span></div><div class="panel"></div>`
        );
      }
    }
    allCountries(countries);

    var x = 0,
      y = 0,
      z = 0,
      p = 0;
    for (var i = 0, j = features.length; i < j; i++) {
      if (features[i].country != null && features[i].country == "Australia") {
        $(".Australia .count").html(` ` + ++x);
        $(".Australia")
          .next()
          .append("<p>" + features[i].name + "</p>");
      } else if (
        features[i].country != null &&
        features[i].country == "India"
      ) {
        $(".India .count").html(` ` + ++y);
        $(".India")
          .next()
          .append("<p>" + features[i].name + "</p>");
      } else if (
        features[i].country != null &&
        features[i].country == "Philippines"
      ) {
        $(".Philippines .count").html(` ` + ++z);
        $(".Philippines")
          .next()
          .append("<p>" + features[i].name + "</p>");
      } else if (
        features[i].country != null &&
        features[i].country == "Pakistan"
      ) {
        $(".Pakistan .count").html(` ` + ++p);
        $(".Pakistan")
          .next()
          .append("<p>" + features[i].name + "</p>");
      }
    }

    // Accordion Init
    $(document).ready(function () {
      var panels = $(".countries > .panel").hide();
      $(".accordion").click(function () {
        panels.slideUp();
        $(this).next().slideDown();
        return false;
      });
    });

    initMap();
  },

  function (error) {
    console.log("Error: " + error.code);
  }
);
