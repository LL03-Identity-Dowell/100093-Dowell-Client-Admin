import {  useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import {  useEffect, useState } from "react";


export default function Operatingsystem() {
	const layerlist = [
		"layer1",
		"layer2",
		"layer3",
		"layer4",
		"layer5",
		"layer6",
	];
	const macos = useSelector(
		(state: RootState) => state.layer.os?.["Mac OS"] || ""
	);


	const [selectedmacos, setselectedmacos] = useState(macos);
	const macos_filterlist = layerlist.filter(
		(item) => item !== macos
	);

const linux = useSelector(
	(state: RootState) => state.layer.os?.["Linux"] || ""
);

const [selectedlinux, setselectedlinux] = useState(linux);
const linuxfilterlist = layerlist.filter((item) => item !== linux);

	
	const Windows = useSelector(
		(state: RootState) => state.layer.os?.["Windows"] || ""
	);

	const [selectedWindows, setselectedWindows] = useState(Windows);
	const Windowsfilterlist = layerlist.filter((item) => item !== Windows);

	const Android = useSelector(
		(state: RootState) => state.layer.os?.["Android"] || ""
	);

	const [selectedAndroid, setselectedAndroid] = useState(Android);
	const Androidfilterlist = layerlist.filter((item) => item !== Android);
	const Others = useSelector(
		(state: RootState) => state.layer.os?.["Others not listed above"] || ""
	);

	const [selectedOthers, setselectedOthers] = useState(Others);
	const Othersfilterlist = layerlist.filter((item) => item !== Others);
	
	useEffect(() => {
		setselectedmacos(macos);
		setselectedlinux(linux);
		setselectedWindows(Windows);
		setselectedAndroid(Android);
		setselectedOthers(Others);
	}, [macos, linux, Windows, Android, Others]);


	// const dispatch = useDispatch();


	// const handleSubmit = (
	// 	event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	// ) => {
	// 	event.preventDefault();

	// 	const postData = async () => {
	// 		try {
	// 			dispatch(getloaderstate(true));
	// 			const data = {
	// 				"username": "Jazz3650",
					
	// 			};

	// 			await axios.post(
	// 				"http://100093.pythonanywhere.com/api/settings/",
	// 				data
	// 			);

	// 			dispatch(
	// 				getsetting({
	// 					isSuccess: true,
	// 					data: {
	// 						...currentSetting,
	// 						maxtime_member: selectedmaxtime_member,
	// 						maxtime_user: selectedmaxtime_user,
	// 					},
	// 				})
	// 			);

	// 			dispatch(getloaderstate(false));
	// 		} catch (error) {
	// 			console.error(error);
	// 		}

	// 		// fetch product
	// 	};

	// 	// Call the API when the component mounts
	// 	postData();

	// 	// Make your API call here using the selectedLanguage value
	// 	// For example:
	// };

	

	return (
		<>
			<form className="px-[30px] mb-8">
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Windows
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedWindows(e.target.value)}
					>
						<option selected value={selectedWindows}>
							{selectedWindows}
						</option>
						{Windowsfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Mac OS
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedmacos(e.target.value)}
					>
						<option selected value={selectedmacos}>
							{selectedmacos}
						</option>
						{macos_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Linux
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedlinux(e.target.value)}
					>
						<option selected value={selectedlinux}>
							{selectedlinux}
						</option>
						{linuxfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Android
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedAndroid(e.target.value)}
					>
						<option selected value={selectedAndroid}>
							{selectedAndroid}
						</option>
						{Androidfilterlist.map((item, index) => (
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
					>
						<option selected value={selectedOthers}>
							{selectedOthers}
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
					
				>
					Save OS Settings
				</button>
			</form>
		</>
	);
}
