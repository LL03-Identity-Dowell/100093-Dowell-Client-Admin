import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import "./styles/global.css";
// import Home from "./pages/Home";
import ClientAdmin from "./pages/ClientAdmin";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import Setting from "./pages/settingpage/Setting";

function App() {
  return (
		<>
			<BrowserRouter>
				<ScrollToTop />

				<Routes>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/" element={<ClientAdmin />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/faq" element={<Faq />} />
					<Route path="/setting" element={<Setting />} />

					{/* <Routes path="/element" element={<Example />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
