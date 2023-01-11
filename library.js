let myLibrary = [];

const bookCards = document.querySelector(".cards");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".btn-close");
const form = document.querySelector("form");

function Book(title, author, pages, read, date) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.date = date;
  this.listed = false;
}

function addBookToLibrary(e) {
    e.preventDefault()
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    const title = values.title;
    const author = values.author;
    const pages = values.pages;
    const read = values.read === "on" ? true : false;
    const date = values.date;
    const newBook = new Book(title, author, pages, read, date);
    myLibrary.push(newBook);
    form.reset();
    closeForm();
    displayBooks();
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].listed === false) {
            const book = document.createElement("div");
            book.innerHTML = `<ul><li>${myLibrary[i].title}</li><li>${myLibrary[i].author}</li><li>${myLibrary[i].pages}</li><li>${myLibrary[i].read}</li><li>${myLibrary[i].date}</li></ul>`
            bookCards.appendChild(book);
            myLibrary[i].listed = true;
        }
    }
}

function openForm() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeForm() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

addBookButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);
form.addEventListener("submit", addBookToLibrary);