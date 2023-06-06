const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const passwordErrorMsg = document.getElementById("password-error-msg");
const emailErrorMsg = document.getElementById('email-error-msg');
const usernameErrorMsg = document.getElementById('username-error-msg');

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.resetMessages();
    const username = loginForm.username.value;
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const checkPassword = loginForm.checkPassword.value;
    if(this.validateEmail(email) && this.checkPassword(password, checkPassword) && this.checkUsername(username)){
        registerAction(username, email, password)
    }


})

function checkPassword(password, checkPassword) {
    if (password.length > 5 && password === checkPassword) {
        return true
    }
    else {
        (passwordErrorMsg.style.opacity = 1);
        return false
    }

}

function validateEmail(email) {
    if (String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        return true;
    }
    else {
        return (emailErrorMsg.style.opacity = 1)
    }
};

function checkUsername(username) {
    if (username.length < 3) {
        usernameErrorMsg.style.opacity = 1;
        return false
    } else {
        return true
    }
}
function resetMessages() {
    passwordErrorMsg.style.opacity = 0;
    usernameErrorMsg.style.opacity = 0;
    emailErrorMsg.style.opacity = 0;
}

registerAction = async (username, email, password) => {
    let message = '';
    const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": username,
            "email": email,
            "password": password
        })
    })
        .then(response => response.json())
        .then(response => message = JSON.stringify(response.message));
    window.confirm(message);
}
