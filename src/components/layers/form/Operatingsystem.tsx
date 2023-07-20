import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ChangeEvent, useState } from "react";

export default function Operatingsystem() {
	const os = useSelector((state: RootState) => state.layer.os);

	const mac = os.filter((item) => item.os == "Mac OS");
	const linux = os.filter((item) => item.os == "Linux");
	const windows = os.filter((item) => item.os == "Windows");
	const android = os.filter((item) => item.os == "Android");
	const ios = os.filter((item) => item.os == "IOS");
	const others = os.filter((item) => item.os == "Others not listed above");

	interface layerform {
		mac: string;
		linux: string;
		windows: string;
		android: string;
		ios: string;
		others: string;
	}

	const [formdata, setformdata] = useState<layerform>({
		mac: "..select",
		linux: "..select",
		windows: "..select",
		android: "..select",
		ios: "..select",
		others: "..select",
	});

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		setformdata({ ...formdata, [e.target.name]: e.target.value });
	};
	return (
		<>
			<form className="px-[30px] mb-8">
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Windows
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						name="windows"
						onChange={handleChange}
						value={formdata.windows}
					>
						<option value="..select">..select</option>
						{windows.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
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
						name="mac"
						value={formdata.mac}
						onChange={handleChange}
					>
						<option value="..select">..select</option>
						{mac.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
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
						name="linux"
						value={formdata.linux}
						onChange={handleChange}
					>
						<option value="..select">..select</option>
						{linux.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
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
						name="android"
						value={formdata.android}
						onChange={handleChange}
					>
						<option value="..select">..select</option>
						{android.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
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
						name="others"
						value={formdata.others}
						onChange={handleChange}

					>
						<option value="..select">..select</option>
						{others.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
					Save OS Settings
				</button>
			</form>
		</>
	);
}
