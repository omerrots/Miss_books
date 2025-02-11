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

	function handleChangePrimitive({ target }) {
		const value = target.value;
		const field = target.name;
		setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }));
	}

	function handleTxtChange(ev) {
		const value = ev.target.value;
		setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }));
	}

	function handlepriceChange(ev) {
		const value = ev.target.value;
		setFilterByToEdit(prevFilter => ({ ...prevFilter, price: value }));
	}

	const { name, price } = filterByToEdit;
	return (
		<section className="book-filter">
			<h2>Filter Our Books</h2>
			<form>
				<label htmlFor="name">Name of the book:</label>
				<input
					onChange={handleChange}
					value={name}
					type="text"
					name="name"
					id="name"
				/>

				<label htmlFor="price">price</label>
				<input
					onChange={handleChange}
					value={price || ""}
					type="number"
					name="price"
					id="price"
				/>

				<button>Submit</button>
			</form>
		</section>
	);
}
