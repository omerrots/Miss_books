import { bookService } from "../services/book.service.js";

export function BookPreview({ book }) {
	const { title, authors, thumbnail, listPrice } = book;
	const { amount, currencyCode, isOnSale } = listPrice;
	return (
		<article className="book-preview">
			<h2>{title}</h2>
			<h5>By: {authors}</h5>
			<div className="img-container">
				<img src={`${book.thumbnail}`} alt="book-image" />
				{isOnSale && <div className="sale">S A L E</div>}
			</div>
			<h5>
				Price: {amount}
				{bookService.getCurrency(currencyCode)}
			</h5>
		</article>
	);
}
