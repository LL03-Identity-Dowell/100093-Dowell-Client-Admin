import { useSelector } from "react-redux";


const Settingform8 = () => {

	const internet_min_speed = useSelector(
		(state) => state.setting?.data?.internet_min_speed
	);

const internetspeedlist = ["10 Mbps", "20 Mbps", "40 Mbps"];

const internetspeedfilter = internetspeedlist.filter(
	(item) => item !== internet_min_speed
);


    return (
			<div className="form-item">
				<div className="form-header">Internet Settings</div>
				<form action="" className="setting-form-content">
					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Minimum Speed needed
						</label>
						<select className="form-select" aria-label="Default select example">
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

					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Number of Speed tests per day
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected>No Speed Test</option>
							<option>1 test per day</option>
						</select>
					</div>
					<div className="my-2">
						<button className="btn w-100 form-btn">
							Set as default Internet Settings
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform8;
