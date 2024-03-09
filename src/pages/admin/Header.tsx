import { NavLink, useLocation } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { useEffect, useState } from "react";
import images from "../../components/images";
import { useDispatch, useSelector } from "react-redux";
import { getuserinfo } from "../../store/slice/userinfo";
import { RootState } from "../../store/Store";
import { getorgs } from "../../store/slice/organization";
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getsetting } from "../../store/slice/setting";
import { getloaderstate } from "../../store/slice/loaderstate";
import { getoverlaysidebar } from "../../store/slice/overlaysidebar";
import { FaBars } from "react-icons/fa";
import { Axios14Base, Axios93Base } from "../../api/axios";

const Header = () => {
  const userData = useSelector((state: RootState) => state.userinfo);
  const currentPath = window.location.pathname;
  const logout_url = "https://100014.pythonanywhere.com/sign-out";
  const dispatch = useDispatch();
  const routeLocation = useLocation();

  // const defaultlang = useSelector(
  //   (state: RootState) => state.setting?.data?.default_language
  // );
  // select ownerorg , workspace , all org and selected org from redux state
  const ownerorg = useSelector(
    (state: RootState) => state?.adminData?.data[0]?.organisations[0]?.org_name
  );
  const otherorglist = useSelector(
    (state: RootState) => state?.sidebar?.workspace
  );

  const organizations = useSelector((state: RootState) => state.org);
  const selectedOrg = useSelector((state: RootState) => state.selectedorg);

  useEffect(() => {
    // Function to simulate change of select value on page load
    const simulateSelectChange = () => {
      const newValue = routeLocation?.state?.orgname; // Set the desired option
      setTimeout(() => {
        handleOrgChange({
          target: { value: newValue },
        } as React.ChangeEvent<HTMLSelectElement>);
      }, 0); // Ensuring this runs after the initial render
    };

    // Call the function to simulate change of select value on page load
    simulateSelectChange();
    if (!routeLocation?.state?.orgname) {
      interface OrgInfo {
        orgname: string;
        type: string;
      }

      const fetchedOrganizations: OrgInfo[] = otherorglist.map((orgname) => ({
        orgname,
        type: "other",
      }));

      const ownerObj = { orgname: ownerorg, type: "owner" };
      fetchedOrganizations.push(ownerObj);

      dispatch(getorgs(fetchedOrganizations));
      // Find the default organization (type 'owner') and set it as the selected organization
      const defaultOrg = fetchedOrganizations.find(
        (org) => org.type === "owner"
      );
      if (defaultOrg) {
        dispatch(getselectedorgs(defaultOrg));
      }
    }
  }, [dispatch, otherorglist, ownerorg, routeLocation?.state?.orgname]); // Run only once after initial render

  // UNCOMMENT WHEN TRANSLATE API IS ACTIVE
  // useEffect(() => {
  //   const FetchLanguage = () => {
  //     HeaderSelectIds.forEach((id: string) => {
  //       const select = document.getElementById(id) as HTMLSelectElement | null;
  //       // Accessing individual options
  //       if (select) {
  //         const options = select.options;
  //         for (let i = 0; i < options.length; i++) {
  //           const translate = async () => {
  //             try {
  //               const data = {
  //                 text: options[i].text,
  //                 target_language: defaultlang,
  //               };
  //               const response = await Axios93Base.post(`/translate/`, data);

  //               const translationData = await response.data;
  //               if (id === "settingForm2text1") {
  //                 console.log(translationData);
  //               }
  //               options[i].text =
  //                 translationData.data.translations[0].translatedText;
  //             } catch (error) {
  //               console.error("Translation error:", error);
  //               return options[i].text;
  //             }
  //           };
  //           translate();
  //         }
  //       }
  //     });
  //     HeaderTextIds.forEach((id: string) => {
  //       const text = document.getElementById(id);
  //       if (text) {
  //         const translate = async () => {
  //           try {
  //             const data = {
  //               text: text.innerText,
  //               target_language: defaultlang,
  //             };
  //             const response = await Axios93Base.post(`/translate/`, data);

  //             const translationData = await response.data;
  //             text.innerText =
  //               translationData.data.translations[0].translatedText;
  //           } catch (error) {
  //             console.error("Translation error:", error);
  //             return text;
  //           }
  //         };
  //         translate();
  //       }
  //     });
  //   };
  //   if (defaultlang) {
  //     FetchLanguage();
  //   }
  // }, [defaultlang, dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get("session_id");

    if (session_id) {
      localStorage.setItem("sessionId", session_id);
      location.href = "/";
    }
  }, []);

  const sessionId = localStorage.getItem("sessionId");

  {
    !sessionId &&
      (location.href =
        "https://100014.pythonanywhere.com/?redirect_url=https://100093.pythonanywhere.com");
  }
  // get user information from user info info api

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getloaderstate(false));
      if (sessionId) {
        try {
          await Axios14Base.post("/logininfo/", { session_id: sessionId })
            .then((response) => {
              try {
                if (response.data.message) {
                  location.href = "https://100014.pythonanywhere.com/";
                }
                dispatch(getuserinfo(response.data));
              } catch (e) {
                console.log("Failed to parse response");
              } finally {
                dispatch(getloaderstate(true));
              }
            })
            .catch((err) => {
              console.log("err", err);
              console.log("Request failed");
            });
        } catch (err) {
          console.log("error");
        }
      }
    };
    if (userData.userinfo.username == "") {
      fetchData();
    }
  }, [dispatch, sessionId, userData.userinfo.username]);

  // handle logout functionality
  const logout = () => {
    localStorage.removeItem("sessionId");
    location.href = logout_url;
  };

  const handleOrgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrgname = event.target.value;
    const org = organizations.find(
      (org) => `${org.orgname}${org.type}` === selectedOrgname
    );
    if (org) {
      dispatch(getselectedorgs(org));
    }
  };

  const settingdata = useSelector(
    (state: RootState) => state.setting?.data?._id
  );
  useEffect(() => {
    // Function to call the API

    const fetchsetting = async () => {
      dispatch(getloaderstate(false));
      try {
        const data = {
          username: userData.userinfo.username,
        };

        const response = await Axios93Base.post("/settings/", data);
        dispatch(getsetting(response.data));
        dispatch(getloaderstate(true));
      } catch (error) {
        console.error(error);
      }
    };

    // Call the API when the component mounts
    if (userData.userinfo.username != "" && settingdata == "") {
      fetchsetting();
    }
  }, [userData]); // The empty dependency array ensures that the effect runs only once

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  const loader = useSelector((state: RootState) => state.loaderslice);
  const [isLoading, setIsLoading] = useState(loader);
  useEffect(() => {
    setIsLoading(loader);
  }, [loader]);

  const handleiconClick = () => {
    dispatch(getoverlaysidebar(true));
  };
  return (
    <>
      {isLoading == false ? (
        ""
      ) : (
        <section className="border-b border-[#ff0000] lg:pl-12">
          <div className="lg:flex justify-between">
            <span className="flex flex-col  sm:flex-col items-center lg:justify-end justify-around my-8 mx-4  lg:ml-20">
              {userData?.userinfo?.profile_img ? (
                <img
                  src={userData?.userinfo?.profile_img}
                  alt="profile image"
                  className="card-shadow mb-2 w-[130px] h-[130px]"
                />
              ) : (
                <div className="card-shadow mt-6">
                  <img src={images.empty_image} alt="'" />
                </div>
              )}
              {userData?.userinfo?.org_img ? (
                <img
                  src={userData?.userinfo?.org_img}
                  alt="organization logo"
                  className="card-shadow mt-2 w-[130px] h-[130px]"
                />
              ) : (
                <div className="card-shadow mt-6">
                  <img src={images.org_logo} alt="'" />
                </div>
              )}
            </span>

            <div className="mb-8">
              <span>
                <h2
                  id="headertext1"
                  className="text-[#7A7A7A] font-semibold mt-8 font-roboto text-[15px]"
                >
                  Hi {userData?.userinfo?.first_name}{" "}
                  {userData?.userinfo?.last_name}, you are login as{" "}
                  {userData?.userinfo?.User_type}
                </h2>
                <p
                  id="headertext2"
                  className="text-[#FF0000] font-semibold pt-8 font-roboto text-[15px]"
                >
                  Session starts at {userData?.userinfo?.dowell_time},
                  {userData?.userinfo?.user_country}
                </p>
                <div
                  className={`${
                    color_scheme == "Red"
                      ? "bg-[#DC4C64]"
                      : color_scheme == "Green"
                      ? "bg-[#14A44D]"
                      : "bg-[#7A7A7A]"
                  } grid lg:grid-cols-4 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-3 p-[10px] border border-black justify-center`}
                >
                  <button
                    className={`${
                      color_scheme == "Red"
                        ? "bg-[lightcoral]"
                        : color_scheme == "Green"
                        ? "bg-[lightgreen]"
                        : "bg-[#a1a1a1] "
                    } lg:w-auto  w-full justify-center flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm`}
                    onClick={handleiconClick}
                  >
                    <FaBars className="text-[25px] text-white"></FaBars>
                  </button>
                  {currentPath == "/setting" ? (
                    <NavLink
                      to="/"
                      className={`${
                        color_scheme == "Red"
                          ? "bg-[lightcoral]"
                          : color_scheme == "Green"
                          ? "bg-[lightgreen]"
                          : "bg-[#a1a1a1] "
                      } lg:w-[180px]  w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm`}
                    >
                      <IoSettings className="text-white" />
                      <p
                        id="headertext3"
                        className="text-[13px] text-white text-center py-[10px] px-[20px]"
                      >
                        Home
                      </p>
                    </NavLink>
                  ) : (
                    <>
                      {selectedOrg.type !== "owner" ? (
                        <div
                          className={`${
                            color_scheme == "Red"
                              ? "bg-[#f3a1a1]"
                              : color_scheme == "Green"
                              ? "bg-[#a1e4a1]"
                              : "bg-[#c9c5c1] "
                          }   lg:w-auto w-full flex items-center gap-12 px-4 rounded-sm`}
                        >
                          <IoSettings className="text-white" />
                          <p
                            id="headertext4"
                            className="text-[13px] text-white text-center py-[10px] px-[20px]"
                          >
                            Settings
                          </p>
                        </div>
                      ) : (
                        <NavLink
                          to="/setting"
                          className={`${
                            color_scheme == "Red"
                              ? "bg-[lightcoral]"
                              : color_scheme == "Green"
                              ? "bg-[lightgreen]"
                              : "bg-[#a1a1a1] "
                          }  lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm`}
                        >
                          <IoSettings className="text-white" />
                          <p
                            id="headertext5"
                            className="text-[13px] text-white text-center py-[10px] px-[20px]"
                          >
                            Settings
                          </p>
                        </NavLink>
                      )}
                    </>
                  )}

                  <button
                    className={`${
                      color_scheme == "Red"
                        ? "bg-[lightcoral]"
                        : color_scheme == "Green"
                        ? "bg-[lightgreen]"
                        : "bg-[#a1a1a1] "
                    }  lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm`}
                    onClick={() => window.location.reload()}
                  >
                    <IoMdRefresh className="text-white transform-icon" />
                    <p
                      id="headertext6"
                      className="text-[13px] text-white text-center py-[10px] px-[20px]"
                    >
                      Refresh
                    </p>
                  </button>
                  <button
                    className={`${
                      color_scheme == "Red"
                        ? "bg-[lightcoral]"
                        : color_scheme == "Green"
                        ? "bg-[lightgreen]"
                        : "bg-[#a1a1a1] "
                    }  lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm`}
                    onClick={logout}
                  >
                    <FaPowerOff className="text-white" />
                    <p
                      id="headertext7"
                      className="text-[13px] text-white text-center py-[10px] px-[20px]"
                    >
                      Logout
                    </p>
                  </button>
                </div>
              </span>
              {currentPath == "/setting" ? (
                <div
                  className={`${
                    color_scheme == "Red"
                      ? "bg-[lightcoral]"
                      : color_scheme == "Green"
                      ? "bg-[lightgreen]"
                      : "bg-[#a1a1a1] "
                  }  text-center text-white p-[15px] border-2 border-[#7a7a7a] mt-8 py-6 font-semibold text-lg`}
                >
                  <span id="headertext8">Settings for </span>
                  <span className="text-[red]">
                    {userData?.userinfo?.username}
                  </span>
                  ,<span id="headertext9"> Owner </span>
                  <span className="text-[red]">
                    {userData?.userinfo?.username}
                  </span>
                </div>
              ) : (
                <div
                  className={`${
                    color_scheme == "Red"
                      ? "bg-[lightcoral]"
                      : color_scheme == "Green"
                      ? "bg-[lightgreen]"
                      : "bg-[#a1a1a1] "
                  } p-[15px] border-2 border-[#7a7a7a] mt-8`}
                >
                  <p
                    id="headertext10"
                    className="text-lg font-semibold italic text-white pb-2"
                  >
                    Select Workspace you want to connect
                  </p>
                  <select
                    id="headerSelect1"
                    className="w-full rounded-md outline-none py-1 text-center"
                    value={`${selectedOrg?.orgname}${selectedOrg?.type}` || ""}
                    onChange={handleOrgChange}
                  >
                    {organizations.map((org, index) => (
                      <option key={index} value={`${org.orgname}${org.type}`}>
                        {org.orgname}({org.type})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Header;
