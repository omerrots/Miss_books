import { booksService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams, Link } = ReactRouterDOM;

export function BookEdit() {
	const [carToEdit, setCarToEdit] = useState(booksService.getEmptyCar());
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { bookId } = useParams();

	useEffect(() => {
		if (bookId) loadCar();
	}, [bookId]);

	function loadCar() {
		setIsLoading(true);
		booksService
			.get(bookId)
			.then(setCarToEdit)
			.catch(err => {
				console.log("Cannot load car:", err);
			})
			.finally(() => setIsLoading(false));
	}

	function onSaveCar(ev) {
		ev.preventDefault();
		booksService
			.save(carToEdit)
			.then(carToSave => {
				console.log(`Car (${carToSave.id}) Saved!`);
			})
			.catch(err => {
				console.log("Cannot save book:", err);
			})
			.finally(() => navigate("/book"));
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
		setCarToEdit(prevCar => ({ ...prevCar, [field]: value }));
	}

	const { vendor, speed } = carToEdit;
	const loadingClass = isLoading ? "loading" : "";
	return (
		<section className={`book-edit ${loadingClass}`}>
			<h1>{bookId ? "Edit" : "Add"} Book</h1>
			<form onSubmit={onSaveCar}>
				<label htmlFor="vendor">Vendor</label>
				<input
					value={vendor}
					onChange={handleChange}
					type="text"
					name="vendor"
					id="vendor"
				/>

				<label htmlFor="speed">Speed</label>
				<input
					value={speed}
					onChange={handleChange}
					type="number"
					name="speed"
					id="speed"
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
