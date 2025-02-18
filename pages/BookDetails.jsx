import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
	const [book, setBook] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		loadBook();
	}, [params.bookId]);

	function loadBook() {
		setBook(null);
		bookService
			.get(params.bookId)
			.then(setBook)
			.catch(err => {
				console.log("Cannot load book:", err);
			});
	}

	function onBack() {
		navigate("/book");
		// navigate(-1)
	}

	// console.log('Details render')

	if (!book) return <div className="loader">Loading...</div>;
	console.log("book:", Object.keys(book.listPrice));

	const { amount, currencyCode, isOnSale } = book.listPrice;

	return (
		<section className="book-details">
			<h1> {book.title}</h1>
			<h3>By {book.authors}</h3>
			<h4>
				{new Date().getFullYear() - book.publishedDate > 10 ? "Vintage" : "New"}{" "}
				Book
			</h4>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga
				eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis
				commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto
				omnis?
			</p>
			<div className="img-container">
				<img src={`${book.thumbnail}`} alt="book-image" />
				{isOnSale && <div className="sale">S A L E</div>}
			</div>
			<h3>{bookService.typeOfReading(book.pageCount)}</h3>
			<h5 className={`book-details ${bookService.priceColor(amount)}`}>
				Price: {amount}
				{bookService.getCurrency(currencyCode)}
			</h5>
			<button onClick={onBack}>Back</button>
			<section>
				<button>
					<Link to={`/book/${book.prevBookId}`}>Prev Book</Link>
				</button>
				<button>
					<Link to={`/book/${book.nextBookId}`}>Next Book</Link>
				</button>
			</section>
		</section>
	);
}
