var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(40.782710, -73.965310),
    mapTypeId: google.maps.mapTypeId.ROADMAP,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true,
    mapTypeOptions: {
        style: google.maps.MapControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_LEFT
    },
    scaleControl: true,
    scaleControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER
    },
    streetViewControl: false,
    overViewMapControl: false
};