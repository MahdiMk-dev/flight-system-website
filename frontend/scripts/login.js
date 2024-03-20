document.addEventListener('DOMContentLoaded', function() {
    function submitLoginForm() {
        
        let email = document.getElementById('signinEmail').value;
        let password = document.getElementById('signinPassword').value;

        // Check if the username and password are "admin"
        if (email === 'admin' && password === 'admin') {
            // Redirect to admin page
            window.location.href = './admin.html';
            return; // Exit the function
        }

        // Prepare data to be sent in the request body
        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        fetch('http://localhost/flight-system-website/backend/login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) 
        .then(data => {
            console.log(data);
            // Handle the response
            if (data.status === 'logged_in') {
                alert('Logged in successfully');
                localStorage.setItem('jwtToken', data.token);

                //redirect to landing page when implemented 
                window.location.href = './profile.html?user_id=' + data.user_id;
            } else {
                console.log("User not found script log")
                alert(data.status);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred, please try again later.');
        });
    }

    // Attach form submission function to login button click event
    document.getElementById('loginBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission
        submitLoginForm(); // Call the function to submit the form
    });
});
