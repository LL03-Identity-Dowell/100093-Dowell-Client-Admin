import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/Home";
import ClientAdmin from "./pages/admin/ClientAdmin";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import Setting from "./pages/settingpage/Setting";
import Organization from "./pages/organizationpage/organization";
import Exportfolio from "./pages/exportfolio";
import CountrySelector from "./components/Test";
import NotFound from "./pages/notfound/NotFound";
import Reports from "./pages/Reports";
import EditPortfolio from "./pages/EditPortfolio";

function App() {
  return (
		<>
			<BrowserRouter>
				<ScrollToTop />

				<Routes>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/" element={<ClientAdmin />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/org" element={<Organization />} />
					<Route path="/faq" element={<Faq />} />
					<Route path="/reports" element={<Reports />} />
					<Route path="/edit-portfolio" element={<EditPortfolio />} />
					<Route path="/setting" element={<Setting></Setting>} />
					<Route path="/exportfolio" element={<Exportfolio />} />
					<Route path="/*" element={<NotFound />} />

					{/* <Route path="/loader" element={} /> */}
					{/* <Routes path="/element" element={<Example />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
