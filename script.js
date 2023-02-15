/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class BookStore {
  static getBooks() {
    let books = [];
    books = JSON.parse(window.localStorage.getItem('books'));
    if (!books) {
      books = [];
    }
    return books;
  }

  static addBook(book) {
    const books = this.getBooks();
    books.push(book);
    window.localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(index) {
    let books = this.getBooks();
    const newBooks = books.filter((book, innerIndex) => index !== innerIndex);
    books = newBooks;
    window.localStorage.setItem('books', JSON.stringify(books));
  }
}

class UserInterface {
  static displayBooks() {
    const books = BookStore.getBooks();
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';
    books.forEach((book, index) => {
      const bookItem = document.createElement('li');
      bookItem.innerHTML = `<p>"${book.title}" by ${book.author}</p>
    <button>Remove</button>`;

      booksContainer.appendChild(bookItem);
      booksContainer.childNodes[index].childNodes[2].onclick = () => {
        BookStore.removeBook(index);
        this.displayBooks();
      };
    });
  }
}

UserInterface.displayBooks();

const title = document.getElementById('title');
const author = document.getElementById('author');
const addNewBook = document.getElementById('add-new-book');

addNewBook.addEventListener('click', (e) => {
  const book = new Book(title.value, author.value, 1);
  e.preventDefault();
  BookStore.addBook(book);
  title.value = '';
  author.value = '';
  UserInterface.displayBooks();
});

const allBooks = document.getElementById('all-books');
const newBook = document.getElementById('create-new-book');
const contact = document.getElementById('contact');

const navItemList = document.getElementById('nav-item-list');
const navItemAddNew = document.getElementById('nav-item-add-new');
const navItemContact = document.getElementById('nav-item-contact');

navItemList.addEventListener('click', () => {
  allBooks.className = 'all-books';
  newBook.className = 'display-none';
  contact.className = 'display-none';
  navItemList.classList.add('font-weight-bold');
  navItemAddNew.classList.remove('font-weight-bold');
  navItemContact.classList.remove('font-weight-bold');
});

navItemAddNew.addEventListener('click', () => {
  newBook.className = 'new-book';
  allBooks.className = 'display-none';
  contact.className = 'display-none';
  navItemAddNew.classList.add('font-weight-bold');
  navItemList.classList.remove('font-weight-bold');
  navItemContact.classList.remove('font-weight-bold');
});

navItemContact.addEventListener('click', () => {
  contact.className = 'contact-info';
  newBook.className = 'display-none';
  allBooks.className = 'display-none';
  navItemContact.classList.add('font-weight-bold');
  navItemAddNew.classList.remove('font-weight-bold');
  navItemList.classList.remove('font-weight-bold');
});