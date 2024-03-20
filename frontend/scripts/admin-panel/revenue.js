fetch('http://localhost/flight-system-website/backend/admin-dashboard/get-all-revenue.php')
  .then(response => response.json())
  .then(data => {
    document.querySelector('.rev').textContent = data.revenue;
  })
  .catch(error => {
    console.error('Error fetching revenue:', error);
  });