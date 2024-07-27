import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../components/layout";
import Sidebar from "./admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../store/Store";
import Loader from "./whiteloader";
import { isNewOwner, setAdminData } from "../store/slice/adminData";
import { getselectedcat } from "../store/slice/selectedcat";
import { getViewAccess } from "../store/slice/viewAccess";
// import ReportTabs from "../components/ReportTabs";
import { toast } from "react-toastify";
import LinkHeader from "../components/Generate Link/GenerateLinkHeader"
import { Axios93Base } from "../api/axios";
// import { getLocation } from "../utils/geolocation";
import {setLinks, setGeneratedLink} from "../store/slice/solutionLinks";
import { FaCogs } from 'react-icons/fa';
import Category from "../components/category";
import axios from "axios";
import { getCategory } from '../store/slice/CategorySlice';
import { getselectedorgs } from "../store/slice/selectedorg";


type Category= {
  category_name: string;
  links:string[];
  // Add other properties if needed
}
type Link ={
  id: number;
  link: string;
  // Other properties of a link
}

const Solutions = () => {
  const loadingstate = useSelector((state: RootState) => state.loaderslice);
  const [loading, setLoading] = useState(false); // Loading state
  const [workspaceID, setWorkSpaceID] = useState("")
  const [loadingQR, setLoadingQR] = useState(false);
  const [loadingMarkInMap, setLoadingMarkInMap] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryLoader, setCategoryLoader] = useState(false)
  const overlaysidebarstate = useSelector(
    (state: RootState) => state.overlaysidebar
  );
  const [tabIndex, setTabIndex] = useState(-1);
 
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const email = useSelector(
    (state: RootState) => state.userinfo.userinfo.email
  );


