import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
	const ulAttributes = {
		title: "Some Pop Up",
		className: "book-list",
	};

	return (
		<ul {...ulAttributes}>
			{books.map(book => (
				<li key={book.id}>
					<BookPreview book={book} />
					<section>
						<button onClick={() => onRemoveBook(book.id)}> Remove</button>
						<button>
							<Link to={`/book/${book.id}`}>Details</Link>
						</button>
						<button>
							<Link to={`/book/edit/${book.id}`}>Edit</Link>
						</button>
					</section>
				</li>
			))}
		</ul>
	);
}
