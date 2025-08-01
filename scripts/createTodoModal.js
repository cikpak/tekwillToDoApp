const modal = document.getElementById('modal');

const showModal = () => {
    modal.classList.remove('hidden');
}

const hideModal = () => {
    modal.classList.add('hidden');
}

export default modal;
export {
    showModal,
    hideModal
}