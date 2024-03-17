<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector(".container");


    function submitSignupForm() {
       
        let username = document.getElementById('signupUsername').value;
        let email = document.getElementById('signupEmail').value;
        let password = document.getElementById('signupPassword').value;

        
        var formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

     
        fetch('http://localhost/flight-system-website/backend/signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) 
        .then(data => {
            console.log(data);
            // Handle the response
            if (data.status === 'success') {
                alert('Account created successfully');
                // Switch to login ui
                container.classList.remove("sign-up-mode");
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred, please try again later.');
        });
    }

    
    document.getElementById('signupBtn').addEventListener('click', function(event) {
        event.preventDefault(); 
        submitSignupForm(); 
    });
=======
const inputUsername = document.getElementById("input-username-signup");
const inputEmail = document.getElementById("input-email-signup");
const inputPassword = document.getElementById("input-password-signup");

const btnSignup = document.getElementById("btn-signup");

btnSignup.addEventListener("click", (e) => {
    const user = {
        passengerdetails: {
            username: inputUsername.value,
            email: inputEmail.value,
            password: inputPassword.value,
            dateOfBirth: '',
            nationality: '',
            passport: '',
            phone: ''
        },
        emergencydetails: {
          ECname: '',
          ECemail: '',
          ECphone: '',
          ECrelation: ''
        },
        bookings: {
          booking1: { bookingID: '', date: '', status: '' },
          booking2: { bookingID: '', date: '', status: '' },
          booking3: { bookingID: '', date: '', status: '' },
          booking4: { bookingID: '', date: '', status: '' }
        },
        flights: {
          flight1: { flightID: '', status: '' },
          flight2: { flightID: '', status: '' },
          flight3: { flightID: '', status: '' },
          flight4: { flightID: '', status: '' }
        }
    };
    
    const newUser = addUser(user);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location = "../pages/login.html";
>>>>>>> 192ca1f08476f18764efb240f4d04faf08f426f5
});
