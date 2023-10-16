import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";


export default function Changepassword() {
	const color_scheme = useSelector(
			(state: RootState) => state.setting?.data?.color_scheme
		);
  return (
		<>
			<form className="px-[30px] mb-8">
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Change password at least once every Week
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
						Change password at least once every Month
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
						Change password at least once every 3 Months
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
						Change password at least once every 6 Months
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
						Change password at least once every Year
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
				<button
					className={`w-full ${
						color_scheme == "Red"
							? "bg-[#DC4C64]"
							: color_scheme == "Green"
							? "bg-[#14A44D]"
							: "bg-[#7A7A7A]"
					}  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
				>
					Save Password Settings
				</button>
			</form>
			;
		</>
	);
}
