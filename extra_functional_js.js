
// function dark_mode() {
//   function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: new google.maps.LatLng(12.1701436, 97.5931023),
//       zoom: 3,
//       styles: [
//         { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
//         { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
//         { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
//         {
//           featureType: "administrative.locality",
//           elementType: "labels.text.fill",
//           stylers: [{ color: "#d59563" }],
//         },
//         {
//           featureType: "poi",
//           elementType: "labels.text.fill",
//           stylers: [{ color: "#d59563" }],
//         },
//         {
//           featureType: "poi.park",
//           elementType: "geometry",
//           stylers: [{ color: "#263c3f" }],
//         },
//         {
//           featureType: "poi.park",
//           elementType: "labels.text.fill",
//           stylers: [{ color: "#6b9a76" }],
//         },
//         {
//           featureType: "road",
//           elementType: "geometry",
//           stylers: [{ color: "#38414e" }],
//         },
//         {
//           featureType: "road",
//           elementType: "geometry.stroke",
//           stylers: [{ color: "#212a37" }],
//         },
//         {
//           featureType: "road",
//           elementType: "labels.text.fill",
//           stylers: [{ color: "#9ca5b3" }],
//         },
//         {
//           featureType: "road.highway",
//           elementType: "geometry",
//           stylers: [{ color: "#746855" }],
//         },
//         {
//           featureType: "road.highway",
//           elementType: "geometry.stroke",
//           stylers: [{ color: "#1f2835" }],
//         },
//         {
//           featureType: "road.highway",
//           elementType: "labels.text.fill",
//           stylers: [{ color: "#f3d19c" }],
//         },
//         {
//           featureType: "transit",
//           elementType: "geometry",
//           stylers: [{ color: "#2f3948" }],
//         },
//         {
//           featureType: "transit.station",
//           elementType: "labels.text.fill",
//           stylers: [{ color: "#d59563" }],
//         },
//         {
//           featureType: "water",
//           elementType: "geometry",
//           stylers: [{ color: "#17263c" }],
//         },
//         {
//           featureType: "water",
//           elementType: "labels.text.fill",
//           stylers: [{ color: "#515c6d" }],
//         },
//         {
//           featureType: "water",
//           elementType: "labels.text.stroke",
//           stylers: [{ color: "#17263c" }],
//         },
//       ],
//     });
//     const markers = features.map((feature) => {
//       const marker = new google.maps.Marker({
//         position: { lat: feature.lat, lng: feature.lng },
//         title: feature.name,
//         icon: icons[feature.type].icon,
//         country: feature.country,
//         map: map,
//       });

//       // Create/interact InfoWindow
//       const infowindow = new google.maps.InfoWindow({
//         content:
//           "<p class='name'>" +
//           feature.name +
//           "</p>" +
//           "<p class='role'>" +
//           feature.role +
//           "</p>",
//       });
//       marker.addListener("click", () => {
//         infowindow.open(map, marker);
//         setTimeout(() => {
//           infowindow.close(map, marker);
//         }, 1000);
//       });

//       return marker;
//     });
//     const imagePath = "./clusters/m";
//     const markerClusterer = new MarkerClusterer(map, markers, {
//       imagePath: imagePath,
//       textColor: "#ffffff",
//     });
//   }
//   initMap()
// }
