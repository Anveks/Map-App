
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// get geolocation:

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function(position) {
    
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const map = L.map('map').setView([latitude, longitude], 16);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();

    map.on('click', function(e) {
      console.log(e);
      const {lat, lng} = e.latlng;

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
        )
        .setPopupContent('Workout')
        .openPopup();
    });

  }, function() {
    alert("Could not get your position!")
  });