icons = {
  office: {
    icon: "office2.png",
  },

  remote: {
    icon: "dilate.svg",
  },
};

features = [
  {
    name: "Dilate Digital",
    lat: -32.1445111,
    lng: 115.7852891,
    role: "Perth Office",
    type: "office",
  },
  {
    name: "Tanya Dharmapala",
    lat: -32.1437057,
    lng: 115.8663921,
    role: "Account Manager",
    type: "remote",
    country: "Australia",
  },
  {
    name: "Dhaval Verma",
    lat: 28.664852,
    lng: 77.283964,
    role: "Web Developer",
    type: "remote",
    country: "India",
  },
  {
    name: "Jacky Lou",
    lat: 10.3243115,
    lng: 123.8770378,
    role: "SEO Specialist",
    type: "remote",
    country: "Philippines",
  },
  {
    name: "Suruchi Siyal",
    lat: 23.0003876,
    lng: 72.5055815,
    role: "SEO Specialist",
    type: "remote",
    country: "India",
  },
  {
    name: "Lakshmi Narayan Nukala",
    lat: 17.4271067,
    lng: 78.323946,
    role: "SEO Specialist",
    type: "remote",
    country: "India",
  },
  {
    name: "Jaztin Jaurigue",
    lat: 14.227794435849866,
    lng: 121.00187463724178,
    role: "Designer",
    type: "remote",
    country: "Philippines",
  },
  {
    name: "Jestoni Albert Tilbe",
    lat: 14.4725795,
    lng: 121.0201529,
    role: "SEO Specialist",
    type: "remote",
    country: "Philippines",
  },
  {
    name: "Mahesh Vankadara",
    lat: 14.749186,
    lng: 78.553162,
    role: "PPC Specialist",
    type: "remote",
    country: "India",
  },

  {
    name: "Chetan Kamble",
    lat: 22.75672,
    lng: 75.86674,
    role: "xx",
    type: "remote",
    country: "India",
  },
  {
    name: "Glen B",
    lat: 7.13936,
    lng: 125.71884,
    role: "xx",
    type: "remote",
    country: "Philippines",
  },
  {
    name: "John Wallace",
    lat: -31.93195,
    lng: 115.84128,
    role: "xx",
    type: "remote",
    country: "Australia",
  },
  {
    name: "Brendon Crouch",
    lat: -32.01521,
    lng: 115.90641,
    role: "Account Manager",
    type: "remote",
    country: "Australia",
  },
  {
    name: "Kevin",
    lat: -31.94495,
    lng: 115.8565,
    role: "xx",
    type: "remote",
    country: "Australia",
  },
  {
    name: "Swathi Naik",
    lat: 19.29362,
    lng: 72.87148,
    role: "xx",
    type: "remote",
    country: "India",
  },
  {
    name: "Prajakta Dhatrak",
    lat: 19.13702,
    lng: 72.85496,
    role: "xx",
    type: "remote",
    country: "India",
  },
  {
    name: "Pallavi",
    lat: 28.61395,
    lng: 77.03463,
    role: "xx",
    type: "remote",
    country: "India",
  },
  {
    name: "Shivaksh Gunsola",
    lat: 30.45978,
    lng: 78.06437,
    role: "Designer",
    type: "remote",
    country: "India",
  },
  {
    name: "Jurry Abbas",
    lat: 33.52662,
    lng: 73.06772,
    role: "Web Developer",
    type: "remote",
    country: "Pakistan",
  },
  {
    name: "Morris Moralde",
    lat: 10.27766,
    lng: 123.96087,
    role: "xx",
    type: "remote",
    country: "Philippines",
  },
  {
    name: "William Donayre Jr.",
    lat: 10.24324,
    lng: 123.83369,
    role: "Web Developer",
    type: "remote",
    country: "Philippines",
  },
  {
    name: "Peejay G.",
    lat: 7.0714,
    lng: 125.52786,
    role: "xx",
    type: "remote",
    country: "Philippines",
  },
];

// ############################################################ Handling Data-set

// Initialize Firebase Writing

var database = firebase.database();
var ref = firebase.database().ref();

// var usersRef = firebase.database().ref();
// usersRef.set({
// features,
// icons
// });


// var features = [];
// var icons = [];
var x = 0,
  y = 0,
  z = 0,
  p = 0;


ref.on(
  "value",
  function (snapshot) {
    var user = snapshot.val();
    var features = user.features;
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
    initMap();

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

    // Accordion
    $(document).ready(function () {
      var panels = $(".countries > .panel").hide();
      $(".accordion").click(function () {
        panels.slideUp();
        $(this).next().slideDown();
        return false;
      });
    });

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
    initMap();
  }
  // ,
  // function (error) {
  //   console.log("Error: " + error.code);
  // }
)

// function update() {
//   var johnRef = firebase.database().ref("features/0");
//   johnRef.update({
//     name: "ONE",
//   });
// }

function pushUser(
  user_name,
  user_lat,
  user_lng,
  user_role,
  user_type,
  user_country
) {
  ref.on("value", function (snapshot) {
    var user = snapshot.val();
    var features = user.features;
    var icons = user.icons;

    var totalUser = features.length;
    totalUser = parseInt(totalUser) + 1;
    // console.log(totalUser);
    var user = firebase.database().ref("features/" + totalUser);
    user.set({
      name: user_name,
      lat: user_lat,
      lng: user_lng,
      role: user_role,
      type: user_type,
      country: user_country,
    });
  });
}

// pushUser("aj", 19.13702, 72.87148, "developer", "remote", "india")




var location = "https://www.google.com/maps/dir/28.6639469,77.2831933/"
var location = "https://www.google.com/maps/dir/-31.9523123,115.861309/"
var y = location.substr(56, 1);
https://www.google.com/maps/dir/-31.9523123,115.861309/

