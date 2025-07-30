const loginHandler = async (event) => {
    event.preventDefault();

    const loginBody = {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
    }

    // trimitem request pe server
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json();

    if(response.ok === true){
        Toastify({
            text: "Login success!",
            className: "success-toast"
        }).showToast();

        localStorage.setItem('user', JSON.stringify(data));

        setTimeout(() => {
            document.location.href = '/dashboard.html'
        }, 2000);
    }else{
        Toastify({
            text: data.error,
            className: "error-toast"
        }).showToast();
    }
}