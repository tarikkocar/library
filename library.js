let myLibrary = [];

function Book(title, author, pages, read, date) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.date = date;
}

function addBookToLibrary() {
    let title = prompt("Please enter the title");
    let author = prompt("Please enter the author");
    let pages = prompt("Pages");
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook)
}

const bookCards = document.querySelector(".cards");

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement("div")
        book.innerHTML = `Title: ${myLibrary[i].title} <br> Author: ${myLibrary[i].author} <br> Pages: ${myLibrary[i].pages}`;
        bookCards.appendChild(book);
    }
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".btn-close");

function openForm() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeForm() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

function saveBook(e) {
    e.preventDefault();

}

addBookButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);

// addBookToLibrary();
// displayBooks();