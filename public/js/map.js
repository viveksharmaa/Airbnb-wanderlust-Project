
    // mapboxgl.accessToken = mapToken;

    // const map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v12', // Use the standard style for the map
    //     projection: 'globe', // display the map as a globe
    //     zoom: 1, // initial zoom level, 0 is the world view, higher values zoom in
    //     center: [30, 15] // center the map on this longitude and latitude
    // });
    // map.addControl(new mapboxgl.NavigationControl());
    // map.scrollZoom.disable();

    // map.on('style.load', () => {
    //     map.setFog({}); // Set the default atmosphere style
    // });
    const map = L.map('map').setView([28.6139, 77.2090], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([28.6139, 77.2090])
        .addTo(map)
        .bindPopup('Delhi Location')
        .openPopup();