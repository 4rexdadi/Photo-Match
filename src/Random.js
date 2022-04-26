/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect, useRef } from "react";
import GetFetch from "./GetFetch";
import Getinput from "./Getinput";
import SingleCard from "./Singlecard";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Random = () => {
	const [audioOn, setAudioOn] = useState(false);
	const [turns, setTurns] = useState(0);
	const [score, setScore] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disable, setDisable] = useState(false);
	const ref = useRef(null);
	const {
		cards,
		isPending,
		setIsPending,
		setQuery,
		setPage,
		setCards,
		error,
		setError,
		inputValue,
		setInputValue,
		ShowInputPage,
		setShowInputPage,
		timer,
		setTimeUp,
		handleReset,
		setInputSelected,
	} = GetFetch();

	// const startOver = () => {
	// 	const res = Math.floor(Math.random() * cards.length);
	// 	setPage(res);
	// 	reset();
	// 	setTurns(0);
	// 	setCards(
	// 		cards.map((item) => {
	// 			return { ...item, matched: false };
	// 		})
	// 	);
	// };

	const reset = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setDisable(false);
	};

	const playMusic = () => {
		setAudioOn((prev) => !prev);
		ref.current.volume = 0.5;
	};

	useEffect(() => {
		if (audioOn) {
			ref.current.play();
		} else {
			ref.current.pause();
		}
	}, [audioOn]);

	const getChoice = (choice) => {
		if (!disable) {
			choiceOne ? setChoiceTwo(choice) : setChoiceOne(choice);
		}
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisable(true);
			if (choiceOne.src.medium === choiceTwo.src.medium) {
				setScore((prev) => prev + 1);
				setCards((prev) => {
					return prev.map((item) => {
						if (item.src.medium === choiceOne.src.medium) {
							return { ...item, matched: true };
						} else {
							return item;
						}
					});
				});
			} else {
			}

			setTurns((prev) => prev + 1);

			setTimeout(() => {
				reset();
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [choiceTwo]);

	return (
		<>
			{isPending && (
				<div className="loading">
					<div></div>
				</div>
			)}

			<h2 className="counter">
				<span>{timer}</span>

				<audio
					// autoPlay=""
					muted=""
					loop
					src="https://cdn.pixabay.com/download/audio/2022/03/18/audio_0ba466dc9d.mp3?filename=falkirk-meditative-ambient-soundscape-for-learning-and-relaxing-95404.mp3"
					type="audio/mp3"
					ref={ref}
				></audio>
				<div className="audioPlayer">
					{audioOn && <FaPause className="audioFont" onClick={playMusic} />}
					{!audioOn && <FaPlay className="audioFont" onClick={playMusic} />}
				</div>
				<span>{turns}</span>
			</h2>
			<div className="container">
				<Getinput
					setQuery={setQuery}
					setIsPending={setIsPending}
					isPending={isPending}
					error={error}
					setError={setError}
					inputValue={inputValue}
					setInputValue={setInputValue}
					score={score}
					turns={turns}
					reset={reset}
					setScore={setScore}
					setCards={setCards}
					setTurns={setTurns}
					ShowInputPage={ShowInputPage}
					setShowInputPage={setShowInputPage}
					timer={timer}
					setTimeUp={setTimeUp}
					handleReset={handleReset}
					setInputSelected={setInputSelected}
				/>
				{cards &&
					cards.map((card, index) => (
						<div className="card" key={index}>
							<SingleCard
								card={card}
								getChoice={getChoice}
								flipped={
									card === choiceOne || card === choiceTwo || card.matched
								}
							/>
						</div>
					))}
			</div>
		</>
	);
};

export default Random;
