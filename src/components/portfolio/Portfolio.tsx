import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../pages/whiteloader";

const Portfolio: React.FC = () => {
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
        <div className="mt-8 w-full lg:flex">
          <Form1 />
          <Form2 />
        </div>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default Portfolio;
