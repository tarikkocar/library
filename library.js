let myLibrary = [];

// DOM elements
const bookTable = document.querySelector("tbody");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".btn-close");
const form = document.querySelector("form");
const checkbox = document.querySelector("form input[type=checkbox]");
const readDate = document.querySelector(".input-date");
const submitButton = document.querySelector(".btn-submit");
const saveButton = document.querySelector(".btn-save");
let editButtons = document.querySelectorAll(".edit");
let deleteButtons = document.querySelectorAll(".delete");

// Book object
function Book(title, author, pages, read, date, formValues) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.date = date;
  this.formValues = formValues;
  this.id = Math.random()
  this.listed = false;
}

// Create a new Book object with user's input
function addBookToLibrary(e) {
    e.preventDefault()
    const formValues = formSerialize(e.target);
    console.log(formValues);
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    const title = values.title;
    const author = values.author;
    const pages = values.pages;
    const read = values.read === "on" ? true : false;
    const date = values.date;
    const newBook = new Book(title, author, pages, read, date, formValues);
    myLibrary.push(newBook);
    closeForm();
    displayBooks();
}

// Display the book added with the form
function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].listed === false) {
            const book = document.createElement("tr");
            book.innerHTML = `<td>${myLibrary[i].title}</td><td>${myLibrary[i].author}</td><td>${myLibrary[i].pages}</td><td>${myLibrary[i].read ? "Read" : "Not read"}</td><td>${myLibrary[i].date}</td><td class="settings"><div><button class="edit" id="${myLibrary[i].id}">Edit</button><button class="delete">X</button></div></td>`
            myLibrary[i].read ? book.classList.add("read") : book.classList.add("not-read");
            book.setAttribute("id",`${myLibrary[i].id}`);
            bookTable.insertBefore(book, bookTable.children[1]);
            myLibrary[i].listed = true;
            let editButtons = document.querySelectorAll(".edit"); // Event listener added to the newly created edit button
            for (let i=0; i < editButtons.length; i++) {
                editButtons[i].addEventListener("click", editForm)
            };
            let deleteButtons = document.querySelectorAll(".delete");
            for (let i=0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", deleteBook)
            };
        }
    }
}

// Update book after filling Edit form and clicking Save button
function updateBook(e) {
    const newFormValues = formSerialize(form);
    const newData = new FormData(form);
    const newValues = Object.fromEntries(newData.entries());
    const title = newValues.title;
    const author = newValues.author;
    const pages = newValues.pages;
    const read = newValues.read === "on" ? true : false;
    const date = newValues.date;
    let book = undefined;
    for (let i=0; i < myLibrary.length; i++) {
        if (parseFloat(e.target.id) === parseFloat(myLibrary[i].id)) {
            book = document.getElementById(`${myLibrary[i].id}`);
            myLibrary[i].title = title;
            myLibrary[i].author = author;
            myLibrary[i].pages = pages;
            myLibrary[i].read = read;
            myLibrary[i].date = read ? date : "";
            myLibrary[i].formValues = newFormValues;
            book.innerHTML = `<td>${myLibrary[i].title}</td><td>${myLibrary[i].author}</td><td>${myLibrary[i].pages}</td><td>${myLibrary[i].read ? "Read" : "Not read"}</td><td>${myLibrary[i].date}</td><td class="settings"><div><button class="edit" id="${myLibrary[i].id}">Edit</button><button class="delete">X</button></div></td>`;
            document.getElementById(`${myLibrary[i].id}`).getElementsByClassName("edit")[0].addEventListener("click", editForm);
            document.getElementById(`${myLibrary[i].id}`).getElementsByClassName("delete")[0].addEventListener("click", deleteBook)
            book.setAttribute("class", `${myLibrary[i].read = read ? "read" : "not-read"}`)
        }
    }
    saveButton.removeAttribute("id");
    closeForm();
}

//Open the modal form when "+ Add book" button clicked
function openForm() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

// Close the modal form if X button or background clicked, or escape key pressed
function closeForm() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    saveButton.classList.add("hidden");
    submitButton.classList.remove("hidden");
    form.reset();
}

//Show or hide the date depending on whether user read the book or not 
function showDate(e) {
    if (e.target.checked) {
        readDate.classList.remove("hidden")
    } else {
        readDate.classList.add("hidden")
    }
}


// Open to Edit form after clicking Edit button, pre-filled with most recent information about the book
function editForm(e) {
    let tempForm = undefined;
    let bookId = undefined;
    for (let i=0; i < myLibrary.length; i++) {
        if (parseFloat(e.target.id) === parseFloat(myLibrary[i].id)) {
            tempForm = myLibrary[i].formValues;
            bookId = myLibrary[i].id;
        }
    }
    formDeserialize(form, tempForm)
    submitButton.classList.add("hidden");
    saveButton.classList.remove("hidden");
    saveButton.setAttribute("id",`${bookId}`);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

// Delete book if X clicked
function deleteBook(e) {
    let verifyDeletion = confirm("Are you sure you want to delete this book?");
    if (verifyDeletion) {
        for (let i=0; i < myLibrary.length; i++) {
            if (parseFloat(e.target.parentNode.childNodes[0].id) === parseFloat(myLibrary[i].id)) {
                let book = e.target.parentNode.parentNode.parentNode;
                book.remove();
                myLibrary.splice(i, 1);
            }
        }
    }
}

// These two functions serialize and deserialize the form fields. They're used to allow users to edit a book with pre-filled values
function formSerialize(form) {
    const data = new FormData(form);
    return new URLSearchParams(data).toString();
}

function formDeserialize(form, data) {
    const entries = (new URLSearchParams(data)).entries();
    for(const [key, val] of entries) {
        const input = form.elements[key];
        switch(input.type) {
            case 'checkbox': input.checked = !!val; break;
            default:         input.value = val;     break;
        }
    }
}

// Initial books
let stuart = new Book("Shuggie Bain", "Douglas Stuart", "536", false, "", "title=Shuggie+Bain&author=Douglas+Stuart&pages=536&date=");
let solstad = new Book("Shyness and Dignity", "Dag Solstad", "150", true, "2022-11-03", "title=Shyness+and+Dignity&author=Dag+Solstad&pages=150&read=on&date=2022-11-03");
let bolano = new Book("The Savage Detectives", "Roberto Bolaño", "610", true, "2021-08-12", "title=The+Savage+Detectives&author=Roberto+Bolaño&pages=610&read=on&date=2021-08-12");
myLibrary.push(stuart);
myLibrary.push(solstad);
myLibrary.push(bolano);
displayBooks();

// Event listeners
addBookButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);
form.addEventListener("submit", addBookToLibrary);
saveButton.addEventListener("click", updateBook);
checkbox.addEventListener("change", showDate);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeForm();
    }
});
for (let i=0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", editForm)
};
for (let i=0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteBook)
};