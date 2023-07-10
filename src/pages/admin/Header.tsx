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

const Header = () => {
  const userData = useSelector((state: RootState) => state.userinfo);
  const currentPath = window.location.pathname;

  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get("session_id");

    if (session_id) {
      localStorage.setItem("sessionId", session_id);
      const urlWithoutSessionId =
        window.location.origin + window.location.pathname;
      window.history.pushState({}, "", urlWithoutSessionId);
    }
  }, []);

  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    const fetchData = async () => {
      // const sessionId = "x4qyyvyqunur0hexq8jnxdq5o8oap4yc";
      if (sessionId) {
        const url = "https://100014.pythonanywhere.com/api/logininfo/";
        axios
          .post(url, { session_id: sessionId })
          .then((response) => {
            try {
              dispatch(getuserinfo(response.data));
            } catch (e) {
              console.log("Failed to parse response");
            }
          })
          .catch((error) => {
            console.log("Request failed", error);
          });
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("sessionId");
    location.href = "https://100014.pythonanywhere.com/sign-out";
  };
  return (
    <>
      <section className="border-y border-[#ff0000] lg:pl-12">
        <h2 className="text-[#7A7A7A] font-semibold mt-8 font-roboto text-[15px]">
          Hi {userData.userinfo.first_name} {userData.userinfo.last_name}, you
          are login as {userData.userinfo.User_type}
        </h2>
        <p className="text-[#FF0000] font-semibold pt-8 font-roboto text-[15px]">
          Session starts at {userData.userinfo.dowell_time},
          {userData.userinfo.user_country}
        </p>

        <div className="lg:flex justify-between">
          <span className="flex items-center lg:justify-between justify-around my-8 lg:w-[30%]">
            {userData.userinfo.profile_img ? (
              <img
                src={userData.userinfo.profile_img}
                alt="profile image"
                className="card-shadow w-[150px] h-[150px]"
              />
            ) : (
              <div className="card-shadow">
                <img src={images.empty_image} alt="'" />
              </div>
            )}
            {userData.userinfo.org_img ? (
              <img
                src={userData.userinfo.org_img}
                alt="organization logo"
                className="card-shadow w-[150px] h-[150px]"
              />
            ) : (
              <div className="card-shadow">
                <img src={images.org_logo} alt="'" />
              </div>
            )}
          </span>

          <div className="mb-8">
            <span>
              <div className="bg-[#7a7a7a] flex lg:flex-row flex-col items-center lg:gap-8 gap-4 p-[10px] border border-black justify-center">
                {currentPath == "/setting" ? (
                  <NavLink
                    to="/"
                    className="bg-[#54595F] lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm"
                  >
                    <IoSettings className="text-white" />
                    <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
                      Home
                    </p>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/setting"
                    className="bg-[#54595F] lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm"
                  >
                    <IoSettings className="text-white" />
                    <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
                      Settings
                    </p>
                  </NavLink>
                )}

                <button className="bg-[#54595F] lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm">
                  <IoMdRefresh className="text-white transform-icon" />
                  <p className="text-[13px] text-white text-center py-[10px] px-[20px]">
                    Refresh
                  </p>
                </button>
                <button
                  className="bg-[#54595F] lg:w-auto w-full flex items-center gap-12 px-4 hover:bg-[#61CE70] rounded-sm"
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
              <div className="bg-[#cef9d2] text-center  p-[15px] border-2 border-[#7a7a7a] mt-8 py-6 font-semibold text-lg">
                Settings for <span className="text-[red]">noumanhayat</span> ,
                Owner
                <span className="text-[red]"> noumanhayat</span>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
