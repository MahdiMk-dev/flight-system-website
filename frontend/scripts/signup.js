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
});
