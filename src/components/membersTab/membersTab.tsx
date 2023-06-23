import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import TeamMember from "./TeamMember";
import User from "./User";
import Public from "./Public";

const MembersTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName="members_tabs"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 mt-4">
          {["Team Member", "User", "Public"].map((team) => {
            return (
              <Tab key={team}>
                <span className="bg-[#7A7A7A] flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5]">
                  <FaUser className="text-[#4CAF50] " />
                  <p className="font-roboto text-white font-medium">{team}</p>
                </span>
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
