document.addEventListener('DOMContentLoaded', function () {
    function getUrlParameters() {
        const queryString = window.location.search.slice(1);
        const params = {};
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[key] = decodeURIComponent(value);
        });
        return params;
    }

    // Create a URLSearchParams object with the URL
    let  params = getUrlParameters();

    // Get a specific parameter value by name
    let  flight_id = params['flight_id'];
    const jwtToken = localStorage.getItem('jwtToken');
    // Fetch flights data using the user ID
    fetch('http://localhost/flight-system-website/backend/single-flight-page.php?flight_id='+flight_id,{
        headers: {
              'Authorization': `Bearer ${jwtToken}`
            }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                const flights = data.flights;

                const flightDetailsDiv = document.getElementById('flight-details');
                flights.forEach((flight, index) => {
                    const flightCard = document.createElement('div');
                    flightCard.classList.add('flight-card');
                    flightCard.innerHTML = `
                        <h3>Flight ${index + 1}</h3>
                        <p><strong>Price:</strong> $${flight.price}</p>
                        <p><strong>Departure:</strong> ${flight.departure_date} ${flight.departure_time} - ${flight.departure_airport_id}</p>
                        <p><strong>Airline:</strong> ${flight.airline}</p>
                        <p><strong>Airplane Model:</strong> ${flight.airplane_id}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival_date} ${flight.arrival_time} - ${flight.arrival_airport_id}</p>
                    `;
                    flightDetailsDiv.appendChild(flightCard);
                });

                const bookButton = document.getElementById('book-button');
                bookButton.addEventListener('click', function () {
                    const selectedFlightIndex = parseInt(prompt('Enter the seat number you want to book (1 to ' + flights[0].capacity + '):'));
                    if (!isNaN(selectedFlightIndex) && selectedFlightIndex >= 1 && selectedFlightIndex <= flights[0].capacity) {
                    fetch('http://localhost/flight-system-website/backend/validate_booking.php?flight_id='+flight_id+'&seat_number='+selectedFlightIndex+'&price='+flights[0].price,{
                    headers: {
                          'Authorization': `Bearer ${jwtToken}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            alert('Flight booked successfully! Check your booked flight details in your profile page.');
                   
                        }
                        else {
                            alert(data.status)
                        
                if(data.status="User Not Active Fill All info in your profile to start booking.")
                    window.location.href="http://localhost/flight-system-website/frontend/pages/profile.html"
                   }
                    })
                    }
                    else{
                        alert("Seat out of capacity, Please check given range.")
                    }
                });
            } else {
                alert(data.status)

                if (data.status!="error" && data.status!="no_flight_found")
                window.location.href="http://localhost/flight-system-website/frontend/pages/login.html"
                else
                window.location.href="http://localhost/flight-system-website/frontend/pages/login.html"
                console.error('No flights found in the database.');
        
            }
        }).catch(error => console.error('Error fetching flights:', error));
});
