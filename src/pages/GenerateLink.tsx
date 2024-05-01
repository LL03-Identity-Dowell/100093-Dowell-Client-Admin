import Layout from "../components/layout";
import Sidebar from "./admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../store/Store";
import Loader from "./whiteloader";
import { isNewOwner, setAdminData } from "../store/slice/adminData";
import { getselectedorgs } from "../store/slice/selectedorg";
import { getViewAccess } from "../store/slice/viewAccess";
// import ReportTabs from "../components/ReportTabs";
import { toast } from "react-toastify";
import Header from "./admin/Header";
import { Axios93Base } from "../api/axios";
import {setLinks, setGeneratedLink} from "../store/slice/solutionLinks";
import { FaCogs } from 'react-icons/fa';

const Solutions = () => {
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const [loading, setLoading] = useState(false); // Loading state

  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );

  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const workspaceID = useSelector(
    (state: RootState) => state.adminData.data[0]._id
    
  );
  const latitude = useSelector(
    (state: RootState) => state.userinfo.userinfo.coordinates[0]
    
  );
  const longitude = useSelector(
    (state: RootState) => state.userinfo.userinfo.coordinates[1]
    
  );
  console.log(latitude)


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
      // setShowLocationPopup(true);
      const response = await Axios93Base.post("generatelink/", {
        workspace_id: workspaceID,
        username: userName,
        latitude:latitude,
        longitude:longitude
      });
      console.log("Generated link:", response.data);
      dispatch(setGeneratedLink(response.data.link));
      toast.success("Link Generated Successfully!")
      // generatedLink(response.data.link)
      // Handle the response data as needed
    } catch (error) {
      console.error("Error generating link:", error);
      // Handle the error
    } finally {
      setLoading(false);
    }
  };

  const fetchLinks = async () => {
    try {
       const response = await Axios93Base.post("getlinks/", {
        admin_id: workspaceID,
      });
      // console.log(response.data)
      dispatch(setLinks(response.data));
    } catch (error) {
      console.error("Error fetching links:", error);
      // Handle error if needed
    }
  };
   
  fetchIsOwnerData();
  const link = useSelector(
    (state: RootState) => state.link.links
  );
  
  console.log(link)
  const generatedLink = useSelector((state:RootState) => state.link.generatedLink)
  
  useEffect(() => {
    fetchLinks();
  }, [generatedLink]);

  const handleCopyText = (link:string) => {
    const paragraphText = link;
    // const replacedString = paragraphText.replace(/https:\/\/100093\.pythonanywhere\.com/g, 'http://localhost:5173');

    // console.log(replacedString);
     navigator.clipboard.writeText(paragraphText)
      // navigator.clipboard.writeText(paragraphText)

      .then(() => {
        console.log('Text copied to clipboard:', paragraphText);
        toast.success("Text copied to clipboard");
    })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
        // Handle error if copying fails
      });
  };
  return (
    <>
      <div className="relative">
        <Layout>
          <main>
            <div className="container mx-auto mb-20 lg:px-0 px-4">
              <Header />

              <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8 justify-end">
                {loadingstate === true ? (                  
                  
                  <div className="flex flex-col items-center justify-center">
                     <button
                      onClick={handleGenerateLink}
                      className="mb-5 bg-gray-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    >
                      {loading ? "Generating" : "Generate Link"} <FaCogs className="inline-block ml-2" />
                    </button>
                  {/* {generatedLink && <p>Generated Link: {generatedLink}<button onClick={handleCopyText} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button></p>} */}
                 {/* Location Popup */}
                 {link ? <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                  <th scope="col" className="px-6 py-3">Serial No.</th>
                                  <th scope="col" className="px-6 py-3 rounded-s-lg">Link</th>
                                  <th scope="col" className="px-6 py-3 rounded-e-lg">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {link.map((link, index) => (
                                <tr key={link.id} className="bg-white dark:bg-gray-800">
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{link.link}</td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><button onClick={() => handleCopyText(link.link)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button></td>
                                
                                </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                    : <p>You have not generated any link yet</p>}
                  {/* {showLocationPopup && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                      <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Allow Location Access</h2>
                        <p className="mb-4">This website requires access to your location to generate the link.</p>
                        <button
                          onClick={handleAllowLocation}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Allow Location
                        </button>
                      </div>
                    </div>
                  )} */}
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
