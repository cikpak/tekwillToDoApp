const modal = document.getElementById('modal');
const todosContainer = document.getElementById('todo-container');
const tabsContainer = document.getElementById('tabs');

const todos = [];
let displayItems = [];

const TABS = {
    todo: {
        title: 'To Do',
        value: 'todo'
    },
    completed: {
        title: 'Completed Tasks',
        value: 'completed'
    },
    deleted: {
        title: 'Deleted Tasks',
        value: 'deleted'
    }
}

let activeTab = TABS.todo.value;

const changeActiveTabHandler = (newTabName) => {
    activeTab = newTabName;
    const tabs = document.getElementsByClassName('tab-item');

    for(let tab of tabs) {
        tab.classList.remove('tab-active');
    }

    document.querySelector(`[data-tab-name="${newTabName}"]`).classList.add('tab-active');

    filterItems();
}

tabsContainer.innerHTML = Object.keys(TABS).map(tab => {
    return `
        <div
            class="tab-item ${tab === activeTab ? 'tab-active' : ''}"
            onclick="changeActiveTabHandler('${TABS[tab].value}')"
            data-tab-name="${tab}"
        >
            ${TABS[tab].title}
        </div>
    `
}).join('');

const reRender = () => {
    todosContainer.innerHTML = displayItems.map((todo) => {
        return getTodoItemHtml(todo);
    }).join('');
}

const filterItems = () => {
    switch (activeTab) {
        case TABS.todo.value:
            displayItems = todos.filter((todo) => {
                return todo.isDone === false && todo.isDeleted == false; 
            })

            break;
        case TABS.completed.value:
            displayItems = todos.filter((todo) => {
                return todo.isDone === true && todo.isDeleted == false; 
            })

            break;
        case TABS.deleted.value:
            displayItems = todos.filter((todo) => {
                return todo.isDeleted === true; 
            })

            break;
        default:
            displayItems = todos;
            break;
    }

    reRender();
}

