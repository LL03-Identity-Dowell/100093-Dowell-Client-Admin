import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import TeamMember from "./teamMember/TeamMember";
import User from "./User";
import Public from "./public/Public";

const MembersTab = () => {
  const [tabIndex, setTabIndex] = useState(-1);

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName="bg-[#61CE70]"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 mt-4">
          {["Team Member", "User", "Public"].map((team) => {
            return (
              <Tab
                key={team}
                className="bg-[#7A7A7A] flex items-center rounded-lg px-6 py-3 mx-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] focus:bg-[#61CE70] outline-none"
              >
                <FaUser className="text-[#4CAF50] " />
                <p className="font-roboto text-white font-medium">{team}</p>
              </Tab>
            );
          })}
        </TabList>
        <TabPanel>
          <TeamMember />
        </TabPanel>
        <TabPanel>
          <User />
        </TabPanel>
        <TabPanel>
          <Public />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MembersTab;
