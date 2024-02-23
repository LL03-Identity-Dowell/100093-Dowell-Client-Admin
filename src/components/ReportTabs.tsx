import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FaLevelDownAlt,
  FaBookReader,
  FaUsers,
  FaSitemap,
  FaToriiGate,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAdminData } from "../store/slice/adminData";
import { getloaderstate } from "../store/slice/loaderstate";
import { RootState } from "../store/Store";
import { getproducts } from "../store/slice/products";
import PortfolioReport from "./reports/PortfolioReport";
import RoleReport from "./reports/RoleReport";
import LevelReport from "./reports/LevelReport";
import LayerReport from "./reports/LayerReport";
import MemberReport from "./reports/MemberReport";

const ReportTabs = () => {
  const sessionId = localStorage.getItem("sessionId");
  const [tabIndex, setTabIndex] = useState(-1);

  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  const present_org = useSelector(
    (state: RootState) => state.adminData.data[0]?.organisations[0]?.org_name
  );
  const [ismobile, setismobile] = useState(window.innerWidth <= 1000);

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
  const tabTitle = [
    {
      title: "Portfolio",
      icon: <FaBookReader />,
    },
    {
      title: "Members",
      icon: <FaUsers />,
    },

    {
      title: "Roles",
      icon: <FaSitemap />,
    },
    {
      title: "Levels",
      icon: <FaLevelDownAlt />,
    },
    {
      title: "Layers",
      icon: <FaToriiGate />,
    },
  ];

  const mobiletab = [
    {
      title: "Portfolio",
      icon: <FaBookReader />,
    },
    {
      title: "Members",
      icon: <FaUsers />,
    },

    {
      title: "Roles",
      icon: <FaSitemap />,
    },
    {
      title: "Levels",
      icon: <FaLevelDownAlt />,
    },
    {
      title: "Layers",
      icon: <FaToriiGate />,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getloaderstate(false));
    const fetchData = async () => {
      const productData = {
        username: "uxliveadmin",
      };

      try {
        if (adminusername !== "" && present_org == "") {
          // const data = {
          //   username: adminusername,
          //   session_id: sessionId,
          // };

          const response = await axios.post(
            "https://100093.pythonanywhere.com/api/get_data/",
            { username: adminusername, session_id: sessionId }
          );
          const productResponse = await axios.post(
            "https://100093.pythonanywhere.com/api/getproducts/",
            productData
          );
          dispatch(getAdminData(response.data));
          dispatch(getproducts(productResponse.data));

          dispatch(getloaderstate(true));
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(getloaderstate(true));
      }
    };
    fetchData();
  }, [adminusername, dispatch, present_org, sessionId]);

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  return (
    <div>
      {ismobile ? (
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
          <TabList className="w-full grid lg:grid-cols-5 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-0">
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
                      className="font-roboto text-lg"
                    >
                      {tabs.title}
                    </p>
                  </Tab>
                </>
              );
            })}
          </TabList>
          <TabPanel>
            <PortfolioReport />
          </TabPanel>
          <TabPanel>
            <MemberReport />
          </TabPanel>
          <TabPanel>
            <RoleReport />
          </TabPanel>
          <TabPanel>
            <LevelReport />
          </TabPanel>
          <TabPanel>
            <LayerReport />
          </TabPanel>
        </Tabs>
      ) : (
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
          <TabList className="w-full grid lg:grid-cols-5 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-0">
            {tabTitle.map((tabs, index) => {
              return (
                <>
                  <Tab
                    key={tabs.title}
                    className={`xl:w-[90%] card-shadow h-12  flex  items-center px-8 text-[#7a7a7a] gap-x-10 xl:gap-x-4 border border-[#7a7a7a] rounded-lg ${
                      color_scheme == "Red"
                        ? "hover:bg-[#DC4C64]"
                        : color_scheme == "Green"
                        ? "hover:bg-[#14A44D]"
                        : "hover:bg-[#7A7A7A]"
                    } hover:text-white cursor-pointer  outline-none`}
                  >
                    <i className="text-xl font-black">{tabs.icon}</i>
                    <p
                      id={`adminTabText${index}`}
                      className="font-roboto text-lg"
                    >
                      {tabs.title}
                    </p>
                  </Tab>
                </>
              );
            })}
          </TabList>
          <TabPanel>
            <PortfolioReport />
          </TabPanel>
          <TabPanel>
            <MemberReport />
          </TabPanel>
          <TabPanel>
            <RoleReport />
          </TabPanel>
          <TabPanel>
            <LevelReport />
          </TabPanel>
          <TabPanel>
            <LayerReport />
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};

export default ReportTabs;
