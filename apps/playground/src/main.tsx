import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Box, Theme } from "@radix-ui/themes";
import "@radix-extra/combobox/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Box height="100%" asChild>
			<Theme accentColor="crimson" appearance="inherit" scaling="100%">
				<App />
			</Theme>
		</Box>
	</React.StrictMode>,
);
