fetch('http://localhost/flight-system-website/backend/admin-dashboard/get-flight-count.php')
  .then(response => response.json())
  .then(data => {
    document.querySelector('.nb-flights').textContent = data.flight_count;
  })
  .catch(error => {
    console.error('Error fetching revenue:', error);
});