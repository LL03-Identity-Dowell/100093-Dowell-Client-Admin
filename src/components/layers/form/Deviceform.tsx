import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState, useEffect } from "react";

export default function Deviceform() {
const layerlist = ["layer1", "layer2", "layer3", "layer4", "layer5", "layer6"];
const LaptopDesktop = useSelector(
	(state: RootState) => state.layer.devices?.["Laptop/Desktop"] || ""
);

const [selectedLaptopDesktop, setselectedLaptopDesktop] =
	useState(LaptopDesktop);
const LaptopDesktopfilterlist = layerlist.filter(
	(item) => item !== LaptopDesktop
);

	
	const MobilePhone = useSelector(
		(state: RootState) => state.layer.devices?.["Mobile Phone"] || ""
	);

	const [selectedMobilePhone, setselectedMobilePhone] = useState(MobilePhone);
	const MobilePhonefilterlist = layerlist.filter(
		(item) => item !== MobilePhone
	);


	const TabletIpad = useSelector(
		(state: RootState) => state.layer.devices?.["Tablet/Ipad"] || ""
	);

	const [selectedTabletIpad, setselectedTabletIpad] = useState(TabletIpad);
	const TabletIpadfilterlist = layerlist.filter(
		(item) => item !== TabletIpad
	);


	const Others = useSelector(
		(state: RootState) => state.layer.devices?.["Others not listed above"] || ""
	);

	const [selectedOthers, setselectedOthers] = useState(Others);
	const Othersfilterlist = layerlist.filter((item) => item !== Others);


useEffect(() => {
	setselectedLaptopDesktop(LaptopDesktop);
	setselectedMobilePhone(MobilePhone);
	setselectedTabletIpad(TabletIpad)
	setselectedOthers(Others)
}, [LaptopDesktop, MobilePhone,TabletIpad,Others]);
	return (
		<>
			<form className="px-[30px] mb-8">
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Laptop/Desk top
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedLaptopDesktop(e.target.value)}
					>
						<option selected value={selectedLaptopDesktop}>
							{selectedLaptopDesktop}
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
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto" onChange={(e)=>setselectedMobilePhone(e.target.value)}>
						<option selected value={selectedMobilePhone}>
							{selectedMobilePhone}
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
						onChange={(e)=>setselectedTabletIpad(e.target.value)}
						
					>
						<option selected value={selectedTabletIpad}>
							{selectedTabletIpad}
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
				<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
					Save Device Settings
				</button>
			</form>
		</>
	);
}
