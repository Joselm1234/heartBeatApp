
function Notificaciones(longitud, latitud) {
    var longitudP;
    var latitudP;
    var longitudP = parseFloat(longitud)
    var latitudP = parseFloat(latitud);
    




    mapboxgl.accessToken = "pk.eyJ1Ijoiam9zZTIiLCJhIjoiY2szdjIyNGtiMDdycjNxb3d4aWoxNTcwaSJ9.kBStRxR-qFIAdA_MaFu37w";
    console.log(mapboxgl.accessToken);
    var client = new MapboxClient(mapboxgl.accessToken);
    console.log(client);


    //var coordinates = [-70.4917237, 19.2720355];

   var coordinates = [longitudP, latitudP]



    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v10",
        center: coordinates,
        zoom: 17
    });
    console.log(map)

   
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
}

