import React from "react";
import "./App.css";
import Random from "./Random";

function App() {
	return (
		<div>
			<div className="breakPoint">
				<h2>
					SCREEN SIZE TOO SMALL. <br />
					REVISIT ON LARGER DEVICES 🙏
				</h2>
			</div>
			<div className="App">
				<h1>Photo Match</h1>
				<Random />
			</div>
		</div>
	);
}

export default App;
