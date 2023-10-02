import { useEffect, useState } from "react";
import images from "../../images";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { getAdminData } from "../../../store/slice/adminData";

const Form3 = () => {
	const [uploadLinkModal, setUploadLinkModal] = useState(false);
	// const [selectedItem, setSelectedItem] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const openUploadLinkModal = () => {
		setUploadLinkModal(true);
	};

	const closeUploadLinkModal = () => {
		setUploadLinkModal(false);
	};

	const guest_member = useSelector(
		(state: RootState) => state.adminData.data[0]?.members.guest_members
	);

	const userName = useSelector(
		(state: RootState) => state.adminData.data[0]?.Username
	);

	const porg = useSelector(
		(state: RootState) => state.adminData.data[0]?.organisations[0]?.org_name
	);
const currentadmindata = useSelector((state: RootState) => state.adminData);
	// const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const selectedItemName = event.target.value;
	// 	setSelectedItem(selectedItemName);
	// };

	
	const dispatch = useDispatch();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const data = {
			username: userName,
			selected_member: selectedItems?.name,
			action: "cancel_member",
			porg: porg,
		};
		console.log(data, "data");

		try {
			await axios
				.post("https://100093.pythonanywhere.com/api/MemEnDis/", data)
				.then((res) => {
					console.log(res.data);
					toast.success("success");
const updatedpendingmember = guest_member?.pending_members.filter(
	(mem) => selectedItems?.member_code != mem.member_code
);
console.log(updatedpendingmember);
						dispatch(
							getAdminData({
								...currentadmindata,
								data: [
									{
										...currentadmindata.data[0],
										members: {
											...currentadmindata.data[0].members,
											guest_members: {
												...currentadmindata.data[0].members.guest_members,
												pending_members: updatedpendingmember,
											},
										},
									},
								],
							})
						);
						setSelectedItems({
							name: "",
							member_code: "",
							member_spec: "",
							member_uni_code: "",
							member_details: "",
							link: "",
							status: "",
						});
						setSelectedvalue(null);

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
			setIsLoading(false);
		}
	};

	const [elements, setElements] = useState<JSX.Element[]>([]);
	const [elementCount, setElementCount] = useState(0);

	useEffect(() => {
		// Initialize with one element when the component mounts
		handleAddElement();
	}, []);

	const handleAddElement = () => {
		const newElementCount = elementCount + 1;

		const newElement = (
			<div className="flex items-center justify-between" key={newElementCount}>
				<label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
					Field Name {elements.length !== 0 ? newElementCount : ""}
				</label>
				<input
					type="text"
					className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
					required
					onChange={(event) =>
						handleFieldChange(
							event,
							elements.length !== 0 ? newElementCount : newElementCount - 1
						)
					}
				/>
			</div>
		);

		setElements([...elements, newElement]);
		elements.length !== 0 ? setElementCount(newElementCount) : "";

		setFields([...fields, ""]);
	};

	const handleDeleteElement = () => {
		if (elements.length > 1) {
			const updatedElements = elements.slice(0, -1);
			setElements(updatedElements);
			setElementCount(elementCount - 1);
			setFields(fields.slice(0, -1));
		}
	};

	const uploadlinkcopy = () => {
		navigator.clipboard.writeText(fileuplaodresponse.datalink);
		toast.success("Link Copied");
	};

	// manage data
	interface fileres {
		table_html: string;
		datalink: string;
	}
	const [file, setFile] = useState<File | null>(null);
	// const [sheetName, setSheetName] = useState("");
	const [fields, setFields] = useState<string[]>([""]);
	const [fileuplaodresponse, setfileuplaodresponse] = useState<fileres>({
		table_html: "",
		datalink: "",
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	// const handleSheetNameChange = (
	// 		event: React.ChangeEvent<HTMLInputElement>
	// 	) => {
	// 		setSheetName(event.target.value);
	// 	};

	const handleFieldChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const updatedFields = [...fields];
		updatedFields[index] = event.target.value;
		setFields(updatedFields);
	};

	const handlesavdata = async (event: React.FormEvent) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("filename", file as File);
		formData.append("username", userName);
		formData.append("orgname", porg);
		// formData.append("sheetName", sheetName);

		fields.map((item, index) =>
			item != ""
				? formData.append(
						`fieldname${index}`,
						item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
		)
				: ""
		);
		console.log(formData.get("fieldname1"));
		console.log(fields);
		console.log(formData);

		try {
			// Make your API POST request here
			const response = await fetch(
				"https://100093.pythonanywhere.com/api/file_upload/",
				{
					method: "POST",
					body: formData,
				}
			);
			const responseData = await response.json();
			if (responseData.table_html) {
				// Handle success

				setfileuplaodresponse(responseData);
				console.log(responseData);
				toast.success("success");
			} else {
				// Handle error

				toast.error(responseData.error);
				console.error("Error to sending data ");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// search invited team members

	interface Option {
		value: string;
		label: string;
	}

	interface memberobj {
		name: string;
		member_code: string;
		member_spec: string;
		member_uni_code: string;
		member_details: string;
		link: string;
		status: string;
	}
	const [selectedItems, setSelectedItems] = useState<memberobj>();
const [selectedvalue, setSelectedvalue] = useState<any>();
	const query: Option[] = guest_member?.pending_members.map((option) => ({
		value: option.member_code,
		label: option.name,
	}));

	const handleSearchInputChange = (query: any) => {
		console.log(query.value);

		const filtermmember = guest_member?.pending_members.find(
			(item) => item.member_code == query.value
		);

		setSelectedItems(filtermmember);
	};

	return (
		<>
			<ToastContainer position="top-right" />
			<div className="lg:w-1/3 border border-[#54595F] card-shadow">
				<form className="px-4" onSubmit={handleSubmit}>
					<div className="mb-4 mt-8">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Invited Users
						</label>
						<select
							
							multiple
							id="invited_team_members"
							className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
							placeholder="Select Product"
						>
							{guest_member?.pending_members.map((members, index) => (
								<option key={index} value={members.member_code}>
									{members?.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Search Invited Users
						</label>
						<Select
							classNames={{
								control: () => "border border-none shadow-none rounded-md",
							}}
							className="w-full outline-none  border-red-50 shadow-none"
							options={query}
							value={selectedvalue}
							placeholder="Search member..."
							onChange={handleSearchInputChange}
							styles={{
								control: (baseStyles, state) => ({
									...baseStyles,
									borderColor: state.isFocused ? "#82827A" : "#82827A",
									outline: "none",
								}),
							}}
						/>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Details of Invited User
						</label>
						<textarea
							rows={4}
							placeholder="Member details"
							readOnly
							value={selectedItems?.name!=""?JSON.stringify(selectedItems, null, 1)?.slice(1, -1):""}
							className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
						/>
					</div>
					<button
						disabled={isLoading}
						className={`w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
							isLoading ? "hover:bg-[#7a7a7a] opacity-50" : ""
						}`}
					>
						{" "}
						Cancel Selected User Invitation
					</button>
				</form>
				<div className="px-4">
					<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto my-20">
						Duplicate selected User invitation to create new
					</button>
				</div>

				<hr className="border-2 border-[#FF0000] mb-8" />

				<p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12 px-4 flex flex-col">
					Common Invitation to join as USER to my organisation
					<span>
						If you don't have any link,{" "}
						<button
							type="button"
							onClick={openUploadLinkModal}
							className="text-black font-normal hover:opacity-70"
						>
							click here
						</button>{" "}
						to upload.
					</span>
				</p>

				<form className="px-4">
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Link to Data
						</label>
						<textarea
							rows={4}
							placeholder="Paste link to database to connect"
							className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
						/>
					</div>
					<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
						Import Users
					</button>
				</form>
				<form className="px-4 my-8">
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Common invitation link
						</label>
						<textarea
							rows={4}
							placeholder="Paste invitation link"
							className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
						/>
					</div>
					<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
						Save common invitation link & create QR code
					</button>
				</form>
				<form className=" px-4 flex flex-col items-center justify-center bg-[#f1f3f5] pb-4">
					<div className="mb-4">
						<img src={images.placeholder} alt="" />
						<p className="text-center">QR code for link</p>
					</div>
					<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
						Download common invitation link QR code
					</button>
				</form>
			</div>

			<Modal
				style={{
					overlay: {
						position: "fixed",
						top: "0%",
						left: "0%",
						right: "0%",
						bottom: "0%",
						backgroundColor: "rgba(119, 119, 119, 0.589)",
						zIndex: 50,
					},
				}}
				className="absolute lg:mt-36 left-0 right-0 md:w-4/5 mx-auto md:h-auto h-screen lg:max-h-[80%] pb-4 overflow-y-auto overflow-auto bg-[#FFFDFD] z-50 lg:rounded-[10px] outline-none border-0 md:flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
				isOpen={uploadLinkModal}
				onRequestClose={closeUploadLinkModal}
				ariaHideApp={false}
			>
				<div className="flex justify-end px-6 pt-6">
					<button
						className="bg-black text-white text-sm px-2 py-1 rounded-sm"
						onClick={closeUploadLinkModal}
					>
						X
					</button>
				</div>
				<form
					className="bg-[#f5f5f5] lg:w-[45%] mx-auto my-12 px-8 pb-24 rounded-md"
					onSubmit={handlesavdata}
				>
					<h2 className="text-2xl font-semibold text-center pt-4 text-black">
						Excel or CSV Details
					</h2>
					<a
						href="https://www.pythonanywhere.com/user/100093/files/home/100093/clientadmin/media/sample.csv"
						className="underline text-xl text-black font-roboto"
					>
						Download Sample file
					</a>
					<div className="flex items-center justify-between py-4">
						<label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
							Excel / CSV File
						</label>
						<input
							type="file"
							accept=".csv"
							className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
							onChange={(e) => handleFileChange(e)}
							required
						/>
					</div>
					<div className="flex items-center justify-between pb-4">
						<label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
							Name of Sheet
						</label>
						<input
							type="text"
							className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
						/>
					</div>
					{elements.map((element, index) => (
						<div className="pb-4" key={index}>
							{element}
						</div>
					))}
					<p className="text-[#ff0000] font-roboto leading-normal">
						If you want to upload all fields of sheet give text "all" or give
						specific field name one by one
					</p>
					<div className="flex items-center gap-x-4 justify-end">
						<button
							className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70]"
							onClick={handleAddElement}
							type="button"
						>
							Add
						</button>
						<button
							className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70]"
							onClick={handleDeleteElement}
							disabled={elements.length === 1}
							type="button"
						>
							Remove
						</button>
					</div>

					<div className="lg:flex items-center justify-between py-8">
						<label className="text-[#7a7a7a] font-bold text-lg lg:w-1/2">
							Number of rows you want to Delete
						</label>
						<input
							type="number"
							className="rounded-lg border border-[#7a7a7a] px-5 py-2 text-sm"
						/>
					</div>
					<div className="text-center">
						<button
							className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70]"
							type="submit"
						>
							Save to Database
						</button>
					</div>
					{fileuplaodresponse.datalink !== "" ? (
						<div className="flex justify-between items-center mt-3">
							<span className="text-[#61ce70]">
								{fileuplaodresponse.datalink}
							</span>
							<button
								className="text-white bg-[#7a7a7a] px-3 py-2 rounded-md hover:bg-[#61ce70] "
								type="button"
								onClick={uploadlinkcopy}
							>
								Copy
							</button>
						</div>
					) : (
						""
					)}
					<div
						className="mt-5"
						dangerouslySetInnerHTML={{ __html: fileuplaodresponse.table_html }}
					/>
					{/* <div className="mt-5">
						<table className="w-full  border-collapse border border-gray-800 table-auto text-center">
							<thead>
								<tr className="">
									<th className="border border-gray-800">Sr.No</th>
									<th className="border border-gray-800">Name</th>
									<th className="border border-gray-800">Number</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th className="border border-gray-800">0</th>
									<td className="border border-gray-800">Jazz</td>
									<td className="border border-gray-800">1234</td>
								</tr>
								<tr>
									<th className="border border-gray-800">1</th>
									<td className="border border-gray-800">Nagaraj</td>
									<td className="border border-gray-800">4321</td>
								</tr>
								<tr>
									<th className="border border-gray-800">2</th>
									<td className="border border-gray-800">Nouman</td>
									<td className="border border-gray-800">8888</td>
								</tr>
							</tbody>
						</table>
					</div> */}
				</form>
			</Modal>
		</>
	);
};

export default Form3;
