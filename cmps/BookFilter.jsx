import { bookService } from "../services/book.service.js";
const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilter }) {
	const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

	useEffect(() => {
		onSetFilter(filterByToEdit);
	}, [filterByToEdit]);

	function handleChange({ target }) {
		let { value, name: field } = target;
		switch (target.type) {
			case "range":
			case "number":
				value = +target.value;
				break;
			case "checkbox":
				value = target.checked;
				break;
		}
		setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }));
	}

	// function handleChangePrimitive({ target }) {
	// 	const value = target.value;
	// 	const field = target.name;
	// 	setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }));
	// }

	// function handleTxtChange(ev) {
	// 	const value = ev.target.value;
	// 	setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }));
	// }

	// function handlepriceChange(ev) {
	// 	const value = ev.target.value;
	// 	setFilterByToEdit(prevFilter => ({ ...prevFilter, price: value }));
	// }

	const { title, price, pageCount, onSale } = filterByToEdit;
	return (
		<section className="book-filter">
			<h2>Filter Our Books</h2>
			<form>
				<label htmlFor="title">Name of the book:</label>
				<input
					onChange={handleChange}
					value={title}
					type="text"
					name="title"
					id="title"
				/>

				<label htmlFor="pageCount">Number of Pages:</label>
				<input
					onChange={handleChange}
					value={pageCount || ""}
					type="number"
					name="pageCount"
					id="pageCount"
				/>
				<label htmlFor="price">Price up to:</label>
				<input
					onChange={handleChange}
					value={price || ""}
					type="number"
					name="price"
					id="price"
				/>
				<label htmlFor="onSale">onSale:</label>
				<input
					onChange={handleChange}
					value={onSale || ""}
					type="checkbox"
					name="onSale"
					id="onSale"
				/>
			</form>
		</section>
	);
}
