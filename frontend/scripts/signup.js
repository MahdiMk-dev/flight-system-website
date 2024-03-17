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
        upcomingBookings: [
          {
              bookingID: '1',
              date: '2001/23/3',
              status: 'canceled'
          },
          {
              bookingID: '2',
              date: '2002/24/4',
              status: 'confirmed'
          },
          // Add more bookings as needed
      ],
        bookingsHistory: {
          bookingID: '', 
          date: '', 
          status: ''
        }
    };
    
    const newUser = addUser(user);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location = "../pages/login.html";
});
