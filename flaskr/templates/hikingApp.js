var map = L.map('map').setView([39.9614, -105.5108], 13);

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
    attribution: 'OpenStreetMap',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
});
var weather = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?appid={appid}', {
	appid: '{{OPEN_WEATHER_API_KEY}}'
});
var baseLayers = {
	"OSM Layer": osmLayer
}
var overlays = {
	"Precipitation": weather
}
L.control.layers(baseLayers,overlays).addTo(map);
