// Get references to various elements in the DOM
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

// Check if the user is signed in
const userIsSignedIn = localStorage.getItem('signedIn') === 'true';

// Function to save user data to localStorage
const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

if (userIsSignedIn) {
    // Get the current user's ID and passenger details container
    const userLoggedIn = JSON.parse(localStorage.getItem('currentUser'));
    const userId = userLoggedIn.id;

    const passengerDetailsContainer = document.getElementById('passengerDetails');
    const emergencyContactContainer = document.getElementById('emergencyContactDetails');
    const upcomingBookingsContainer = document.getElementById('upcoming-bookings');
    const bookingsHistoryContainer = document.getElementById('bookings-history');



    // Function to load user details onto the page
    const loadUserInfoContent = (container, userId) => {
        const users = getUsers();
        const user = users.find(user => user.id === userId);
        if (user) {
            container.innerHTML = `
                <h2>Passenger Details</h2>
                <p>Name: <span id="name">${user.passengerdetails.username}</span></p>
                <p>Email: <span id="email">${user.passengerdetails.email}</span></p>
                <p>Password: <span id="password">${user.passengerdetails.password}</span></p>
                <p>Date Of Birth: <span id="dob">${user.passengerdetails.dateOfBirth}</span></p>
                <p>Nationality: <span id="nationality">${user.passengerdetails.nationality}</span></p>
                <p>Passport: <span id="passport">${user.passengerdetails.passport}</span></p>
                <p>Phone: <span id="phone">${user.passengerdetails.phone}</span></p>
            `;
        }
    };

    const loadECInfoContent = (container, userId) => {
        const users = getUsers();
        const user = users.find(user => user.id === userId);

        if (user) {
            container.innerHTML =
            `<h2>Emergency Contact Details</h2>
            <p>Name: <span id="name-EC">${user.emergencydetails.ECname}</span></p>
            <p>Email: <span id="email-EC">${user.emergencydetails.ECemail}</span></p>
            <p>Phone: <span id="phone-EC">${user.emergencydetails.ECphone}</span></p>
            <p>Relation: <span id="relation-EC">${user.emergencydetails.ECrelation}</span></p>`; 
        }
    }

    const loadUpcomingBookingsContent = (container, userId) => {
        const users = getUsers();
        const user = users.find(user => user.id === userId);
        if (user && user.upcomingBookings) {
            container.innerHTML = `<h2>Upcoming Bookings</h2>`;
    
            user.upcomingBookings.forEach((booking, index) => {
                const bookingContainer = document.createElement('div');
                bookingContainer.classList.add('flex', 'row', 'space-between');
                bookingContainer.setAttribute('booking-id', index + 1);
    
                bookingContainer.innerHTML = `
                    <p>ID: <span id="booking-ID-${index}">${booking.bookingID}</span></p>
                    <p>Date: <span id="booking-Date-${index}">${booking.date}</span></p>
                    <p>Status: <span id="booking-Status-${index}">${booking.status}</span></p>
                    <button class="cancel-btn">Cancel</button>
                `;
    
                // Add event listener to cancel button
                const cancelButton = bookingContainer.querySelector('.cancel-btn');
                cancelButton.addEventListener('click', () => {
                    // Remove the canceled booking from the container
                    container.removeChild(bookingContainer);
    
                    // Append the canceled booking to the bookings history container
                    const canceledBookingContainer = document.createElement('div');
                    canceledBookingContainer.classList.add('flex', 'row', 'space-between');
                    canceledBookingContainer.innerHTML = `
                        <p>ID: <span>${booking.bookingID}</span></p>
                        <p>Date: <span>${booking.date}</span></p>
                        <p>Status: <span>${booking.status}</span></p>
                    `;
                    bookingsHistoryContainer.appendChild(canceledBookingContainer);
    
                    // Remove the canceled booking from the user's upcoming bookings
                    user.upcomingBookings.splice(index, 1);
    
                    // Save the updated user data to local storage
                    saveUsers(users);
                });
    
                container.appendChild(bookingContainer);
            });
        }
    };

    const loadBookingsHistoryContent = (container, userId) => {
        const users = getUsers();
        const user = users.find(user => user.id === userId);
        if (user && Array.isArray(user.bookingsHistory)) {
            container.innerHTML = `<h2>Bookings History</h2>`;
    
            user.bookingsHistory.forEach((booking, index) => {
                const bookingContainer = document.createElement('div');
                bookingContainer.classList.add('flex', 'row', 'space-between');
                bookingContainer.innerHTML = `
                    <p>ID: <span>${booking.bookingID}</span></p>
                    <p>Date: <span>${booking.date}</span></p>
                    <p>Status: <span>${booking.status}</span></p>
                `;
    
                container.appendChild(bookingContainer);
            });
        }
    };
    
    

    // Load the user details onto the page
    loadUserInfoContent(passengerDetailsContainer, userId);
    loadECInfoContent(emergencyContactContainer, userId);
    loadUpcomingBookingsContent(upcomingBookingsContainer, userId);
    loadBookingsHistoryContent(bookingsHistoryContainer, userId);

    // upcomingBookings: {
            //     booking: { bookingID: '', date: '', status: '' }
            //   },

    editUserBtn.addEventListener("click", (e) => {
        console.log("Edit button clicked");
        const userId = userLoggedIn.id;
        const users = getUsers();
        const user = users.find(user => user.id === userId);
        if (user) {
            // Update the user details form fields with the current values
            const nameSpan = document.getElementById('name');
            const emailSpan = document.getElementById('email');
            const passwordSpan = document.getElementById('password');
            const dobSpan = document.getElementById('dob');
            const nationalitySpan = document.getElementById('nationality');
            const passportSpan = document.getElementById('passport');
            const phoneSpan = document.getElementById('phone');

            const name = user.passengerdetails.username;
            const email = user.passengerdetails.email;
            const password = user.passengerdetails.password;
            const dob = user.passengerdetails.dateOfBirth;
            const nationality = user.passengerdetails.nationality;
            const passport = user.passengerdetails.passport;
            const phone = user.passengerdetails.phone;

            // Populate the form fields with the user details
            nameSpan.innerHTML = `<input type="text" id="editName" value="${name}">`;
            emailSpan.innerHTML = `<input type="email" id="editEmail" value="${email}">`;
            passwordSpan.innerHTML = `<input type="password" id="editPassword" value="${password}">`;
            dobSpan.innerHTML = `<input type="date" id="editDob" value="${dob}">`;
            nationalitySpan.innerHTML = `
                <select id="editNationality">
                    <option value="American">American</option>
                    <option value="British">British</option>
                    <option value="Canadian">Canadian</option>
                </select>
            `;
            document.getElementById('editNationality').value = nationality;
            passportSpan.innerHTML = `<input type="text" id="editPassport" value="${passport}">`;
            phoneSpan.innerHTML = `<input type="tel" id="editPhone" value="${phone}">`;

        }
    });

    saveUserDetailsBtn.addEventListener("click", () => {
        console.log("Save button clicked");
        const userId = userLoggedIn.id;
        const users = getUsers();
        const user = users.find(user => user.id === userId);
        if (user) {
            // Get the values from the input fields
            const updatedUsername = document.getElementById('editName').value;
            const updatedEmail = document.getElementById('editEmail').value;
            const updatedPassword = document.getElementById('editPassword').value;
            const updatedDob = document.getElementById('editDob').value;
            const updatedNationality = document.getElementById('editNationality').value;
            const updatedPassport = document.getElementById('editPassport').value;
            const updatedPhone = document.getElementById('editPhone').value;

            // Check if any of the input fields are empty
            const emptyFields = [];
            if (updatedUsername.trim() === '') emptyFields.push('Name');
            if (updatedEmail.trim() === '') emptyFields.push('Email');
            if (updatedPassword.trim() === '') emptyFields.push('Password');
            if (updatedDob.trim() === '') emptyFields.push('Date Of Birth');
            if (updatedNationality.trim() === '') emptyFields.push('Nationality');
            if (updatedPassport.trim() === '') emptyFields.push('Passport');
            if (updatedPhone.trim() === '') emptyFields.push('Phone');

            if (emptyFields.length > 0) {
                alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
                return;
            }

            // Update the user details with the values from the input fields
            user.passengerdetails = {
                username: updatedUsername,
                email: updatedEmail,
                password: updatedPassword,
                dateOfBirth: updatedDob,
                nationality: updatedNationality,
                passport: updatedPassport,
                phone: updatedPhone
            };

            // Save the updated user details
            saveUsers(users);
            // Reload the user page with the updated details
            loadUserInfoContent(passengerDetailsContainer, userId);
        }
    });

    editECBtn.addEventListener("click", (e) => {
        console.log("Edit EC button clicked");
        const userId = userLoggedIn.id;
        const users = getUsers();
        const user = users.find(user => user.id === userId);
        if (user) {
            // Update the user details form fields with the current values
            const nameSpan = document.getElementById('name-EC');
            const emailSpan = document.getElementById('email-EC');
            const phoneSpan = document.getElementById('phone-EC');
            const relationSpan = document.getElementById('relation-EC');

            const name = user.emergencydetails.ECname;
            const email = user.emergencydetails.ECemail;
            const phone = user.emergencydetails.ECphone;
            const relation = user.emergencydetails.ECrelation;

            // Populate the form fields with the user details
            nameSpan.innerHTML = `<input type="text" id="editECName" value="${name}">`;
            emailSpan.innerHTML = `<input type="email" id="editECEmail" value="${email}">`;
            phoneSpan.innerHTML = `<input type="tel" id="editECPhone" value="${phone}">`;
            relationSpan.innerHTML = `<input type="text" id="editECRelation" value="${relation}">`;
        }
    });

    saveECDetailsBtn.addEventListener("click", () => {
        console.log("Save EC button clicked");
        const userId = userLoggedIn.id;
        const users = getUsers();
        const user = users.find(user => user.id === userId);
        if (user) {
            // Get the values from the input fields
            const updatedUsername = document.getElementById('editECName').value;
            const updatedEmail = document.getElementById('editECEmail').value;
            const updatedPhone = document.getElementById('editECPhone').value;
            const updatedRelation = document.getElementById('editECRelation').value;

            // Check if any of the input fields are empty
            const emptyFields = [];
            if (updatedUsername.trim() === '') emptyFields.push('Name');
            if (updatedEmail.trim() === '') emptyFields.push('Email');
            if (updatedPhone.trim() === '') emptyFields.push('Phone');
            if (updatedRelation.trim() === '') emptyFields.push('Relation');

            if (emptyFields.length > 0) {
                alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
                return;
            }

            // Update the user details with the values from the input fields
            user.emergencydetails = {
                ECname: updatedUsername,
                ECemail: updatedEmail,
                ECphone: updatedPhone,
                ECrelation: updatedRelation
              };
            // Save the updated user details
            saveUsers(users);
            // Reload the user page with the updated details
            loadECInfoContent(emergencyContactDetails, userId);
        }
    });



} else {
    // Redirect to the login page if user is not signed in
    window.location.href = '../pages/login.html';
}
