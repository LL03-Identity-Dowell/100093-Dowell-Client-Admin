
import { useSelector } from 'react-redux';

const Settingform6 = () => {
	const defaultorg = useSelector((state) => state.setting?.data?.default_org);
	
	const  workspacelist = ["Workspace 1", "Workspace 2", "noumanhayat"];
	
	const filterworkspace = workspacelist.filter((item) => item !== defaultorg);
	
	
    return (
			<div className="form-item">
				<div className="form-header">Set default Workspace for me</div>
				<form action="" className="setting-form-content">
					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Workspace Name
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected value={defaultorg}>{defaultorg}</option>
							{filterworkspace.map((item, index) => (
								<option key={index} value={item}>{item} Hours</option>
							))}
						</select>
					</div>

					<div className="my-2">
						<button className="btn w-100 form-btn">
							Set as default Workspace for me
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform6;
