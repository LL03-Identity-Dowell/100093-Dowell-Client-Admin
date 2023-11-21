import Layout from "../../components/layout";

import AdminTabs from "../../components/tabs";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Otherorgtab from "../../components/otherorgtab";
import Loader from "../whiteloader";
import { isNewOwner, setAdminData } from "../../store/slice/adminData";
import { getselectedorgs } from "../../store/slice/selectedorg";
import axios from "axios";

const ClientAdmin = () => {
  const selectedOrg = useSelector((state: RootState) => state.selectedorg);
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );
  console.log(loadingstate);

  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const dispatch = useDispatch();
  const fetchIsOwnerData = async () => {
    if (localStorage.getItem("username")) {
      if (!isnewOwner) {
        const username = localStorage.getItem("username");
        const responseAdmin = await axios.post(
          "https://100093.pythonanywhere.com/api/get_data/",
          { username: username }
        );
        dispatch(isNewOwner(username));
        dispatch(setAdminData(responseAdmin.data.data[0]));
        dispatch(getselectedorgs({ orgname: userName, type: "owner" }));
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
            <div className="container mx-auto mb-20 lg:px-0 px-4">
              <Header />

              <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8 justify-end">
                {loadingstate === true ? (
                  <div className="lg:w-[90%] ">
                    {isnewOwner && (
                      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-5">
                        <h2 className="md:w-[55%] text-center  font-medium text-xl text-[#61CE70]">
                          You are connected to{" "}
                          <span className="text-[#FF0000]">{isnewOwner}</span>{" "}
                          Workspace
                        </h2>
                        <button
                          className="md:w-[20%] px-4 py-2 bg-[#61CE70] text-white rounded-md hover:bg-[#2ea53e]"
                          onClick={() => {
                            localStorage.removeItem("username");
                            window.location.reload();
                          }}
                        >
                          leave workspace
                        </button>
                      </div>
                    )}
                    {isnewOwner !== undefined ? (
                      selectedOrg.type === "owner" ? (
                        <AdminTabs />
                      ) : (
                        <Otherorgtab />
                      )
                    ) : (
                      <Loader></Loader>
                    )}
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

export default ClientAdmin;
