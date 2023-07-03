
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState } from "react";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { getloaderstate } from "../../../store/slice/loaderstate";

const Settingform11 = () => {

const color_scheme = useSelector((state: RootState) => state.setting?.data?.color_scheme);
const currentSetting = useSelector((state: RootState) => state.setting?.data);

const color_schemelist = ["Blue", "Green", "Red"];

const color_schemelistfilter = color_schemelist.filter(
	(item) => item !== color_scheme
);


const [selectedcolor_scheme, setSelectedcolor_scheme] = useState(color_scheme);

	const dispatch=useDispatch()

const handleSubmit = (
	event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
	event.preventDefault();

const postData = async () => {
	try {
		

dispatch(getloaderstate(true));

		const data = {
			username: "Jazz3650",
			colour_patterns: selectedcolor_scheme
		};

		await axios.post(
			"http://100093.pythonanywhere.com/api/settings/",
			data
		);

		dispatch(
			getsetting({
				isSuccess: true,
				data: {
					...currentSetting,
					color_scheme: selectedcolor_scheme,
				},
			})
		);
		dispatch(getloaderstate(false));

		
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
			<div className="form-item">
				<div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
					Set colour for client admin
				</div>
				<form
					action=""
					className="p-3 border-[1px] border-[#61CE70] border-solid"
				>
					<div className="w-full mb-3">
						<label
							htmlFor=""
							className="text-[18px] font-semibold text-[#7A7A7A]"
						>
							Colour Scheme
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							
							onChange={(e) => setSelectedcolor_scheme(e.target.value)}
							aria-label="Default select example"
						>
							<option selected value={selectedcolor_scheme}>
								{selectedcolor_scheme}
							</option>
							{color_schemelistfilter.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>

					<div className="w-full mb-1">
						<button
							className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md"
						onClick={handleSubmit}
						
						>
							Set Colour Scheme
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform11;

