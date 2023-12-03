import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from "../../../pages/whiteloader";

function Public() {

   const [isLoading, setIsLoading] = useState(false);
		const currentadmindata = useSelector((state: RootState) => state.adminData);

		useEffect(() => {
			if (currentadmindata.data[0]._id == "") {
				setIsLoading(true);
			} else {
				setIsLoading(false);
			}
    }, [currentadmindata]);
	const viewAccess = useSelector(
		(state: RootState) => state.viewAccess[2]["Portfolio Management"]?.rights
	  );
   const color_scheme = useSelector(
			(state: RootState) => state.setting?.data?.color_scheme
		);
  return (
		<>
			{isLoading == false ? (
				<>
				  {viewAccess === "View" && (
					<span className="text-red-600 text-xl uppercase mb-10">
					  you have only view access
					</span>
				  )}
				<div className="lg:flex w-full  h-full mt-8">
					
					<Form1 />
					<Form2 />

					<div className="lg:w-1/3 border border-[#54595F] card-shadow">
						<span
							className={`${
								color_scheme == "Red"
									? "bg-[#DC4C64]"
									: color_scheme == "Green"
									? "bg-[#14A44D]"
									: "bg-[#7A7A7A]"
							} font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
						>
							<p>Public</p>
							<p>{"<Total public links used>"}</p>
						</span>
					</div>
				</div>
				</>
			) : (
				<Loader></Loader>
			)}
		</>
	);
}

export default Public;
