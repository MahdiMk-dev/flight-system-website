

document.addEventListener('DOMContentLoaded', function () {
    // Get references to letious elements in the DOM
const bookingID = document.getElementById('booking-ID');
const bookingDate = document.getElementById('booking-Date');
const bookingStatus = document.getElementById('booking-Status');

const flightID = document.getElementById('flight-ID');
const flightStatus = document.getElementById('flight-Status');


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
                <p>Name: <span id="name">${data['user'].username}</span></p>
                <p>Email: <span id="email">${data['user'].email}</span></p>
                <p>Date Of Birth: <span id="dob">${data['user'].dob}</span></p>
                <p>Nationality: <span id="nationality">${data['user'].nationality}</span></p>
                <p>Passport: <span id="passport">${data['user'].passport_number}</span></p>
                <p>Phone: <span id="phone">${data['user'].phone_number}</span></p>

            `;
                const editUserBtn = document.createElement('button');
                editUserBtn.textContent = 'Edit'; 
                editUserBtn.id = 'edit-User-btn';
                const saveUserDetailsBtn = document.createElement('button');
                saveUserDetailsBtn.textContent = 'Save'; 
                saveUserDetailsBtn.id = 'saveUserDetailsBtn';// Set button text
                container.appendChild(editUserBtn);
                container.appendChild(saveUserDetailsBtn);
                 editUserBtn.addEventListener("click", (e) => {
        console.log("Edit button clicked");

            // Update the user details form fields with the current values
            const nameSpan = document.getElementById('name');
            const emailSpan = document.getElementById('email');
            const passwordSpan = document.getElementById('password');
            const dobSpan = document.getElementById('dob');
            const nationalitySpan = document.getElementById('nationality');
            const passportSpan = document.getElementById('passport');
            const phoneSpan = document.getElementById('phone');

            const name = data['user'].username;
            const email = data['user'].email;
            const dob = data['user'].dob;
            const nationality = data['user'].nationality;
            const passport = data['user'].passport_number;
            const phone = data['user'].phone_number;


            // Populate the form fields with the user details
            nameSpan.innerHTML = `<input type="text" id="editName" value="${name}">`;
            emailSpan.innerHTML = `<input type="email" id="editEmail" value="${email}">`;
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

        
    })
         saveUserDetailsBtn.addEventListener("click", () => {
        console.log("Save button clicked");

            // Get the values from the input fields
            const updatedUsername = document.getElementById('editName').value;
            const updatedEmail = document.getElementById('editEmail').value;
            const updatedDob = document.getElementById('editDob').value;
            const updatedNationality = document.getElementById('editNationality').value;
            const updatedPassport = document.getElementById('editPassport').value;
            const updatedPhone = document.getElementById('editPhone').value;

            // Check if any of the input fields are empty
            const emptyFields = [];
            if (updatedUsername.trim() === '') emptyFields.push('Name');
            if (updatedEmail.trim() === '') emptyFields.push('Email');
            if (updatedDob.trim() === '') emptyFields.push('Date Of Birth');
            if (updatedNationality.trim() === '') emptyFields.push('Nationality');
            if (updatedPassport.trim() === '') emptyFields.push('Passport');
            if (updatedPhone.trim() === '') emptyFields.push('Phone');

            if (emptyFields.length > 0) {
                alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
                return;
            }
            let formData = new FormData();
        formData.append('username', updatedUsername);
        formData.append('email', updatedEmail);
        formData.append('dob', updatedDob);
        formData.append('nationality', updatedNationality);
        formData.append('phone', updatedPhone);
        formData.append('passport', updatedPassport);
        formData.append('user_id', userId);
            fetch('http://localhost/flight-system-website/backend/profile-page/edit-contacts-info.php?user_id'+userId, {
            method: 'POST',
            body: formData
            })
        .then(response => response.json()) 
        .then(data => {
            console.log(data);
            // Handle the response
            if (data.status === 'logged_in') {
            }
            else{

            }
        })

    location.reload();
        
    });
            }else{
                    alert(data.status)
                }
                })
        
    };
    //request coins

    document.getElementById("request").addEventListener("click", function(){
        // Get the amount from the input field
        let amount = document.getElementById("amount").value;
    
        // Create a data object to send with the request
        let data = {
            amount: amount
        };
    
        // Fetch API address
        fetch('http://localhost/flight-system-website/backend/profile-page/request_coins.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle response data here
            console.log(data);
            if (data.status === "success") {
                alert("Amount requested successfully");
                document.getElementById("coinRequestForm").reset(); // Reset the form
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error: " + error.message);
        });
    });

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
                    container.innerHTML ='<h2>Emergency Contact Details</h2><h4>'+data.status+'</h4>'
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
                    <button class="cancel-btn" id="${flight.id}"">Cancel</button>
                `;
                container.appendChild(bookingContainer)
    
                // Add event listener to cancel button
                const cancelButton = bookingContainer.querySelector('.cancel-btn');
                cancelButton.addEventListener('click', () => {
                    const buttonId = event.target.id;
        let formData = new FormData();
        formData.append('booking_id', buttonId);
        formData.append('user_id', userId);
            fetch('http://localhost/flight-system-website/backend/profile-page/cancel_reservation.php', {
            method: 'POST',
            body: formData
            })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log("success")
                console.log(data)
                 location.reload();
            }
            else
            {
                alert(data.status)
            }
        })
    

                });
    
                
    })
    }
            else{
                    container.innerHTML ='<h2>Upcoming Bookings</h2><h4>'+data.status+'</h4>'
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





            }else{
                    alert(data.status)
                }
                })


                
            
});





   


