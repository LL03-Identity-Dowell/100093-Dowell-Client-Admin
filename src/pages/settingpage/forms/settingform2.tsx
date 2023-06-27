import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";


const Settingform2 = () => {

	const maxtime_member = useSelector(
		(state: RootState) => state.setting?.data?.maxtime_member
	);

	
	const maxtime_member_list = ["70", "120", "180"];

	const membertime_filterlist = maxtime_member_list.filter(
		(item) => item !== maxtime_member
	);


	

	const maxtime_user = useSelector(
		(state: RootState) => state.setting?.data?.maxtime_user
	);

	const maxtime_user_list = ["70", "120", "180"];

	const usertime_filterlist = maxtime_user_list.filter(
		(item) => item !== maxtime_user
	);
    return (
		<div className="form-item">
			
				<div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
					Set time limit for invitation to join; the invitation link will be
					automatically disabled after this limit
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
							Maximum time limit for invitation for Team Member
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
						>
							
							<option selected value={maxtime_member}>
								{maxtime_member} Hours
							</option>
							{membertime_filterlist.map((item, index) => (
								<option key={index} value={item}>
									{item} Hours
								</option>
							))}
						</select>
					</div>
					<div className="w-full mb-3">
						<label
							htmlFor=""
							className="text-[18px] font-semibold text-[#7A7A7A]"
						>
							Maximum time limit for invitation for Users
						</label>
						<select className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md">
							

							<option selected value={maxtime_user}>
								{maxtime_user} Hours
							</option>
							{usertime_filterlist.map((item, index) => (
								<option key={index} value={item}>
									{item} Hours
								</option>
							))}
						</select>
					</div>
					<div className="w-full mb-1">
						<button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">
							Set Limit
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform2;
