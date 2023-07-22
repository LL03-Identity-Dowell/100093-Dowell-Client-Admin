import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ChangeEvent, useState } from "react";


export default function Browsers() {

		const browsers = useSelector((state: RootState) => state.layer.browsers);

		const Chrome = browsers.filter((item) => item.browsers == "Chrome");
		const Safari = browsers.filter((item) => item.browsers == "Safari");
		const Bing = browsers.filter((item) => item.browsers == "Bing");
		const Firefox = browsers.filter((item) => item.browsers == "Firefox");
		const Edge = browsers.filter((item) => item.browsers == "Edge");
		const Opera = browsers.filter((item) => item.browsers == "Opera");
		const others = browsers.filter(
			(item) => item.browsers == "Others not listed above"
		);

		interface layerform {
			Chrome: string;
			Safari: string;
			Bing: string;
			Firefox: string;
			Edge: string;
			Opera: string;
			others: string;
		}

		const [formdata, setformdata] = useState<layerform>({
			Chrome: "..select",
			Safari: "..select",
			Bing: "..select",
			Firefox: "..select",
			Edge: "..select",
			Opera: "..select",
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
						Chrome
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						value={formdata.Chrome}
						onChange={handleChange}
						name="Chrome"
					>
						<option value="..select">..select</option>
						{Chrome.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Safari
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto" onChange={handleChange} name="Safari" value={formdata.Safari}>
						<option value="..select">..select</option>
						{Safari.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Bing
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto" value={formdata.Bing} onChange={handleChange} name="Bing">
						<option value="..select">..select</option>
						{Bing.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Firefox
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto" name="Firefox" onChange={handleChange} value={formdata.Firefox}>
						<option value="..select">..select</option>
						{Firefox.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Edge
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto" value={formdata.Edge} onChange={handleChange} name="Edge">
						<option value="..select">..select</option>
						{Edge.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Opera
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto" value={formdata.Opera} name="Opera" onChange={handleChange}>
						<option value="..select">..select</option>
						{Opera.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#756464] text-lg font-roboto font-bold ">
						Others not listed above
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto" value={formdata.others} onChange={handleChange}
					name="others">
						<option value="..select">..select</option>
						{others.map((item, index) => (
							<option key={index} value={item.layer}>
								{item.layer}
							</option>
						))}
					</select>
				</div>
				<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
					Save Browser Settings
				</button>
			</form>
		</>
	);
}
