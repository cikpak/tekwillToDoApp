const registerHandler = async (event ) => {
    event.preventDefault();

    const registerBody = {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
    }

    const response = await fetch('http://localhost:3000/register', {
        body: JSON.stringify(registerBody),
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
        Toastify({
            text: `User ${registerBody.email} was created!`,
            className: "success-toast",
        }).showToast();

        setTimeout(() => {
            document.location.href = '/login.html'
        }, 2000)
    }
}
