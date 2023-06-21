import React from 'react';

const Settingform5 = () => {
    return (
			<div className="form-item">
				<div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
					Set Notifications to my email and phone message
				</div>
				<form
					action=""
					className="p-3 border-[1px] border-[#61CE70] border-solid"
				>
					<div className="w-full mb-3">
						<label
							htmlFor=""
							className="text-[18px] font-semibold text-[#7A7A7A]"
						>
							Notifications from
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
						>
							<option selected>Chat</option>
							<option>UxLiving LAb</option>
						</select>
					</div>
					<div className="w-full mb-3">
						<label
							htmlFor=""
							className="text-[18px] font-semibold text-[#7A7A7A]"
						>
							Methods
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
							multiple
						>
							<option>Email Messages</option>
							<option>SMS/Text Messages</option>
						</select>
					</div>
					<div className="w-full mb-1">
						<button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">
							Forward Notifications
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform5;
