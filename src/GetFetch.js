/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";

const GetFetch = () => {
	const [timer, setTimer] = useState(90);
	const countRef = useRef(null);
	const [ShowInputPage, setShowInputPage] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [cards, setCards] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState();
	const [per_page, setPer_page] = useState("8");
	const [page, setPage] = useState(Math.floor(Math.random() * 10) + 1);
	const [timeUp, setTimeUp] = useState(false);
	const [inputSelected, setInputSelected] = useState(false);

	const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}&orientation=square`;

	const handleStart = () => {
		countRef.current = setInterval(() => {
			setTimer((timer) => timer - 1);
		}, 1000);
	};

	const handleReset = () => {
		if (timer < 90) {
			clearInterval(countRef.current);
			setTimer(90);
		}
	};

	useEffect(() => {
		if (window.innerWidth < 600) {
			setPer_page("6");
		} else {
			setPer_page("8");
		}
	}, []);

	useEffect(() => {
		const duplicateCard = () => {
			setCards((prev) => {
				return [...prev, ...prev].sort(() => Math.random() - 0.5);
			});

			setCards((prev) => {
				return prev.map((item) => {
					return { ...item };
				});
			});
		};

		fetch(url, {
			headers: {
				Authorization:
					"563492ad6f917000010000016a1d3df8bafc4a9b93cde77048e3ff01",
			},
		})
			.then((res) => {
				if (!res.status) {
					throw Error("unable to fetch data");
				} else {
					return res.json();
				}
			})
			.then((data) => {
				if (inputValue === "") {
					throw Error(
						timeUp ? "😔  Time-up try again" : "Put in a Theme Photo"
					);
				} else {
					if (data.total_results < 80 && data) {
						throw Error(
							`No ${inputValue} Photos, Try Oceans, Color, People, Paint etc...`
						);
					} else {
						setCards(
							data.photos.map((item) => {
								return { ...item, matched: false };
							})
						);
						setError(false);
						setIsPending(false);
						duplicateCard();
						setShowInputPage(false);
						handleStart();
						handleReset();
						setTimeUp(false);
					}
				}
			})
			.catch((err) => {
				setIsPending(false);
				setError(err.message);
				setTimeout(() => {
					setError(false);
				}, 2000);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, inputSelected]);

	return {
		cards,
		isPending,
		setQuery,
		setPage,
		setCards,
		setIsPending,
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
	};
};

export default GetFetch;
