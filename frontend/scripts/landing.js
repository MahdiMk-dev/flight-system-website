document.addEventListener('DOMContentLoaded', function () {


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
        method: 'GET',
        mode: 'cors', // Ensure CORS mode
        headers: {
          'Content-Type': 'application/json'
        }
    }
    )
        .then(response => response.json())
        .then(data => {
            const flightDetailsDiv = document.getElementById('card');
                const adssection=document.getElementById('ads');
            if (data.status_flights === 'success') {
                console.log("success")
                const flights = data.flights;

                
                flights.forEach((flight, index) => {
                     const card = document.createElement('section');
                    card.classList.add('card');
                    const flightCard = document.createElement('div');
                    flightCard.classList.add('text-content');
                    flightCard.innerHTML = `
                        <h3>Flight ${flight.id }</h3>
                        <p><strong>Status:</strong> ${flight.status}</p>
                        <p><strong>Price:</strong> $${flight.price}</p>
                        <p><strong>Departure:</strong> ${flight.departure_date} ${flight.departure_time} - ${flight.departure_airport_id}</p>
                        <p><strong>Airline:</strong> ${flight.airline}</p>
                        <p><strong>Airplane Model:</strong> ${flight.airplane_id}</p>
                        <p><strong>Passengers:</strong> ${flight.passengers}</p>
                        <p><strong>Rating:</strong> ${flight.average_rating}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival_date} ${flight.arrival_time} - ${flight.arrival_airport_id}</p>`
                        if(flight.status=='Pending')
                        flightCard.innerHTML +=  `<a href=http://localhost/flight-system-website/frontend/pages/view-single-flight.html?flight_id=${flight.id} ">Book now </a>`
                    ;
                    card.appendChild(flightCard)
                    flightDetailsDiv.appendChild(card);

                })
                }else{
                    const card = document.createElement('section');
                    card.innerHTML="No Flights"
                    flightDetailsDiv.appendChild(card);
                }
                if(data.ads_status=='success'){
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
            }
            else{
                    const card = document.createElement('section');
                    card.innerHTML="No Ads"
                    adssection.appendChild(card);
                }


        const todayflight = document.getElementById('table');
            if (data.status_today === 'success') {
                console.log("success")
                const today = data.today;

                
                today.forEach((t, index) => {
                      let row = todayflight.insertRow(-1); // Insert at the last position

                      let cell1 = row.insertCell(0);
                      let cell2 = row.insertCell(1);
                      let cell3 = row.insertCell(2);
                      let cell4 = row.insertCell(3);
                      let cell5 = row.insertCell(4);
                      let cell6 = row.insertCell(5);
                      let cell7 = row.insertCell(6);

                      cell1.innerHTML = t.id;
                      cell2.innerHTML = t.status;
                      cell3.innerHTML = t.departure_date;
                      cell4.innerHTML = t.departure_airport_id;
                      cell5.innerHTML = t.arrival_date;
                      cell6.innerHTML = t.arrival_airport_id;
                      cell7.innerHTML = t.passengers;

                })
                }else{
                   
                }
                })


