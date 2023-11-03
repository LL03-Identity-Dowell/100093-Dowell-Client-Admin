import Layout from "../../components/layout";

import AdminTabs from "../../components/tabs";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Otherorgtab from "../../components/otherorgtab";
import Loader from "../whiteloader";
import { setState } from "../../store/slice/adminData";

const ClientAdmin = () => {
  const selectedOrg = useSelector((state: RootState) => state.selectedorg);
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0]?.isNewOwner
  );
  const dispatch = useDispatch();
  dispatch(setState("true"));

  return (
    <>
      <Layout>
        <main className="container mx-auto mb-20 lg:px-0 px-4">
          <Header />

          <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8">
            <Sidebar />
            {loadingstate === true ? (
              <div className="lg:w-3/4">
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
                        localStorage.removeItem("adminData");
                        window.location.reload();
                      }}
                    >
                      leave workspace
                    </button>
                  </div>
                )}
                {selectedOrg.type === "owner" ? <AdminTabs /> : <Otherorgtab />}
              </div>
            ) : (
              <Loader></Loader>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
};

export default ClientAdmin;
