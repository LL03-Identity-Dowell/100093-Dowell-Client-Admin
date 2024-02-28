import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FaUser } from "react-icons/fa";
import GuestReport from "./GuestReport";
import TeamReport from "./TeamReport";
import PublicReport from "./PublicReport";

interface memberProps {
  guest_members: {
    accept_members: {
      name: string;
      link: string;
      member_code: string;
      member_spec: string;
      member_details: string;
      member_uni_code: string;
      status: string;
    }[];
    pending_members: {
      name: string;
      link: string;
      member_code: string;
      member_spec: string;
      member_details: string;
      member_uni_code: string;
      status: string;
    }[];
  };
  team_members: {
    accept_members: {
      name: string;
      portfolio_name: string;
      product: string;
      link: string;
      status: string;
    }[];
    pending_members: {
      name: string;
      portfolio_name: string;
      product: string;
      link: string;
      status: string;
    }[];
  };
  public_members: {
    accept_members: {
      name: string;
      link: string;
      member_code: string;
      member_spec: string;
      member_details: string;
      member_uni_code: string;
      status: string;
    }[];
    pending_members: {
      name: string;
      link: string;
      member_code: string;
      member_spec: string;
      member_details: string;
      member_uni_code: string;
      status: string;
    }[];
  };
}
const MemberReport = () => {
  const [memberReport, setMemberReport] = useState<memberProps>();
  const userData = useSelector((state: RootState) => state.userinfo);
  const username = userData.userinfo.username;
  const [tabIndex, setTabIndex] = useState(-1);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.post(
          "https://100093.pythonanywhere.com/api/member_reports/",
          { username: username }
        );
        setMemberReport(response.data);
        // setMemberReport(response.data);
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchPortfolios();
  }, [username]);
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
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
        <TabList className="xl:w-[98%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 mt-4">
          <Tab
            key={"guest_repot"}
            className={`bg-[#7A7A7A] ${
              color_scheme == "Red"
                ? "hover:bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "hover:bg-[#14A44D]"
                : "hover:bg-[#7A7A7A]"
            } flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] outline-none text-white`}
          >
            <FaUser />
            <p className="font-roboto text-white font-medium">Guest Report</p>
          </Tab>
          <Tab
            key={"guest_repot"}
            className={`bg-[#7A7A7A] ${
              color_scheme == "Red"
                ? "hover:bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "hover:bg-[#14A44D]"
                : "hover:bg-[#7A7A7A]"
            } flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] outline-none text-white`}
          >
            <FaUser />
            <p className="font-roboto text-white font-medium">Team Report</p>
          </Tab>
          <Tab
            key={"guest_repot"}
            className={`bg-[#7A7A7A] ${
              color_scheme == "Red"
                ? "hover:bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "hover:bg-[#14A44D]"
                : "hover:bg-[#7A7A7A]"
            } flex items-center rounded-lg px-6 py-3 gap-x-12 hover:bg-[#61CE70] cursor-pointer card-shadow border border-[#F5F5F5] outline-none text-white`}
          >
            <FaUser />
            <p className="font-roboto text-white font-medium">Public Report</p>
          </Tab>
        </TabList>

        <TabPanel>
          <GuestReport
            accept_members={memberReport?.guest_members.accept_members}
            pending_members={memberReport?.guest_members.pending_members}
          />
        </TabPanel>
        <TabPanel>
          <TeamReport
            accept_members={memberReport?.team_members.accept_members}
            pending_members={memberReport?.team_members.pending_members}
          />
        </TabPanel>
        <TabPanel>
          <PublicReport
            accept_members={memberReport?.public_members.accept_members}
            pending_members={memberReport?.public_members.pending_members}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MemberReport;
