const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const passwordErrorMsg = document.getElementById("password-error-msg");
const emailErrorMsg = document.getElementById('email-error-msg');

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    this.resetMessages();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    if (this.validateEmail(email) && this.checkPassword(password)) {
        loginAction(email, password)
    }
})

function resetMessages() {
    passwordErrorMsg.style.opacity = 0;
    emailErrorMsg.style.opacity = 0;
    loginErrorMsg.style.opacity = 0;
}

function checkPassword(password) {
    if (password.length < 6) {
        passwordErrorMsg.style.opacity = 1;
        return false
    } else {
        return true
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

loginAction = async (email, password) => {
    localStorage.clear();
    const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("message", JSON.stringify(response.message));
            localStorage.setItem("accessToken", response.accessToken);
            if (localStorage.getItem("accessToken") === 'undefined') {
                window.confirm("Credenciales inválidas, reintente")
            } else {
                let name = parseJwt(response.accessToken).name;
                meesage = "Bienvenido " + name + ", serás redigido a la transmisión"
                alert(meesage);
                window.location.href = "/player";

            }
        })
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
