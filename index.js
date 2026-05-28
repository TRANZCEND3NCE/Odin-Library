const openFormBtn = document.querySelector("#openFormBtn");
const dialogBook = document.querySelector("#dialogBook");
const formBook = document.querySelector("#formBook");
const cancelBtn = document.querySelector("#cancelBtn");

// FORM INPUTS
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pageNumber");
const readInput = document.querySelector("#checkRead");

// LIBRARY ARRAY FOR STORING BOOKS
const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = crypto.randomUUID();
}

// TOGGLE READ STATUS
Book.prototype.toggleReadStatus = function () {
	this.read = !this.read;
}

// DISPLAY BOOK
function displayBook() {
	const bookContainer = document.querySelector("#book-container");
	if (!bookContainer) return;

	bookContainer.innerHTML = '';

	myLibrary.forEach((book, index) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card");
		bookCard.setAttribute("data-index", index);

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
	    removeBook(index);
  });

		bookContainer.appendChild(bookCard);
	});
}

// ADD BOOK TO LIBRARY
function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	displayBook();
}

// REMOVE BOOK FROM LIBRARY
function removeBook(index) {
	myLibrary.splice(index, 1);
	displayBook();
}


// OPEN DIALOG
if (openFormBtn && dialogBook) {
	openFormBtn.addEventListener('click', () => {
		dialogBook.showModal();
	})
};

// CLOSE DIALOG
if (cancelBtn && dialogBook) {
	cancelBtn.addEventListener('click', () => {
		dialogBook.close();
	});
}

// SUBMIT FORM
if (formBook) {
	formBook.addEventListener('submit', (e) => {
		e.preventDefault();

		const title = titleInput.value;
		const author = authorInput.value;
		const pages = pagesInput.value;
		const read = readInput.checked;

		addBookToLibrary(title, author, pages, read);

		formBook.reset();

		if (dialogBook) dialogBook.close();
	});
}

// PRE ADDED BOOKS
addBookToLibrary('Becoming Supernatural', 'Joe Dispenza', 384, true);
addBookToLibrary('The Power of Now', 'Eckhart Tolle', 256, true);
addBookToLibrary('Project 369', 'David Kasneci', 362, true);
addBookToLibrary('The Beauty of Your Existence', 'Rumi Bumi', 265, true);