const bookingsContainer = document.getElementById('booking-rows');

fetch('http://localhost/flight-system-website/backend/admin-dashboard/get-all-reservations.php')
  .then(response => response.json())
  .then(data => {
    displayBookings(data);
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching revenue:', error);
  });

const displayBookings = (data) => {
    bookingsContainer.innerHTML = '';
    if (data.reservations) {
        data.reservations.forEach( reservation => {
        const row = document.createElement('tr');
        console.log(data.resservations)
        row.innerHTML = `
        <td>${reservation.id}</td>
        <td>${reservation.flight_id}</td>
        <td>${reservation.seat_number}</td>
        <td>${reservation.username}</td>
        <td>${reservation.email}</td>
        </tr>
        `;
        bookingsContainer.appendChild(row);

        });
    } else {
        bookingsContainer.innerHTML = '<tr><td>No reservations!!</td></tr>';
    }
  }