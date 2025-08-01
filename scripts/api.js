const currentUser = JSON.parse(localStorage.getItem('user'));

const createTodo = async (todoData) => {
    try {
        const response = await fetch('http://localhost:3000/todos', {
            body: JSON.stringify(todoData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'current-user': currentUser.id
            }
        });

        if(response.ok === true) {
            return await response.json();
        }
    } catch (error) {
        return null;
    }
}

export {
    createTodo
}