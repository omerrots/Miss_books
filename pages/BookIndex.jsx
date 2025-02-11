const { useEffect, useState } = React;
const { Link } = ReactRouterDOM;

// import { CarFilter } from "../cmps/CarFilter.jsx";
import { CarList } from "../cmps/CarList.jsx";
import { bookService } from "../services/book.service.js";

export function BookIndex() {
	const [books, setBooks] = useState(null);
	const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

	useEffect(() => {
		loadBooks();
	}, [filterBy]);

	function loadBooks() {
		bookService
			.query(filterBy)
			.then(setBooks)
			.catch(err => {
				console.log("Cannot get books:", err);
			});
	}

	function onRemoveCar(bookId) {
		carService
			.remove(bookId)
			.then(() => {
				setBooks(books => books.filter(book => book.id !== bookId));
			})
			.catch(err => {
				console.log("Cannot remove book:", err);
			});
	}

	function onSetFilter(filterBy) {
		// console.log('filterBy:', filterBy)
		setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }));
	}

	if (!books) return <div className="loader">Loading...</div>;
	return (
		<section className="book-index">
			books
			{/* <CarFilter onSetFilter={onSetFilter} filterBy={filterBy} />
			<Link to="/book/edit">Add Car</Link>
			<CarList cars={books} onRemoveCar={onRemoveCar} /> */}
		</section>
	);
}
