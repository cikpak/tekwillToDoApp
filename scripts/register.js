const registerHandler = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    const registerBody = {
        email: email,
        password: password
    }

    // verificam daca parola introdusa coincide cu confirmarea ei
    if(password !== confirmPassword) {
        Toastify({
            text: 'Parola nu coincide cu confirmarea parolei!',
            className: "error-toast"
        }).showToast();

        return;
    }

    // trimitem request pe server
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(registerBody),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json();

    // afisam o nitificare ca utilizatorul e inregistrat si sa facem redict la login
    if(response.ok === true){
        Toastify({
            text: `Utilizatorul ${email} a fost creat cu succes!`,
            className: "success-toast"
        }).showToast();

        setTimeout(() => {
            document.location.href = '/login.html'
        }, 2000);
    }else{
        Toastify({
            text: data.error,
            className: "error-toast"
        }).showToast();
    }
}