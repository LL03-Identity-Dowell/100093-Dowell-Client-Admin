
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/Store";

const Settingform11 = () => {

const color_scheme = useSelector((state: RootState) => state.setting?.data?.color_scheme);

const color_schemelist = ["Blue", "Green", "Red"];

const color_schemelistfilter = color_schemelist.filter(
	(item) => item !== color_scheme
);


    return (
			<div className="form-item">
				<div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">Set colour for client admin</div>
				<form action="" className="p-3 border-[1px] border-[#61CE70] border-solid">
					<div className="w-full mb-3">
						<label htmlFor="" className="text-[18px] font-semibold text-[#7A7A7A]">
							Colour Scheme
						</label>
						<select className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md" aria-label="Default select example">
							<option selected value={color_scheme}>
								{color_scheme}
							</option>
							{color_schemelistfilter.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>

					<div className="w-full mb-1">
						<button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">Set Colour Scheme</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform11;
