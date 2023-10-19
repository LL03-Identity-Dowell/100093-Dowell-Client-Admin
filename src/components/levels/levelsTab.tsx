import { useState } from "react";
import { FaLevelDownAlt } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Level1 from "./level1/Level1";
import Level3 from "./level3/Level3";
import Level4 from "./level4/Level4";
import Level5 from "./level5/Level5";
import Level2 from "./level2/Level2";

const LevelsTab = () => {
  const [tabIndex, setTabIndex] = useState(-1);

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName="bg-[#61CE70]"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="w-[90%] grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 mt-4">
          {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
            (level, index) => {
              return (
                <Tab
                  key={index}
                  className="bg-[#7A7A7A] flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] focus:bg-[#61CE70] active:bg-[#61CE70] outline-none"
                >
                  <FaLevelDownAlt className="text-[#4CAF50] " />
                  <p className="font-roboto text-white font-medium">{level}</p>
                </Tab>
              );
            }
          )}
        </TabList>
        <TabPanel>
          <Level1 />
        </TabPanel>
        <TabPanel>
          <Level2 />
        </TabPanel>
        <TabPanel>
          <Level3 />
        </TabPanel>
        <TabPanel>
          <Level4 />
        </TabPanel>
        <TabPanel>
          <Level5 />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default LevelsTab;
