import Form2 from "./Form2";
import Form1 from "./Form1";
import Form3 from "./Form3";
import { useState } from 'react';
import { RootState } from "../../../store/Store";
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import Loader from "../../../pages/whiteloader";

const Level1 = () => {
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
      
      {
        isLoading==false?(<div className="lg:flex w-full h-full mt-8">
        <Form1 />
        <div className="lg:w-2/3 lg:flex">
          <Form2 />
          <Form3 />
        </div>
      </div>):(<Loader></Loader>)
      }
    </>
  );
};

export default Level1;
