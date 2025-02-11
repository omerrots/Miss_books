import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
	const [book, setbook] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		loadBook();
	}, [params.carId]);

	function loadCar() {
		setCar(null);
		carService
			.get(params.carId)
			.then(setCar)
			.catch(err => {
				console.log("Cannot load car:", err);
			});
	}

	function onBack() {
		navigate("/book");
		// navigate(-1)
	}

	// console.log('Details render')

	if (!car) return <div className="loader">Loading...</div>;
	// console.log('car:', car)
	return (
		<section className="book-details">
			<h1>Car Vendor: {car.vendor}</h1>
			<h1>Car Speed: {car.speed}</h1>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga
				eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis
				commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto
				omnis?
			</p>
			{/* <img src={`../assets/img/${car.vendor}.png`} alt="book-image" /> */}
			<button onClick={onBack}>Back</button>
			<section>
				<button>
					<Link to={`/book/${book.prevCarId}`}>Prev Car</Link>
				</button>
				<button>
					<Link to={`/book/${book.nextCarId}`}>Next Car</Link>
				</button>
			</section>
		</section>
	);
}
