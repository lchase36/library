const libraryElem = document.querySelector("#library");
const addBookElem = document.querySelector("#add-book");
const modal = document.querySelector("#add-book-modal");
const overlay = document.querySelector("#overlay");
const titleElem = document.querySelector("#title");
const errorElem = document.querySelector(".duplicate-error");
const authorElem = document.querySelector("#author");
const pageCountElem = document.querySelector("#page-count");
const isReadElem = document.querySelector("#read");
const submit = document.querySelector("#submit");

let myLibrary = [];
let readButtons = document.querySelectorAll(".prop-read");
let removeButtons = document.querySelectorAll(".prop-remove");

function Book(title = "N/A", author = "N/A", pageCount = 0, isRead = false) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

Book.prototype.info = function bookInformation() {
  const readStr = this.isRead ? "has been read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pageCount} pages, ${readStr}`;
};

const removeBook = (e) => {
  const divToRemove = e.target.parentElement;
  const titleOfBook = divToRemove.querySelector(".prop-title");
  const titleText = titleOfBook.textContent;
  myLibrary = myLibrary.filter((book) => book.title !== titleText);
  divToRemove.remove();
};

removeButtons.forEach((button) => {
  button.addEventListener("click", removeBook);
});

const toggleRead = (e) => {
  const clickedButton = e.target;
  const clickedBook = clickedButton.parentElement;
  const titleOfBook = clickedBook.querySelector(".prop-title");
  const titleText = titleOfBook.textContent;
  const libBook = myLibrary.find((book) => book.title === titleText);
  libBook.isRead = !libBook.isRead;
  clickedButton.classList.toggle("is-read");
  const content = libBook.isRead ? "Read" : "Not read";
  clickedButton.textContent = content;
};

readButtons.forEach((button) => {
  button.addEventListener("click", toggleRead);
});

const toggleModal = () => {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

const visualizeBook = (book) => {
  const bookDiv = document.createElement("div");
  const bookTitle = document.createElement("h4");
  const bookAuthor = document.createElement("h4");
  const bookPages = document.createElement("h4");
  const bookRead = document.createElement("button");
  const bookRemove = document.createElement("button");

  bookDiv.classList.add("book");
  bookTitle.classList = "book-property prop-title";
  bookAuthor.classList = "book-property prop-author";
  bookPages.classList = "book-property prop-pages";
  bookRead.classList = "book-button prop-read";
  bookRemove.classList = "book-button prop-remove";

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pageCount} pages`;

  let isReadText;
  if (book.isRead) {
    isReadText = "Read";
    bookRead.classList.add("is-read");
  } else {
    isReadText = "Not read";
  }
  bookRead.textContent = isReadText;
  bookRemove.textContent = "Remove";

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookRead);
  bookDiv.appendChild(bookRemove);
  libraryElem.appendChild(bookDiv);
};

const rebuildVisual = () => {
  libraryElem.innerHTML = "";
  myLibrary.forEach(visualizeBook);
  removeButtons = document.querySelectorAll(".prop-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeBook);
  });
  readButtons = document.querySelectorAll(".prop-read");
  readButtons.forEach((button) => {
    button.addEventListener("click", toggleRead);
  });
};

const addBookToLibrary = (e) => {
  e.preventDefault();
  if (myLibrary.some((book) => book.title === titleElem.value)) {
    errorElem.textContent = "This book is already in your library!";
  } else {
    errorElem.textContent = "";
    const newBook = new Book();
    newBook.title = titleElem.value;
    newBook.author = authorElem.value;
    newBook.pageCount = Number(pageCountElem.value);
    newBook.isRead = isReadElem.checked;
    myLibrary.push(newBook);

    titleElem.value = "";
    authorElem.value = "";
    pageCountElem.value = "";
    isReadElem.checked = false;

    toggleModal();
    rebuildVisual();
  }
};

addBookElem.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);
submit.addEventListener("click", addBookToLibrary);
