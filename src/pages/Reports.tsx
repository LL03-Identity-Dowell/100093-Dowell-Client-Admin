import Layout from "../components/layout";
import Sidebar from "./admin/Sidebar";
import Header from "./admin/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Loader from "./whiteloader";
import { isNewOwner, setAdminData } from "../store/slice/adminData";
import { getselectedorgs } from "../store/slice/selectedorg";
import axios from "axios";
import { getViewAccess } from "../store/slice/viewAccess";
import ReportTabs from "../components/ReportTabs";

const Reports = () => {
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );

  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const dispatch = useDispatch();
  const sessionId = localStorage.getItem("sessionId");
  const fetchIsOwnerData = async () => {
    if (localStorage.getItem("username")) {
      if (!isnewOwner) {
        const username = localStorage.getItem("username");
        const responseAdmin = await axios.post(
          "https://100093.pythonanywhere.com/api/get_data/",
          { username: username, session_id: sessionId }
        );
        const response = await axios.post(
          "https://100093.pythonanywhere.com/api/settings/",
          { username: username }
        );
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

  return (
    <>
      <div className="relative">
        <Layout>
          <main>
            <div className="mx-5 mb-20 lg:px-0 px-4">
              <Header />

              <section className="w-full mt-4 flex lg:flex-row">
                {loadingstate === true ? (
                  <div className="lg:w-full">
                    <ReportTabs />
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

export default Reports;
