import { useState } from "react";
import { FaLevelDownAlt } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Level1 from "./Level1";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level2 from "./Level2";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/Store";

const LevelsTab = () => {
  // const levels = useSelector((state: RootState) => state.adminData);

  const [tabIndex, setTabIndex] = useState(-1);

// console.log(levels.data.map((item) => item.organisations.map((id) => id.level1)));
  

  return (
    <div>
      <Tabs
        className=""
        selectedTabClassName="bg-[#61CE70]"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 mt-4">
          {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
            (level) => {
              return (
                <Tab key={level}
                   className="bg-[#7A7A7A] flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] active:bg-[#61CE70] outline-none">
                    <FaLevelDownAlt className="text-[#4CAF50] " />
                    <p className="font-roboto text-white font-medium">
                      {level}
                    </p>
                  
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
