const myLibrary = [];
const libraryElem = document.querySelector("#library");
const addBookElem = document.querySelector("#add-book");
const modal = document.querySelector("#add-book-modal");
const overlay = document.querySelector("#overlay");
const titleElem = document.querySelector("#title");
const authorElem = document.querySelector("#author");
const pageCountElem = document.querySelector("#page-count");
const isReadElem = document.querySelector("#read");
const submit = document.querySelector("#submit");

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
  const isReadText = book.isRead ? "Read" : "Not read";

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pageCount} pages`;
  bookRead.textContent = isReadText;
  bookRemove.textContent = "Remove";

  bookDiv.classList.add("book");
  bookTitle.classList.add("book-property");
  bookAuthor.classList.add("book-property");
  bookPages.classList.add("book-property");

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookRead);
  bookDiv.appendChild(bookRemove);
  libraryElem.appendChild(bookDiv);
};

const addBookToLibrary = (e) => {
  e.preventDefault();
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

  myLibrary.forEach(visualizeBook);
};

addBookElem.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);
submit.addEventListener("click", addBookToLibrary);
