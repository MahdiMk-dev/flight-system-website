fetch('http://localhost/flight-system-website/backend/admin-dashboard/get-user-count.php')
  .then(response => response.json())
  .then(data => {
    document.querySelector('.users').textContent = data.user_count;
  })
  .catch(error => {
    console.error('Error fetching revenue:', error);
  });