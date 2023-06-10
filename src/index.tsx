import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import "./styles.css";
import { SkeletonTheme } from "react-loading-skeleton";
import App from "./App";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
		<Provider store={store}>
			<Router>
			<SkeletonTheme baseColor="#374151" highlightColor="#6b7280">
				<App />
			</SkeletonTheme>
			</Router>
		</Provider>
	// {/* </React.StrictMode> */}
);
