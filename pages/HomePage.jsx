import { LongText } from "../cmps/LongText.jsx";

const longText =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo fugiat, veritatis corrupti animi natus voluptas non ducimus laboriosam doloribus nam dolorem in qui blanditiis cumque unde iure hic dolore temporibus neque commodi numquam mollitia adipisci debitis. Nulla pariatur perferendis iure porro aspernatur quo doloribus, reiciendis illum omnis maxime esse perspiciatis at vitae! Architecto, necessitatibus tempora odit ipsum doloribus quam laboriosam, corrupti eius blanditiis, quisquam perferendis sapiente autem commodi in odio ullam modi. Est mollitia tempore sunt doloremque beatae iure libero repellat animi voluptatem, voluptas quia cum sed sint ea voluptatibus autem non neque qui quis officiis! Necessitatibus nisi impedit, ipsum temporibus aspernatur sint iste dolor illo doloremque odio nam iusto adipisci, alias quos dignissimos facere inventore minus velit pariatur atque asperiores corporis. Excepturi animi nihil voluptatum sunt, aliquam deleniti commodi. Quos odio vel expedita quidem ipsam ducimus numquam culpa mollitia aliquid nulla dignissimos veniam, explicabo reprehenderit qui, asperiores consequatur aliquam. Minus, dolore itaque sint sit nulla voluptate modi deserunt! Reiciendis pariatur in aut. Dolores quo dolor omnis totam eligendi? Corporis, fugiat reiciendis. Aut explicabo commodi eum dolores ullam blanditiis ut. Obcaecati maxime velit deserunt quia quidem, labore, autem neque cumque, dignissimos libero nam mollitia provident ab id expedita minima aperiam?";

export function HomePage() {
	return (
		<section className="home-page">
			<h1>Book's R Us!</h1>
			<img src="../assets/img/react.png" alt="hero-image" />
			{/* <LongText txt={longText} length="50" /> */}
		</section>
	);
}
