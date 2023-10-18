import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../pages/whiteloader";

function User() {
	const [isLoading, setIsLoading] = useState(false);
	const currentadmindata = useSelector((state: RootState) => state.adminData);

	useEffect(() => {
		if (currentadmindata.data[0]._id == "") {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [currentadmindata]);
	return (
		<>
			{isLoading == false ? (
				<div className="lg:flex w-full  h-full mt-8">
					<Form1 />
					<Form2 />
					<Form3 />
				</div>
			) : (
				<Loader></Loader>
			)}
		</>
	);
}

export default User;
