import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState } from 'react';


const Roles = () => {

	
	const rolesdata = useSelector(
		(state: RootState) => state.adminData.data[0].roles
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


	const formatSelectedRule = (selectedrule: ruleItem): string => {
  const formattedValue = Object.entries(selectedrule).map(([key, value]) => `'${key}': '${value}'`);
  return `{ ${formattedValue.join(', ')} }`;
};




	const handledisablerule = (event: React.ChangeEvent<HTMLSelectElement>) => {
		
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
					<form className="px-[30px] mb-8">
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Item in Level 1
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								required
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
								Select Item in Level 2
							</label>
							<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
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
								Select Item in Level 4
							</label>
							<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
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
							<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
								<option>Item 1 </option>
								<option> Item 2 </option>
								<option>Item 3 </option>
							</select>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Select Security Layer
							</label>
							<select
								className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
								required
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
								Role Name
							</label>
							<input
								type="text"
								placeholder="Role name"
								required
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
						<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
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
							>
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
								value="..select"
								onChange={handledisablerule}
							>
								<option value="..select"> ..select</option>
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
										: `"${formatSelectedRule(selectedrule)}"`
								}
							/>
						</div>
						<div className="mb-4">
							<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
								Enable / Disable Selected Role
							</label>
							<select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
								<option> Enable </option>
								<option> Disable </option>
							</select>
						</div>
						<button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
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
