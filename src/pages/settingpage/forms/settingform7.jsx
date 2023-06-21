
import { useSelector } from "react-redux";


const Settingform7 = () => {

	const defaultlang = useSelector(
		(state) => state.setting?.data?.default_language
	);

	const workspacelist = ["Spanish", "Hindi", "English"];

	const filterlang = workspacelist.filter((item) => item !== defaultlang);
    return (
			<div className="form-item">
				<div className="form-header">Set Language for owner</div>
				<form action="" className="setting-form-content">
					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Languages
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected value={defaultlang}>{defaultlang}</option>
							{filterlang.map((item, index) => (
								<option key={index} value={item}>{item}</option>
							))}
						</select>
					</div>

					<div className="my-2">
						<button className="btn w-100 form-btn">
							Set as default Language for me
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform7;
