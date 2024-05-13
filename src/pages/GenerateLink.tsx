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
import LinkHeader from "../components/Generate Link/GenerateLinkHeader"
import { Axios93Base } from "../api/axios";
// import { getLocation } from "../utils/geolocation";
import {setLinks, setGeneratedLink} from "../store/slice/solutionLinks";
import { FaCogs } from 'react-icons/fa';

const Solutions = () => {
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const [loading, setLoading] = useState(false); // Loading state
 const [workspaceID, setWorkSpaceID] = useState("")

  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );
 

  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

 
  const latitude = useSelector(
    (state: RootState) => state.userinfo.userinfo.coordinates[0]
    
  );
  const longitude = useSelector(
    (state: RootState) => state.userinfo.userinfo.coordinates[1]
    
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
  
  const fetchuserData = async () => {
    try {
      const response = await Axios93Base.post("/get_data/", {
        session_id: sessionId,
        username: userName,
      });
      setWorkSpaceID(response.data.data[0]._id)
    } catch (error) {
      console.error("Error getting user data:", error);
      // Handle the error
    } finally {
      // setLoading(false);
    }
  };
  
  fetchuserData()
  fetchIsOwnerData();

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
  useEffect(() => {
    fetchLinks();

  }, [workspaceID]);
 

  

  
  const link = useSelector(
    (state: RootState) => state.link.links
  );
  
  
 
  const handleCopyText = (links:string) => {
    const paragraphText = links;
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
  const generatedLink = useSelector((state:RootState) => state.link.generatedLink)

  useEffect(() => {
    fetchLinks();

  }, [generatedLink]);
  return (
    <>
      <div className="relative">
        <Layout>
          <main>
            <div className="container mx-auto mb-20 lg:px-0 px-4">
              <LinkHeader/>

              <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8 justify-end text-center">
                {loadingstate === true ? (                  
                  
                  <div className="flex flex-col overflow-x-scroll">
                     <button
                      onClick={handleGenerateLink}
                      className="mb-5 bg-gray-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mx-auto"
                    >
                      {loading ? "Generating" : "Generate New Link"} <FaCogs className="inline-block ml-2" />
                    </button>
                 {link ? <div>
                          <table className="w-full sm:w-auto md:w-full lg:w-auto xl:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                  <th  className="px-6 py-3">Serial No.</th>
                                  <th  className="px-6 py-3 rounded-s-lg">Link</th>
                                  <th  className="px-6 py-3 rounded-e-lg">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {link.map((link, index) => (
                                  // Check if link.link is not empty before rendering the row
                                  link.link && (
                                    <tr key={index} className="bg-white dark:bg-gray-800">
                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{link.link}</td>
                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <button onClick={() => handleCopyText(link.link)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button>
                                      </td>
                                    </tr>
                                  )
                                ))}
                              </tbody>

                            </table>


                          </div>
                    : <p>You have not generated any link yet</p>}
            
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
