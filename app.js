function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if (id === 'map') loadMap();
  if (id === 'sos') activateSos();
}

function activateSos() {
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 200, 300, 600, 300, 600, 300, 600, 300, 200, 100, 200, 100, 200]);
  }
}

function loadMap() {
  console.log("Próba ładowania mapy...");

  const map = L.map('map').setView([50.06914, 19.9547], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const userMarker = L.marker([lat, lon]).addTo(map);
      userMarker.bindPopup("Tutaj jesteś").openPopup();
      map.setView([lat, lon], 15);
    }, function(error) {
      console.warn("Błąd lokalizacji: ", error.message);
    });
  } else {
    alert("Przeglądarka nie obsługuje geolokalizacji.");
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
