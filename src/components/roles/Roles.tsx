import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import axios from "axios";
import  { getAdminData } from "../../store/slice/adminData";


const Roles = () => {
const dispatch=useDispatch()
	
	
	const rolesdata = useSelector(
		(state: RootState) => state.adminData.data[0].roles
	);
	const currentadmindata = useSelector(
		(state: RootState) => state.adminData
	);
	const username = useSelector(
		(state: RootState) => state.adminData.data[0].Username
	);

	const enablerules = rolesdata.filter((r) => r.status == "enable");
	const disablerules = rolesdata.filter((r) => r.status == "disable");

	interface ruleItem {
		level1_item: string;
		level2_item: string;
		level3_item: string;
		level4_item: string;
		level5_item: string;
		security_layer: string;
		role_name: string;
		role_code: string;
		role_details: string;
		role_uni_code: string;
		role_specification: string;
		status: string;
	}
	const [selectedrule, setselectedrule] = useState<ruleItem>({
		level1_item: "",
		level2_item: "",
		level3_item: "",
		level4_item: "",
		level5_item: "",
		security_layer: "",
		role_name: "",
		role_code: "",
		role_details: "",
		role_uni_code: "",
		role_specification: "",
		status: "",
	});
const [selectedrulestatus, setselectedrulestatus] = useState("..select");

	const formatObject = (obj: Record<string, any>) => {
		let result = "";
		Object.entries(obj).forEach(([key, value]) => {
			result += `'${key}': '${value}'\n`;
		});
		return result;
	};



const [rulestatus, setrulestatus] = useState({
	enablestatus: "..select",
	disablestatus: "..select",
});
	const handledisablerule = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setrulestatus({
			enablestatus: "..select",
			disablestatus: event.target.value,
		});

		const matchrule = disablerules.find(
			(item) => item.role_name === event.target.value
		);
		setselectedrule({
			level1_item: matchrule?.level1_item || "",
			level2_item: matchrule?.level2_item || "",
			level3_item: matchrule?.level3_item || "",
			level4_item: matchrule?.level4_item || "",
			level5_item: matchrule?.level5_item || "",
			security_layer: matchrule?.security_layer || "",
			role_name: matchrule?.role_name || "",
			role_code: matchrule?.role_code || "",
			role_details: matchrule?.role_details || "",
			role_uni_code: matchrule?.role_uni_code || "",
			role_specification: matchrule?.role_specification || "",
			status: matchrule?.status || "",
		});



		
	};


	const handleenablerule = (event: React.ChangeEvent<HTMLSelectElement>) => {
	
		setrulestatus({
			enablestatus: event.target.value,
			disablestatus: "..select",
		});
		const matchrule = enablerules.find(
			(item) => item.role_name === event.target.value
		);
		setselectedrule({
			level1_item: matchrule?.level1_item || "",
			level2_item: matchrule?.level2_item || "",
			level3_item: matchrule?.level3_item || "",
			level4_item: matchrule?.level4_item || "",
			level5_item: matchrule?.level5_item || "",
			security_layer: matchrule?.security_layer || "",
			role_name: matchrule?.role_name || "",
			role_code: matchrule?.role_code || "",
			role_details: matchrule?.role_details || "",
			role_uni_code: matchrule?.role_uni_code || "",
			role_specification: matchrule?.role_specification || "",
			status: matchrule?.status || "",
		});
	};




	const [formData, setFormData] = useState({
		username: username,
		level1_item: "..select",
		level2_item: "..select",
		level3_item: "..select",
		level4_item: "..select",
		level5_item: "..select",
		security_layer: "..select",
		role_name: "",
		role_code: "",
		status: "enable",
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"https://100093.pythonanywhere.com/api/create_role/",
				formData
			);
			console.log(response.data);

			
  const updatedAdminData = {
		...currentadmindata,
		data: [
			{
				...currentadmindata.data[0],
				roles: [...currentadmindata.data[0].roles, formData],
			},
		],
	};
			dispatch(getAdminData(updatedAdminData));
			// Handle the response as needed
			// Reset the form
			setFormData({
				username: "mayowa25",
				level1_item: "..select",
				level2_item: "..select",
				level3_item: "..select",
				level4_item: "..select",
				level5_item: "..select",
				security_layer: "..select",
				role_name: "",
				role_code: "",
				status: "enable",
			});
		} catch (error) {
			console.error(error); // Handle the error appropriately
		}
	};

	const handleChange = (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


	const changeselectedrulestatus = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		setselectedrulestatus(e.target.value)
	};

	const updateselectedrulestatus = async (
		e: MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		const rulestatusdata = {
			username: "mayowa25",
			role_code: selectedrule.role_code,
			role_status: selectedrulestatus,
		};
		try {
			const response = await axios.post(
				"https://100093.pythonanywhere.com/api/update_role_status/",
				rulestatusdata
			);
			console.log(response.data);


			const updatedRoles = currentadmindata.data[0].roles.map((role) => {
				if (role.role_code === selectedrule.role_code) {
					return {
						...role,
						status: selectedrulestatus,
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
							roles: updatedRoles,
						},
					],
				})
			);

		} catch (error) {
			console.error(error); // Handle the error appropriately
		}
	};
	return (
		<>
			<div className="mt-8 w-full lg:flex gap-8">
				<div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
					<span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
						<p>ROLE</p>
						<p>{"<Total enabled roles>"}</p>
					</span>
					<div className="p-[30px]  my-20">
						<p className="text-[#FF0000] text-lg font-roboto font-semibold">
							Create Roles – Define Roles in my organisation
						</p>
					</div>
					<form className="px-[30px] mb-8" onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Item in Level 1
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								required
								name="level1_item"
								onChange={handleChange}
								value={formData.level1_item}
							>
								<option value="..select">..select</option>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level1_item}>
										{item.level1_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Item in Level 2
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								onChange={handleChange}
								name="level2_item"
								value={formData.level2_item}
							>
								<option value="..select">..select</option>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level2_item}>
										{item.level2_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Item in Level 3
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								placeholder="Select Product"
								onChange={handleChange}
								name="level3_item"
								value={formData.level3_item}
							>
								<option value="..select">..select</option>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level3_item}>
										{item.level3_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Item in Level 4
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								onChange={handleChange}
								name="level4_item"
								value={formData.level4_item}
							>
								<option value="..select">..select</option>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level4_item}>
										{item.level4_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Item in Level 5
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								onChange={handleChange}
								name="level5_item"
								value={formData.level5_item}
							>
								<option value="..select">..select</option>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level5_item}>
										{item.level5_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Security Layer
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								required
								onChange={handleChange}
								name="security_layer"
								value={formData.security_layer}
							>
								<option value="..select">..select</option>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.security_layer}>
										{item.security_layer}
									</option>
								))}
							</select>
						</div>

						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Role Name
							</label>
							<input
								type="text"
								placeholder="Role name"
								required
								onChange={handleChange}
								name="role_name"
								value={formData.role_name}
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
							/>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Role Code (Unique){" "}
							</label>
							<input
								type="text"
								placeholder="Role code"
								required
								name="role_code"
								value={formData.role_code}
								onChange={handleChange}
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
							/>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Role Specification{" "}
							</label>
							<input
								type="text"
								placeholder="Role specification"
								onChange={handleChange}
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
							/>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Role Universal Code{" "}
							</label>
							<input
								type="text"
								placeholder="Role universal code"
								onChange={handleChange}
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
							/>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Role Details{" "}
							</label>
							<textarea
								rows={4}
								placeholder="Role details"
								className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
							/>
						</div>
						<button
							className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto"
							type="submit"
						>
							Create Role
						</button>
					</form>
				</div>
				<div className="lg:w-1/2 ">
					<h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
						Roles created in my organisation
					</h2>

					<form className=" mb-8 mt-12">
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Level 1
							</label>
							<select
								className="outline-none w-full h-100 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								multiple
							>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level1_item}>
										{item.level1_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Level 2
							</label>
							<select
								className="outline-none w-full h-100 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								multiple
							>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level2_item}>
										{item.level2_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Level 3
							</label>
							<select
								className="outline-none w-full h-100 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								multiple
							>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level3_item}>
										{item.level3_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Level 4
							</label>
							<select
								className="outline-none w-full h-100 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								multiple
							>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level1_item}>
										{item.level1_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Level 5
							</label>
							<select
								className="outline-none w-full h-100 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								multiple
							>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.level5_item}>
										{item.level5_item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Security Layer
							</label>
							<select
								className="outline-none w-full h-100 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								multiple
							>
								{rolesdata.map((item, index) => (
									<option key={index} value={item.security_layer}>
										{item.security_layer}
									</option>
								))}
							</select>
						</div>

						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Enabled Roles
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								onChange={handleenablerule}
								name="enablestatus"
								value={rulestatus.enablestatus}
							>
								<option value="..select">..select</option>
								{enablerules.map((item, index) => (
									<option key={index} value={item.role_name}>
										{item.role_name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Disabled Roles
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								onChange={handledisablerule}
								name="disablestatus"
								value={rulestatus.disablestatus}
							>
								<option value="..select">..select</option>
								{disablerules.map((item, index) => (
									<option key={index} value={item.role_name}>
										{item.role_name}
									</option>
								))}
							</select>
						</div>

						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Details of selected Role
							</label>
							<textarea
								rows={4}
								placeholder=""
								className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
								value={
									selectedrule.role_name == ""
										? ""
										: `"${formatObject(selectedrule)}"`
								}
							/>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Enable / Disable Selected Role
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								value={selectedrulestatus}
								onChange={changeselectedrulestatus}
							>
								<option value="..select">...select</option>
								<option value="enable"> Enable </option>
								<option value="disable"> Disable </option>
							</select>
						</div>
						<button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto" type="button" onClick={updateselectedrulestatus}>
							Enable / Disable selected Role
						</button>

						<button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
							Duplicate selected Role to create new
						</button>
						<button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
							Refresh Search
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Roles;
