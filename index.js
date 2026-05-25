const openFormBtn = document.querySelector("#openFormBtn");
const dialogBook = document.querySelector("#dialogBook");
const formBook = document.querySelector("#formBook");
const cancelBtn = document.querySelector("#cancelBtn");

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

function displayBook() {
	const bookContainer = document.querySelector("book-container");
	if (!bookContainer) return;

	bookContainer.innerHTML = '';

	myLibrary.forEach((book, index) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card");
		bookCard.setAttribute("data-index", index);

		bookCard.innerHtml = `
			<h3>${book.title}</h3>
			<p>Author: ${book.author}</p>
			<p>Pages: ${book.pages}</p>
			<p>Status: <span class="${book.read ? 'text-read' : 'text-unread'}">${book.read ? 'Read' : 'Not Read'}</span></p>
			<div class="card-buttons">
				<button class="toggle-read-btn ${book.read ? 'status-read' : 'status-unread'}">${book.read ? 'Mark Unread' : 'Mark Read'}</button>
				<button class="remove-btn">Remove</button>
			</div>
		`;

		bookCard.querySelector('.remove-btn').addEventListener('click', () => {
	removeBook(index);
});

bookCard.querySelector('.toggle-read-btn').addEventListener('click', () => {
	book.toggleReadStatus();
	displayBook();
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

//REMOVE BOOK FROM LIBRARY
function removeBook(index) {
	myLibrary.splice(index, 1);
	displayBook();
}


//EVENT LISTENERS
if (openFormBtn && dialogBook) {
	openFormBtn.addEventListener('click', () => {
		dialogBook.showModal();
	})
};

if (cancelBtn && dialogBook) {
	cancelBtn.addEventListener('click', () => {
		dialogBook.close();
	});
}

if (formBook) {
	formBook.addEventListener('submit', (e) => {
		e.preventDefault();

		const title = document.querySelector("title").value;
		const author = document.querySelector("author").value;
		const pages = document.querySelector("pages").value;
		const read = document.querySelector("read").checked;

		addBookToLibrary(title, author, pages, read);

		formBook.reset();
		if (dialogBook) dialogBook.close();
	});
}



addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true)