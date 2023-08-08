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

  const userName = useSelector(
    (state: RootState) => state.userinfo?.userinfo?.username
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          username: userName,
        };

        const response = await axios.post(
          "https://100093.pythonanywhere.com/api/get_data/",
          data
        );

        const productData = {
          username: "uxliveadmin",
        };
        const productResponse = await axios.post(
          "https://100093.pythonanywhere.com/api/getproducts/",
          productData
        );

        dispatch(getproducts(productResponse.data));

        dispatch(getAdminData(response.data));

        dispatch(getloaderstate(false));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, userName]);

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName="bg-[#61CE70] text-white"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {tabTitle.map((tabs) => {
            return (
              <Tab
                key={tabs.title}
                className="w-full card-shadow h-12 flex items-center px-8 text-[#7a7a7a] gap-x-20 border border-[#7a7a7a] rounded-lg hover:bg-[#61CE70] hover:text-white cursor-pointer outline-none"
              >
                <i className="text-[#4CAF50] text-xl font-black">{tabs.icon}</i>
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
