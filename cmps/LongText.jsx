const { useState } = React;

export function LongText({ txt, length = 100 }) {
	const [showAllText, setShowAllText] = useState(false);

	const txtToshow = txt.slice(0, length);

	return (
		<section className="long-text">
			<p>
				{showAllText ? txt : txtToshow}
				<span className="show-all" onClick={() => setShowAllText(!showAllText)}>
					Read {showAllText ? "less" : "more..."}
				</span>
			</p>
		</section>
	);
}
