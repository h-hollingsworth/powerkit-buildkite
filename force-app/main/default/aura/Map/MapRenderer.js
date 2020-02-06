({
    rerender: function (component) {

        var nodes = this.superRerender();

        // If the Leaflet library is not yet loaded, we can't draw the map: return
        if (!window.L) {
            return nodes;
        }

        // Draw the map if it hasn't been drawn yet
	    if (!component.map) {
            var mapElement = component.find("map").getElement();
            component.map = L.map(mapElement, {zoomControl: true}).setView([42.356045, -71.085650], 13);
            component.map.scrollWheelZoom.disable();
            window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles © Esri'}).addTo(component.map);
	    }

		var location = component.get('v.location');

        if (location && location.lat && location.long) {
            var latLng = [location.lat, location.long];
            if (component.marker) {
                component.marker.setLatLng(latLng);
            } else {
                var myIcon = L.divIcon({
                    className: 'my-div-icon',
                    html: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 52 52"><path fill="#DB4437" d="m26 2c-10.5 0-19 8.5-19 19.1 0 13.2 13.6 25.3 17.8 28.5 0.7 0.6 1.7 0.6 2.5 0 4.2-3.3 17.7-15.3 17.7-28.5 0-10.6-8.5-19.1-19-19.1z m0 27c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path></svg>'
                });
                component.marker = window.L.marker(latLng, {icon: myIcon});
                component.marker.addTo(component.map);
            }
            component.map.setView(latLng);
        }

        return nodes;

    }
})