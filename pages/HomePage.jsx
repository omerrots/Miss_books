import { LongText } from "../cmps/LongText.jsx";
import { makeLorem, getRandomIntInclusive } from "../services/util.service.js";

const longText = makeLorem(getRandomIntInclusive(101, 300));

export function HomePage() {
	return (
		<section className="home-page">
			<h1>Book's R Us!</h1>
			<img src="../assets/img/react.png" alt="hero-image" />
			{<LongText txt={longText} length={getRandomIntInclusive(30, 80)} />}
		</section>
	);
}
