import { bookService } from "../services/book.service.js";
import { makeId } from "../services/util.service.js";
import { showSuccessMsg } from "../services/event-bus.service.js";
import { UserMsg } from "../cmps/UserMsg.jsx";

const { useState, useEffect } = React;
const { useNavigate, useParams, Link } = ReactRouterDOM;

export function BookEdit() {
	const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { bookId } = useParams();

	useEffect(() => {
		if (bookId) loadBook();
	}, [bookId]);

	function loadBook() {
		setIsLoading(true);
		bookService
			.get(bookId)
			.then(book => {
				console.log(book);
				setBookToEdit(book);
			})
			.catch(err => {
				console.log("Cannot load book:", err);
			})
			.finally(() => setIsLoading(false));
	}

	function onSaveBook(ev) {
		ev.preventDefault();
		bookService
			.save(bookToEdit)
			.then(bookToSave => {
				showSuccessMsg(`Book changes Saved!`);
				console.log(`Book (${bookToSave.id}) Saved!`);
				console.log(bookToSave);
			})
			.catch(err => {
				showErrorMsg("Cannot save book!");
				console.log("Cannot save book:", err);
			})
			.finally(() => setTimeout(() => navigate("/book"), 3000));
	}

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
		setBookToEdit(prevBook => {
			if (field === "amount" || field === "currencyCode" || field === "isOnSale") {
				return {
					...prevBook,
					listPrice: { ...prevBook.listPrice, [field]: value },
				};
			} else if (field === "authors" || field === "categories") {
				return { ...prevBook, [field]: value.split(",") };
			} else {
				return { ...prevBook, [field]: value };
			}
		});
	}

	const {
		id,
		title,
		subtitle,
		authors,
		description,
		pageCount,
		categories,
		language,
		publishedDate,
		thumbnail,
		listPrice: { amount, currencyCode, isOnSale },
	} = bookToEdit;

	const loadingClass = isLoading ? "loading" : "";
	return (
		<section className={`book-edit ${loadingClass}`}>
			<h1>{bookId ? "Edit" : "Add"} Book</h1>
			<UserMsg />
			<form onSubmit={onSaveBook}>
				<label className="hide" htmlFor="id">
					Id:
				</label>
				<input
					className="hide"
					type="text"
					value={bookId ? bookId : makeId(11)}
					disabled
				/>
				<label htmlFor="title">Name of the book:</label>
				<input
					onChange={handleChange}
					value={title}
					type="text"
					name="title"
					id="title"
				/>

				<label htmlFor="subtitle">Subtitle:</label>
				<input
					onChange={handleChange}
					value={subtitle || ""}
					type="text"
					name="subtitle"
					id="subtitle"
				/>
				<label className="note" htmlFor="authors">
					Authors:
				</label>
				<textarea
					onChange={handleChange}
					value={authors.join(",")}
					type="text"
					name="authors"
					id="authors"
					rows="1"
					cols="50"
				/>
				<label className="note" htmlFor="categories">
					Categories:
				</label>
				<textarea
					onChange={handleChange}
					value={categories.join(",")}
					type="text"
					name="categories"
					id="categories"
					rows="1"
					cols="50"
				/>
				<label htmlFor="description">description:</label>
				<textarea
					onChange={handleChange}
					value={description}
					type="text"
					name="description"
					id="description"
					rows="4"
					cols="50"
				/>
				<label htmlFor="publishedDate">Published Year:</label>
				<input
					onChange={handleChange}
					type="number"
					id="publishedDate"
					name="publishedDate"
					min="1900"
					max={new Date().getFullYear()}
					step="1"
					value={publishedDate}
				/>
				<label htmlFor="thumbnail">Image:</label>
				<input
					onChange={handleChange}
					value={thumbnail || ""}
					type="text"
					name="thumbnail"
					id="thumbnail"
				/>
				<label htmlFor="language">Language:</label>
				<input
					onChange={handleChange}
					value={language}
					type="text"
					name="language"
					id="language"
				/>
				<label htmlFor="pageCount">Number of Pages:</label>
				<input
					onChange={handleChange}
					value={pageCount || ""}
					type="number"
					name="pageCount"
					id="pageCount"
				/>
				<label htmlFor="amount">Price up to:</label>
				<input
					onChange={handleChange}
					value={amount || ""}
					type="number"
					name="amount"
					id="amount"
				/>
				<label htmlFor="currencyCode">Currency Code:</label>
				<input
					onChange={handleChange}
					value={currencyCode || ""}
					type="text"
					name="currencyCode"
					id="currencyCode"
				/>
				<label htmlFor="isOnSale">Only on Sale:</label>
				<input
					onChange={handleChange}
					checked={isOnSale}
					type="checkbox"
					name="isOnSale"
					id="isOnSale"
				/>

				<section className="btns flex">
					<button>Save</button>
					<button type="button" className="back-btn">
						<Link to="/book">Back</Link>
					</button>
				</section>
			</form>
		</section>
	);
}
