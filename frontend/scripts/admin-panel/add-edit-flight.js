const addBtn = document.getElementById('add-btn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');

const price = document.getElementById('price');
const from = document.getElementById('departure-airport');
const to = document.getElementById('arrival-airport');
const departureDate = document.getElementById('departure-date');
const departureTime = document.getElementById('departure-time');
const arrivalDate = document.getElementById('arrival-date');
const arrivalTime = document.getElementById('arrival-time');
const airplane = document.getElementById('airplane');
const statusCon = document.getElementById('status');
const flightIdContainer = document.getElementById('flightId');

const flightForm = document.getElementById('flight-form');
const editFlightForm = document.getElementById('popup-edit');

const flightsContainer = document.getElementById('flights-rows');

addBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    price.value = '';
    from.value = '';
    to.value = '';
    departureDate.value = '';
    departureTime.value = '';
    arrivalDate.value = '';
    arrivalTime.value = '';
    airplane.value = '';
    statusCon.value = '';
    flightIdContainer.value = '';
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

flightForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('price', price.value);
    formData.append('departure_airport_id', from.value);
    formData.append('arrival_airport_id', to.value);
    formData.append('departure_date', departureDate.value);
    formData.append('departure_time', departureTime.value);
    formData.append('arrival_date', arrivalDate.value);
    formData.append('arrival_time', arrivalTime.value);
    formData.append('airplane_id', airplane.value);
    formData.append('status', statusCon.value);
    if(flightIdContainer.value) {
        formData.append('flight_id', flightIdContainer.value);
    }
    try {
        const response = await fetch('http://localhost/flight-system-website/backend/admin-dashboard/post-flight.php', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log('response:', data);

        if(data.status === 'Success') {
            fetchFlights();
        } else {
            console.error(data.status);
        }
        
    } catch (error) {
        console.error('Error adding flight:', error);
    }
});

const fetchFlights = async () => {
    try {
        const response = await fetch('http://localhost/flight-system-website/backend/admin-dashboard/get-all-flights.php');
        const data = await response.json();
        displayFlights(data);
    } catch (error) {
        console.error('Error fetching flights:', error);
    }
}

const displayFlights = (data) => {
    //console.log(data);
    flightsContainer.innerHTML = '';
    if (data.flights) {
        data.flights.forEach( flight => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${flight.id}</td>
        <td>${flight.departure_date}</td>
        <td>${flight.arrival_date}</td>
        <td>${flight.airplane_id}</td>
        <td>${flight.status}</td>
        <td>${flight.price}</td>
        <td>${flight.departure_airport_id}</td>
        <td>${flight.arrival_airport_id}</td>
        <td>
            <button class="btn edit-btn"><i class="uil uil-edit"></i></button>
            <button class="btn cancel-btn"><i class="uil uil-trash-alt"></i></button>
        </td>
        `;
        flightsContainer.appendChild(row);

        const editBtn = row.querySelector('.edit-btn');
        const cancelBtn = row.querySelector('.cancel-btn');

        editBtn.addEventListener('click', () => editFlight(flight.id));
        cancelBtn.addEventListener('click', () => cancelFlight(flight.id));
        });
    } else {
        flightsContainer.innerHTML = '<tr><td>No Flights Today!!</td></tr>';
    }
}

const editFlight = async (flightId) => {
    try {
        const response = await fetch(`http://localhost/flight-system-website/backend/admin-dashboard/get-all-flights.php?id=${flightId}`,{
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();

            popup.style.display = 'block';
            price.value = data.flights[0].price;
            from.value = data.flights[0].departure_airport_id;
            to.value = data.flights[0].arrival_airport_id;
            departureDate.value = data.flights[0].departure_date;
            departureTime.value = data.flights[0].departure_time;
            arrivalDate.value = data.flights[0].arrival_date;
            arrivalTime.value = data.flights[0].arrival_time;
            airplane.value = data.flights[0].airplane_id;
            statusCon.value = data.flights[0].status;
            flightIdContainer.value = flightId;
        }
    }
    catch (error) {
        console.error('Error adding flight:', error);
    }
}

fetchFlights();