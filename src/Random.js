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
		ref.current.volume = 0.2;
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
					src="https://rr2---sn-xgmnpoxuopp-puhe.googlevideo.com/videoplayback?expire=1650941292&ei=DAlnYqiLFOXWxN8P2oOEiAU&ip=219.100.37.245&id=o-AM2pM-Rx6CbxZoC7LpTN_3UVp1n9c4T4YxDdzPQEda-l&itag=140&source=youtube&requiressl=yes&mh=eE&mm=31%2C29&mn=sn-xgmnpoxuopp-puhe%2Csn-3pm7dn7d&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=92500&spc=4ocVC6uIb80HhkYem_Q4LrcFHH9G&vprv=1&mime=audio%2Fmp4&ns=eGxAWm6atXM6u5P3x1lBFGIG&gir=yes&clen=188292481&dur=11634.520&lmt=1636210665719759&mt=1650919252&fvip=1&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5532434&n=p9bdVmPBnUyMVQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgJah0hLnlX2RqymeqEWCXr7YuklTbnKY9KiQhE_ooF5ICIFEflDhXOvQMcPyG4G16EgO4br_GNetnFe5LZu3G113l&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAJABFYhUjSFl1MMXm8-sbpnIhtKEMR1wftdJG2kU6sBdAiEA0B7pbOahjaPlFdPDSU6e9g_hMcNMeKFQv-Rk3EiAPRA%3D"
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
