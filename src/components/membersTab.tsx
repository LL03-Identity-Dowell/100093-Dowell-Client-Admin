import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import images from "./images";

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
          <div className="lg:flex w-full  h-full mt-8">
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>TEAM MEMBERS</p>
                <p>{"<Total active team members>"}</p>
              </span>
              <div className="p-[30px]  my-20">
                <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                  Invite TEAM MEMBER to my organisation
                </p>
              </div>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Team Member Name
                  </label>
                  <input
                    type="text"
                    placeholder="Member name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Team Member Code (Unique)
                  </label>
                  <input
                    type="text"
                    placeholder="Member code"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Team Member Specifications
                  </label>
                  <input
                    type="text"
                    placeholder="Member specifications"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Team Member Universal Code
                  </label>
                  <input
                    type="text"
                    placeholder="Member universal code"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Team Member Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Member details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Create Team Member Invitation Link
                </button>

                <span className="bg-[#cef9d2] font-roboto text-lg text-[#7a7a7a] p-6 my-8 font-semibold flex flex-col items-center">
                  <p>Team Member Invitation Link</p>
                </span>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Copy invitation link
                </button>
              </form>
              <form className="border-t border-[#FF0000] mb-8">
                <div className="px-4 mt-8">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email of invitee"
                    required
                    className="outline-none w-full h-12 px-4 mb-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                  <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                    Send invitation link in email
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
                Search Team Members in my organisation
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Team Members not having Portfolio
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Team Members having assigned Portfolio
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Search Team Members
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Team member
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Member details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Remove Selected Team Member
                </button>
              </form>
            </div>
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <form className="px-4">
                <div className="mb-4 mt-8">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                    Invited Team Members
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Search Invited Team Members
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of Inivited Team member
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Member details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Cancel Selected Team Member Invitation
                </button>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto my-20">
                  Duplicate selected member invitation to create new
                </button>
              </form>

              <hr className="border-2 border-[#FF0000] mb-8" />
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                Common Invitation to join as TEAM MEMBER to my organisation
              </p>

              <form className="px-4">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Link to Data
                  </label>
                  <textarea
                  rows={4}
                  placeholder="Paste link to database to connect"

                  className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                />
              
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Import Team Members
                </button>
              </form>
              <form className="px-4 my-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Common invitation link
                  </label>
                  <textarea
                  rows={4}
                  placeholder="Paste invitation link"

                  className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                />
               
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save common invitation link & create QR code
                </button>
              </form>
              <form className=" px-4 flex flex-col items-center justify-center bg-[#f1f3f5] pb-4">
                <div className="mb-4">
                  <img src={images.placeholder} alt="" />
                  <p>QR code for link</p>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Download common invitation link QR code
                </button>
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="lg:flex w-full  h-full mt-8">
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>Users</p>
                <p>{"<Total active users>"}</p>
              </span>
              <div className="p-[30px]  my-20">
                <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                  Invite USER to my organisation
                </p>
              </div>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    User Name
                  </label>
                  <input
                    type="text"
                    placeholder="Member name"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    User Code (Unique)
                  </label>
                  <input
                    type="text"
                    placeholder="Member code"
                    required
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    User Specifications
                  </label>
                  <input
                    type="text"
                    placeholder="Member specifications"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    User Universal Code
                  </label>
                  <input
                    type="text"
                    placeholder="Member universal code"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    User Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Member details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Create User Invitation Link
                </button>

                <span className="bg-[#cef9d2] font-roboto text-lg text-[#7a7a7a] p-6 my-8 font-semibold flex flex-col items-center">
                  <p>User Invitation Link</p>
                </span>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Copy invitation link
                </button>
              </form>
              <form className="border-t border-[#FF0000] mb-8">
                <div className="px-4 mt-8">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email of invitee"
                    required
                    className="outline-none w-full h-12 px-4 mb-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                  <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                    Send invitation email to selected User
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                Search Users in my organisation
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Users not having Portfolio
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Users having assigned Portfolio
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Search Users
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected User
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Member details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>

                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Remove Selected User
                </button>
              </form>
            </div>
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <form className="border-b border-[[#FF0000] ]">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Invited Users
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                  >
                    <option> Member 01 </option>
                    <option> Member 02 </option>
                    <option> Member 03 </option>
                    <option> Member 04 </option>
                    <option> Member 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Search Invited Users
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of Inivted User
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Member details"
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Cancel Selected User Invitation
                </button>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Duplicate selected User invitation to create new
                </button>
              </form>
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                Common Invitation to join as USER to my organisation
              </p>

              <form>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Link to Data
                  </label>
                  <input
                    type="text"
                    placeholder="Paste link to database to connect"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Import Users
                </button>
              </form>
              <form>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Common invitation link
                  </label>
                  <input
                    type="text"
                    placeholder="Paste invitation link"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Save common invitation link & create QR code
                </button>
              </form>
              <form>
                <div className="mb-4">
                  <img src={images.placeholder} alt="" />
                  <p>QR code for link</p>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Download common invitation link QR code
                </button>
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="lg:flex w-full  h-full mt-8">
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                Invite PUBLIC to my organisation
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Number of Public Links needed now
                  </label>
                  <input
                    type="text"
                    placeholder="Number"
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Create automatically if less than
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>5 </option>
                    <option> 10 </option>
                    <option>25 </option>
                    <option>50 </option>
                    <option>100 </option>
                    <option>500 </option>
                    <option>1000 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Create Public Invitation Link
                </button>
              </form>
            </div>
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12">
                Public in my organisation
              </p>
              <form className="px-[30px] mb-8">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Unused Public Links not having Portfolio
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Public 01 </option>
                    <option> Public 02 </option>
                    <option>Public 03 </option>
                    <option>Public 04 </option>
                    <option>Public 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Unused Public Links with assigned Portfolio
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Public 01 </option>
                    <option> Public 02 </option>
                    <option>Public 03 </option>
                    <option>Public 04 </option>
                    <option>Public 05 </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Used Public Links
                  </label>
                  <select className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto">
                    <option>Public 01 </option>
                    <option> Public 02 </option>
                  </select>
                </div>
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
                  Hide used Public Links
                </button>
              </form>
            </div>
            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
                <p>Public</p>
                <p>{"<Total public links used>"}</p>
              </span>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MembersTab;

