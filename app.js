const myLibrary = [];
const addBookElem = document.querySelector('#add-book');
const modal = document.querySelector('#add-book-modal');
const overlay = document.querySelector('#overlay');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pageCount = document.querySelector('#page-count');
const isRead = document.querySelector('#read');
const submit = document.querySelector('#submit');

addBookElem.addEventListener('click', toggleModal);
overlay.addEventListener('click',toggleModal);
submit.addEventListener('click', addBookToLibrary);

function toggleModal () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

function Book(title = 'N/A', author = 'N/A', pageCount = 0, isRead = false) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
  this.info = () => {
    const readStr = isRead ? 'has been read' : 'not read yet';
    return `${title} by ${author}, ${pageCount} pages, ${readStr}`;
  };
}

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = new Book();
  newBook.title = title.value;
  newBook.author = author.value;
  newBook.pageCount = Number(pageCount.value);
  newBook.isRead = isRead.checked;
  myLibrary.push(newBook);

  title.value = '';
  author.value = '';
  pageCount.value = '';
  isRead.checked = false;
}
