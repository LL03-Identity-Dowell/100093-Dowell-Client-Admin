import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import LevelOneReport from "./LevelOneReport";
import LevelTwoReport from "./LevelTwoReport";
import LevelThreeReport from "./LevelThreeReport";
import LevelFourReport from "./LevelFourReport";
import LevelFiveReport from "./LevelFiveReport";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FaLevelDownAlt } from "react-icons/fa";

interface LevelReportProps {
  level1: {
    items: {
      item_bardcode: string;
      item_code: string;
      item_details: string;
      item_image1: string;
      item_image2: string;
      item_name: string;
      item_specification: string;
      item_universal_code: string;
      status: string;
    }[];
    level_name: string;
    roles: string[];
  };
  level2: {
    items: {
      item_bardcode: string;
      item_code: string;
      item_details: string;
      item_image1: string;
      item_image2: string;
      item_name: string;
      item_specification: string;
      item_universal_code: string;
      status: string;
    }[];
    level_name: string;
    roles: string[];
  };
  level3: {
    items: {
      item_bardcode: string;
      item_code: string;
      item_details: string;
      item_image1: string;
      item_image2: string;
      item_name: string;
      item_specification: string;
      item_universal_code: string;
      status: string;
    }[];
    level_name: string;
    roles: string[];
  };
  level4: {
    items: {
      item_bardcode: string;
      item_code: string;
      item_details: string;
      item_image1: string;
      item_image2: string;
      item_name: string;
      item_specification: string;
      item_universal_code: string;
      status: string;
    }[];
    level_name: string;
    roles: string[];
  };
  level5: {
    items: {
      item_bardcode: string;
      item_code: string;
      item_details: string;
      item_image1: string;
      item_image2: string;
      item_name: string;
      item_specification: string;
      item_universal_code: string;
      status: string;
    }[];
    level_name: string;
    roles: string[];
  };
}
const LevelReport = () => {
  const [tabIndex, setTabIndex] = useState(-1);
  const [levelReport, setLevelReport] = useState<LevelReportProps>();
  const userData = useSelector((state: RootState) => state.userinfo);
  const username = userData.userinfo.username;
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.post(
          "https://100093.pythonanywhere.com/api/level_reports/",
          { username: username }
        );
        console.log(response.data[0]);
        setLevelReport(response.data[0]);
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchPortfolios();
  }, [username]);
  return (
    <div className="w-full relative overflow-x-scroll">
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
        <TabList className="w-[98%] grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-4 mt-4">
          {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
            (level, index) => {
              return (
                <Tab
                  key={index}
                  className={`bg-[#7A7A7A] flex items-center rounded-lg px-6 py-3 gap-x-12 ${
                    color_scheme == "Red"
                      ? "hover:bg-[#DC4C64]"
                      : color_scheme == "Green"
                      ? "hover:bg-[#14A44D]"
                      : "hover:bg-[#7A7A7A]"
                  } cursor-pointer card-shadow border border-[#F5F5F5]  outline-none text-white`}
                >
                  <FaLevelDownAlt />
                  <p className="font-roboto text-white font-medium">{level}</p>
                </Tab>
              );
            }
          )}
        </TabList>

        <TabPanel>
          <LevelOneReport data={levelReport?.level1} />
        </TabPanel>
        <TabPanel>
          <LevelTwoReport data={levelReport?.level2} />
        </TabPanel>
        <TabPanel>
          <LevelThreeReport data={levelReport?.level3} />
        </TabPanel>
        <TabPanel>
          <LevelFourReport data={levelReport?.level4} />
        </TabPanel>
        <TabPanel>
          <LevelFiveReport data={levelReport?.level5} />
        </TabPanel>
      </Tabs>
    </div>
    // <div className="w-full my-10 relative overflow-x-scroll">
    //   <table className="w-full border-collapse border border-gray-400">
    //     <thead className="bg-gray-200">
    //       <tr>
    //         <th className="border border-gray-400 px-2">No</th>
    //         <th className="border border-gray-400 px-2">Portfolio Name</th>
    //         <th className="border border-gray-400 px-2">Member Type</th>
    //         <th className="border border-gray-400 px-2">Role</th>
    //         <th className="border border-gray-400 px-2">Member Name</th>
    //         <th className="border border-gray-400 px-2">Product Assigned</th>
    //         <th className="border border-gray-400 px-2">Data Type</th>
    //         <th className="border border-gray-400 px-2">
    //           Operations of Rights
    //         </th>
    //         <th className="border border-gray-400 px-2">
    //           Portfolio Code(Unique)
    //         </th>
    //         <th className="border border-gray-400 px-2">
    //           Portfolio Universal Code
    //         </th>
    //         <th className="border border-gray-400 px-2">Portfolio Details</th>
    //         <th className="border border-gray-400 px-2">Enable/ Disable</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {memberReport.length ? (
    //         memberReport.map((item, index: number) => (
    //           <tr key={index} className="border border-gray-400">
    //             <td className="border border-gray-400 px-2">{index + 1}</td>
    //             <td className="border border-gray-400 px-2">
    //               {item.portfolio_name}
    //             </td>
    //             <td className="border border-gray-400 px-2">
    //               {item.member_type}
    //             </td>
    //             <td className="border border-gray-400 px-2">{item.role}</td>
    //             <td className="border border-gray-400 px-2">
    //               {item.username[0]}
    //             </td>
    //             <td className="border border-gray-400 px-2">{item.product}</td>
    //             <td className="border border-gray-400 px-2">
    //               {item.data_type}
    //             </td>
    //             <td className="border border-gray-400 px-2">
    //               {item.operations_right}
    //             </td>
    //             <td className="border border-gray-400 px-2">
    //               {item.portfolio_code}
    //             </td>

    //             <td className="border border-gray-400 px-2">
    //               {item.portfolio_uni_code}
    //             </td>
    //             <td className="border border-gray-400 px-2">
    //               {item.portfolio_details}
    //             </td>
    //             <td className="border border-gray-400 px-2">{item.status}</td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td className="p-4" colSpan={3}>
    //             No Data...
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default LevelReport;
