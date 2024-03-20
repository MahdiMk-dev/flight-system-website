document.addEventListener('DOMContentLoaded', function () {
     // Get input values
var filter_condition="";
  const originValue = document.getElementById('originSelect').value;
  const destinationValue = document.getElementById('destinationSelect').value;
  const airlineValue = document.getElementById('airlineSelect').value;
  const toDateValue = document.getElementById('departuredate').value;
  const fromDateValue = document.getElementById('arrivaldate').value;
  if (originValue) 
    filter_condition+=" departure_airport_id='"+originValue+" and ";
    if ( destinationValue ) 
    filter_condition+=" arrival_airport_id='"+destinationValue+" and "
    if (airlineValue ) 
    filter_condition+=" airline='"+airlineValue+" and "
    if ( toDateValue ) {
        const parts = toDateValue.split('-');

      // Rearrange the parts to the desired format (e.g., DD/MM/YYYY)
      const toDateValue = `${parts[0]}-${parts[1]}-${parts[2]}`;
    filter_condition+=" departure_date='"+toDateValue+" and "
    }
    if (fromDateValue) {
                const parts = fromDateValue.split('-');

      // Rearrange the parts to the desired format (e.g., DD/MM/YYYY)
      const fromDateValue = `${parts[0]}-${parts[1]}-${parts[2]}`;
    filter_condition+=" arrival_date='"+fromDateValue+" and "
    }
    var formData = new FormData();
        formData.append('filter', filter_condition);
    // Fetch flights data using the user ID
        fetch('http://localhost/flight-system-website/backend/get_airports.php', {
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
                const airports = data.airports;
                const airlines = data.airlines;
                const airlineSelect = document.getElementById('airlineSelect');
                const originSelect = document.getElementById('originSelect');
                const destinationSelect = document.getElementById('destinationSelect');
                airports.forEach((airport, index) => {
                   const newOption = document.createElement('option');
                  
                  // Set the value and text of the option
                  newOption.value = airport.name;
                  newOption.textContent = airport.name;
                  originSelect.appendChild(newOption); 
                })
                airports.forEach((airport, index) => {
                   const newOption = document.createElement('option');
                  
                  // Set the value and text of the option
                  newOption.value = airport.name;
                  newOption.textContent = airport.name;
                  destinationSelect.appendChild(newOption);
                })
                airlines.forEach((airline, index) => {
                   const newOption = document.createElement('option');
                  
                  // Set the value and text of the option
                  newOption.value = airline.name;
                  newOption.textContent = airline.name;
                  airlineSelect.appendChild(newOption);
                })

                
            }
        })
    fetch('http://localhost/flight-system-website/backend/view_flight.php', {
        method: 'POST',
        mode: 'cors', // Ensure CORS mode
        body: formData,
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
                const adssection=document.getElementById('ads');
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
                        <p><strong>Passengers:</strong> ${flight.passengers}</p>
                        <p><strong>Rating:</strong> ${flight.average_rating}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival_date} ${flight.arrival_time} - ${flight.arrival_airport_id}</p>
                         <a href=http://localhost/flight-system-website/frontend/pages/view-single-flight.html?flight_id=${flight.id} ">Book now </a>
                    `;
                    card.appendChild(flightCard)
                    flightDetailsDiv.appendChild(card);

                })
                ads=data.ads;
                ads.forEach((ad, index) => {
                     const card = document.createElement('section');
                    card.classList.add('card');
                    const flightCard = document.createElement('div');
                    flightCard.classList.add('text-content');
                    flightCard.innerHTML = `
                        <h3>Flight ${ad.id }</h3>
                        <p><strong>Price:</strong> $${ad.price}</p>
                        <p><strong>Departure:</strong> ${ad.departure_date} ${ad.departure_time} - ${ad.departure_airport_id}</p>
                        <p><strong>Airline:</strong> ${ad.airline}</p>
                        <p><strong>Airplane Model:</strong> ${ad.airplane_id}</p>
                        <p><strong>Passengers:</strong> ${ad.passengers}</p>
                        <p><strong>Rating:</strong> ${ad.average_rating}</p>
                        <p><strong>Arrival:</strong> ${ad.arrival_date} ${ad.arrival_time} - ${ad.arrival_airport_id}</p>
                         <a href=http://localhost/flight-system-website/frontend/pages/view-single-flight.html?flight_id=${ad.id} ">Book now </a>
                    `;
                    card.appendChild(flightCard)
                    adssection.appendChild(card);

                })
            }else{
                    alert(data.status)
                }
                })

});