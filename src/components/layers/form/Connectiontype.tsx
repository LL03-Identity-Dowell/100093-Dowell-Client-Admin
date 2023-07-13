

export default function Connectiontype() {
  return (
		<>
			<form className="px-[30px] mb-8">
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Mobile Data
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
						<option>Layer 1 </option>
						<option> Layer 2 </option>
						<option>Layer 3 </option>
						<option>Layer 4 </option>
						<option>Layer 5 </option>
						<option>Layer 6 </option>
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Office Wifi/Secured Wifi
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
						<option>Layer 1 </option>
						<option> Layer 2 </option>
						<option>Layer 3 </option>
						<option>Layer 4 </option>
						<option>Layer 5 </option>
						<option>Layer 6 </option>
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Public Wifi
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
						<option>Layer 1 </option>
						<option> Layer 2 </option>
						<option>Layer 3 </option>
						<option>Layer 4 </option>
						<option>Layer 5 </option>
						<option>Layer 6 </option>
					</select>
				</div>

				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Others not listed above
					</label>
					<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
						<option>Layer 1 </option>
						<option> Layer 2 </option>
						<option>Layer 3 </option>
						<option>Layer 4 </option>
						<option>Layer 5 </option>
						<option>Layer 6 </option>
					</select>
				</div>
				<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
					Save Internet Settings
				</button>
			</form>
		</>
	);
}
