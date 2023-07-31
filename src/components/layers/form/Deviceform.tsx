import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getlayerdevices } from "../../../store/slice/layers";
import axios from "axios";

export default function Deviceform() {
const adminusername = useSelector(
	(state: RootState) => state.userinfo.userinfo.username
);

const [defaultusername, setdefaultusername] = useState(adminusername);

useEffect(() => {
	setdefaultusername(adminusername);
}, [adminusername]);

const layerlist = ["layer1", "layer2", "layer3", "layer4", "layer5", "layer6"];
const LaptopDesktop = useSelector(
	(state: RootState) => state.layer.devices?.["Laptop/Desktop"] 
);

const [selectedLaptopDesktop, setselectedLaptopDesktop] =
	useState(LaptopDesktop);
const LaptopDesktopfilterlist = layerlist.filter(
	(item) => item !== LaptopDesktop
);

	
	const MobilePhone = useSelector(
		(state: RootState) => state.layer.devices?.["Mobile Phone"] 
	);

	const [selectedMobilePhone, setselectedMobilePhone] = useState(MobilePhone);
	const MobilePhonefilterlist = layerlist.filter(
		(item) => item !== MobilePhone
	);


	const TabletIpad = useSelector(
		(state: RootState) => state.layer.devices?.["Tablet/Ipad"] 
	);

	const [selectedTabletIpad, setselectedTabletIpad] = useState(TabletIpad);
	const TabletIpadfilterlist = layerlist.filter(
		(item) => item !== TabletIpad
	);


	const Others = useSelector(
		(state: RootState) => state.layer.devices?.["Others not listed above"] 
	);

	const [selectedOthers, setselectedOthers] = useState(Others);
	const Othersfilterlist = layerlist.filter((item) => item !== Others);


useEffect(() => {
	setselectedLaptopDesktop(LaptopDesktop);
	
	setselectedMobilePhone(MobilePhone);
	setselectedTabletIpad(TabletIpad)
	setselectedOthers(Others)
}, [LaptopDesktop, MobilePhone,TabletIpad,Others]);

	
const dispatch = useDispatch();
const handleSubmit = (
	event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
	event.preventDefault();

	const postData = async () => {
		const data = {
			"username": defaultusername,
			"category": "devices",
			"data": {
				"Laptop/Desktop": selectedLaptopDesktop,
				"Mobile Phone": selectedMobilePhone,
				"Tablet/Ipad": selectedTabletIpad,
				"Others not listed above": selectedOthers,
			},
		};

		try {
			// dispatch(getloaderstate(true));

			await axios.post(
				"https://100093.pythonanywhere.com/api/save_device_layers/",
				data
			);

			dispatch(
				getlayerdevices({
					"Laptop/Desktop": selectedLaptopDesktop,
					"Mobile Phone": selectedMobilePhone,
					"Tablet/Ipad": selectedTabletIpad,
					"Others not listed above": selectedOthers,
				})
			);
			toast.success("success");
			// dispatch(getloaderstate(false));
		} catch (error) {
			console.error(error);
		}

		// fetch product
	};

	// Call the API when the component mounts
	postData();

	// Make your API call here using the selectedLanguage value
	// For example:
};


	
	
	return (
		<>
			<ToastContainer position="top-right" />
			<form className="px-[30px] mb-8">
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Laptop/Desk top
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedLaptopDesktop(e.target.value)}
						value={selectedLaptopDesktop}
					>
						<option selected value={LaptopDesktop}>
							{LaptopDesktop}
						</option>
						{LaptopDesktopfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Mobile Phone
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedMobilePhone(e.target.value)}
						value={selectedMobilePhone}
					>
						<option selected value={MobilePhone}>
							{MobilePhone}
						</option>
						{MobilePhonefilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Tablet / Ipad
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedTabletIpad(e.target.value)}
						value={selectedTabletIpad}
					>
						<option selected value={TabletIpad}>
							{TabletIpad}
						</option>
						{TabletIpadfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Others not listed above
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedOthers(e.target.value)}
						value={selectedOthers}
					>
						<option selected value={Others}>
							{Others}
						</option>
						{Othersfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<button
					className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto"
					onClick={handleSubmit}
				>
					Save Device Settings
				</button>
			</form>
		</>
	);
}
