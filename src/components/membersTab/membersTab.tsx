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
				<TabList className="xl:w-[90%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-4">
					{["Team Member", "User", "Public"].map((team) => {
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
								<FaUser  />
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
