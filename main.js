let listItems = ["Använd text-rutan och tryck på plusset för att skriva din lista", "(lägg till info om ta-bort-funktion)"]

let listInput = document.querySelector("[list-input]");
let listForm = document.querySelector("[list-form]");
let listContainer = document.querySelector("#list-container");

listForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (listInput.value.trim() == "") {
        return;
    }
    listItems.push(listInput.value.trim())
    listInput.value = "";
    updateList();
})

function createList(listItems) {
    let list = document.createElement("ul");
    listItems.forEach((item) => {
        let newListItem = document.createElement("li")
        newListItem.innerText = item;
        newListItem.classList.add("todo");
        list.append(newListItem);
    })
    return list;
}

function updateList() {
    listContainer.innerHTML = "";
    listContainer.append(createList(listItems));
}

updateList();
