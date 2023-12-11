async function userRegistration() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!username || !password || !confirmPassword || !firstName || !lastName || !email || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const registrationData = {
        username,
        password,
        firstName,
        lastName,
        phone,
        email
    };

    try {
        const response = await fetch('http://138.197.127.91:3000/signupUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        });

        const result = await response.json();

        if (result.success) {
            alert('Registration successful! Please log in.');
            // Redirect to login page or handle accordingly
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during user registration:', error);
    }
}

async function initiateSession(userID) {
    console.log("Inside initiateSession");

    const sessionData = { UserID: userID };

    try {
        const response = await fetch('http://138.197.127.91:3000/addToUserSessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
        });

        const result = await response.json();

        if (!result.success) {
            console.error('Error adding to UserSessions');
        } else {
            window.location.href = "../frontend/mainDashboard.html";
        }
    } catch (error) {
        console.error('Error during session initiation:', error);
    }
}

async function userLogin() {
    const loginUsername = document.getElementById('loginusername').value;
    const loginPassword = document.getElementById('loginpassword').value;

    if (!loginUsername || !loginPassword) {
        console.error('Login form elements not found.');
        return;
    }

    const loginData = {
        username: loginUsername,
        password: loginPassword
    };

    try {
        const response = await fetch('http://138.197.127.91:3000/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            alert('Login successful! UserID: ' + result.UserID);
            await initiateSession(result.UserID);
        } else {
            console.log('Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        console.error('Error during user login:', error);
        console.log('An error occurred during login. Please check the console for more details.');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupButton").addEventListener("click", function () {
        console.log("Inside");
        userRegistration();
    });

    document.getElementById("loginButton").addEventListener("click", function (event) {
        event.preventDefault();  // Prevent default form submission
        userLogin();
    });
});
