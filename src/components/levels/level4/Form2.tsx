import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ToastContainer, toast } from "react-toastify";
import { getAdminData } from "../../../store/slice/adminData";

const Form2 = () => {
	const userName = useSelector(
		(state: RootState) => state.adminData.data[0]?.Username
	);

	const currentadmindata = useSelector((state: RootState) => state.adminData);
	const [formInputs, setFormInputs] = useState({
		username: userName,
		level: "level4",
		item_name: "",
		item_code: "",
		item_details: "",
		item_universal_code: "",
		item_specification: "",
		item_barcode: "",
		item_image1: "",
		item_image2: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [_errMsg, setErrMsg] = useState("");

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
	};

	const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setFormInputs({ ...formInputs, item_details: e.target.value });
	};

	const dispatch = useDispatch();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		await axios
			.post("https://100093.pythonanywhere.com/api/create_item/", formInputs)
			.then((res) => {
				console.log(res.data);
				setErrMsg("");
				toast.success(res.data);
				const newdata = {
					item_name: formInputs.item_name,
					item_code: formInputs.item_code,
					item_details: formInputs.item_details,
					item_universal_code: formInputs.item_universal_code,
					item_specification: formInputs.item_specification,
					item_barcode: formInputs.item_barcode,
					item_image1: formInputs.item_image1,
					item_image2: formInputs.item_image2,
					status: "enable",
				};
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
											items: [
												...currentadmindata.data[0].organisations[0].level4
													.items,
												newdata,
											],
										},
									},
								],
							},
						],
					})
				);
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response?.data);
				} else {
					console.log("Error", error.message);
					toast.error(error.message);
				}
			});
		setIsLoading(false);
	};

	return (
		<>
			<ToastContainer position="top-right" />

			<div className="lg:w-1/2 border border-[#54595F] card-shadow">
				<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
					Create Level 4 Items
				</p>
				<form className="px-[30px] mb-8" onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Item Name <span className="text-[#ff0000] text-xs">*</span>
						</label>
						<input
							type="text"
							placeholder="Item Name"
							required
							onChange={handleOnChange}
							id="item_name"
							className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						/>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Item Code (Unique){" "}
							<span className="text-[#ff0000] text-xs">*</span>
						</label>
						<input
							type="text"
							placeholder="Item code"
							required
							onChange={handleOnChange}
							id="item_code"
							className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						/>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Item Specification
						</label>
						<input
							type="text"
							placeholder="Item specification"
							onChange={handleOnChange}
							id="item_specification"
							className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						/>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Item Universal Code
						</label>
						<input
							type="text"
							placeholder=" Item universal code"
							onChange={handleOnChange}
							id="item_universal_code"
							className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						/>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Items Details
						</label>
						<textarea
							rows={4}
							placeholder="Item details"
							onChange={handleOnChangeTextArea}
							id="item_details"
							className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
						/>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Barcode
						</label>
						<input type="file" />
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Image 1
						</label>
						<input type="file" />
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Image 2
						</label>
						<input type="file" />
					</div>

					<button
						disabled={isLoading}
						className={`w-full h-10 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
							isLoading ? "hover:bg-[#7a7a7a] opacity-50" : ""
						}`}
					>
						{isLoading ? "Creating.." : "Create Item"}
					</button>
				</form>
			</div>
		</>
	);
};

export default Form2;
