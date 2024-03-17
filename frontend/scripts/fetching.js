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


// const queryString = window.location.search;
//   const searchParams = new URLSearchParams(queryString);
//   const user_id = searchParams.get('user_id');
//   console.log(user_id)
//   if(!user_id){
//   window.location.href='./login.html'
//   return;}

// Function to fetch user details from the database
const fetchUserDetails = async (userId) => {
    try {
        const response = await fetch(`http://localhost/flights%20website/flight-system-website/backend/profile-page/view-info.php?user_id=${2}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        console.log(userData)
        return userData;
    } catch (error) {
        console.error(error);
        return null;
    }
};


// Function to load user details onto the page
const loadUserInfoContent = async (container, userId) => {
    try {
        const user = await fetchUserDetails(userId);
        console.log('User:', user); // Log the user object to see its structure
        if (user && user.status === 'success' && user.user) {
            const passengerDetails = user.user;
            container.innerHTML = `
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

// Example usage
const userId = 2; // Assuming user ID is 2
const container = document.getElementById('passengerDetails'); // Assuming this is the container element
loadUserInfoContent(container, userId);
