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
        console.log('User:', user);
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









const fetchECInfoContent = async (user_id) => {
    try {
        const response = await fetch(`http://localhost/flightsWebsite/flight-system-website/backend/profile-page/view-emergency-contacts.php?user_id=${user_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch emergency contact details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

const loadECInfoContent = async (user_id) => {
    try {
        const data = await fetchECInfoContent(user_id);
        console.log('Emergency Contact:', data);
        if (data) {
            const { name, email, phone_number, relation } = data.contact;
            ec_container.innerHTML = `
                <h2>Emergency Contact Details</h2>
                <p>Name: <span id="name-EC">${name}</span></p>
                <p>Email: <span id="email-EC">${email}</span></p>
                <p>Phone: <span id="phone-EC">${phone_number}</span></p>
                <p>Relation: <span id="relation-EC">${relation}</span></p>
            `;
        } else {
            console.error('Emergency contact data is invalid:', data);
        }
    } catch (error) {
        console.error('Error loading emergency contact info:', error);
    }
};


const fetchBookings = async (user_id) => {
    try {
        const response = await fetch(`http://localhost/flightsWebsite/flight-system-website/backend/profile-page/view-reservations.php?user_id=${user_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return null;
    }
};

const loadBookings = async (user_id) => {
    try {
        const data = await fetchBookings(user_id);
        console.log('Bookings:', data);
        if (data && data.flights) {
            const container = document.getElementById('upcoming-bookings');
            container.innerHTML = `<h2>Bookings</h2>`;
            data.flights.forEach((flight, index) => {
                const bookingContainer = document.createElement('div');
                bookingContainer.classList.add('flex', 'row', 'space-between');
                bookingContainer.setAttribute('booking-id', index + 1);

                bookingContainer.innerHTML = `
                    <p>ID: <span id="booking-ID-${index}">${flight.booking_id}</span></p>
                    <p>Date: <span id="booking-Date-${index}">${flight.date}</span></p>
                    <p>Status: <span id="booking-Status-${index}">${flight.statusUP}</span></p>
                `;

                container.appendChild(bookingContainer);
            });
        } else {
            console.error('Invalid bookings data:', data);
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
};



loadUserInfoContent(user_id);
loadECInfoContent(user_id);
loadBookings(user_id);
