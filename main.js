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
    let itemToRemove = event.target;
    if (itemToRemove.classList.contains("remove-button")){
        let textToRemove = itemToRemove.parentElement.innerText;
        listItems = (listItems.filter((string) => string !== textToRemove));
        updateList();
    }
}

function checkItemAsComplete(event) {
    let itemToCheck = event.target;
    if (itemToCheck.classList.contains("complete-button")){
        let textToCheck = itemToCheck.parentElement;
        textToCheck.classList.toggle("completed-item");
    }
}

function markItemAsImportant(event) {
    let itemToMark = event.target;
    if (itemToMark.classList.contains("important-button")){
        let textToMark = itemToMark.parentElement;
        textToMark.classList.toggle("important-item"); 
    }
}

function updateList() {
    listContainer.innerHTML = "";
    listContainer.append(createList(listItems));
}

updateList();
