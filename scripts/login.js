const loginHandler = async (event) => {
    event.preventDefault();

    const loginBody = {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
    }

    const response = await fetch('http://localhost:3000/login', {
        body: JSON.stringify(loginBody),
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await response.json();

    if(response.ok != true) {
        Toastify({
            text: data.error,
            className: "error-toast",
        }).showToast();
    }else{
        localStorage.setItem('user', JSON.stringify(data));

        setTimeout(() => {
            document.location.href = '/dashboard.html'
        }, 2000)
    }
}