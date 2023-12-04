import { useSelector } from "react-redux";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useEffect } from "react";
import { useState } from "react";
import { RootState } from "../../../store/Store";
import Loader from "../../../pages/whiteloader";

const TeamMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentadmindata = useSelector((state: RootState) => state.adminData);
  const viewAccess = useSelector((state: RootState) => state.viewAccess);
  const [teamMemberAccess, setTeamMemberAccess] = useState(null);
  useEffect(() => {
    if (viewAccess !== null) {
      setTeamMemberAccess(viewAccess[1]["Member Management"]["rights"]);
    }
  }, [viewAccess]);
  console.log(teamMemberAccess);
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
        <>
          {teamMemberAccess === "View" && (
            <span className="text-red-600 text-xl uppercase mt-10">
              you have only view access
            </span>
          )}
          <div className="lg:flex w-full  h-full mt-8">
            <Form1 />
            <Form2 />
            <Form3 />
          </div>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default TeamMember;