function  input_values(){
let filter_condition="";
  const price = document.getElementById('maximum').value;

  const originValuev = document.getElementById('originSelect').value;
  const destinationValuev = document.getElementById('destinationSelect').value;
  const airlineValuev = document.getElementById('airlineSelect').value;
  const toDateValuev = document.getElementById('departuredate').value;
  console.log(toDateValuev)
  const fromDateValuev = document.getElementById('arrivaldate').value;
  if (originValuev && originValuev!='ALL') 
    filter_condition+=" depart_airport.name='"+originValuev+"' and ";
    if ( destinationValuev  && destinationValuev!='ALL') 
    filter_condition+=" arrival_airport.name='"+destinationValuev+"' and "
    if (airlineValuev && airlineValuev!='ALL') 
    filter_condition+=" airlines.name='"+airlineValuev+"' and "
    if ( toDateValuev ) {

    filter_condition+=" departure_date='"+toDateValuev+"' and "
    }
    if ( price ) {

        filter_condition+=" price="+price+" and "
        }
    if (fromDateValuev) {

    filter_condition+=" arrival_date='"+fromDateValuev+"' and "
    }
return filter_condition
}
function apply_filter(filter_condition){
    console.log(filter_condition)
    let formData = new FormData();
        formData.append('filter', filter_condition);
        const postData = {
          filter: filter_condition,
        };
    console.log(postData)
   fetch('http://localhost/flight-system-website/backend/view_flight.php?filter='+filter_condition, {
        method: 'GET',
        mode: 'cors', // Ensure CORS mode
        headers: {
          'Content-Type': 'application/json'
        }
    }
    )
        .then(response => response.json())
        .then(data => {
            const flightDetailsDiv = document.getElementById('card');
            flightDetailsDiv.innerHTML="";
            const adssection=document.getElementById('ads');
            adssection.innerHTML="<h2>Ads Section</h2>"
            if (data.status_flights === 'success') {
                console.log("success")
                const flights = data.flights;

                flights.forEach((flight, index) => {
                     const card = document.createElement('section');
                    card.classList.add('card');
                    const flightCard = document.createElement('div');
                    flightCard.classList.add('text-content');
                    flightCard.innerHTML = `
                        <h3>Flight ${flight.id }</h3>
                        <p><strong>Status:</strong> ${flight.status}</p>
                        <p><strong>Price:</strong> $${flight.price}</p>
                        <p><strong>Departure:</strong> ${flight.departure_date} ${flight.departure_time} - ${flight.departure_airport_id}</p>
                        <p><strong>Airline:</strong> ${flight.airline}</p>
                        <p><strong>Airplane Model:</strong> ${flight.airplane_id}</p>
                        <p><strong>Passengers:</strong> ${flight.passengers}</p>
                        <p><strong>Rating:</strong> ${flight.average_rating}</p>
                        <p><strong>Arrival:</strong> ${flight.arrival_date} ${flight.arrival_time} - ${flight.arrival_airport_id}</p>`
                        if(flight.status=='Pending')
                        flightCard.innerHTML +=  `<a href=http://localhost/flight-system-website/frontend/pages/view-single-flight.html?flight_id=${flight.id} ">Book now </a>`
                    ;
                    card.appendChild(flightCard)
                    flightDetailsDiv.appendChild(card);

                })
                }else{
                    const cardnew = document.createElement('section');
                    cardnew.innerHTML="<h2>Ads Section</h2><h4>No Flights</h4>"
                    flightDetailsDiv.appendChild(cardnew);
                }
                if(data.ads_status=='success'){
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
            }
            else{
                    const card = document.createElement('section');
                    card.innerHTML="No Ads"
                    adssection.appendChild(card);
                }
                })
    }
  const originValue = document.getElementById('originSelect');
  const destinationValue = document.getElementById('destinationSelect');
  const airlineValue = document.getElementById('airlineSelect');
  const toDateValue = document.getElementById('departuredate');
  const fromDateValue = document.getElementById('arrivaldate');
  const high_price = document.getElementById('maximum');

// Add event listener for input change
originValue.addEventListener("change", function(event) {

    console.log("change")

let filters=input_values();
console.log(filters)
apply_filter(filters)

});
high_price.addEventListener("change", function(event) {

    console.log("change")

let filters=input_values();
console.log(filters)
apply_filter(filters)

});
destinationValue.addEventListener("change", function(event) {
    console.log("change")

let filters=input_values();
console.log(filters)
apply_filter(filters)
});
airlineValue.addEventListener("change", function(event) {
    console.log("change")

let filters=input_values();
console.log(filters)
apply_filter(filters)
});
toDateValue.addEventListener("change", function(event) {
    console.log("change")

let filters=input_values();
console.log(filters)
apply_filter(filters)
});
fromDateValue.addEventListener("change", function(event) {
    console.log("change")

let filters=input_values();
console.log(filters)
apply_filter(filters)
});
document.getElementById("logout").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior

  // Remove data from local storage
  localStorage.removeItem("jwtToken");

  // Redirect to login page or perform other actions
  window.location.href = "./login.html"; // Change the URL as needed
});

});