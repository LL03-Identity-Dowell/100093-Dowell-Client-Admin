import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FaLevelDownAlt,
  FaRegGem,
  FaBookReader,
  FaUsers,
  FaSitemap,
  FaToriiGate,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import MembersTab from "./membersTab/membersTab";
import LevelsTab from "./levels/levelsTab";
import Products from "./products/Products";
import Portfolio from "./portfolio/Portfolio";
import Roles from "./roles/Roles";
import Layers from "./layers/Layers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAdminData } from "../store/slice/adminData";
import { getloaderstate } from "../store/slice/loaderstate";
import { RootState } from "../store/Store";
import { getproducts } from "../store/slice/products";

const AdminTabs = () => {
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
      title: "Customer Support",
      link: `https://www.uxlive.me/livinglab/client/admin`,
      icon: <FaHeadset />,
    },

    {
      title: "Products",
      icon: <FaRegGem />,
    },
    {
      title: "Portfolio",
      icon: <FaBookReader />,
    },
    {
      title: "Members",
      icon: <FaUsers />,
    },
    {
      title: "Buy Credits",
      link: `https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/#?session_id=${sessionId}`,
      icon: <FaCreditCard />,
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
      title: "Products",
      icon: <FaRegGem />,
    },
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
    {
      title: "Customer Support",
      link: `https://www.uxlive.me/livinglab/client/admin`,
      icon: <FaHeadset />,
    },
    {
      title: "Buy Credits",
      link: `https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/#?session_id=${sessionId}`,
      icon: <FaCreditCard />,
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
  }, [adminusername]);

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const handleTabSwitch = (index: number) => {
    setTabIndex(index);
  };
  const handleTabClick = (index: number, url: string) => {
    // Check if the tab is a link, if yes, redirect to the specified URL
    // Assuming index 0 and 1 are link tabs
    if (ismobile == true) {
      if (index === 6 || index === 7) {
        // navigate(url);
        window.location.href = url;
      }
    } else if (ismobile == false) {
      if (index === 0 || index === 4) {
        // navigate(url);
        window.location.href = url;
      }
    } else {
      // If it's not a link tab, set the tab index to display content
      setTabIndex(index);
    }
  };

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
          <TabList className="w-full grid lg:grid-cols-4 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-0">
            {mobiletab.map((tabs, index) => {
              return (
                <Tab
                  key={index.toString()}
                  className={`xl:w-[90%] card-shadow h-12  flex items-center px-8 text-[#7a7a7a] gap-x-10 xl:gap-x-4 border border-[#7a7a7a] rounded-lg ${
                    color_scheme == "Red"
                      ? "hover:bg-[#DC4C64]"
                      : color_scheme == "Green"
                      ? "hover:bg-[#14A44D]"
                      : "hover:bg-[#7A7A7A]"
                  } hover:text-white cursor-pointer  outline-none`}
                  onClick={() => {
                    index === 7 || index === 6
                      ? handleTabClick(index, tabs.link || "")
                      : null;
                  }}
                >
                  <i className=" text-xl font-black">{tabs.icon}</i>
                  <p
                    id={`adminTabText${index}`}
                    className="font-roboto text-lg"
                  >
                    {tabs.title}
                  </p>
                </Tab>
              );
            })}
          </TabList>

          <TabPanel>
            <Products handleTabSwitch={handleTabSwitch} />
          </TabPanel>
          <TabPanel>
            <Portfolio />
          </TabPanel>
          <TabPanel>
            <MembersTab />
          </TabPanel>

          <TabPanel>
            <Roles />
          </TabPanel>
          <TabPanel>
            <LevelsTab />
          </TabPanel>
          <TabPanel>
            <Layers />
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
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
          <TabList className="w-full grid lg:grid-cols-4 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-0">
            {tabTitle.map((tabs, index) => {
              return (
                <Tab
                  key={index.toString()}
                  className={`xl:w-[90%] card-shadow h-12  flex  items-center px-8 text-[#7a7a7a] gap-x-10 xl:gap-x-4 border border-[#7a7a7a] rounded-lg ${
                    color_scheme == "Red"
                      ? "hover:bg-[#DC4C64]"
                      : color_scheme == "Green"
                      ? "hover:bg-[#14A44D]"
                      : "hover:bg-[#7A7A7A]"
                  } hover:text-white cursor-pointer  outline-none`}
                  onClick={() => {
                    index === 0 || index === 4
                      ? handleTabClick(index, tabs.link || "")
                      : null;
                  }}
                >
                  <i className="text-xl font-black">{tabs.icon}</i>
                  <p
                    id={`adminTabText${index}`}
                    className="font-roboto text-lg"
                  >
                    {tabs.title}
                  </p>
                </Tab>
              );
            })}
          </TabList>
          <TabPanel></TabPanel>
          <TabPanel>
            <Products handleTabSwitch={handleTabSwitch} />
          </TabPanel>
          <TabPanel>
            <Portfolio />
          </TabPanel>
          <TabPanel>
            <MembersTab />
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>
            <Roles />
          </TabPanel>
          <TabPanel>
            <LevelsTab />
          </TabPanel>
          <TabPanel>
            <Layers />
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};

export default AdminTabs;
