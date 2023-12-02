import { NavLink } from "react-router-dom";
import axios from "axios";
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

const Header = () => {
  const userData = useSelector((state: RootState) => state.userinfo);
  const currentPath = window.location.pathname;
  const logout_url = "https://100014.pythonanywhere.com/sign-out";
  const dispatch = useDispatch();

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

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getloaderstate(false));
      if (sessionId) {
        const url = "https://100014.pythonanywhere.com/api/logininfo/";
        axios
          .post(url, { session_id: sessionId })
          .then((response) => {
            try {
              dispatch(getuserinfo(response.data));
            } catch (e) {
              console.log("Failed to parse response");
            } finally {
              dispatch(getloaderstate(true));
            }
          })
          .catch((error) => {
            console.log("Request failed", error);
          });
      }
    };
    if (userData.userinfo.username == "") {
      fetchData();
    }
  }, [dispatch, sessionId]);

  const logout = () => {
    localStorage.removeItem("sessionId");
    location.href = logout_url;
  };

  const ownerorg = useSelector(
    (state: RootState) => state?.adminData?.data[0]?.organisations[0]?.org_name
  );
  const otherorglist = useSelector(
    (state: RootState) => state?.sidebar?.workspace
  );

  const organizations = useSelector((state: RootState) => state.org);
  const selectedOrg = useSelector((state: RootState) => state.selectedorg);

  useEffect(() => {
    // Fetch organizations (e.g., using an API call) and set them in the Redux store
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
    const defaultOrg = fetchedOrganizations.find((org) => org.type === "owner");
    if (defaultOrg) {
      dispatch(getselectedorgs(defaultOrg));
    }
  }, [ownerorg, otherorglist]);

  const handleOrgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrgname = event.target.value;
    const org = organizations.find(
      (org) => `${org.orgname}${org.type}` === selectedOrgname
    );
    console.log({ org });
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

        const response = await axios.post(
          "https://100093.pythonanywhere.com/api/settings/",
          data
        );
        console.log("settings", response.data);
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
                <h2 className="text-[#7A7A7A] font-semibold mt-8 font-roboto text-[15px]">
                  Hi {userData?.userinfo?.first_name}{" "}
                  {userData?.userinfo?.last_name}, you are login as{" "}
                  {userData?.userinfo?.User_type}
                </h2>
                <p className="text-[#FF0000] font-semibold pt-8 font-roboto text-[15px]">
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
                      <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
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
                          <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
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
                          <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
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
                    <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
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
                    <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
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
                  Settings for
                  <span className="text-[red]">
                    {userData?.userinfo?.username}
                  </span>
                  , Owner
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
                  <p className="text-lg font-semibold italic text-white pb-2">
                    Select Workspace you want to connect
                  </p>
                  <select
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
