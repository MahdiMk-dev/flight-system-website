// Get references to various elements in the DOM
const bookingID = document.getElementById('booking-ID');
const bookingDate = document.getElementById('booking-Date');
const bookingStatus = document.getElementById('booking-Status');

const flightID = document.getElementById('flight-ID');
const flightStatus = document.getElementById('flight-Status');

const editUserBtn = document.getElementById('edit-User-btn');
const editECBtn = document.getElementById('edit-EC-btn');
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
    
    // Function to load user details onto the page
    const loadUserPage = (container, userId) => {
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
                <button id="edit-User-btn">Edit</button>
            `;
        }
    };

    // Load the user details onto the page
    loadUserPage(passengerDetailsContainer, userId);

    // Event listener for the edit button
    document.addEventListener('DOMContentLoaded', function() {
        const editUserBtn = document.getElementById('edit-User-btn');
    
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

                editUserBtn.style.display = 'none'; // Hide the edit button
                const saveUserDetailsBtn = document.getElementById('saveUserDetailsBtn');
                saveUserDetailsBtn.style.display = 'inline-block'; // Show the save button

                // Add event listener to the save button
                saveUserDetailsBtn.addEventListener("click", () => {
                    console.log("Save button clicked");
                    // Update the user details with the values from the input fields
                    user.passengerdetails = {
                        username: document.getElementById('editName').value,
                        email: document.getElementById('editEmail').value,
                        password: document.getElementById('editPassword').value,
                        dateOfBirth: document.getElementById('editDob').value,
                        nationality: document.getElementById('editNationality').value,
                        passport: document.getElementById('editPassport').value,
                        phone: document.getElementById('editPhone').value
                    };
                    // Save the updated user details
                    saveUsers(users);
                    // Reload the user page with the updated details
                    loadUserPage(passengerDetailsContainer, userId);
                });
            }
        });
    });
} else {
    // Redirect to the login page if user is not signed in
    //window.location.href = '../pages/login.html';
}
