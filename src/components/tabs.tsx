import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FaUser,
  FaLevelDownAlt,
  FaRegGem,
  FaBookReader,
  FaUsers,
  FaSitemap,
  FaToriiGate,
} from "react-icons/fa";
import { useState } from "react";
import images from "./images";
import MembersTab from "./membersTab";
import LevelsTab from "./levelsTab";

const AdminTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hovertitle, setHovertitle] = useState("");

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

  const handleMouseOver = (title: string) => {
    setIsHovering(true);
    setHovertitle(title);
  };

  const handleMouseOut = (title: string) => {
    setIsHovering(false);
    setHovertitle(title);
  };

  const productsData = [
    {
      title: "Workflow AI",
      image: images.workflow_ai,
    },
    {
      title: "Wifi QR Code",
      image: images.wifiqr,
    },
    {
      title: "UX Live",
      image: images.ux,
    },
    {
      title: "Socialmedia Automation",
      image: images.socialMedia,
    },
    {
      title: "Dowell Scales",
      image: images.livingLabScales,
    },
    {
      title: "Logo Scan",
      image: images.logoScan,
    },
    {
      title: "Living Lab Chat",
      image: images.chat,
    },
    {
      title: "Legal Zard",
      image: images.legalzard,
    },
    {
      title: "Dowell Maps",
      image: images.maps,
    },
    {
      title: "Digital Queue",
      image: images.digitalQ,
    },
    {
      title: "Customer Experience",
      image: images.customerExperience,
    },
    {
      title: "Client Admin",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2022/12/Living-Lab-Admin-1.png",
    },
    {
      title: "Permutation Calculator",
      image: images.permutationcalc,
    },

    {
      title: "Live Dashboard",
      image: images.liveStream,
    },
    {
      title: "Sales Agent",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/Sales-agent-app.png",
    },
    {
      title: "Customer Support",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/customer-support-centre.png",
    },
    {
      title: "Secure Repositories",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/Living-Lab-Admin-2.png",
    },
    {
      title: "Secure Data",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2023/01/secure-data.png",
    },
    {
      title: "Living Lab Monitor",
      image:
        "https://uxlivinglab.com/wp-content/uploads/2022/12/Living-Lab-Admin-2.png",
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
                className="w-full card-shadow h-12 flex items-center px-8 text-[#7a7a7a] gap-x-20 border border-[#7a7a7a] rounded-lg hover:bg-[#61CE70] hover:text-white cursor-pointer"
              >
                <i className="text-[#4CAF50] text-xl font-black">{tabs.icon}</i>
                <p className="font-roboto text-lg">{tabs.title}</p>
              </Tab>
            );
          })}
        </TabList>
        <TabPanel>
          <div className="mt-8">
            <p className="font-roboto text-lg text-[#7a7a7a] font-semibold">
              Products of{" "}
              <span className="text-[#FF0000]"> [Organisation]</span>, Owner{" "}
              <span className="text-[#FF0000]">[Owner Name]</span>
            </p>
            <p className="font-roboto text-lg text-[#7a7a7a] font-semibold">
              Select product & Portfolio to connect
            </p>

            <section className="relative">
              <main className={`grid lg:grid-cols-3 grid-cols-1 w-full`}>
                {productsData.map((product) => {
                  return (
                    <div
                      className="relative w-full h-full "
                      onMouseOver={() => handleMouseOver(product.title)}
                      onMouseOut={() => handleMouseOut(product.title)}
                    >
                      <div className="">
                        <img
                          src={product.image}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      {isHovering && product.title === hovertitle && (
                        <div className="absolute top-0 w-full h-full">
                          <div className="relative w-full h-full">
                            <div className="bg-[#a2a2a2] opacity-50 w-full h-full p-50 rounded-sm"></div>
                            <div className="bg-transparent absolute w-full h-full top-0 text-center flex flex-col justify-between py-16 items-center">
                              <h2 className="text-white text-[1.78rem] font-semibold">
                                {product.title}
                              </h2>
                              <div>
                                <select className="outline-none h-8">
                                  <option className="">
                                    Portfolio 01, Role Name, Member Type
                                  </option>
                                  <option className="">
                                    Portfolio 02, Role Name, Member Type
                                  </option>
                                  <option className="">
                                    Portfolio 03, Role Name, Member Type
                                  </option>
                                </select>
                              </div>
                              <button className="bg-black text-white h-12 px-6 py-4 rounded-md flex items-center hover:bg-[#666666]">
                                Connect
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </main>
            </section>

            <form className="border border-[#54595f] h-full mt-20 p-[50px]">
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Select Product
                </label>
                <select
                  className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  placeholder="Select Product"
                >
                  <option> Product 01 </option>
                  <option> Product 02 </option>
                  <option> Product 03 </option>
                  <option> Product 04 </option>
                  <option> Product 05 </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Select Portfolio
                </label>
                <select
                  className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  placeholder="Select Product"
                >
                  <option> Portfolio name 01, Role Name, Member Type </option>
                  <option> Portfolio name 02, Role Name, Member Type </option>
                  <option>Portfolio name 03, Role Name, Member Type </option>
                  <option>Portfolio name 04, Role Name, Member Type </option>
                  <option>Portfolio name 05, Role Name, Member Type </option>
                </select>
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                  Details of selected Portflio
                </label>
                <textarea
                  rows={4}
                  className="outline-none border border-[#7a7a7a] resize-none p-4 rounded-sm text-[#7a7a7a]"
                />
              </div>
              <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                Click here to connect selected Portfolio in selected Product
              </button>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mt-8 w-full lg:flex gap-8">
            <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>PORTFOLIO</p>
                <p>{"<Total enabled portfolio>"}</p>
              </span>
              <div className="p-[30px]  my-20">
                <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                  Assign Portfolio – Products, Data types, Operational Rights
                  and Roles to Members
                </p>
              </div>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Member Type{" "}
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    required
                  >
                    <option>Owner </option>
                    <option> Team Member </option>
                    <option>User </option>
                    <option> Public</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Member
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Product
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Product 01 </option>
                    <option> Product 02 </option>
                    <option> Product 03 </option>
                    <option> Product 04 </option>
                    <option> Product 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Data Type{" "}
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    required
                  >
                    <option>Real Data </option>
                    <option> Learning Member </option>
                    <option>Testing DataData </option>
                    <option> Archived Data</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Operational Rights{" "}
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    required
                  >
                    <option>View </option>
                    <option> Add/Edit </option>
                    <option>Delete </option>
                    <option> Admin</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Roles
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Role 01 </option>
                    <option> Role 02 </option>
                    <option> Role 03 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Portfolio Name
                  </label>
                  <input
                    type="text"
                    placeholder="Portfolio name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Portfolio Code (Unique){" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Portfolio code"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Portfolio Specification{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Portfolio specification"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Portfolio Universal Code{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Portfolio universal code"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Portfolio Details{" "}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Portfolio details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Create Portfolio
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 ">
              <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
                Show Assigned Portfolios, Search in Portfolios
              </h2>

              <form className=" mb-8 mt-12">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Member Type
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Owner </option>
                    <option> Team Member </option>
                    <option>User </option>
                    <option> Public</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Member
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Product
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Product 01 </option>
                    <option> Product 02 </option>
                    <option> Product 03 </option>
                    <option> Product 04 </option>
                    <option> Product 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Data Type{" "}
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Real Data </option>
                    <option> Learning Member </option>
                    <option>Testing DataData </option>
                    <option> Archived Data</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Operational Rights{" "}
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>View </option>
                    <option> Add/Edit </option>
                    <option>Delete </option>
                    <option> Admin</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Roles
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Role 01 </option>
                    <option> Role 02 </option>
                    <option> Role 03 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Portfolios
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Portfolio name 01, Role Name, Member Type </option>
                    <option> Portfolio name 02, Role Name, Member Type </option>
                    <option> Portfolio name 03, Role Name, Member Type </option>
                    <option> Portfolio name 04, Role Name, Member Type </option>
                    <option> Portfolio name 05, Role Name, Member Type </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Portfolios
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Portfolio name 01, Role Name, Member Type </option>
                    <option> Portfolio name 02, Role Name, Member Type </option>
                    <option> Portfolio name 03, Role Name, Member Type </option>
                    <option> Portfolio name 04, Role Name, Member Type </option>
                    <option> Portfolio name 05, Role Name, Member Type </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Portfolio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Portfolio details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable Selected Portfolio
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Enable </option>
                    <option> Disable </option>
                  </select>
                </div>
                <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
                  Enable / Disable selected Portfolio
                </button>

                <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
                  Duplicate selected Portfolio to create new
                </button>
                <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
                  Refresh Search
                </button>
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <MembersTab />
        </TabPanel>
        <TabPanel>
          <div className="mt-8 w-full lg:flex gap-8">
            <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>ROLE</p>
                <p>{"<Total enabled roles>"}</p>
              </span>
              <div className="p-[30px]  my-20">
                <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                  Create Roles – Define Roles in my organisation
                </p>
              </div>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 1
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    required
                  >
                    <option>Item 1 </option>
                    <option> Item 2 </option>
                    <option>Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 2
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option> Item 2 </option>
                    <option>Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 3
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option>Item 1 </option>
                    <option> Item 2 </option>
                    <option>Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 4
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option> Item 2 </option>
                    <option>Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 5
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option> Item 2 </option>
                    <option>Item 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Security Layer
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    required
                  >
                    <option>Layer 01 </option>
                    <option> Layer 02 </option>
                    <option>Layer 03 </option>
                    <option>Layer 04 </option>
                    <option>Layer 05 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Name
                  </label>
                  <input
                    type="text"
                    placeholder="Role name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Code (Unique){" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Role code"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Specification{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Role specification"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Universal Code{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Role universal code"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Details{" "}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Role details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Create Role
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 ">
              <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
                Roles created in my organisation
              </h2>

              <form className=" mb-8 mt-12">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 1
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option>Item 2 </option>
                    <option>Item 3 </option>
                    <option>Item 4 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 2
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option>Item 2 </option>
                    <option>Item 3 </option>
                    <option>Item 4 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 3
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option>Item 2 </option>
                    <option>Item 3 </option>
                    <option>Item 4 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 4
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option>Item 2 </option>
                    <option>Item 3 </option>
                    <option>Item 4 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 5
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Item 1 </option>
                    <option>Item 2 </option>
                    <option>Item 3 </option>
                    <option>Item 4 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Security Layer
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option>Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Roles
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Role 1 </option>
                    <option> Role 2 </option>
                    <option> Role 3 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Roles
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Role 1 </option>
                    <option> Role 2 </option>
                    <option> Role 3 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Role
                  </label>
                  <textarea
                    rows={4}
                    placeholder=""
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable Selected Role
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Enable </option>
                    <option> Disable </option>
                  </select>
                </div>
                <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
                  Enable / Disable selected Role
                </button>

                <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
                  Duplicate selected Role to create new
                </button>
                <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
                  Refresh Search
                </button>
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel>

          <LevelsTab />
        </TabPanel>
        <TabPanel>
          <div className="mt-8 w-full lg:flex gap-8">
            <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>Security Layers created in my organisation</p>
              </span>
              <div className="p-[30px]  my-12">
                <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-8">
                  Create Layers – Define Security Layers in my organisation
                </p>
                <p className="text-[#7A7A7A] text-lg font-roboto font-bold py-8">
                  Set Layers – 1 (High), 2, 3, 4, 5, 6 (Low)
                </p>
                <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                  {" "}
                  Devices
                </p>
              </div>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Laptop/Desk top
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Mobile Phone
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Tablet / Ipad
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Device Settings
                </button>
              </form>
              <hr />

              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                {" "}
                Operating Systems
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Windows
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Mac OS
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Linux
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Android
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save OS Settings
                </button>
              </form>

              <hr />

              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                {" "}
                Browsers
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Chrome
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Safari
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Bing
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Firefox
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Edge
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Opera
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Browser Settings
                </button>
              </form>
              <hr />
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                {" "}
                Internet Connection Type
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Mobile Data
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Office Wifi/Secured Wifi
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Public Wifi
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Internet Settings
                </button>
              </form>
              <hr />

              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                {" "}
                Login Type
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    User Name & Password
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Face ID
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Voice ID
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Biometric ID
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Video ID
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Login type Settings
                </button>
              </form>
              <hr />

              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                {" "}
                Change Password
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Change password at least once every Week
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Change password at least once every Month
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Change password at least once every 3 Months
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Change password at least once every 6 Months
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Change password at least once every Year
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Password Settings
                </button>
              </form>
              <hr />
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                {" "}
                Password Strength
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Minimum 8 characters
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Minimum 10 characters
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Minimum 12 characters
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Minimum 16 characters
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Password Settings
                </button>
              </form>
              <hr />
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                {" "}
                ID Verification Status
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Verified ID
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    ID not verified
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Phone number verified
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Phone number not verified
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Email verified
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Email not verified
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Others not listed above
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option> Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Verified ID Settings
                </button>
              </form>
            </div>

            <div className="lg:w-1/2 ">
              <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
                Search in Security Layers
              </h2>

              <form className=" mb-8 mt-12">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Security Layer
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Layer 1 </option>
                    <option>Layer 2 </option>
                    <option>Layer 3 </option>
                    <option>Layer 4 </option>
                    <option>Layer 5 </option>
                    <option>Layer 6 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Devices
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Laptop/desktop </option>
                    <option>Mobile phone </option>
                    <option>Tablet/Ipad </option>
                    <option>Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Operating Systems
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Windows </option>
                    <option>Mac OS </option>
                    <option>Linux </option>
                    <option>Android </option>
                    <option>IOS </option>
                    <option>Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Browsers
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Chrome </option>
                    <option>Safari </option>
                    <option>Bing </option>
                    <option>Firefox </option>
                    <option>Edge </option>
                    <option>Opera </option>
                    <option>Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Internet Connection Type
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Mobile Data </option>
                    <option>Secured Wifi </option>
                    <option>Public Wifi </option>
                    <option>Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Login Type
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>User Name & Password </option>
                    <option>Face ID </option>
                    <option>Voice ID </option>
                    <option>Biometric ID </option>
                    <option>Video ID </option>
                    <option>Others </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Change Password
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> At least once a Week </option>
                    <option> At least once a Month </option>
                    <option> At least once in 3 Months </option>
                    <option> At least once in 6 Months </option>
                    <option> At least once in a Year </option>
                    <option> Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Geographic Location
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> 8 characters </option>
                    <option> 10 characters </option>
                    <option> 12 characters </option>
                    <option> 16 characters </option>
                    <option> Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    ID Verification Status
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option> Verified ID </option>
                    <option> ID not verified </option>
                    <option> Phone number verified </option>
                    <option> Phone number not verified </option>
                    <option> Email verified </option>
                    <option> Email not verified </option>
                    <option> Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Geographic Location
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>India </option>
                    <option> Kenya </option>
                    <option> Nigeria </option>
                    <option> Others </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Language
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>English </option>
                    <option> Chinese </option>
                    <option> Korean </option>
                    <option> Others </option>
                  </select>
                </div>

                <button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
                  Refresh Search
                </button>
              </form>
              <hr className="" />
              <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
                Set Layers – 1 (High), 2, 3, 4, 5, 6 (Low)
              </h2>
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Geographic Location{" "}
              </p>
              <form className="px-6 w-full">
                <ol className="list-decimal">
                  <li className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-3">
                      1.
                      <input type="checkbox" /> <label>India - Layer</label>
                      {["1", "2", "3", "4", "5", "6"].map((id) => {
                        return (
                          <>
                            <input type="radio" key={id} className="px-4" />
                            <label className="whitespace-normal">{id}</label>
                          </>
                        );
                      })}
                    </div>

                    <ol className="list-decimal pl-6">
                      {[
                        "Delhi",
                        "Mumbai",
                        "Chennai",
                        "Others not listed above",
                      ].map((city) => {
                        return (
                          <>
                            <li
                              className="flex flex-wrap items-center gap-x-3"
                              key={city}
                            >
                              <input type="checkbox" />{" "}
                              <label>{city} - Layer</label>
                              {["1", "2", "3", "4", "5", "6"].map((id) => {
                                return (
                                  <>
                                    <input type="radio" key={id} />
                                    <label className="whitespace-normal">
                                      {id}
                                    </label>
                                  </>
                                );
                              })}
                            </li>
                          </>
                        );
                      })}
                    </ol>
                  </li>

                  <li className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-3">
                      2.
                      <input type="checkbox" />{" "}
                      <label className="whitespace-normal">
                        Australia - Layer
                      </label>
                      {["1", "2", "3", "4", "5", "6"].map((id) => {
                        return (
                          <>
                            <input type="radio" key={id} className="px-4" />
                            <label className="whitespace-normal">{id}</label>
                          </>
                        );
                      })}
                    </div>

                    <ol className="list-decimal pl-6">
                      {["Brisbane", "Sydney", "Others not listed above"].map(
                        (city) => {
                          return (
                            <>
                              <li
                                className="flex flex-wrap items-center gap-x-3"
                                key={city}
                              >
                                <input type="checkbox" />{" "}
                                <label>{city} - Layer</label>
                                {["1", "2", "3", "4", "5", "6"].map((id) => {
                                  return (
                                    <>
                                      <input type="radio" key={id} />
                                      <label className="whitespace-normal">
                                        {id}
                                      </label>
                                    </>
                                  );
                                })}
                              </li>
                            </>
                          );
                        }
                      )}
                    </ol>
                  </li>
                  <li className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-3">
                      3.
                      <input type="checkbox" /> <label>UK - Layer</label>
                      {["1", "2", "3", "4", "5", "6"].map((id) => {
                        return (
                          <>
                            <input type="radio" key={id} className="px-4" />
                            <label className="">{id}</label>
                          </>
                        );
                      })}
                    </div>

                    <ol className="list-decimal pl-6">
                      {["London", "Leeds", "Others not listed above"].map(
                        (city) => {
                          return (
                            <>
                              <li
                                className="flex flex-wrap items-center gap-x-3"
                                key={city}
                              >
                                <input type="checkbox" />{" "}
                                <label className="whitespace-normal">
                                  {city} - Layer
                                </label>
                                {["1", "2", "3", "4", "5", "6"].map((id) => {
                                  return (
                                    <>
                                      <input type="radio" key={id} />
                                      <label className="whitespace-normal">
                                        {id}
                                      </label>
                                    </>
                                  );
                                })}
                              </li>
                            </>
                          );
                        }
                      )}
                    </ol>
                  </li>
                  <li className="flex ">
                    <div className="flex flex-wrap items-center gap-x-3">
                      4.
                      <input type="checkbox" />{" "}
                      <label className="whitespace-normal">
                        Other countries not listed above - Layer
                      </label>
                      {["1", "2", "3", "4", "5", "6"].map((id) => {
                        return (
                          <>
                            <input type="radio" key={id} className="px-4" />
                            <label className="">{id}</label>
                          </>
                        );
                      })}
                    </div>
                  </li>
                </ol>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Geographic Settings
                </button>
              </form>
              <hr />
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Language
              </p>
              <form className="px-6 w-full">
                <ol className="list-decimal">
                  {[
                    "English",
                    "Chinese",
                    "Korean",
                    "Others not listed above",
                  ].map((city) => {
                    return (
                      <>
                        <li
                          className="flex flex-wrap items-center gap-x-3 py-2"
                          key={city}
                        >
                          <input type="checkbox" />{" "}
                          <label>{city} - Layer</label>
                          {["1", "2", "3", "4", "5", "6"].map((id) => {
                            return (
                              <>
                                <input type="radio" key={id} />
                                <label className="whitespace-normal">
                                  {id}
                                </label>
                              </>
                            );
                          })}
                        </li>
                      </>
                    );
                  })}
                </ol>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save Language Settings
                </button>
              </form>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminTabs;
