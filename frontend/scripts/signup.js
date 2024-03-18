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

        fetch('http://localhost/flightsWebsite/flight-system-website/backend/signup.php', {
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
});
