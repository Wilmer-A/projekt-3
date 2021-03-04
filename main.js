const LOCAL_STORAGE_KEY_TODOS = "app.todos.advanced";

let listItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS)) || [];
let listInput = document.querySelector("[list-input]");
let listForm = document.querySelector("[list-form]");
let listContainer = document.querySelector("#list-container");
let filterOption = document.querySelector(".filter-todo");

filterOption.addEventListener("input", filterItems);

listForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (listInput.value.trim() === "") {
        return;
    }
    listItems.push(createTodo(listInput.value.trim()));
    updateList();
    listInput.value = "";
});

function createTodo(name) {
    return {
      id: Date.now().toString(),
      name: name,
    };
}

function createList(items) {
    let list = document.createElement("ul");
    items.forEach((item) => {
        let newListItem = document.createElement("li");
        newListItem.innerText = item.name;
        newListItem.setAttribute("data-id", item.id);
        newListItem.classList.add("todo-text");
        newListItem.addEventListener("click", removeItem);
        newListItem.addEventListener("click", checkItemAsComplete);
        newListItem.addEventListener("click", markItemAsImportant);
        list.append(newListItem);
        let xButton = document.createElement("button");
        xButton.innerHTML = '<i class="fas fa-times-circle"></i>';
        xButton.classList.add("remove-button");
        newListItem.append(xButton);
        let importantButton = document.createElement("button");
        importantButton.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        importantButton.classList.add("important-button");
        newListItem.append(importantButton);
        let checkmarkButton = document.createElement("button");
        checkmarkButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        checkmarkButton.classList.add("complete-button");
        newListItem.append(checkmarkButton);
    });
    return list;
}

function removeItem(event) {
    let item = event.target;
    if (item.classList.contains("remove-button")){
        let todo = item.parentElement.getAttribute("data-id");
        listItems = listItems.filter((item) => item.id !== todo);
        updateList();
    }
}

function checkItemAsComplete(event) {
    let item = event.target;
    if (item.classList.contains("complete-button")){
        let todo = item.parentElement;
        todo.classList.toggle("completed-item");
    }
}

function markItemAsImportant(event) {
    let item = event.target;
    if (item.classList.contains("important-button")){
        let todo = item.parentElement;
        todo.classList.toggle("important-item");
    }
}

function filterItems(event) {
    let todos = document.getElementsByClassName('todo-text');
    Array.from(todos).forEach((todo) => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "list-item";
                break;
            case "completed":
                if(todo.classList.contains("completed-item")) {
                    todo.style.display = "list-item";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed-item")) {
                    todo.style.display = "list-item";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "important":
                if(todo.classList.contains("important-item")) {
                    todo.style.display = "list-item";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function updateList() {
    saveList();
    listContainer.innerHTML = "";
    listContainer.append(createList(listItems));
}

function saveList() {
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(listItems));
}

updateList();
