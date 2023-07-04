
import { useSelector } from 'react-redux';
import { RootState } from "../../../store/Store";


const Settingform9 = () => {

	const allproducts = useSelector(
		(state: RootState) => state.products.products
	);
	console.log(allproducts);
	

	
	const plans = ["Basic Plan", "Free", "Premium Plan"];


	


    return (
			<div className="form-item">
				<div className="bg-[#CEF9D2] p-3 text-[18px] font-semibold text-[#7A7A7A] border-[1px] border-[#61CE70] border-solid">
					Product Usage plans
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
							Products
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
						>
							<option selected value={allproducts[0].product_name}>
								{allproducts[0].product_name}
							</option>
							{allproducts.map((item, index) => (
								<option key={index} value={item?.product_name}>
									{item?.product_name}
								</option>
							))}
						</select>
					</div>

					<div className="w-full mb-3">
						<label
							htmlFor=""
							className="text-[18px] font-semibold text-[#7A7A7A]"
						>
							Plans
						</label>
						<select
							className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
							aria-label="Default select example"
						>
							<option selected value="Select">
								Select
							</option>
							{plans.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
					<div className="w-full mb-1">
						<button className="w-full bg-[#7A7A7A] hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md">
							Change Plan of selected Product
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform9;
