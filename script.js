
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const form = document.querySelector(".form");
const workouts = document.querySelector(".workouts");
const workoutType = document.querySelector(".workout-type");
const distance = document.querySelector(".distance");
const duration = document.querySelector(".duration");
const elevation = document.querySelector(".elevation");
const cadence = document.querySelector(".cadence");

let map, mapEvent;

// get geolocation:
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function(position) {
    
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    map = L.map('map').setView([latitude, longitude], 16);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();

    map.on('click', function(e) {
      form.classList.remove("hidden");
      distance.focus();
      mapEvent = e;
    });

  }, function() {
    alert("Could not get your position!")
  });

form.addEventListener('submit', function(e) {
    e.preventDefault()
    const {lat, lng} = mapEvent.latlng;

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

    // clear input fields:
    distance.value = duration.value = elevation.value = cadence.value = "";  
});

workoutType.addEventListener('change', function(e) {
  // const workoutType = e.target.value;

  // workoutType === 'cycling' 
  //   ? [elevation.classList.toggle('hidden'), cadence.classList.toggle('hidden')] 
  //   : [elevation.classList.toggle('hidden'), cadence.classList.toggle('hidden')]

  elevation.closest("input").classList.toggle('hidden');
  cadence.closest("input").classList.toggle('hidden');
});

// attempt to refactor the code with OOP