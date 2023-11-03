import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FaLevelDownAlt,
  FaRegGem,
  FaBookReader,
  FaUsers,
  FaSitemap,
  FaToriiGate,
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
  const [tabIndex, setTabIndex] = useState(-1);

  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  const present_org = useSelector(
    (state: RootState) => state.adminData.data[0]?.organisations[0]?.org_name
  );

  const tabTitle = [
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
  ];

  const dispatch = useDispatch();
  const sessionId = localStorage.getItem("sessionId");
  useEffect(() => {
    dispatch(getloaderstate(false));
    const fetchData = async () => {
      const productData = {
        username: "uxliveadmin",
      };

      try {
        if (adminusername !== "" && present_org == "") {
          const data = {
            username: adminusername,
            session_id: sessionId,
          };

          const response = await axios.post(
            "https://100093.pythonanywhere.com/api/get_data/",
            data
          );
          console.log("response", response.data.data[0]);
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

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName={` ${
          color_scheme == "Red"
            ? "bg-[#DC4C64]"
            : color_scheme == "Green"
            ? "bg-[#14A44D]"
            : "bg-[#7A7A7A]"
        } text-white`}
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="xl:w-[93%] grid lg:grid-cols-3 grid-cols-1 gap-y-4 gap-x-6 xl:gap-x-0">
          {tabTitle.map((tabs) => {
            return (
              <Tab
                key={tabs.title}
                className={`xl:w-[90%] card-shadow h-12 flex items-center px-8 text-[#7a7a7a] gap-x-10 xl:gap-x-20 border border-[#7a7a7a] rounded-lg ${
                  color_scheme == "Red"
                    ? "hover:bg-[#DC4C64]"
                    : color_scheme == "Green"
                    ? "hover:bg-[#14A44D]"
                    : "hover:bg-[#7A7A7A]"
                } hover:text-white cursor-pointer outline-none`}
              >
                <i className=" text-xl font-black">{tabs.icon}</i>
                <p className="font-roboto text-lg">{tabs.title}</p>
              </Tab>
            );
          })}
        </TabList>
        <TabPanel>
          <Products />
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
      </Tabs>
    </div>
  );
};

export default AdminTabs;
