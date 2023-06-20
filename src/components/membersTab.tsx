import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import images from "./images";
import Modal from "react-modal";

const MembersTab = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(false);

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

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
                <div className="flex items-center gap-x-2 py-8">
                  <p className="text-[#548625]">
                    Do you accept our{" "}
                    <button
                      className="text-black"
                      type="button"
                      onClick={openPrivacyModal}
                    >
                      policies?
                    </button>{" "}
                  </p>
                  <input type="checkbox" />
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12 px-4 flex flex-col">
                Common Invitation to join as TEAM MEMBER to my organisation
                <span>
                  If you don't have any link,{" "}
                  <a
                    href="https://100093.pythonanywhere.com/#"
                    className="text-black font-normal"
                  >
                    click here
                  </a>{" "}
                  to upload.
                </span>
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
                  <p className="text-center">QR code for link</p>
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
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
              <form className="px-4">
                <div className="mb-4 mt-8">
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
                <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto my-20">
                  Duplicate selected User invitation to create new
                </button>
              </form>
              <hr className="border-2 border-[#FF0000] mb-8" />

              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-12 px-4 flex flex-col">
                Common Invitation to join as USER to my organisation
                <span>
                  If you don't have any link,{" "}
                  <a
                    href="https://100093.pythonanywhere.com/#"
                    className="text-black font-normal"
                  >
                    click here
                  </a>{" "}
                  to upload.
                </span>
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
                  Import Users
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
                  <p className="text-center">QR code for link</p>
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
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
              <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] m-5 flex flex-col items-center">
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

      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: "0%",
            left: "0%",
            right: "0%",
            bottom: "0%",
            backgroundColor: "rgba(119, 119, 119, 0.589)",
            zIndex: 50,
          },
        }}
        className="absolute lg:mt-36 left-0 right-0 md:w-3/5 mx-auto md:h-auto h-screen lg:max-h-[80%] pb-4 overflow-y-auto overflow-auto bg-[#FFFDFD] z-50 lg:rounded-[10px] outline-none border-0 md:flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
        isOpen={isPrivacyModalOpen}
        shouldCloseOnOverlayclick={true}
        onRequestClose={closePrivacyModal}
        ariaHideApp={false}
      >
        <div className="px-16 mt-16 text-sm">
          <img src={images.dowell_logo} alt="" className="w-[180px]" />
          <h2 className="underline text-center text-xl my-8 font-bold">
            Privacy Consent Form
          </h2>
          <h2 className="text-xl mt-16 font-bold">
            FOR USE WHEN COLLECTING PERSONAL DATA IN/FROM EUROPEAN UNION
          </h2>
          <p>
            Required by European Union General Data Protection Regulation
            2016/679 (“EUGDPR”)
          </p>
          <br />
          <p>
            To Be Signed by Individuals Providing Personal Data to the Dowell
            Sample 2 who is the controller of your personal data.
          </p>
          <br />
          <p>You may contact via email at: app@app.com</p>
          <br />
          <p>
            Your personal data will be used for the following purposes (check
            all that apply):
          </p>
          <form className="flex flex-col pl-20 my-4">
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Marketing</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Advertisement</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Research</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Technical Support</label>
            </span>
            <span className="flex gap-x-2">
              <input type="checkbox" />
              <label>Other</label>
            </span>
          </form>
          <p>
            The categories of personal data you are being asked to consent to
            the collection and use are your name, address, email address,
            telephone number, and [include a description of any other personal
            data collected]. will keep your personal data with the software
            where Dowell will collect, store and process your personal data and
            who are contractually obligated to keep your personal data
            confidential subject to appropriate safeguards to prevent it from
            unauthorized disclosure. Also intends to share your personal data
            with [identify all company units and third parties that will receive
            personal data].
          </p>
          <br />
          <p>
            Your personal data will be stored in accordance with the record
            retention requirements applicable to Dowell Research Pte. Ltd. a
            private organization of Singapore, and any other applicable laws.
            Under the EUGDPR, you have the right to request access to, rectify,
            erase, and restrict the processing of your personal data. You also
            have the right to revoke this consent to use your personal data.
          </p>
          <br />
          <p>
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with the Privacy Policy. You can read more
            about the
            <a
              href="https://100087.pythonanywhere.com/legalpolicies/FB1010000000001665306290565391/app-privacy-policy/policies/?session_id=m6wpj01dah7p8y55g5f1dsmbg4pcsa3e"
              className="text-[#0000ee]"
            >
              {" "}
              privacy policy.
            </a>{" "}
            You have the right to request access to, rectify, erase and restrict
            the processing of your personal data. You also have the right to
            revoke this consent to use your personal data.
          </p>{" "}
          <br />
          <p>
            If you feel has violated the EUGDPR, you have the right to file a
            complaint with the appropriate EU supervisory authority. These
            rights are more specifically described in the Privacy Notices posted
            on the website at{" "}
            <a href="http://appsample.com/" className="text-[#0000ee]">
              http://appsample.com/
            </a>{" "}
          </p>
          <br />
          <p>
            Please [sign/electronically sign/check the box below], date, and
            return by [email/submit] the below:
          </p>
          <br />
          <p>
            Privacy Consent Form I consent to use my personal data for the
            purposes described in this notice and understand that I can withdraw
            my consent at any time.
          </p>
          <br />
          <span className="flex gap-4 pl-20 mb-4">
            <input
              type="checkbox"
              onChange={() => setIsPrivacyPolicy((current) => !current)}
            />
            <label>gives consent</label>
          </span>
          {isPrivacyPolicy && (
            <form className="flex flex-col gap-4 my-8">
              <div className="flex items-center gap-x-3">
                <label>Name of Individual providing Consent*:</label>{" "}
                <input
                  type="text"
                  className="border border-black rounded-sm"
                  name="name_of_individual"
                />
              </div>
              <div className="flex items-center gap-x-3">
                <label>Address of Individual providing Consent*:</label>{" "}
                <input
                  type="text"
                  className="border border-black rounded-sm"
                  name="address_of_individual"
                />
              </div>
              <div className="flex items-center gap-x-3">
                <label>Signature*:</label>{" "}
                <input
                  type="file"
                  className="rounded-sm"
                  name="address_of_individual"
                />
              </div>
              <div className="flex mt-4 pl-20">
                <button className="bg-[#008000] text-white text-sm px-4 h-12 rounded-md">
                  Submit Consent
                </button>
              </div>
            </form>
          )}
          <footer>
            {
              "Disclaimer: We collect the information on this form solely for the purposes of licensing certain documents to you, per the terms prescribed on the website. All data is stored in accordance with our Privacy Policy. We do not sell or otherwise distribute personal information collected via this form to third parties, nor will you receive any marketing material, unless you have specifically opted in to receive such materials from us."
            }
          </footer>
          <br />
        </div>
      </Modal>
    </div>
  );
};

export default MembersTab;
