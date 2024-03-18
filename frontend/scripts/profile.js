
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector(".container");


    function submitSignupForm() {
       
        let dob = document.getElementById('dob').value;
        let nationality = document.getElementById('nationality').value;
        let phone = document.getElementById('phone').value;
        let passport_number = document.getElementById('passport_number').value;

        
        var formData = new FormData();
        formData.append('dob', dob);
        formData.append('nationality', nationality);
        formData.append('phone', phone);
        formData.append('passport', passport_number);
        
     
        fetch('http://localhost/flight-system-website/backend/update_profile.php', {
            method: 'POST',
            body: formData,
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

    
    document.getElementById('updateInfo').addEventListener('click', function(event) {
        event.preventDefault(); 
        submitSignupForm(); 
    });

function get_user_data(){
 const jwtToken = localStorage.getItem('jwtToken');


$.ajax({
    url: "http://localhost/flight-system-website/backend/get_user_info.php",
    type: "GET", // or "GET", "PUT", etc.
    contentType: "application/json",
    headers: {
        "Authorization": "Bearer " + jwtToken // Include JWT token in Authorization header
    }, // Convert the payload to JSON
    success: function(response) {
        if(response["status"]=="success"){
            $("#dob").val(response["dob"]);
            $("#nationality").val(response["nationality"]);
            $("#passport_number").val(response["passport_number"]);
            $("#phone").val(response["phone_number"]);
        }
        // Request successful
        console.log(response);
    },
    error: function(xhr, status, error) {
        // Request failed
        console.error("Request failed with status code: " + xhr.status);
    }
});
}
get_user_data();
});





