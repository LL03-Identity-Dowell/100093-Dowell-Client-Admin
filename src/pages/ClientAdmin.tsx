import images from "../components/images";
import Layout from "../components/layout";
import { IoSettings } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { AiFillCaretRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import AdminTabs from "../components/tabs";
import {  NavLink } from "react-router-dom";
import axios from "axios";

const ClientAdmin = () => {
  const [isSubmenuHidden, setSubmenuHidden] = useState(true);
  const [_username, setUsername] = useState(null);

  const toggleSubmenu = () => {
    setSubmenuHidden(!isSubmenuHidden);
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) {
      const url = "https://100014.pythonanywhere.com/api/userinfo/";
      axios
        .post(url, { session_id: sessionId })
        .then((response) => {
          try {
            // console.log(response, 'response');

            const user = JSON.parse(response.data);
            setUsername(user.userinfo.username);
          } catch (e) {
            console.log("Failed to parse response");
            // handle the failure case, for instance, you can render the error message
          }
        })
        .catch((error) => {
          console.log("Request failed", error);
          // handle the failure case
        });
    }
  }, []);

  // console.log(username, 'username');

  return (
    <>
      <Layout>
        <main className="container mx-auto mb-20 lg:px-0 px-4">
          <section className="border-y border-[#ff0000]">
            <h2 className="text-[#7A7A7A] font-semibold mt-8">
              Hi [First Name] [Last Name], [Designation]
            </h2>
            <p className="text-[#FF0000] font-semibold pt-8">
              Session starts at [time], [duration], [Location]
            </p>

            <div className="lg:flex justify-between">
              <span className="flex items-center lg:justify-between justify-around my-8 lg:w-[30%]">
                <div className="card-shadow">
                  <img src={images.empty_image} alt="'" />
                </div>
                <div className="card-shadow">
                  <img src={images.org_logo} alt="'" />
                </div>
              </span>

              <div className="mb-8">
                <span>
                  <div className="bg-[#7a7a7a] flex lg:flex-row flex-col items-center lg:gap-8 gap-4 p-[10px] border border-black justify-center">
                    <NavLink to="/setting" className="bg-[#54595F] lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm">
                      <IoSettings className="text-white" />
                      <p
                        
                        className="text-[13px] text-white text-center py-[10px] px-[20px]"
                      >
                        Settings
                      </p>
                    </NavLink>
                    <button className="bg-[#54595F] lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm">
                      <IoMdRefresh className="text-white transform-icon" />
                      <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
                        Refresh
                      </p>
                    </button>
                    <button className="bg-[#54595F] lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm">
                      <FaPowerOff className="text-white" />
                      <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
                        Logout
                      </p>
                    </button>
                  </div>
                </span>

                <div className="bg-[#cef9d2] p-[15px] border-2 border-[#7a7a7a] mt-8">
                  <p className="text-lg font-semibold italic text-[#7A7A7A] pb-2">
                    Select Organisation you want to connect
                  </p>
                  <select className="w-full rounded-md outline-none py-1">
                    <option className="text-center ">
                      My Organisation, Owner Name
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4 flex lg:flex-row flex-col-reverse gap-4">
            <div className="border border-black card-shadow lg:w-1/4 px-2 py-2">
              <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2]">
                <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
                  My Profile
                </h2>
                <div className="card-shadow mx-4">
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
                    <span
                      className="flex items-center h-12 gap-4 cursor-pointer"
                      onClick={toggleSubmenu}
                    >
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">Organisations</p>
                    </span>

                    <div
                      className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${
                        isSubmenuHidden ? "hidden" : ""
                      }`}
                      id="submenu"
                    >
                      <h1 className="cursor-pointer p-2 hover:bg-[#cef9d2] rounded-md mt-1">
                        Social
                      </h1>
                      <h1 className="cursor-pointer p-2 hover:bg-[#cef9d2] rounded-md mt-1">
                        Personal
                      </h1>
                      <h1 className="cursor-pointer p-2 hover:bg-[#cef9d2] rounded-md mt-1">
                        Friends
                      </h1>
                    </div>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">My profile</p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">Last Logins</p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2] mt-8">
                <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
                  Notifications
                </h2>
                <div className="card-shadow mx-4">
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">
                        Team Member Chat (098)
                      </p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">User Chat (09)</p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">
                        Public Chat (0045)
                      </p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">
                        UX Living Lab Chat
                      </p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2] mt-8">
                <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
                  Announcements
                </h2>
                <div className="card-shadow mx-4">
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">
                        To Team Members
                      </p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">To Users</p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">To Public</p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">
                        From UX Living Lab
                      </p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2] mt-8">
                <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
                  My Organisation
                </h2>
                <div className="card-shadow mx-4">
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">Products (007)</p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">
                        Team members (00025)
                      </p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">Users (000025)</p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">
                        Users (0000234)
                      </p>
                    </span>
                  </div>
                  <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
                    <span className="flex items-center h-12 gap-4">
                      <AiFillCaretRight className="text-white" />
                      <p className="text-white font-semibold">Public (009)</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:w-3/4">
              <AdminTabs />
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default ClientAdmin;
