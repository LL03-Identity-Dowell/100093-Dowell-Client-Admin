
import Layout from "../../components/layout";

import { useEffect, useState } from "react";
import Settingform1 from "./forms/Settingform1";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getsetting } from "../../store/slice/setting";
import Settingform2 from "./forms/settingform2";
import Settingform3 from "./forms/settingform3";
import Settingform4 from "./forms/settingform4";
import Settingform5 from "./forms/settingform5";
import Settingform6 from "./forms/settingform6";
import Settingform7 from "./forms/settingform7";
import Settingform8 from "./forms/settingform8";
import Settingform9 from "./forms/settingform9";
import Settingform10 from "./forms/settingform10";
import Settingform11 from "./forms/settingform11";

import { getloaderstate } from "../../store/slice/loaderstate";
import { RootState } from "../../store/Store";
import Loader from "../whiteloader";
import { getproducts } from "../../store/slice/products";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
const ClientAdmin = () => {
	const show_loader = useSelector((state: RootState) => state.loaderslice);
	
	// const [isSubmenuHidden, setSubmenuHidden] = useState(true);
	// const toggleSubmenu = () => {
	// 	setSubmenuHidden(!isSubmenuHidden);
	// };

	
	const usedispatch = useDispatch();
	
	useEffect(() => {
		// Function to call the API

		
		const fetchData = async () => {
			try {
				const data = {
					username: "Jazz3650",
				};

				const response = await axios.post(
					"http://100093.pythonanywhere.com/api/settings/",
					data
				);

				usedispatch(getsetting(response.data));
console.log(response.data)
				
			} catch (error) {
				console.error(error);
			}
			// fetch product
			try {
				const data = {
					username: "uxliveadmin",
				};

				const response = await axios.post(
					"http://100093.pythonanywhere.com/api/getproducts/",
					data
				);

				usedispatch(getproducts(response.data));

				usedispatch(getloaderstate(false));
			} catch (error) {
				console.error(error);
			}

			// fetch product
		};

		// Call the API when the component mounts
		fetchData();
	},[]); // The empty dependency array ensures that the effect runs only once

	return (
		<>
			<Layout>
				<main className="container mx-auto mb-20 lg:px-0 px-4">
					<Header></Header>

					<section className="mt-4 flex lg:flex-row flex-col-reverse gap-4">
						<Sidebar></Sidebar>

						{
							show_loader==false?<div className="lg:w-3/4">
							<div className="py-[40px] px-[30px] w-full lg:flex gap-8">
								<div className="lg:w-1/2">
									<Settingform1></Settingform1>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>

									<Settingform2></Settingform2>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>

									<Settingform3></Settingform3>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>

									<Settingform4></Settingform4>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>

									<Settingform5></Settingform5>
								</div>
								<div className="lg:w-1/2">
									<Settingform6></Settingform6>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>
									<Settingform7></Settingform7>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>
									<Settingform8></Settingform8>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>
									<Settingform9></Settingform9>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>
									<Settingform10></Settingform10>
									<div className="w-100 bg-[red] h-[2px] my-8"></div>
									<Settingform11></Settingform11>
								</div>
							</div>
						</div>:<Loader></Loader>
						}
					</section>
				</main>
			</Layout>
		</>
	);
};

export default ClientAdmin;
