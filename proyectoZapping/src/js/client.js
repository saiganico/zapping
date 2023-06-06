function checkUserRegister() {
    let token = localStorage.getItem("accessToken");
    if (token === 'undefined' || token === null) {
             window.confirm("Debes iniciar sesión primero, serás redirigido")
             window.location.href = "/login";
    } else {
        this.tokenVerification(token);
    }
 }

 tokenVerification = async (token) => {
    const response = await fetch('http://localhost:8000/api/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": token
        })
  })
        .then(response => {
            if(response.status !== 200){
                alert('Se ha producido un error, reingrese');
                window.location.href = "/login";
            }
        })
}
