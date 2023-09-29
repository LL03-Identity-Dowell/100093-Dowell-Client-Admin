import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

const Form2 = () => {
	const [selectedItems, setSelectedItems] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const team_member = useSelector(
		(state: RootState) => state.adminData.data[0]?.members.team_members
	);

	console.log(team_member, "team_member");

	const handleSelectOnChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedItemName = event.target.value;
		setSelectedItems(selectedItemName);
	};


	const userName = useSelector(
		(state: RootState) => state.adminData.data[0]?.Username
	);

	const porg = useSelector(
		(state: RootState) => state.adminData.data[0]?.organisations[0]?.org_name
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const data = {
			username: userName,
			selected_member: selectedItems,
			action: "remove_member",
			porg: porg,
		};
		console.log(data, "data");

		try {
			await axios
				.post("https://100093.pythonanywhere.com/api/MemEnDis/", data)
				.then((res) => {
					console.log(res.data);
					toast.success("success");
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
		status: string;
		first_name: string;
		last_name: string;
		email: string;
		alias: string;
		portfolio_name: string;
	}
	const [selecteddetails, setselecteddetails] = useState<memberobj>();

	const query: Option[] = team_member?.accept_members.map((option) => ({
		value: option.email,
		label: option.name,
	}));

	const handleSearchInputChange = (query: any) => {
		console.log(query.value);

		const filtermmember = team_member?.accept_members.find(
			(item) => item.email == query.value
		);

		setselecteddetails(filtermmember);
	};

	return (
		<>
			<ToastContainer position="top-right" />
			<div className="lg:w-1/3 border border-[#54595F] card-shadow">
				<i className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
					Search Team Members in my Workspace
				</i>
				<form className="px-[30px] mb-8" onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Team Members not having Portfolio
						</label>
						<select
							multiple
							onChange={handleSelectOnChange}
							id="no_portfolio"
							className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						>
							{team_member?.accept_members.map(
								(members, index) =>
									members.portfolio_name !== "created" && (
										<option key={index} value={members?.name}>
											{" "}
											{members?.name}{" "}
										</option>
									)
							)}
						</select>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Team Members having assigned Portfolio
						</label>
						<select
							multiple
							onChange={handleSelectOnChange}
							id="have_portfolio"
							className="outline-none w-full h-24 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						>
							{team_member?.accept_members.map(
								(members, index) =>
									members.portfolio_name === "created" && (
										<option key={index} value={members?.member_code}>
											{" "}
											{members?.name}
										</option>
									)
							)}
						</select>
					</div>
					<div className="mb-4">
						<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
							Search Team Members
						</label>
						<Select
							classNames={{
								control: () => "border border-none shadow-none rounded-md",
							}}
							className="w-full outline-none  border-red-50 shadow-none"
							options={query}
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
							Details of selected Team member
						</label>
						<textarea
							rows={4}
							placeholder="Member details"
							readOnly
							value={JSON.stringify(selecteddetails, null, 1)?.slice(1, -1)}
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
						Remove Selected Team Member
					</button>
				</form>
			</div>
		</>
	);
};

export default Form2;
