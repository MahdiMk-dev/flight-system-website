function checkCredentials(inputUsername, password) {
    const users = getUsers();

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.passengerdetails.username === inputUsername && user.passengerdetails.password === password) {
            return { id: user.id, isAdmin: user.isAdmin };
        }
    }

    return null;
}

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");

const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", (e) => {
    const user = checkCredentials(inputUsername.value, inputPassword.value);
    if (user) {
        localStorage.setItem('signedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "../pages/profile.html"
    } else {
        alert("Invalid username or password.");
    }
});
