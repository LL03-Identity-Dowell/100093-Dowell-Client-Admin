import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { getlayerpasswordstrength } from "../../../store/slice/layers";
import axios from "axios";


export default function Passwordstrenght() {

	const layerlist = [
		"layer1",
		"layer2",
		"layer3",
		"layer4",
		"layer5",
		"layer6",
	];
	const ch8 = useSelector(
		(state: RootState) =>
			state.layer.password_strength?.["Minimum 8 characters"] || ""
	);

	const [selectedch8, setselectedch8] = useState(ch8);
	const ch8_filterlist = layerlist.filter((item) => item !== ch8);


	const ch10 = useSelector(
		(state: RootState) =>
			state.layer.password_strength?.["Minimum 10 characters"] || ""
	);

	const [selectedch10, setselectedch10] = useState(ch10);
	const ch10_filterlist = layerlist.filter((item) => item !== ch10);


	const ch12 = useSelector(
		(state: RootState) =>
			state.layer.password_strength?.["Minimum 12 characters"] || ""
	);

	const [selectedch12, setselectedch12] = useState(ch12);
	const ch12_filterlist = layerlist.filter((item) => item !== ch12);



	const ch16 = useSelector(
		(state: RootState) =>
			state.layer.password_strength?.["Minimum 16 characters"] || ""
	);

	const [selectedch16, setselectedch16] = useState(ch16);
	const ch16_filterlist = layerlist.filter((item) => item !== ch16);



	const Others = useSelector(
		(state: RootState) => state.layer.password_strength?.["Others not listed above"] || ""
	);

	const [selectedOthers, setselectedOthers] = useState(Others);
	const Othersfilterlist = layerlist.filter((item) => item !== Others);



	useEffect(() => {
		setselectedch8(ch8);
		setselectedch10(ch10)
		setselectedch12(ch12)
		setselectedch16(ch16)
		setselectedOthers(Others)
	}, [ch8, ch10, ch12, ch16, Others]);


	const dispatch = useDispatch();
	const handleSubmit = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		const postData = async () => {
			const data = {
				username: "Jazz3650",
				category: "password_strength",
				data: {
					"Minimum 8 characters": selectedch8,
					"Minimum 10 characters": selectedch10,
					"Minimum 12 characters": selectedch12,
					"Minimum 16 characters": selectedch16,
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
					getlayerpasswordstrength({
						"Minimum 8 characters": selectedch8,
						"Minimum 10 characters": selectedch10,
						"Minimum 12 characters": selectedch12,
						"Minimum 16 characters": selectedch16,
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
						Minimum 8 characters
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedch8(e.target.value)}
						value={selectedch8}
					>
						<option selected value={ch8}>
							{ch8}
						</option>
						{ch8_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Minimum 10 characters
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedch10(e.target.value)}
						value={selectedch10}
					>
						<option selected value={ch10}>
							{ch10}
						</option>
						{ch10_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Minimum 12 characters
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedch12(e.target.value)}
						value={selectedch12}
					>
						<option selected value={ch12}>
							{ch12}
						</option>
						{ch12_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Minimum 16 characters
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedch16(e.target.value)}
						value={selectedch16}
					>
						<option selected value={ch16}>
							{ch16}
						</option>
						{ch16_filterlist.map((item, index) => (
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
				<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto" onClick={handleSubmit}>
					Save Password Settings
				</button>
			</form>
		</>
	);
}
