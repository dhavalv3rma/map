$(window).on("load", function () {
  $(".loader").hide("slow");
//   passwordProtect();
  $("form").removeClass("hide");
});

// function passwordProtect() {
//   var password = "mpass321";
//   var inputPass = window.prompt("Please Enter Password - ");
//   if (inputPass === password){
//     $("form").removeClass("hide");
//   }
//   else{
//       alert("Wrong password!");
//   }
// }

// Init Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBY7di1IRJOypSd0P2CpIb1PQYZnw-iUhA",
  authDomain: "dilate-maps.firebaseapp.com",
  databaseURL: "https://dilate-maps-default-rtdb.firebaseio.com",
  projectId: "dilate-maps",
  storageBucket: "dilate-maps.appspot.com",
  messagingSenderId: "460081151258",
  appId: "1:460081151258:web:20effde8e1f168fca0c0a3",
  measurementId: "G-JMY3H48LGR",
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = database.ref("features");

ref.on("value", gotData, errData);

function gotData(data) {
  var userNum = parseInt(data.val().length);
  localStorage.setItem("totalUser", userNum);
}

function errData() {
  console.log("Error!!!");
  console.log(err);
}

// Loading screen

$(document).ready(function () {
  $(".getLocation").on("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert(
        "Geolocation is not supported. Please change or upgrade your browser."
      );
    }
  });
  function showPosition(position) {
    $("#personLong").val(position.coords.latitude);
    $("#personLat").val(position.coords.longitude);
    $(".longLat").children().removeClass("hide").addClass("active");
    $(".getLocation").removeClass("active").addClass("hide");
  }

  document.getElementById("content").addEventListener("submit", function (e) {
    e.preventDefault(); //to prevent form submission
    var user_name = $("#personName").val();
    var user_role = $("#personRole").val();
    var user_mail = $("#personMail").val();
    var user_country = $("select").val();
    var user_lat = parseFloat($("#personLong").val());
    var user_lng = parseFloat($("#personLat").val());

    //    send data to firebase
    var totalUser = parseInt(localStorage.getItem("totalUser"));
    var user = database.ref("features/" + totalUser + "/");

    user.set({
      name: user_name,
      role: user_role,
      lat: user_lat,
      lng: user_lng,
      type: "remote",
      country: user_country,
    });

    $(".getData").addClass("hide");
    $("form").addClass("hide");
    $(".postMsg").removeClass("hide").addClass("active");
    window.location.href = "https://map.dilatedigital.com.au/";
  });
});
