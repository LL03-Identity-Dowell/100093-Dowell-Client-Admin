import Layout from "../components/layout";
import Sidebar from "./admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Loader from "./whiteloader";
import { isNewOwner, setAdminData } from "../store/slice/adminData";
import { getselectedorgs } from "../store/slice/selectedorg";
import { getViewAccess } from "../store/slice/viewAccess";
// import ReportTabs from "../components/ReportTabs";
import ReportHeader from "../components/reports/ReportHeader";
import { Axios93Base } from "../api/axios";
import { useEffect, useState } from "react";

const ListOfTeams = () => {
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const [loading, setLoading] = useState(false)
  const [teamList, setTeamList] = useState([])
  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );

  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  console.log("username", userName, loading, teamList)
  const dispatch = useDispatch();
  const sessionId = localStorage.getItem("sessionId");
  const fetchIsOwnerData = async () => {
    if (localStorage.getItem("username")) {
      if (!isnewOwner) {
        const username = localStorage.getItem("username");
        const responseAdmin = await Axios93Base.post("/get_data/", {
          username: username,
          session_id: sessionId,
        });
        const response = await Axios93Base.post("/settings/", {
          username: username,
        });
        dispatch(isNewOwner(username));
        dispatch(setAdminData(responseAdmin.data.data[0]));
        dispatch(getselectedorgs({ orgname: userName, type: "owner" }));
        dispatch(getViewAccess(response.data.data.processes_to_portfolio));
      }
    } else {
      dispatch(isNewOwner(null));
    }
  };
  fetchIsOwnerData();

//  getting list of teams  
  useEffect(() => {
    const fetchListOfTeams = async () => {
      try {
        setLoading(true);
        const response_team_names = await Axios93Base.post("/get_team_names_by_username/",{
            "username": userName
          });
          console.log(response_team_names.data.teams)
          setTeamList(response_team_names.data.teams)
          setLoading(false)
      } catch (error) {
        // console.error("Error generating link:", error);
        // Handle the error
      } finally {
        setLoading(false);
      }
    };

    fetchListOfTeams();
  }, []);
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  return (
    <>
      <div className="relative">
        <Layout>
          <main>
            <div className="container mx-auto mb-20 lg:px-0 px-4">
              <ReportHeader />

              <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8 justify-end">
                {loadingstate === true ? (
                  <div className="lg:w-full">
                     <div className="lg:w-full h-full border border-[#54595F] card-shadow px-[30px] pb-4">
                      <span
                        className={`${
                          color_scheme == "Red"
                            ? "bg-[#DC4C64]"
                            : color_scheme == "Green"
                            ? "bg-[#14A44D]"
                            : "bg-[#7A7A7A]"
                        } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
                        >
                        <p id="portfolioForm1Text1">My Teams</p>
                      </span>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Team Name
                              </th>
                            
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {teamList.map((item, index) => (
                              <tr key={item}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      </div>
              
                  </div>
                ) : (
                  <Loader></Loader>
                )}
              </section>
            </div>
          </main>
        </Layout>
        <div
          className={`absolute transition  duration-500 ease-in-out top-0 left-0  w-full  bg-black bg-opacity-50 ${
            overlaysidebarstate ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default ListOfTeams;
