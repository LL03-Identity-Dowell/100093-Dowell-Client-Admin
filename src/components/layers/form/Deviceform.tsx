import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ChangeEvent, useState } from "react";

export default function Deviceform() {
	const devices = useSelector((state: RootState) => state.layer.devices);
	
	const LaptopDesktop = devices.filter(
		(item) => item.devices == "Laptop/Desk top"
	);
	const TabletIpad = devices.filter((item) => item.devices == "Tablet / Ipad")
	const Mobile_Phone = devices.filter((item) => item.devices == "Mobile Phone");
	
	const others = devices.filter(
		(item) => item.devices == "Others not listed above"
	);

interface deviceform {
	laptopdesktop: string;
	mobilephone: string;
	tabletipad: string;
	others: string;
	
	
}

	const [formdata, setformdata] = useState<deviceform>({
		laptopdesktop: "..select",
	mobilephone: "..select",
	tabletipad: "..select",
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
						Laptop/Desk top
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						name="laptopdesktop"
						value={formdata.laptopdesktop}
						onChange={handleChange}
					>
						<option value="..select">..select</option>
						{LaptopDesktop.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
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
						name="mobilephone"
						onChange={handleChange}
						value={formdata.mobilephone}
					>
						<option value="..select">..select</option>
						{Mobile_Phone.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
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
						name="tabletipad"
						value={formdata.tabletipad}
						onChange={handleChange}
					>
						<option value="..select">..select</option>
						{TabletIpad.map((item, index) => (
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
					Save Device Settings
				</button>
			</form>
		</>
	);
}
