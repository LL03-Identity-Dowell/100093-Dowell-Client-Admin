import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import TeamMember from "./teamMember/TeamMember";
import User from "./user/User";
import Public from "./public/Public";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

const MembersTab = () => {
  const [tabIndex, setTabIndex] = useState(-1);
  const viewAccess = useSelector((state: RootState) => state.viewAccess);
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
        <TabList className="xl:w-[98%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-4">
          {["Team Member", "User", "Public"].map((team) => {
            if (team == "Team Member") {
              if (viewAccess[1]["Member Management"]?.rights) {
                return (
                  <Tab
                    key={team}
                    className={`bg-[#7A7A7A] ${
                      color_scheme == "Red"
                        ? "hover:bg-[#DC4C64]"
                        : color_scheme == "Green"
                        ? "hover:bg-[#14A44D]"
                        : "hover:bg-[#7A7A7A]"
                    } flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] outline-none text-white`}
                  >
                    <FaUser />
                    <p className="font-roboto text-white font-medium">{team}</p>
                  </Tab>
                );
              }
            } else if (team == "User") {
              if (viewAccess[0]["User Management"]?.rights) {
                return (
                  <Tab
                    key={team}
                    className={`bg-[#7A7A7A] ${
                      color_scheme == "Red"
                        ? "hover:bg-[#DC4C64]"
                        : color_scheme == "Green"
                        ? "hover:bg-[#14A44D]"
                        : "hover:bg-[#7A7A7A]"
                    } flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] outline-none text-white`}
                  >
                    <FaUser />
                    <p className="font-roboto text-white font-medium">{team}</p>
                  </Tab>
                );
              }
            } else if (team == "Public") {
              if (viewAccess[2]["Portfolio Management"]?.rights) {
                return (
                  <Tab
                    key={team}
                    className={`bg-[#7A7A7A] ${
                      color_scheme == "Red"
                        ? "hover:bg-[#DC4C64]"
                        : color_scheme == "Green"
                        ? "hover:bg-[#14A44D]"
                        : "hover:bg-[#7A7A7A]"
                    } flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] outline-none text-white`}
                  >
                    <FaUser />
                    <p className="font-roboto text-white font-medium">{team}</p>
                  </Tab>
                );
              }
            }
          })}
        </TabList>
        {viewAccess[1]["Member Management"]?.rights && (
          <TabPanel>
            <TeamMember />
          </TabPanel>
        )}
        {viewAccess[0]["User Management"]?.rights && (
          <TabPanel>
            <User />
          </TabPanel>
        )}
        {viewAccess[2]["Portfolio Management"]?.rights && (
          <TabPanel>
            <Public />
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default MembersTab;
