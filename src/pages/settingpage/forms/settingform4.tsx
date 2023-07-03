
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../store/Store";
import { useState } from 'react';
import { getloaderstate } from '../../../store/slice/loaderstate';
import { getsetting } from '../../../store/slice/setting';
import axios from 'axios';
const Settingform4 = () => {

	const disconn_idle = useSelector(
		(state: RootState) => state.setting?.data?.disconn_idle
	);
const currentSetting = useSelector((state: RootState) => state.setting?.data);

	
	const disconn_idlelist = ["30", "45", "10"];

	const filterdisconn_idlelist = disconn_idlelist.filter(
		(item) => item !== disconn_idle
	);

	const permit_to_connect = useSelector(
		(state: RootState) => state.setting?.data?.permit_to_connect
	);

	const permit_to_connectlist = ["30", "45", "90"];

	const filterpermit_to_connectlist = permit_to_connectlist.filter(
		(item) => item !== permit_to_connect
	);



	const no_of_conn = useSelector(
		(state: RootState) => state.setting?.data?.no_of_conn
	);

	const no_of_connlist = ["30", "45", "3"];

	const filterno_of_connlist = no_of_connlist.filter(
		(item) => item !== disconn_idle
	);


const [selecteddisconn_idle, setSelecteddisconn_idle] = useState(disconn_idle);
const [selectedno_of_conn, setSelectedno_of_conn] = useState(no_of_conn);
const [selectedpermit_to_connect, setSelectedpermit_to_connect] =
		useState(permit_to_connect);
	
	
const dispatch = useDispatch();

const handleSubmit = (
	event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
	event.preventDefault();

	const postData = async () => {
		try {
			dispatch(getloaderstate(true));

			const data = {
				username: "Jazz3650",
				time_limit_disconnect: selecteddisconn_idle,
				time_limit_connect: selectedpermit_to_connect,
				permitted_attempts: selectedno_of_conn,
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
						disconn_idle: selecteddisconn_idle,
						permit_to_connect:selectedpermit_to_connect,
						no_of_conn:selectedno_of_conn,
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
					Set limit for Connection attempts for Team members and Users in my
					organisation
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
							Disconnect if idle for
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
							onChange={(e) => setSelecteddisconn_idle(e.target.value)}
						>
							<option selected value={disconn_idle}>
								{disconn_idle} Minutes
							</option>
							{filterdisconn_idlelist.map((item, index) => (
								<option key={index} value={item}>
									{item} Minutes
								</option>
							))}
						</select>
					</div>
					<div className="w-full mb-3">
						<label
							htmlFor=""
							className="text-[18px] font-semibold text-[#7A7A7A]"
						>
							If Disconnected, permit to Connect
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
							onChange={(e) => setSelectedpermit_to_connect(e.target.value)}
						>
							<option selected value={permit_to_connect}>
								{permit_to_connect} Minutes
							</option>
							{filterpermit_to_connectlist.map((item, index) => (
								<option key={index} value={item}>
									{item} Minutes
								</option>
							))}
						</select>
					</div>
					<div className="w-full mb-3">
						<label
							htmlFor=""
							className="text-[18px] font-semibold text-[#7A7A7A]"
						>
							Number of connection attempts permitted
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
							onChange={(e) => setSelectedno_of_conn(e.target.value)}
						>
							<option selected value={no_of_conn}>
								{no_of_conn} Minutes
							</option>
							{filterno_of_connlist.map((item, index) => (
								<option key={index} value={item}>
									{item} Minutes
								</option>
							))}
						</select>
					</div>
					<div className="w-full mb-1">
						<button
							className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md"
							onClick={handleSubmit}
						>
							Set Limit
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform4;
