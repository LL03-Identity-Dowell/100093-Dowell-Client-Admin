
import { useSelector } from 'react-redux';

const Settingform9 = () => {

	const product = useSelector(
		(state) => state.setting?.data?.product_plan[0]
	);
	console.log(product)

const productlist = [
	{
		product_name: "Product B",
		plans: "Basic Plan",
	},
	{
		product_name: "Product A",
		plans: "Basic Plan",
	},
	{
		product_name: "Product c",
		plans: "Basic Plan",
	},
];

const productlistfilter = productlist.filter(
	(item) => item?.product_name !== product?.product_name
);

	
	const plans = ["Basic Plan", "Free", "Premium Plan"];

	const planfilter = plans.filter((item) => item !== product?.plans);

	

    return (
			<div className="form-item">
				<div className="form-header">Product Usage plans</div>
				<form action="" className="setting-form-content">
					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Products
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected value={product?.product_name}>
								{product?.product_name}
							</option>
							{productlistfilter.map((item, index) => (
								<option key={index} value={item?.product_name}>
									{item?.product_name}
								</option>
							))}
						</select>
					</div>

					<div className="mb-3">
						<label htmlFor="" className="form-label">
							Plans
						</label>
						<select className="form-select" aria-label="Default select example">
							<option selected value={product?.plans}>
								{product?.plans}
							</option>
							{planfilter.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
					<div className="my-2">
						<button className="btn w-100 form-btn">
							Change Plan of selected Product
						</button>
					</div>
				</form>
			</div>
		);
}

export default Settingform9;
