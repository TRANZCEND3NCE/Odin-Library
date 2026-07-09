const openFormBtn = document.querySelector("#openFormBtn");
const dialogBook = document.querySelector("#dialogBook");
const formBook = document.querySelector("#formBook");
const cancelBtn = document.querySelector("#cancelBtn");
const bookContainer = document.querySelector("#book-container");

// FORM INPUTS
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pageNumber");
const readInput = document.querySelector("#checkRead");

// BOOK CLASS
class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.id = crypto.randomUUID();
	}

	toggleReadStatus() {
		this.read = !this.read;
	}
};

// LIBRARY CLASS
class Library {
	constructor() {
		this.books = [];
	}

	addBook(title, author, pages, read) {
		const newBook = new Book(title, author, pages, read);
		this.books.push(newBook);
	}

	removeBook(id) {
		this.books = this.books.filter((book) => book.id !== id);
	}

	getBooks() {
		return this.books;
	}
};

// CREATE LIBRARY INSTANCE
const myLibrary = new Library();

// DISPLAY BOOK
function displayBook() {
	if (!bookContainer) return;

	bookContainer.innerHTML = "";

	myLibrary.getBooks().forEach((book) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card");
		bookCard.dataset.id = book.id;

		bookCard.innerHTML = `
			<h3>${book.title}</h3>
			<p>Author: ${book.author}</p>
			<p>Pages: ${book.pages}</p>
			<p>Status: <span class="${book.read ? 'text-read' : 'text-unread'}">${book.read ? 'Read' : 'Not Read'}</span></p>
			<div class="card-buttons">
				<button class="toggle-read-btn ${book.read ? 'status-read' : 'status-unread'}">${book.read ? 'Mark Unread' : 'Mark Read'}</button>
				<button class="remove-btn">Remove</button>
			</div>
		`;

    bookCard.querySelector('.toggle-read-btn').addEventListener('click', () => {
	    book.toggleReadStatus();
	    displayBook();
  });

		bookCard.querySelector('.remove-btn').addEventListener('click', () => {
			myLibrary.removeBook(book.id);
	    displayBook();
  });

		bookContainer.appendChild(bookCard);
	});
};

// OPEN DIALOG
if (openFormBtn && dialogBook) {
	openFormBtn.addEventListener("click", () => {
		dialogBook.showModal();
	});
};

// CLOSE DIALOG
if (cancelBtn && dialogBook) {
	cancelBtn.addEventListener("click", () => {
		dialogBook.close();
	});
};

// SUBMIT FORM
if (formBook) {
	formBook.addEventListener("submit", (e) => {
		e.preventDefault();

		const title = titleInput.value;
		const author = authorInput.value;
		const pages = pagesInput.value;
		const read = readInput.checked;

		myLibrary.addBook(title, author, pages, read);
		displayBook();

		formBook.reset();

		if (dialogBook) dialogBook.close();
	});
};

// PRE ADDED BOOKS
myLibrary.addBook('Becoming Supernatural', 'Joe Dispenza', 384, true);
myLibrary.addBook('The Power of Now', 'Eckhart Tolle', 256, true);
myLibrary.addBook('Project 369', 'David Kasneci', 362, true);
myLibrary.addBook('The Beauty of Your Existence', 'Rumi Bumi', 265, true);

displayBook();