import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
	
	FaRegGem,
	
} from "react-icons/fa";
import { useState, useEffect } from "react";

import Products from "./products/Products";

import { useDispatch } from "react-redux";
import axios from "axios";
import { getAdminData } from "../store/slice/adminData";
import { getloaderstate } from "../store/slice/loaderstate";

const Otherorgtab = () => {
	const [tabIndex, setTabIndex] = useState(-1);

	const tabTitle = [
		{
			title: "Products",
			icon: <FaRegGem />,
		}
	];

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = {
					username: "Jazz3650",
				};
				const response = await axios.post(
					"https://100093.pythonanywhere.com/api/get_data/",
					data
				);
				console.log(response.data, "admin data");

				dispatch(getAdminData(response.data));

				dispatch(getloaderstate(false));
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			<Tabs
				className=""
				selectedTabClassName="bg-[#61CE70] text-white"
				selectedIndex={tabIndex}
				onSelect={(index) => setTabIndex(index)}
			>
				<TabList className="grid lg:grid-cols-3 grid-cols-1 gap-4">
					{tabTitle.map((tabs) => {
						return (
							<Tab
								key={tabs.title}
								className="w-full card-shadow h-12 flex items-center px-8 text-[#7a7a7a] gap-x-20 border border-[#7a7a7a] rounded-lg hover:bg-[#61CE70] hover:text-white cursor-pointer outline-none"
							>
								<i className="text-[#4CAF50] text-xl font-black">{tabs.icon}</i>
								<p className="font-roboto text-lg">{tabs.title}</p>
							</Tab>
						);
					})}
				</TabList>
				<TabPanel>
					<Products />
				</TabPanel>
				
			</Tabs>
		</div>
	);
};

export default Otherorgtab;
