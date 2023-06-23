import { useSelector } from 'react-redux';
import { RootState } from "../../../store/Store";


const Settingform8 = () => {

	const internet_min_speed = useSelector(
		(state: RootState) => state.setting?.data?.internet_min_speed
	);

const internetspeedlist = ["10 Mbps", "20 Mbps", "40 Mbps"];

const internetspeedfilter = internetspeedlist.filter(
	(item) => item !== internet_min_speed
);


    return (
			<div className="form-item">
				<div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">Internet Settings</div>
				<form action="" className="p-3 border-[1px] border-[#61CE70] border-solid">
					<div className="w-full mb-3">
						<label htmlFor="" className="text-[18px] font-semibold text-[#7A7A7A]">
							Minimum Speed needed
						</label>
						<select className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md" aria-label="Default select example">
							<option selected value={internet_min_speed}>
								{internet_min_speed} 
							</option>
							{internetspeedfilter.map((item, index) => (
								<option key={index} value={item}>
									{item} 
								</option>
							))}
						</select>
					</div>

					<div className="w-full mb-3">
						<label htmlFor="" className="text-[18px] font-semibold text-[#7A7A7A]">
							Number of Speed tests per day
						</label>
						<select className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md" aria-label="Default select example">
							<option selected>No Speed Test</option>
							<option>1 test per day</option>
						</select>
					</div>
					<div className="w-full mb-1">
						<button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">
							Set as default Internet Settings
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform8;
