document.addEventListener('DOMContentLoaded', function () {
    // Function to parse URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Retrieve user ID from URL parameter
    var userId = getUrlParameter('flight_id');

    // Fetch flights data using the user ID
    fetch(`http://localhost/flight-system-website/backend/single-flight-page.php?flight_id=`+{$flight_id})
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const flights = data.flights;

                const flightDetailsDiv = document.getElementById('flight-details');
                flights.forEach((flight, index) => {
                    const flightCard = document.createElement('div');
                    flightCard.classList.add('flight-card');
                    flightCard.innerHTML = `
                        <h3>Flight ${index + 1}</h3>
                        <p><strong>Price:</strong> $${flight.price}</p>
                        <p><strong>Departure:</strong> ${flight.departure_date} ${flight.departure_time} - ${flight.departure_airport_id}</p>
                        <p><strong>Airline:</strong> ${flight.airline_id}</p>
                        <p><strong>Airplane Model:</strong> ${flight.airplane_id}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival_date} ${flight.arrival_time} - ${flight.arrival_airport_id}</p>
                    `;
                    flightDetailsDiv.appendChild(flightCard);
                });

                const bookButton = document.getElementById('book-button');
                bookButton.addEventListener('click', function () {
                    const selectedFlightIndex = parseInt(prompt('Enter the flight number you want to book (1 to ' + flights.length + '):'));
                    if (!isNaN(selectedFlightIndex) && selectedFlightIndex >= 1 && selectedFlightIndex <= flights.length) {
                        const selectedFlight = flights[selectedFlightIndex - 1];
                        localStorage.setItem('bookedFlight', JSON.stringify(selectedFlight));
                        alert('Flight booked successfully! Check your booked flight details in your localStorage.');
                    } else {
                        alert('Invalid flight number. Please enter a number between 1 and ' + flights.length + '.');
                    }
                });
            } else {
                console.error('No flights found in the database.');
            }
        })
        .catch(error => console.error('Error fetching flights:', error));
});
