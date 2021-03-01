let listItems = ["Gör klart webbsidan"]
let listInput = document.querySelector("[list-input]");
let listForm = document.querySelector("[list-form]");
let listContainer = document.querySelector("#list-container");

listForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (listInput.value.trim() === "") {
        return;
    }
    listItems.push(listInput.value.trim());
    updateList();
    listInput.value = "";
});

function createList(items) {
    let list = document.createElement("ul");
    items.forEach((item) => {
        let newListItem = document.createElement("li");
        newListItem.innerText = item;
        newListItem.classList.add("todo-text");
        newListItem.addEventListener("click", removeItem);
        newListItem.addEventListener("click", checkItem);
        list.append(newListItem);

        let checkmarkButton = document.createElement("button");
        checkmarkButton.innerHTML = "✓";
        checkmarkButton.classList.add("complete-button");
        newListItem.append(checkmarkButton);

        let xButton = document.createElement("button");
        xButton.innerHTML = "✗";
        xButton.classList.add("remove-button");
        newListItem.append(xButton);
    });
    return list;
}

function removeItem(event) {
    let itemToRemove = event.target;
    if (itemToRemove.classList.contains("remove-button")){
        let textToRemove = itemToRemove.parentElement;
        textToRemove.remove();
    }
}

function checkItem(event) {
    let itemToCheck = event.target;
    if (itemToCheck.classList.contains("complete-button")){
        let textToCheck = itemToCheck.parentElement;
        textToCheck.classList.toggle("completed-item");
    }
}

function markItem(event) {
    let itemToMark = event.target;
    
}

function updateList() {
    listContainer.innerHTML = "";
    listContainer.append(createList(listItems));
}

updateList();
