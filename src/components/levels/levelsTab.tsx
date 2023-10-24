import { useState } from "react";
import { FaLevelDownAlt } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Level1 from "./level1/Level1";
import Level3 from "./level3/Level3";
import Level4 from "./level4/Level4";
import Level5 from "./level5/Level5";
import Level2 from "./level2/Level2";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

const LevelsTab = () => {
  const [tabIndex, setTabIndex] = useState(-1);
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
				<TabList className="w-[90%] grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 mt-4">
					{["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
						(level, index) => {
							return (
								<Tab
                  key={index}
                  className={`bg-[#7A7A7A] flex items-center rounded-lg px-6 py-3 gap-x-12 ${color_scheme == "Red"
                      ? "hover:bg-[#DC4C64]"
                      : color_scheme == "Green"
                        ? "hover:bg-[#14A44D]"
                        : "hover:bg-[#7A7A7A]"
                    } cursor-pointer card-shadow border border-[#F5F5F5]  outline-none text-white`}
								>
									<FaLevelDownAlt  />
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
