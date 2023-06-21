
import { useSelector } from 'react-redux';

const Settingform11 = () => {

const color_scheme = useSelector((state) => state.setting?.data?.color_scheme);

const color_schemelist = ["Blue", "Green", "Red"];

const color_schemelistfilter = color_schemelist.filter(
	(item) => item !== color_scheme
);


    return (
			<div className="form-item">
				<div className="form-header">Set colour for client admin</div>
				<form action="" className="setting-form-content">
					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Colour Scheme
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected value={color_scheme}>
								{color_scheme}
							</option>
							{color_schemelistfilter.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>

					<div className="my-2">
						<button className="btn w-100 form-btn">Set Colour Scheme</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform11;
