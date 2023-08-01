import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import { getlayercontype } from "../../../store/slice/layers";
import { toast } from 'react-toastify';


export default function Connectiontype() {

	const adminusername = useSelector(
		(state: RootState) => state.userinfo.userinfo.username
	);

	const [defaultusername, setdefaultusername] = useState(adminusername);

	useEffect(() => {
		setdefaultusername(adminusername);
	}, [adminusername]);

	const layerlist = ["layer1", "layer2", "layer3", "layer4", "layer5", "layer6"];


	const Others = useSelector(
		(state: RootState) => state.layer.con_type?.["Others not listed above"] || ""
	);

	const [selectedOthers, setselectedOthers] = useState(Others);
	const Others_filterlist = layerlist.filter((item) => item !== Others);



	const OfficeWifi = useSelector(
		(state: RootState) => state.layer.con_type?.["Office Wifi/Secured Wifi"] || ""
	);

	const [selectedOfficeWifi, setselectedOfficeWifi] = useState(OfficeWifi);
	const OfficeWifi_filterlist = layerlist.filter((item) => item !== OfficeWifi);



	const PublicWifi = useSelector(
		(state: RootState) => state.layer.con_type?.["Public Wifi"] || ""
	);

	const [selectedPublicWifi, setselectedPublicWifi] = useState(PublicWifi);
	const PublicWifi_filterlist = layerlist.filter((item) => item !== PublicWifi);


	const MobileData = useSelector(
		(state: RootState) => state.layer.con_type?.["Mobile Data"] || ""
	);

	const [selectedMobileData, setselectedMobileData] = useState(MobileData);
	const MobileData_filterlist = layerlist.filter((item) => item !== MobileData);

	useEffect(() => {
		setselectedOthers(Others);
		setselectedMobileData(MobileData);
		setselectedOfficeWifi(OfficeWifi);
		setselectedPublicWifi(PublicWifi);
	}, [Others, MobileData, OfficeWifi, PublicWifi]);



	const dispatch = useDispatch();
	const handleSubmit = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		const postData = async () => {
			const data = {
				username: defaultusername,
				category: "connection_type",
				data: {
					"Mobile Data": selectedMobileData,
					"Office Wifi/Secured Wifi": selectedOfficeWifi,
					"Public Wifi": selectedPublicWifi,
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
					getlayercontype({
						"Mobile Data": selectedMobileData,
						"Office Wifi/Secured Wifi": selectedOfficeWifi,
						"Public Wifi": selectedPublicWifi,
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
						Mobile Data
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedMobileData(e.target.value)}
						value={selectedMobileData}
					>
						<option selected value={MobileData}>
							{MobileData}
						</option>
						{MobileData_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Office Wifi/Secured Wifi
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedOfficeWifi(e.target.value)}
						value={selectedOfficeWifi}
					>
						<option selected value={OfficeWifi}>
							{OfficeWifi}
						</option>
						{OfficeWifi_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Public Wifi
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedPublicWifi(e.target.value)}
						value={selectedPublicWifi}
					>
						<option selected value={PublicWifi}>
							{PublicWifi}
						</option>
						{PublicWifi_filterlist.map((item, index) => (
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
						{Others_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto" onClick={handleSubmit}>
					Save Internet Settings
				</button>
			</form>
		</>
	);
}
