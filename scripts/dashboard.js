const modal = document.getElementById('modal');

const todos = [];

const showModal = () => {
    modal.classList.remove('hidden');
}

const hideModal = () => {
    modal.classList.add('hidden');
}

const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(event.target.elements);
}