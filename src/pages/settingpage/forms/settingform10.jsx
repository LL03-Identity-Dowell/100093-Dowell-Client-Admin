import React from 'react';

const Settingform10 = () => {
    return (
			<div className="form-item">
				<div className="form-header">
					Set Client Admin processes to selected portfolios
				</div>
				<form action="" className="setting-form-content">
					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Process
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected>Portfolio Management</option>
							<option>Team Member Management</option>
						</select>
					</div>

					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Right
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected>View</option>
							<option>Add/Edit</option>
						</select>
					</div>

					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Portfolios
						</label>
						<select
							className="form-select"
							aria-label="Default select example"
							multiple
						>
							<option>Portfolio 1</option>
							<option>Portfolio 2</option>
						</select>
					</div>
					<div className="my-2">
						<button className="btn w-100 form-btn">
							Assign Process management to selected Portfolios
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform10;
