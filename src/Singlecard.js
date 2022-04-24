import Astronaut from "./img/Astronaut.png";

export default function SingleCard({ card, getChoice, flipped }) {
	const styleFront = {
		position: "absolute",
		transition: " all 250ms ease",
		transitionDelay: flipped ? "250ms" : "0s",
		transform: flipped ? "rotateY(0deg)" : "rotateY(90deg)",
	};

	const styleBack = {
		transition: "all 250ms ease",
		transitionDelay: flipped ? "0s" : "250ms",
		transform: flipped ? "rotateY(90deg)" : "rotateY(0deg)",
	};

	const singlecard = {
		transition: "all 250ms ease",
	};

	return (
		<div style={singlecard} className="singlecard">
			<div style={styleFront} className="img__card">
				<img src={card.src.medium} alt="card front" />
			</div>

			<div
				style={styleBack}
				onClick={() => {
					getChoice(card);
				}}
				className="img__back"
			>
				<img src={Astronaut} alt="Astronaut" />
			</div>
		</div>
	);
}
