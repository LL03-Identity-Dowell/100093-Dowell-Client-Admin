import Layout from "../components/layout";
import Sidebar from "./admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import Loader from "./whiteloader";
import { isNewOwner, setAdminData } from "../store/slice/adminData";
import { getselectedorgs } from "../store/slice/selectedorg";
import { getViewAccess } from "../store/slice/viewAccess";
import ReportHeader from "../components/reports/ReportHeader";
import { Axios93Base } from "../api/axios";
import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { InstituteName } from "./solutionTypes";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const initialPublicFormInputs: InstituteName = {
    instituteName: "",
  };
const DowellEducation = () => {
  const [link, setLink] = useState()
  const [loading, setLoading] = useState(false)
  const [noLink, setNoLink] = useState(false)
  const [formInputs, setFormInputs] = useState(initialPublicFormInputs);
console.log(noLink)
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
  const workspaceId = useSelector(
    (state: RootState) => state.userinfo.userinfo.client_admin_id
  );
  console.log(workspaceId)
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

//   get request for link 
  useEffect(() => {
    const fetchLink = async () => {
        try {
            const response = await axios.get(`https://www.samantaedu.uxlivinglab.online/api/v1/link/${workspaceId}`);
            if (response.data.success && response.data.response.length > 0) {
                setLink(response.data.response[0].link);
                console.log(response.data.response[0])
                console.log("link found")
            } else {
                console.log("link not found")
                setNoLink(true)
            }
        } catch (error) {
            console.error(error);
            // setSnackbar({ open: true, message: 'Failed to fetch link.', severity: 'error' });
        } finally {
            // setLoading(false);
        }
    };
    fetchLink();
}, [workspaceId]);

const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  // submit generate link 
  const handleGenerateLink = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postLink = async () => {
      if (!formInputs.instituteName) {
        toast.error("Institute Name is required.");
        return;
      }
      try {
        setLoading(true)
        const payload={
          "workspaceId":workspaceId,
          "institutionName":formInputs.instituteName,
          "username":userName,
      }

       const response = await axios.post("https://www.samantaedu.uxlivinglab.online/api/v1/link/generate-link", payload);
      console.log(response)
        setLoading(false)
        toast.success("Link Generated successfully");
      } catch (error) {
        toast.error("Error while generating link")
        setLoading(false)
      }

  
    };

    // Call the API when the component mounts
    postLink();

   
  };

  const handleCopyText = (links:string) => {
    const paragraphText = links;
    // const replacedString = paragraphText.replace(/https:\/\/100093\.pythonanywhere\.com/g, 'http://localhost:5173');

    // console.log(replacedString);
     navigator.clipboard.writeText(paragraphText)
      // navigator.clipboard.writeText(paragraphText)

      .then(() => {
        console.log('Text copied to clipboard:', paragraphText);
        toast.success("Link copied to clipboard");
    })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
        // Handle error if copying fails
      });
  };
  return (
    <>
      <div className="relative">
      <ToastContainer position="top-right" />

        <Layout>
          <main>
            <div className="container mx-auto mb-20 lg:px-0 px-4">
              <ReportHeader />

              <section className="mt-4 flex lg:flex-row flex-col-reverse gap-8 justify-end">
                {loadingstate === true ? (
                  <div className="lg:w-full">
                    {link?<table className="w-full sm:w-auto md:w-full lg:w-auto xl:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                      <th  className="px-6 py-3 rounded-s-lg">Link</th>
                                      <th  className="px-6 py-3 rounded-e-lg">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                        <tr className="bg-white dark:bg-gray-800"><td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{link}</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => handleCopyText(link)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button>
                                          </td>
                                        </tr>
                                  </tbody>
                                  </table>:
                    // form 
                    <div className="lg:w-1/2 mt-5 h-full border border-[#54595F] ms-auto me-auto card-shadow px-[30px] pb-4">
                    <span
                      className={`${
                        color_scheme == "Red"
                          ? "bg-[#DC4C64]"
                          : color_scheme == "Green"
                          ? "bg-[#14A44D]"
                          : "bg-[#7A7A7A]"
                      } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col`}
                    >
                      <p id="portfolioForm1Text1" className="text-center">Generate Link</p>
                    </span>
              <form>
                {/* category name  */}
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                      <span id="instituteName">Enter Institute Name</span>
                      <span className="text-[#ff0000] text-base">*</span>
                    </label>
                  
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter institute name"
                      className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                      id="instituteName"
                      onChange={handleOnChange}
                      value={formInputs.instituteName}
                    />
                  </div>
                </div>
            
                <button
                id="portfoliotext43"
                onClick={handleGenerateLink}
                className={`w-full ${
                  color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                    ? "bg-[#14A44D]"
                    : "bg-[#7A7A7A]"
                }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
                >
                {loading ? "Creating":"Create Link"}
                </button>
                </form>
                </div>
                    // form end 
                    }
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

export default DowellEducation;

