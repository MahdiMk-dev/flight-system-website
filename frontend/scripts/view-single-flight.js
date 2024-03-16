document.addEventListener("DOMContentLoaded", function() {
    const flightss = [
        {
            "price": 500,
            "departureDateTime": "2024-03-16T10:00:00",
            "departureAirport": "JFK Airport",
            "airlineCompany": "Example Airlines",
            "airplaneModel": "Boeing 737",
            "arrivalDateTime": "2024-03-16T13:00:00",
            "arrivalAirport": "LAX Airport"
        },
        // Add more flight objects here
    ];
    
    localStorage.setItem('flights', JSON.stringify(flightss));
    const flights = JSON.parse(localStorage.getItem('flights'));

    if (flights) {
        const flightDetailsDiv = document.getElementById('flight-details');
        flights.forEach((flight, index) => {
            const flightCard = document.createElement('div');
            flightCard.classList.add('flight-card');
            flightCard.innerHTML = `
                <h3>Flight ${index + 1}</h3>
                <p><strong>Price:</strong> $${flight.price}</p>
                <p><strong>Departure:</strong> ${flight.departureDateTime} - ${flight.departureAirport}</p>
                <p><strong>Airline:</strong> ${flight.airlineCompany}</p>
                <p><strong>Airplane Model:</strong> ${flight.airplaneModel}</p>
                <p><strong>Arrival:</strong> ${flight.arrivalDateTime} - ${flight.arrivalAirport}</p>
            `;
            flightDetailsDiv.appendChild(flightCard);
        });

        const bookButton = document.getElementById('book-button');
        bookButton.addEventListener('click', function() {
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
        console.error('No flights found in local storage.');
    }
});
