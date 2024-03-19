document.addEventListener('DOMContentLoaded', function () {

    // Fetch flights data using the user ID
    fetch('http://localhost/flight-system-website/backend/view_flight.php', {
        method: 'GET',
        mode: 'cors', // Ensure CORS mode
        headers: {
          'Content-Type': 'application/json'
        }
    }
    )
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                const flights = data.flights;

                const flightDetailsDiv = document.getElementById('card');
                flights.forEach((flight, index) => {
                     const card = document.createElement('section');
                    card.classList.add('card');
                    const flightCard = document.createElement('div');
                    flightCard.classList.add('text-content');
                    flightCard.innerHTML = `
                        <h3>Flight ${flight.id }</h3>
                        <p><strong>Price:</strong> $${flight.price}</p>
                        <p><strong>Departure:</strong> ${flight.departure_date} ${flight.departure_time} - ${flight.departure_airport_id}</p>
                        <p><strong>Airline:</strong> ${flight.airline}</p>
                        <p><strong>Airplane Model:</strong> ${flight.airplane_id}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival_date} ${flight.arrival_time} - ${flight.arrival_airport_id}</p>
                         <a href=http://localhost/flight-system-website/frontend/pages/view-single-flight.html?flight_id=${flight.id} ">Book now </a>
                    `;
                    card.appendChild(flightCard)
                    flightDetailsDiv.appendChild(card);

                })
            }else{
                    alert(data.status)
                }
                })

});

