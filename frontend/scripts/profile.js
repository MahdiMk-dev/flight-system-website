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

document.addEventListener('DOMContentLoaded', function () {
        // Function to load user details onto the page
    const loadUserInfoContent = (container, userId) => {
            // Fetch flights data using the user ID
    fetch('http://localhost/flight-system-website/backend/profile-page/view-info.php?user_id='+userId
    )
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                console.log(data)
                container.innerHTML = `
                <h2>Passenger Details</h2>
                <p>Name: <span id="name">${data['user'].name}</span></p>
                <p>Email: <span id="email">${data['user'].email}</span></p>
                <p>Date Of Birth: <span id="dob">${data['user'].dob}</span></p>
                <p>Nationality: <span id="nationality">${data['user'].nationality}</span></p>
                <p>Passport: <span id="passport">${data['user'].passport_number}</span></p>
                <p>Phone: <span id="phone">${data['user'].phone_number}</span></p>
            `;
            }else{
                    alert(data.status)
                }
                })
        
    };
    const loadECInfoContent = (container, userId) => {
            // Fetch flights data using the user ID
    fetch('http://localhost/flight-system-website/backend/profile-page/view-emergency-contacts.php?user_id='+userId
    )
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                console.log(data)
                container.innerHTML =
            `<h2>Emergency Contact Details</h2>`
            data['contacts'].forEach((contact, index) => {
                html =`
            <p>Name: <span id="name-EC">${contact.name}</span></p>
            <p>Email: <span id="email-EC">${contact.email}</span></p>
            <p>Phone: <span id="phone-EC">${contact.phone_number}</span></p>
            <p>Relation: <span id="relation-EC">${contact.relation}</span></p>`; 
        container.innerHTML +=html;
    })
    }
            else{
                    container.innerHTML ='<h2>'+data.status+'</h2>'
                }
                })
        
    };
       const loadUpcomingBookingsContent = (container, userId) => {
        fetch('http://localhost/flight-system-website/backend/profile-page/view-flights.php?user_id='+userId
    )
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                console.log(data)
                container.innerHTML = `<h2>Upcoming Bookings</h2>`;
            data['flights'].forEach((flight, index) => {
                const bookingContainer = document.createElement('div');
                bookingContainer.classList.add('flex', 'row', 'space-between');
                bookingContainer.setAttribute('booking-id', flight.id );
    
                bookingContainer.innerHTML = `
                    <p>ID: <span id="booking-ID-${flight.id}">${flight.id}</span></p>
                    <p>Date: <span id="booking-Date-${flight.id}">${flight.date}</span></p>
                    <p>Status: <span id="booking-Status-${flight.id}">${flight.status}</span></p>
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
                        <p>ID: <span>${flight.id}</span></p>
                        <p>Date: <span>${flight.date}</span></p>
                        <p>Status: <span>${flight.status}</span></p>
                    `;
                    bookingsHistoryContainer.appendChild(canceledBookingContainer);
    
                    // Remove the canceled booking from the user's upcoming bookings
                    user.upcomingBookings.splice(index, 1);
    

                });
    
                container.appendChild(bookingContainer);
    })
    }
            else{
                    container.innerHTML ='<h2>'+data.status+'</h2>'
                }
                })
      

    };
        const loadBookingsHistoryContent = (container, userId) => {
                fetch('http://localhost/flight-system-website/backend/profile-page/view-history-flights.php?user_id='+userId
    )
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                console.log(data)
                container.innerHTML = `<h2>Bookings History</h2>`;
            data['flights'].forEach((flight, index) => {
                const bookingContainer = document.createElement('div');
                bookingContainer.classList.add('flex', 'row', 'space-between');
                bookingContainer.innerHTML = `
                    <p>ID: <span>${flight.id}</span></p>
                    <p>Date: <span>${flight.date}</span></p>
                    <p>Status: <span>${flight.status}</span></p>
                `;
    
                container.appendChild(bookingContainer);
            })
        }
        else{
                    container.innerHTML ='<h2>Bookings History</h2><h4>'+data.status+'</h4>'
                }
    })

    };

    const jwtToken = localStorage.getItem('jwtToken');
    // Fetch flights data using the user ID
    fetch('http://localhost/flight-system-website/backend/get_user.php', {headers: {
              'Authorization': `Bearer ${jwtToken}`
            }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                const user_id = data.user_id;
                const passengerDetailsContainer = document.getElementById('passengerDetails');
                const emergencyContactContainer = document.getElementById('emergencyContactDetails');
                const upcomingBookingsContainer = document.getElementById('upcoming-bookings');
                const bookingsHistoryContainer = document.getElementById('bookings-history');
                const flightDetailsDiv = document.getElementById('card');
                loadUserInfoContent(passengerDetailsContainer, user_id);
                loadECInfoContent(emergencyContactContainer, user_id);
                loadUpcomingBookingsContent(upcomingBookingsContainer, user_id);
                loadBookingsHistoryContent(bookingsHistoryContainer, user_id);
                console.log(user_id)
            }else{
                    alert(data.status)
                }
                })

});








    
    

    // Load the user details onto the page
    
    //loadECInfoContent(emergencyContactContainer, userId);
    //loadUpcomingBookingsContent(upcomingBookingsContainer, userId);
    //loadBookingsHistoryContent(bookingsHistoryContainer, userId);

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




