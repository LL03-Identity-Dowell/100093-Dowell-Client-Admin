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
import { useState } from "react";
import MembersTab from "./membersTab/membersTab";
import LevelsTab from "./levels/levelsTab";
import Products from "./products/Products";
import Portfolio from "./portfolio/Portfolio";
import Roles from "./roles/Roles";
import Layers from "./layers/Layers";

const AdminTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

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

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName="client_tabs"
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
