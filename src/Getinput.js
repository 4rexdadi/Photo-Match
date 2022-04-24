/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const GetInput = ({
	setQuery,
	setIsPending,
	isPending,
	error,
	setError,
	inputValue,
	setInputValue,
	score,
	turns,
	reset,
	setScore,
	setCards,
	setTurns,
	ShowInputPage,
	setShowInputPage,
	timer,
	setTimeUp,
	handleReset,
	setInputSelected,
}) => {
	const [showStartPage, setShowStartPage] = useState(true);
	const [showScoreCard, setShowScoreCard] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	// const [localMemory, setLocalMemory] = useState("");
	const [cardResult, setCardResult] = useState("😁");

	// useEffect(() => {
	// 	localStorage.setItem("result", cardResult);
	// 	const result = localStorage.getItem("result");
	// 	setLocalMemory(result);
	// }, [cardResult]);

	useEffect(() => {
		if (window.innerWidth < 600) {
			if (score === 6) {
				setShowInputPage(true);
				setShowStartPage(false);
				setShowScoreCard(true);
				setShowConfetti(true);
				handleReset();
				setCardResult((prev) => {
					return [
						...prev,
						turns + " turns in " + Number(90 - timer) + " seconds",
					];
				});

				if (cardResult.length === 6) {
					setCardResult((prev) => {
						return [
							prev.shift(),
							turns + " turns in " + Number(90 - timer) + " seconds",
						];
					});
				}
			}
		} else {
			if (score === 8) {
				setShowInputPage(true);
				setShowStartPage(false);
				setShowScoreCard(true);
				setShowConfetti(true);
				handleReset();
				setCardResult((prev) => {
					return [
						...prev,
						turns + " turns in " + Number(90 - timer) + " seconds",
					];
				});

				if (cardResult.length === 6) {
					setCardResult((prev) => {
						return [
							prev.shift(),
							turns + " turns in " + Number(90 - timer) + " seconds",
						];
					});
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [score, turns]);

	const getInputValue = (event) => {
		event.preventDefault();
		const userValue = event.target.value;
		setInputValue(userValue);
	};

	const removeScoreCard = () => {
		setShowScoreCard(false);
		setShowInputPage(true);
		setShowStartPage(true);
		setShowConfetti(false);
		setCards(null);
		setQuery();
		reset();
		setScore(0);
		setTurns(0);
		setInputValue("");
	};

	useEffect(() => {
		if (timer === 0) {
			removeScoreCard();
			setTimeUp(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timer]);

	const setInput = (event) => {
		event.preventDefault();
		if (inputValue === "") {
			setError("Fill in The Input Field");

			setTimeout(() => {
				setError(false);
				setIsPending(false);
			}, 1000);
		} else {
			setIsPending(true);
			setQuery(inputValue);
			setInputSelected((prev) => !prev);

			// setTimeout(() => {
			// 	setIsPending(false);
			// }, 2000);
		}
	};

	return (
		ShowInputPage && (
			<div className="input">
				{showConfetti && <Confetti />}
				{showStartPage && (
					<div className="wrapper startPage">
						<p className="info">Choose a theme photo</p>
						<form onSubmit={(event) => setInput(event)}>
							<input
								value={inputValue}
								onChange={getInputValue}
								type="text"
								placeholder="Cars, Animals, Nature, Art. etc."
							/>
						</form>
						{error && (
							<div className="error">
								<h2>{error}</h2>
							</div>
						)}

						{isPending === false && error === false && (
							<div>
								<p className="instruction">Instruction:</p>
								<p className="intro">
									You are Given 90 Seconds to find all Matching Photos..
								</p>
							</div>
						)}
						<p className="name">CODE-DADI</p>
						<button
							onClick={(event) => {
								setInput(event);
							}}
							className="button"
						>
							Start
						</button>
					</div>
				)}
				{showScoreCard && (
					<div className="scorecard wrapper">
						<h3>Score Card</h3>
						<h4>The lower the Turns the better</h4>
						<div className="resultCard">
							{cardResult.map((result) => (
								<div className="result" key={Math.random()}>
									<h5>{result}</h5>
								</div>
							))}
						</div>

						<button
							onClick={() => {
								removeScoreCard();
							}}
							className="button"
						>
							Start
						</button>
					</div>
				)}
			</div>
		)
	);
};

export default GetInput;
