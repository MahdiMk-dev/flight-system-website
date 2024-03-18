const bookingID = document.getElementById('booking-ID');
const bookingDate = document.getElementById('booking-Date');
const bookingStatus = document.getElementById('booking-Status');

const flightID = document.getElementById('flight-ID');
const flightStatus = document.getElementById('flight-Status');

const editUserBtn = document.getElementById('edit-User-btn');
const saveUserDetailsBtn = document.getElementById('saveUserDetailsBtn');
const editECBtn = document.getElementById('edit-EC-btn');
const saveECDetailsBtn = document.getElementById('saveECDetailsBtn');
const cancelButton = document.getElementById('cancel-btn');

const user_container = document.getElementById('passengerDetails');
const ec_container = document.getElementById('emergencyContactDetails');
const upcoming_container = document.getElementById('upcoming-bookings');



const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const user_id = searchParams.get('user_id');
console.log(user_id);
if(!user_id){
    window.location.href='./login.html';
}

const fetchUserDetails = async (user_id) => {
    try { 
        const response = await fetch(`http://localhost/flightsWebsite/flight-system-website/backend/profile-page/view-info.php?user_id=${user_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error(error);
    }
};


const loadUserInfoContent = async (user_id) => {
    try {
        const user = await fetchUserDetails(user_id);
        //console.log('User:', user);
        if (user && user.status === 'success' && user.user) {
            const passengerDetails = user.user;
            user_container.innerHTML = `
                <h2>Passenger Details</h2>
                <p>Name: <span id="name">${passengerDetails.username}</span></p>
                <p>Email: <span id="email">${passengerDetails.email}</span></p>
                <p>Password: <span id="password">${passengerDetails.password}</span></p>
                <p>Date Of Birth: <span id="dob">${passengerDetails.dob}</span></p>
                <p>Nationality: <span id="nationality">${passengerDetails.nationality}</span></p>
                <p>Passport: <span id="passport">${passengerDetails.passport_number}</span></p>
                <p>Phone: <span id="phone">${passengerDetails.phone_number}</span></p>
                <button id="editBtn">Edit</button>
            `;

            const editBtn = document.getElementById('editBtn');
            editBtn.addEventListener('click', () => {
                document.getElementById('name').innerHTML = `<input type="text" value="${passengerDetails.username}" id="editName">`;
                document.getElementById('email').innerHTML = `<input type="email" value="${passengerDetails.email}" id="editEmail">`;
                document.getElementById('password').innerHTML = `<input type="password" value="${passengerDetails.password}" id="editPassword">`;
                document.getElementById('dob').innerHTML = `<input type="date" value="${passengerDetails.dob}" id="editDob">`;
                document.getElementById('nationality').innerHTML = `<input type="text" value="${passengerDetails.nationality}" id="editNationality">`;
                document.getElementById('passport').innerHTML = `<input type="number" value="${passengerDetails.passport_number}" id="editPassport">`;
                document.getElementById('phone').innerHTML = `<input type="tel" value="${passengerDetails.phone_number}" id="editPhone">`;

                editBtn.style.display = 'none';

                const saveBtn = document.createElement('button');
                saveBtn.textContent = 'Save';
                saveBtn.addEventListener('click', async () => {
                    const editedName = document.getElementById('editName').value;
                    const editedEmail = document.getElementById('editEmail').value;
                    const editedPassword = document.getElementById('editPassword').value;
                    const editedDob = new Date(document.getElementById('editDob').value).toISOString().split('T')[0]; // Ensure correct date format
                    const editedNationality = document.getElementById('editNationality').value;
                    const editedPassport = document.getElementById('editPassport').value;
                    const editedPhone = document.getElementById('editPhone').value;

                    try {
                        const response = await fetch('http://localhost/flightsWebsite/flight-system-website/backend/profile-page/add-user-info.php?user_id=${user_id}', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                user_id: user_id,
                                username: editedName,
                                email: editedEmail,
                                password: editedPassword,
                                dob: editedDob,
                                nationality: editedNationality,
                                passport_number: editedPassport,
                                phone_number: editedPhone,
                            }),
                        });
                        const data = await response.json();
                        console.log('API response:', data);

                        document.getElementById('name').textContent = editedName;
                        document.getElementById('email').textContent = editedEmail;
                        document.getElementById('password').textContent = editedPassword;
                        document.getElementById('dob').textContent = editedDob;
                        document.getElementById('nationality').textContent = editedNationality;
                        document.getElementById('passport').textContent = editedPassport;
                        document.getElementById('phone').textContent = editedPhone;

                        editBtn.style.display = 'block';
                        saveBtn.remove();
                    } catch (error) {
                        console.error('Error saving edited data:', error);
                    }
                });

                user_container.appendChild(saveBtn);
            });
        } else {
            console.error('User data is invalid:', user);
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
};

const fetchECInfoContent = (user_id) => {
    fetch(`http://localhost/flight-system-website/backend/profile-page/view-emergency-contacts.php?user_id=${user_id}`, {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //console.log(data);
        loadECInfoContent(data);
    })
    .catch((error) => {
        console.error(error);
    });
}


const loadECInfoContent = (data) => {
    const {name, email, phone_number, relation} = data.contact;
    //console.log(data);
    if (data) {
        ec_container.innerHTML =
        `<h2>Emergency Contact Details</h2>
        <p>Name: <span id="name-EC">${name}</span></p>
        <p>Email: <span id="email-EC">${email}</span></p>
        <p>Phone: <span id="phone-EC">${phone_number}</span></p>
        <p>Relation: <span id="relation-EC">${relation}</span></p>`;
    }
}

/*const fetchUpcomingBookings = (user_id) => {
    fetch(`http://localhost/flight-system-website/backend/profile-page/view-reservations.php?user_id=${user_id}`, {
    method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //console.log(data);
        loadUpcomingBookings(data);
    })
    .catch((error) => {
        console.error(error);
    });
};*/

const fetchUpcomingBookings = async (user_id) => {
    try {
        const response = await fetch(`http://localhost/flight-system-website/backend/profile-page/view-reservations.php?user_id=${user_id}`, {
            method: "GET",
        });
        const data = await response.json();
        //console.log(data);
        loadUpcomingBookings(data);
    } catch (error) {
        console.error(error);
    }
};

const loadUpcomingBookings = (data) => {
    const {flights} = data;
    upcoming_container.innerHTML = `<h2>Upcoming Bookings</h2>`;
    if(!flights) {
        return;
    }
    flights.forEach((flight,index) => {
        const {booking_id, date} = flight;
        const bookingContainer = document.createElement('div');
        bookingContainer.classList.add('flex', 'row', 'space-between');

        bookingContainer.innerHTML = `
            <p>ID: <span>${booking_id}</span></p>
            <p>Date: <span>${date}</span></p>
            <p>Status: <span>Upcoming</span></p>
            <button class="cancel-btn">Cancel</button>
        `;

        const cancelButton = bookingContainer.querySelector('.cancel-btn');
        cancelButton.addEventListener('click', async () => {
            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('booking_id', booking_id);
            try {
                const response = await fetch('http://localhost/flight-system-website/backend/profile-page/cancel-reservation.php', {
                method: "POST",
                body: formData
            });
            const responseData = await response.json();
            console.log(responseData);
            await fetchUpcomingBookings(user_id);
            }
            catch(error) {
                console.error(error);
            }
        });

        upcoming_container.appendChild(bookingContainer);
    });
}

loadUserInfoContent(user_id);
fetchECInfoContent(user_id);
fetchUpcomingBookings(user_id);