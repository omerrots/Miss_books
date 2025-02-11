import { bookService } from "../services/book.service.js";

export function BookPreview({ book }) {
	const { title, authors, thumbnail, listPrice } = book;
	const { amount, currencyCode } = listPrice;
	return (
		<article className="book-preview">
			<h2>{title}</h2>
			<h5>By: {authors}</h5>
			<img src={`${thumbnail}`} alt="book-image" />
			<h5>
				Price: {amount}
				{bookService.getCurrency(currencyCode)}
			</h5>
		</article>
	);
}
