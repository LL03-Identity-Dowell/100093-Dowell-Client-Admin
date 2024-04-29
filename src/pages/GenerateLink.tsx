import Layout from "../components/layout";
import Sidebar from "./admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../store/Store";
import Loader from "./whiteloader";
import { isNewOwner, setAdminData } from "../store/slice/adminData";
import { getselectedorgs } from "../store/slice/selectedorg";
import { getViewAccess } from "../store/slice/viewAccess";
// import ReportTabs from "../components/ReportTabs";
import { toast } from "react-toastify";
import Header from "./admin/Header";
import { Axios93Base } from "../api/axios";
const Solutions = () => {
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const [loading, setLoading] = useState(false); // Loading state
  const [link, generatedLink] = useState("")
  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );

  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => {state.userinfo.userinfo.username
    console.log(state.userinfo.userinfo)}
  );
  const workspaceID = useSelector(
    (state: RootState) => state.userinfo.userinfo.client_admin_id
  );
  const latitude = useSelector(
    (state: RootState) => {state.userinfo.userinfo.coordinates[0]
    }
  );
  const longitude = useSelector(
    (state: RootState) => {state.userinfo.userinfo.coordinates[1]
    }
  );

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
  const handleGenerateLink = async () => {
    try {
      setLoading(true);
      const response = await Axios93Base.post("generatelink/", {
        workspace_id: workspaceID,
        username: userName,
        latitude:latitude,
        longitude:longitude
      });
      console.log("Generated link:", response.data);
      generatedLink(response.data.link)
      // Handle the response data as needed
    } catch (error) {
      console.error("Error generating link:", error);
      // Handle the error
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    const paragraphText = link;
    // Original string containing multiple occurrences of the URL

// Replaced string
const replacedString = paragraphText.replace(/https:\/\/100093\.pythonanywhere\.com/g, 'http://localhost:5173');

console.log(replacedString);


    // navigator.clipboard.writeText(paragraphText)
    navigator.clipboard.writeText(replacedString)

      .then(() => {
        console.log('Text copied to clipboard:', paragraphText);
        toast.success("Text copied to clipboard");
    })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
        // Handle error if copying fails
      });
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
                  <div className="lg:w-full">
                    {/* <GenerateLinkTab /> */}
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleGenerateLink}
                      disabled={loading}
                    >{loading ?" Generating Link":" Generate Link"}
                     
                    </button>
                     
                    {link?<div><p>{link}</p><button  onClick={handleCopyText} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button></div>:<p></p>}
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

export default Solutions;
