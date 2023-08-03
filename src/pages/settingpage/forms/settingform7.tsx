
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState, useEffect } from "react";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { getloaderstate } from "../../../store/slice/loaderstate";

const Settingform7 = () => {

	const defaultlang = useSelector(
		(state: RootState) => state.setting?.data?.default_language
	);
	const currentSetting = useSelector((state: RootState) => state.setting?.data);
	
	
	const [selectedLanguage, setSelectedLanguage] = useState(defaultlang);

	const workspacelist = ["Spanish", "Hindi", "English"];

	const filterlang = workspacelist.filter((item) => item !== defaultlang);



const adminusername = useSelector(
	(state: RootState) => state.userinfo.userinfo.username
);

const [defaultusername, setdefaultusername] = useState(adminusername);

useEffect(() => {
	setdefaultusername(adminusername);
}, [adminusername]);

	const dispatch=useDispatch()


const handleSubmit = (
	event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
	event.preventDefault();

const postData = async () => {
	try {
		

dispatch(getloaderstate(true));

		const data = {
			username: defaultusername,
			selected_language: selectedLanguage,
		};

		await axios.post(
			"https://100093.pythonanywhere.com/api/settings/",
			data
		);

		dispatch(
			getsetting({
				isSuccess: true,
				data: {
					...currentSetting,
					default_language: selectedLanguage,
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
					Set Language for owner
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
							Languages
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							value={selectedLanguage}
							onChange={(e) => setSelectedLanguage(e.target.value)}
							aria-label="Default select example"
						>
							<option selected value={defaultlang}>
								{defaultlang}
							</option>
							{filterlang.map((item, index) => (
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
							Set as default Language for me
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform7;