const getTodoItemHtml = (todoItemObj) => {
    const creationDate = new Date(todoItemObj.createdAt);

    const formattedDate = `${creationDate.getDate()} / ${creationDate.getMonth()} / ${creationDate.getFullYear()}`;

    return `
        <div class="todo-item" data-id="${todoItemObj.id}">
            <div class="todo-header">
                <div class="todo-details">
                    <input type="checkbox" value="${todoItemObj.isDone}"/>

                    <div>
                        <h2>${todoItemObj.title}</h2>
                        <p>${todoItemObj.description}</p>
                    </div>
                </div>

                <div class="delete-todo-btn" onclick="deleteTodoHandler(${todoItemObj.id})">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.16835 8.33333C9.16835 7.87218 8.79451 7.49833 8.33335 7.49833C7.8722 7.49833 7.49835 7.87218 7.49835 8.33333H9.16835ZM7.49835 15C7.49835 15.4612 7.8722 15.835 8.33335 15.835C8.79451 15.835 9.16835 15.4612 9.16835 15H7.49835ZM12.5017 8.33333C12.5017 7.87218 12.1278 7.49833 11.6667 7.49833C11.2055 7.49833 10.8317 7.87218 10.8317 8.33333H12.5017ZM10.8317 15C10.8317 15.4612 11.2055 15.835 11.6667 15.835C12.1278 15.835 12.5017 15.4612 12.5017 15H10.8317ZM5.91004 17.3183L6.28912 16.5744L5.91004 17.3183ZM5.18168 16.59L5.92567 16.2109L5.92567 16.2109L5.18168 16.59ZM14.8184 16.59L14.0744 16.2109L14.0744 16.2109L14.8184 16.59ZM14.09 17.3183L13.7109 16.5744H13.7109L14.09 17.3183ZM4.16669 4.99833C3.70553 4.99833 3.33169 5.37217 3.33169 5.83333C3.33169 6.29449 3.70553 6.66833 4.16669 6.66833V4.99833ZM15.8334 6.66833C16.2945 6.66833 16.6684 6.29449 16.6684 5.83333C16.6684 5.37217 16.2945 4.99833 15.8334 4.99833V6.66833ZM6.24835 5.83333C6.24835 6.29449 6.6222 6.66833 7.08335 6.66833C7.54451 6.66833 7.91835 6.29449 7.91835 5.83333H6.24835ZM12.0817 5.83333C12.0817 6.29449 12.4555 6.66833 12.9167 6.66833C13.3778 6.66833 13.7517 6.29449 13.7517 5.83333H12.0817ZM8.33335 8.33333H7.49835V15H8.33335H9.16835V8.33333H8.33335ZM11.6667 8.33333H10.8317V15H11.6667H12.5017V8.33333H11.6667ZM15 5.83333H14.165V14.8333H15H15.835V5.83333H15ZM12.3334 17.5V16.665H7.66669V17.5V18.335H12.3334V17.5ZM5.00002 5.83333H4.16502V14.8333H5.00002H5.83502V5.83333H5.00002ZM7.66669 17.5V16.665C7.1862 16.665 6.87605 16.6644 6.64002 16.6451C6.41374 16.6266 6.33005 16.5952 6.28912 16.5744L5.91004 17.3183L5.53095 18.0623C5.84654 18.2231 6.17447 18.2826 6.50403 18.3095C6.82384 18.3356 7.21375 18.335 7.66669 18.335V17.5ZM5.00002 14.8333H4.16502C4.16502 15.2863 4.16437 15.6762 4.1905 15.996C4.21743 16.3256 4.27688 16.6535 4.43769 16.9691L5.18168 16.59L5.92567 16.2109C5.90481 16.17 5.87344 16.0863 5.85495 15.86C5.83567 15.624 5.83502 15.3138 5.83502 14.8333H5.00002ZM5.91004 17.3183L6.28912 16.5744C6.13263 16.4946 6.0054 16.3674 5.92567 16.2109L5.18168 16.59L4.43769 16.9691C4.67753 17.4398 5.06024 17.8225 5.53095 18.0623L5.91004 17.3183ZM15 14.8333H14.165C14.165 15.3138 14.1644 15.624 14.1451 15.86C14.1266 16.0863 14.0952 16.17 14.0744 16.2109L14.8184 16.59L15.5624 16.9691C15.7232 16.6535 15.7826 16.3256 15.8095 15.996C15.8357 15.6762 15.835 15.2863 15.835 14.8333H15ZM12.3334 17.5V18.335C12.7863 18.335 13.1762 18.3356 13.496 18.3095C13.8256 18.2826 14.1535 18.2231 14.4691 18.0623L14.09 17.3183L13.7109 16.5744C13.67 16.5952 13.5863 16.6266 13.36 16.6451C13.124 16.6644 12.8138 16.665 12.3334 16.665V17.5ZM14.8184 16.59L14.0744 16.2109C13.9946 16.3674 13.8674 16.4946 13.7109 16.5744L14.09 17.3183L14.4691 18.0623C14.9398 17.8225 15.3225 17.4398 15.5624 16.9691L14.8184 16.59ZM4.16669 5.83333V6.66833H5.00002V5.83333V4.99833H4.16669V5.83333ZM5.00002 5.83333V6.66833H15V5.83333V4.99833H5.00002V5.83333ZM15 5.83333V6.66833H15.8334V5.83333V4.99833H15V5.83333ZM7.08335 5.16667H7.91835C7.91835 4.22392 8.77834 3.335 10 3.335V2.5V1.665C8.00004 1.665 6.24835 3.1639 6.24835 5.16667H7.08335ZM10 2.5V3.335C11.2217 3.335 12.0817 4.22392 12.0817 5.16667H12.9167H13.7517C13.7517 3.1639 12 1.665 10 1.665V2.5ZM7.08335 5.16667H6.24835V5.83333H7.08335H7.91835V5.16667H7.08335ZM12.9167 5.16667H12.0817V5.83333H12.9167H13.7517V5.16667H12.9167Z"
                            fill="#393332"
                        />
                    </svg>
                </div>
            </div>

            <div class="todo-footer">
                <div>
                    <div class="category urgent">${todoItemObj.category}</div>
                </div>

                <div class="date-wrapper">
                    <span class="date-label">Created on:</span>
                    <span class="date">${formattedDate}</span>
                </div>
            </div>
        </div>
    `
}

const deleteTodoHandler = (todoId) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === todoId;
    });

    const todoCopy = {
        ...todos[todoIndex],
        isDeleted: true
    }

    todos.splice(todoIndex, 1, todoCopy);

    filterItems();
}

const showModal = () => {
    modal.classList.remove('hidden');
}

const hideModal = () => {
    modal.classList.add('hidden');
}

const addNewTodoItem = (todo) => {
    todos.push(todo);

    const newTodoHtml = getTodoItemHtml(todo);
    todosContainer.innerHTML = todosContainer.innerHTML + newTodoHtml;
}

const formSubmitHandler = (event) => {
    event.preventDefault();

    const newTodo = {
        id: Date.now(),
        title: event.target.elements.todoName.value,
        category: event.target.elements.category.value,
        description: event.target.elements.description.value,
        createdAt: new Date(),
        completedAt: null,
        isDone: false,
        isDeleted: false
    }

    addNewTodoItem(newTodo);

    event.target.reset();
    hideModal();
}