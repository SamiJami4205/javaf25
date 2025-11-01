styles: [
    {
        stylers: [
            { hue: "#00ff6f" },
            { saturation: -50 }
        ]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
        ]
    }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            { hue: "#ff6600"},
            { saturation: +80 }
        ]
    }, {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            { hue: "#ff0066"},
            { saturation: +80 }
        ]
    }
]

var pinLocation = new google.maps.LatLng(40.782710,-73.965310);

var startPosition = new google.maps.Marker({
    position: pinLocation,
    map: venueMap,
    icon: "img/go.png"
});