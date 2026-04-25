import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorBoundary } from "react-error-boundary";
import { CssBaseline } from "@mui/material";

import "./index.scss";
import colors from "./_colors.scss";
import "react-table-6/react-table.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import AdminOnly from "./components/AdminOnly.js";
import Protected from "./components/Protected.js";
import GuestOnly from "./components/GuestOnly.js";
import ErrorFallback from "./components/ErrorFallback.js";
import Snackbar from "./components/Snackbar.js";
import NotFound from "./screens/NotFound.js";
import SignIn from "./screens/SignIn.js";
import ForgotPassword from "./screens/ForgotPassword.js";
import ResetPassword from "./screens/ResetPassword.js";
import SignUp from "./screens/SignUp.js";
import InvitedSignUp from "./screens/InvitedSignUp.js";
import Auth from "./screens/Auth.js";
import Users from "./screens/Users.js";
import Dashboard from "./screens/Dashboard.js";
import Dashboard1 from "./screens/Dashboard1.js";
import Dashboard2 from "./screens/Dashboard2.js";
import Profile from "./screens/Profile.js";
import { adjustColors, jwt, colorSuggestions } from "./utils/index.js";
import Map from "./components/Map.js";
import useGlobalState from "./use-global-state.js";

const createAppTheme = (darkMode) => createTheme({
	palette: {
		mode: darkMode ? "dark" : "light",
		primary: { main: darkMode ? "#64B5F6" : colors.primary },
		secondary: { main: darkMode ? "#4DD0E1" : (colors.secondary || colorSuggestions.secondary) },
		third: { main: darkMode ? "#F48FB1" : (colors.third || colorSuggestions.third) },

		primaryLight: { main: darkMode ? "#90CAF9" : adjustColors(colors.primary, 100) },
		primaryDark: { main: darkMode ? "#42A5F5" : adjustColors(colors.primary, -80) },
		secondaryLight: { main: darkMode ? "#80DEEA" : adjustColors(colors.secondary || colorSuggestions.secondary, 100) },
		secondaryDark: { main: darkMode ? "#26C6DA" : adjustColors(colors.secondary || colorSuggestions.secondary, -80) },
		thirdLight: { main: darkMode ? "#F8BBD0" : adjustColors(colors.third || colorSuggestions.third, 100) },
		thirdDark: { main: darkMode ? "#F06292" : adjustColors(colors.third || colorSuggestions.third, -80) },

		success: { main: darkMode ? "#81C784" : colors.success },
		error: { main: darkMode ? "#E57373" : colors.error },
		warning: { main: darkMode ? "#FFB74D" : colors.warning },
		info: { main: darkMode ? "#64B5F6" : colors.info },

		dark: { main: colors.dark },
		light: { main: colors.light },
		grey: { main: darkMode ? "#616161" : colors.grey },
		greyDark: { main: darkMode ? "#424242" : colors.greyDark },
		green: { main: darkMode ? "#66BB6A" : colors.green },
		white: { main: "#ffffff" },

		background: {
			default: darkMode ? "#121212" : "#ffffff",
			paper: darkMode ? "#1e1e1e" : "#ffffff",
		},
		text: {
			primary: darkMode ? "rgba(255, 255, 255, 0.87)" : "rgba(0, 0, 0, 0.87)",
			secondary: darkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
		},
	},
});

const App = () => {
	const location = useLocation();
	const [authenticated, setAuthenticated] = useState(false);
	const darkMode = useGlobalState((state) => state.darkMode);
	const theme = createAppTheme(darkMode);

	useEffect(() => {
		setAuthenticated(jwt.isAuthenticated());
	}, [location]);

	return (
		<StyledEngineProvider injectFirst>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Header isAuthenticated={authenticated} />
						<main style={{ position: "relative", zIndex: 0, height: `calc(100vh - ${authenticated ? "160" : "70"}px)` }}>
							<Routes>
								<Route index element={<GuestOnly c={<SignIn />} />} />
								<Route path="auth" element={<GuestOnly c={<Auth />} />} />
								<Route path="forgot-password" element={<GuestOnly c={<ForgotPassword />} />} />
								<Route path="reset-password" element={<GuestOnly c={<ResetPassword />} />} />
								<Route path="sign-up" element={<GuestOnly c={<SignUp />} />} />
								<Route path="register" element={<GuestOnly c={<InvitedSignUp />} />} />
								<Route path="users" element={<AdminOnly c={<Users />} />} />
								<Route path="dashboard" element={<Protected c={<Dashboard />} />} />
								<Route path="dashboard1" element={<Protected c={<Dashboard1 />} />} />
								<Route path="dashboard2" element={<Protected c={<Dashboard2 />} />} />
								<Route path="map" element={<Protected c={<Map />} />} />						<Route path="profile" element={<Protected c={<Profile />} />} />								<Route path="*" element={<NotFound />} />
							</Routes>
						</main>
						{authenticated && <Footer />}
						<Snackbar />
					</LocalizationProvider>
				</ErrorBoundary>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<Router>
		<App />
	</Router>,
);