//  console.log(category)
  const latitude = useSelector(
    (state: RootState) => state.userinfo.userinfo.coordinates[0]
    
  );
  const longitude = useSelector(
    (state: RootState) => state.userinfo.userinfo.coordinates[1]
    
  );

  const [ismobile, setismobile] = useState(window.innerWidth <= 1000);
  console.log(ismobile)
  useEffect(() => {
    const handleResize = () => {
      setismobile(window.innerWidth <= 1000);
    };
      // Set up event listener when the component is mounted
      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

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

  const handleGenerateLink = async (cat:string) => {
    if (cat === undefined || cat === null || cat === '') {
      cat = "default";
  }
    try {
      setLoading(true);
      // setShowLocationPopup(true);
      const response = await Axios93Base.post("generatelink/", {
        workspace_id: workspaceID,
        username: userName,
        latitude:latitude,
        longitude:longitude,
        category:cat,
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
 
 

  
  
  const categ = useSelector(
    (state: RootState) => state.selectedcat.category_name
  );
  console.log(categ)
  const link = useSelector(
    (state: RootState) => state.link.links
  );
  console.log(link)
  const [cat_link, set_cat_link] = useState([""])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [defaultCatLinks, setDefaultCatLinks] = useState<Link[]>([])
  // function to dispatch slected categories 
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement> | any) => {
    const selectedOrgname = event.target.value;
    setSelectedCategory(selectedOrgname)
    console.log(selectedOrgname)
    // dispatch(getselectedcat(selectedOrgname))
    const cate = categories.find(
      (org) => `${org.category_name}` === selectedOrgname
    );
    console.log(cate)
    if (cate) {
      dispatch(getselectedcat(cate));
        set_cat_link(cate.links);
        console.log(cate.links)
    } else {
        set_cat_link([]);
        console.log(cat_link)

    }
  }; 
 console.log(cat_link)
  // handle default selection
  useEffect(() => {
    
    // Fetch data based on selectedOption (if needed)
    if (selectedCategory !== '') {
      
      setDefaultCatLinks(link)
    }
  }, [selectedCategory]);
//  copy link function 
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

  // create qr code function 
const handleCreateQRCode = async () => {
  const master_code_payload ={
    num_qrcodes: 1,
    company_id: workspaceID,
    qrcode_type: "Link",
    product_name: "Living Lab Admin",
    qrcode_color: "#FF0000",
    created_by: userName,
    lat: latitude,
    long: longitude,
    redirect_link: "http://example.com/",
    name: userName,
    email: email
  }
  setLoadingQR(true)
  try {
    const response = await axios.post("https://www.qrcodereviews.uxlivinglab.online/api/v6/create-mastercode/", master_code_payload);
    // console.log("type:", response.data);
    toast.success(response.data.response)
    // Handle the response data as needed
    setLoadingQR(false)
    console.log("create qr code response",response)
  } catch (error) {
    console.error("Error generating Qr code:", error);
    setLoadingQR(false)

    // Handle the error
  } finally {
    setLoadingQR(false)
  }
}
  // mark in map button  function 
  const handleMarkInMap= async (cat:string) => {
    if (cat === undefined || cat === null || cat === '') {
      cat = "default";
  }
    const markInMap_payload ={
      workspace_id:workspaceID,
      lat: latitude,
      long: longitude,
      qr_code: "34345",
      name:userName,
      category:cat
    }
    setLoadingMarkInMap(true)
    try {
      const response = await axios.post("https://100086.pythonanywhere.com/subs-operation/?api_key=bc4ecc24-7300-421d-8175-badd8d522fea", markInMap_payload);
      console.log(response)
      if(response.data[0].success){
        toast.success("Marked Successfully")
        setLoadingMarkInMap(false)
        return
      }
      else{
        toast.error(response.data[0].text)
      }
      console.log("create qr code response",response)
    } catch (error) {
      console.error("Failure:", error);
      toast.error("Failure")
      setLoadingMarkInMap(false)
  
      // Handle the error
    } finally {
      setLoadingMarkInMap(false)
      // toast.error("Failure")

    }
  }
// function to fetch categories 
const handleGetCategory = async (wrok_id:string, user_name:string) => {
  const add_category_payload ={
    workspace_id:wrok_id,
    username:user_name,
  }
  if(wrok_id===""||user_name===""){
    return
  }
  try {
    const response = await Axios93Base.post("addlinkcat", add_category_payload);
    const data =await response
    console.log(data)
    setCategories(data.data.categories)
// setCategories( [
//   { category_name: 'school', links: ['https://school-link1.com', 'https://school-link2.com'] },
//   { category_name: 'bus', links: ['https://bus-link1.com', 'https://bus-link2.com'] },
//   { category_name: 'class', links: ['https://class-link1.com'] },
//   { category_name: 'example', links: [] },
//   { category_name: 'dowell', links: ['https://dowell-link1.com'] },
//   { category_name: 'cat2', links: [] },
//   { category_name: 'cat1', links: ['https://cat1-link1.com', 'https://cat1-link2.com'] }
// ])
    dispatch(getCategory(response.data.categories));
    setCategoryLoader(true)
  } catch (error) {
    console.error("Error creating category:", error);
    setCategoryLoader(true)

    // Handle the error
  } finally {
    setCategoryLoader(true)
  }
}
  const generatedLink = useSelector((state:RootState) => state.link.generatedLink)

  useEffect(() => {
    fetchLinks();

  }, [generatedLink]);
  useEffect(() => {
    handleGetCategory(workspaceID, userName)
  }, [workspaceID,userName]);
 console.log(workspaceID,userName)

  // const tabTitle = [
  //   {
  //     title: "New Link",
  //     icon: <FaCogs />,
  //   },
  //   {
  //     title: "Categories",
  //     icon: <FaCogs />,
  //   },

  // ];

  const mobiletab = [
    {
      title: "Generate Link",
      icon: <FaCogs />,
    },
    {
      title: "Add Categories",
      icon: <FaCogs />,
    },

    
  ];
console.log(link)

  return (
    <>
  
      <div className="relative">
        <Layout>
          <main>
            <div className="container mx-auto mb-20 lg:px-0 px-4">
              <LinkHeader/>

              <section className="mt-4 flex flex-col-reverse gap-8 justify-center text-center">
                
                {loadingstate === true ? (    
                  // tabs 
                  <div>
                  {/* {ismobile ? ( */}
                    <Tabs
                      className=""
                      selectedTabClassName={` ${
                        color_scheme == "Red"
                          ? "bg-[#DC4C64]"
                          : color_scheme == "Green"
                          ? "bg-[#14A44D]"
                          : "bg-[#7A7A7A]"
                      } text-white `}
                      selectedIndex={tabIndex}
                      onSelect={(index) => setTabIndex(index)}
                    >
                      <TabList className="w-full grid lg:grid-cols-2 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-0">
                        {mobiletab.map((tabs, index) => {
                          return (
                            <>
                              <Tab
                                key={tabs.title}
                                className={`xl:w-[90%] card-shadow h-12  flex items-center px-8 text-[#7a7a7a] gap-x-10 xl:gap-x-4 border border-[#7a7a7a] rounded-lg ${
                                  color_scheme == "Red"
                                    ? "hover:bg-[#DC4C64]"
                                    : color_scheme == "Green"
                                    ? "hover:bg-[#14A44D]"
                                    : "hover:bg-[#7A7A7A]"
                                } hover:text-white cursor-pointer  outline-none`}
                              >
                                <i className=" text-xl font-black">{tabs.icon}</i>
                                <p
                                  id={`adminTabText${index}`}
                                  className="font-roboto text-lg w-full text-dark hover:text-dark"
                                >
                                  {tabs.title === "Generate Link" ?
                                    <div>{categoryLoader? <div>{categories?<select
                                      id="headerSelect2"
                                      // className="w-full rounded-md outline-none bg-light text-dark hover-bg-light py-1 text-center w-full hover:text-dark"
                                      className={` ${
                                        color_scheme == "Red"
                                          ? "bg-[#DC4C64]"
                                          : color_scheme == "Green"
                                          ? "bg-[#14A44D]"
                                          : "bg-[#7A7A7A]"
                                      } text-white w-[100%]`}
                                      onChange={handleCategoryChange}
                                    >
                                      <option value="">Select Category</option>
                                      {categories.map((cat, index) => (
                                        
                                          <option value={cat.category_name} key={index}>
                                            {cat.category_name}
                                          </option>
                                        
                                      ))}
                                    </select>:"New Links"}</div>
                                  
                                  :"Laoding"}</div>
                                 
                                  
                                   
                                  :tabs.title}
                                </p>
                              </Tab>
                            </>
                          );
                        })}
                      </TabList>
                      <TabPanel>
                      <div > 
                        <button
                          onClick={() =>handleGenerateLink(categ)}
                          className="mb-5 bg-gray-500 mt-5 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mx-auto"
                        >
                          {loading ? "Generating" : "Generate New Link"} <FaCogs className="inline-block ml-2" />
                        </button>

                       
                           
                               <br/>
                               <table className="w-full sm:w-auto md:w-full lg:w-auto xl:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                          <th  className="px-6 py-3 col-span-1 rounded-s-lg">Serial No.</th>
                                          <th  className="px-6 py-3  col-span-1">Link</th>
                                          <th  className="px-6 py-3 rounded-e-lg col-span-3">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {defaultCatLinks &&  selectedCategory === "" ? (
                                          <>
                                           {link.map((link, index) => (
                                      // Check if link.link is not empty before rendering the row
                                      link.link && (
                                        <tr key={index} className="bg-white dark:bg-gray-800">
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{link.link}</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => handleCopyText(link.link)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Mark In Map</button>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => handleCreateQRCode()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{loadingQR?"Generating QR":"Create QR code"}</button>
                                          </td>
                                        </tr>
                                      )
                                    ))}</>
                                        ) : cat_link.length  ? (
                                          cat_link.map((link, index) => (
                                            <tr key={index} className="bg-white dark:bg-gray-800">
                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{link}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                                  <button onClick={() => handleCopyText(link)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button>
                                                  <button onClick={() => handleMarkInMap(categ)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{loadingMarkInMap?"Marking":"Mark In Map"}</button>
                                                  <button onClick={() => handleCreateQRCode()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{loadingQR?"Generating QR":"Create QR code"}</button>
                                                </td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <div className="p-4 mb-auto mt-auto text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                              <span className="font-medium">Alert!</span> you have not generated any link under {categ} category
                                            </div>
                                          </tr>
                                        )}
                                      </tbody>
                                      {/* <tbody>
                                        <div>{defaultCatLinks?<div>hjj</div> :
                                          <div>     
                                            {cat_link.length?

                                            <div>{cat_link.map((link, index) => (
                                              <tr key={index} className="bg-white dark:bg-gray-800">
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{link}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                  <button onClick={() => handleCopyText(link)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button>
                                                  <button onClick={() => handleMarkInMap(categ)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{loadingMarkInMap?"Marking":"Mark In Map"}</button>
                                                  <button onClick={() => handleCreateQRCode()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{loadingQR?"Generating QR":"Create QR code"}</button>
                                                </td>
                                              </tr>
                                              ))}
                                            </div>: 

                                            <tr>
                                              <div className="p-4  mb-auto mt-auto text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                                <span className="font-medium">Alert!</span> you have not generated any link under {categ} category
                                              </div>
                                            </tr>
                                            
                                            }
                                          <div> 
                                        }
                                        </div>                             
                                      </tbody> */}

                                </table>
                              

                        </div>
                      </TabPanel>
                      <TabPanel>

                      <Category/>
                        
                      </TabPanel>
                     
                    </Tabs>
                  {/* // ) : ( */}
                    {/* <Tabs
                      className=""
                      selectedTabClassName={` ${
                        color_scheme == "Red"
                          ? "bg-[#DC4C64]"
                          : color_scheme == "Green"
                          ? "bg-[#14A44D]"
                          : "bg-[#7A7A7A]"
                      } text-white `}
                      selectedIndex={tabIndex}
                      onSelect={(index) => setTabIndex(index)}
                    >
                      <TabList className="w-full grid lg:grid-cols-2 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-0">
                        {tabTitle.map((tabs, index) => {
                          return (
                            <>
                              <Tab
                                key={tabs.title}
                                className={`xl:w-[90%] card-shadow h-12  flex items-center px-8 text-[#7a7a7a] gap-x-10 xl:gap-x-4 border border-[#7a7a7a] rounded-lg ${
                                  color_scheme == "Red"
                                    ? "hover:bg-[#DC4C64]"
                                    : color_scheme == "Green"
                                    ? "hover:bg-[#14A44D]"
                                    : "hover:bg-[#7A7A7A]"
                                } hover:text-white cursor-pointer  outline-none`}
                              >
                                <i className=" text-xl font-black">{tabs.icon}</i>
                                <p
                                  id={`adminTabText${index}`}
                                  className="font-roboto text-lg w-full text-dark hover:text-dark"
                                >
                                  {tabs.title === "Generate Link" ?<div>{categoryLoader? <div>{categories.length?<select
                                    id="headerSelect1"
                                    className="w-full rounded-md outline-none bg-[#7a7a7a] py-1 text-center w-full hover:text-dark"
                                   
                                    onChange={handleCategoryChange}
                                  >
                                    {categories.map((cat, index) => (
                                      <option value={cat.category_name} key={index}>
                                        {cat.category_name}
                                      </option>
                                    ))}
                                  </select>:"New Links"}</div>:"Laoding"}</div>
                                 
                                  
                                   
                                  :tabs.title}
                                </p>
                              </Tab>
                            </>
                          );
                        })}
                      </TabList>
                      <TabPanel>
                      <div className="flex flex-col overflow-x-scroll">
                        <button
                          onClick={() =>handleGenerateLink(categ)}
                          className="mb-5 mt-[2rem] bg-gray-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mx-auto"
                        >
                          {loading ? "Generating" : "Generate New Link"} <FaCogs className="inline-block ml-2" />
                        </button>
                        {link ? <div className="w-full overflow-x-auto shadow rounded-lg">
                              <table className="w-full sm:w-auto md:w-full lg:w-auto xl:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                      <th  scope="col" className="px-6 py-3 rounded-s-lg">Serial No.</th>
                                      <th  scope="col" className="px-6 py-3">Link</th>
                                      <th  scope="col" className="px-6 py-3 rounded-e-lg">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                  {cat_link?.map((link, index) => (
                                      // Check if link.link is not empty before rendering the row
                                    
                                        <tr key={index} className="bg-white dark:bg-gray-800">
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{link.length>0?link:`You have not generated any link under ${categ} category`}</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => handleCopyText(link)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => handleMarkInMap(categ)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{loadingMarkInMap?"Marking":"Mark In Map"}</button>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => handleCreateQRCode()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{loadingQR?"Generating QR":"Create QR code"}</button>
                                          </td>
                                        </tr>
                                      
                                    ))}
                                  </tbody>

                                </table>
  

                              </div>
                        : <p>You have not generated any link yet</p>}
                        </div>
                      </TabPanel>
                      <TabPanel>


                        <Category/>
                        
                      </TabPanel>
                      
                    </Tabs> */}
                  {/* // )} */}
                </div>
                  // tabs               
              
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
