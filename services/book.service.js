import { loadFromStorage, saveToStorage } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { booksDB } from "../assets/booksDb.js";

const BOOK_KEY = "bookDB";
_createBooks();

export const bookService = {
	query,
	get,
	remove,
	save,
	getDefaultFilter,
	getCurrency,
	typeOfReading,
	priceColor,
};

function query(filterBy = {}) {
	return storageService.query(BOOK_KEY).then(books => {
		if (filterBy.title) {
			const regExp = new RegExp(filterBy.title, "i");
			books = books.filter(book => regExp.test(book.title));
		}
		if (filterBy.price) {
			books = books.filter(book => book.listPrice.amount <= filterBy.price);
		}
		if (filterBy.pageCount) {
			books = books.filter(book => book.pageCount >= filterBy.pageCount);
		}
		if (filterBy.onSale) {
			books = books.filter(book => book.listPrice.isOnSale === filterBy.onSale);
		}
		return books;
	});
}

function get(bookId) {
	return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId);
}

function remove(bookId) {
	return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
	if (book.id) {
		return storageService.put(BOOK_KEY, book);
	} else {
		return storageService.post(BOOK_KEY, book);
	}
}

function getDefaultFilter() {
	return { title: "", price: "", pageCount: "", onSale: "" };
}

function _setNextPrevBookId(book) {
	return query().then(books => {
		const bookIdx = books.findIndex(currBook => currBook.id === book.id);
		const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
		const prevBook = books[bookIdx - 1]
			? books[bookIdx - 1]
			: books[books.length - 1];
		book.nextBookId = nextBook.id;
		book.prevBookId = prevBook.id;

		return book;
	});
}

function _createBooks() {
	let books = loadFromStorage(BOOK_KEY);
	if (!books || !books.length) {
		books = [...booksDB];
		saveToStorage(BOOK_KEY, books);
	}
}

function getCurrency(currencyCode) {
	const currency = { ILS: "₪", EUR: "€", USD: "$" };
	return currency[currencyCode];
}

function typeOfReading(numOfPages) {
	if (numOfPages > 500) {
		return "Serious Reading";
	} else if (numOfPages > 200) {
		return "Descent Reading";
	} else if (numOfPages < 100) {
		return "Light Reading";
	}
	return "";
}

function priceColor(price) {
	if (price > 150) {
		return "expensive";
	} else if (price < 20) {
		return "cheap";
	} else return "regular";
}
