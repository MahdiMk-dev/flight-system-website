

var xhr = new XMLHttpRequest();
xhr.open('GET', './backend/admin-dashboard/get-all-revenue.php', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      // If the request is successful, update the revenue content
      var revenue = xhr.responseText;
      document.querySelector('.rev').textContent = revenue;
    } else {
      // Handle error
      console.error('Error fetching revenue:', xhr.status);
    }
  }
};
xhr.send();
