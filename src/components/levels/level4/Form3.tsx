import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getAdminData } from "../../../store/slice/adminData";

const Form3 = () => {
	const level4Items = useSelector(
		(state: RootState) =>
			state.adminData.data[0]?.organisations[0]?.level4?.items
	);
	const userName = useSelector(
		(state: RootState) => state.adminData.data[0]?.Username
	);
	const currentadmindata = useSelector((state: RootState) => state.adminData);

	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState<string>("");
	const [status, setStatus] = useState("");
	const [_statusErrMsg, setStatusErrMsg] = useState("");
	const [isLoadingStatus, setIsLoadingStatus] = useState(false);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedItemName = event.target.value;
		setSelectedItem(selectedItemName);
	};

	const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
		setStatus(e.target.value);
	};

	const selectedItemData = level4Items.find(
		(item) => item?.item_code === selectedItem
	);

	const handleSubmitStatus = async (e: React.FormEvent) => {
		e.preventDefault();

		if (status == "") {
			toast.error(
				"Select Enable or Disable  From Dropdown Enable / Disable Selected Item "
			);
		} else if (selectedItem == "") {
			toast.error("Select  item From Dropdown Enabled Item or Disabled Item ");
		} else {
			setIsLoadingStatus(true);

			const data = {
				username: userName,
				item_level: "level4",
				item_code: selectedItem,
				item_status: status.toLowerCase(),
			};
			console.log(data);

			try {
				await axios
					.post(
						"https://100093.pythonanywhere.com/api/update_item_status/",
						data
					)
					.then((res) => {
						console.log(res.data);
						setStatusErrMsg("");
						toast.success(res.data.success);

						const updateditems = level4Items.map((role) => {
							if (role.item_code === selectedItemData?.item_code) {
								return {
									...role,
									status: status,
								};
							}
							return role;
						});
						dispatch(
							getAdminData({
								...currentadmindata,
								data: [
									{
										...currentadmindata.data[0],
										organisations: [
											{
												...currentadmindata.data[0].organisations[0],
												level4: {
													...currentadmindata.data[0].organisations[0].level4,
													items: updateditems,
												},
											},
										],
									},
								],
							})
						);
					});
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					console.error(error);
					toast.error(error.response?.data.error);
				} else {
					console.error("An unknown error occurred:", error);
					toast.error("An unknown error occurred");
				}
			} finally {
				setIsLoadingStatus(false);
			}
		}
	};

	return (
		<>
			<ToastContainer position="top-right" />
			<div className="lg:w-1/2 border border-[#54595F] card-shadow">
				<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
					Items created in Level 4
				</p>
				<div className="px-[30px] mb-8">
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Enabled Items
						</label>
						<select
							onChange={handleSelectChange}
							value={selectedItem}
							id="enable_item"
							className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						>
							<option> ...Select... </option>
							{level4Items.map((item, index) =>
								item.status === "enable" ? (
									<option key={index} value={item?.item_code}>
										{item?.item_name}
									</option>
								) : null
							)}
						</select>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Disabled Items
						</label>
						<select
							onChange={handleSelectChange}
							id="disable_item"
							className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						>
							<option> ...Select... </option>
							{level4Items.map((item, index) =>
								item?.status === "disable" ? (
									<option value={item?.item_code} key={index}>
										{item?.item_name}
									</option>
								) : null
							)}
						</select>
					</div>

					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Details of selected Item
						</label>
						<textarea
							rows={4}
							placeholder=""
							readOnly
							value={JSON.stringify(selectedItemData, null, 1)?.slice(1, -1)}
							className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
						/>
					</div>

					<form onSubmit={handleSubmitStatus}>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Enable / Disable selected Item
							</label>
							<select
								onChange={handleSelectStatus}
								id="status"
								className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
							>
								<option> ...Select... </option>
								<option value="enable"> Enable </option>
								<option value="disable"> Disable </option>
							</select>
						</div>

						<button
							className={`w-full h-10 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white text-[14px] font-roboto ${
								isLoadingStatus ? "hover:bg-[#7a7a7a] opacity-50" : ""
							}`}
						>
							{isLoadingStatus
								? status === "enable"
									? "Enabling..."
									: "Disabling..."
								: "Enable / Disable selected item"}
						</button>
					</form>

					<button className="w-full h-10 mt-20 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white text-[14px] font-roboto">
						Duplicate selected Item to create new
					</button>
				</div>
			</div>
		</>
	);
};

export default Form3;
