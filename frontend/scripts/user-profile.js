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
        const response = await fetch(`http://localhost/flight-system-website/backend/profile-page/view-info.php?user_id=${user_id}`);
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
            `;
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
        console.log(data);
        loadECInfoContent(data);
    })
    .catch((error) => {
        console.error(error);
    });
}

const loadECInfoContent = (data) => {
    const {name, email, phone_number, relation} = data.contact;
    console.log(data.contact);
    if (data) {
        ec_container.innerHTML =
        `<h2>Emergency Contact Details</h2>
        <p>Name: <span id="name-EC">${name}</span></p>
        <p>Email: <span id="email-EC">${email}</span></p>
        <p>Phone: <span id="phone-EC">${phone_number}</span></p>
        <p>Relation: <span id="relation-EC">${relation}</span></p>`;
    }
}

loadUserInfoContent(user_id);
fetchECInfoContent(user_id);