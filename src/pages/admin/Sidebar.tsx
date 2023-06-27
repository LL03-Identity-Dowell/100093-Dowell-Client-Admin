import { AiFillCaretRight } from "react-icons/ai";
import { useState } from 'react';

const Sidebar = () => {
  const [isSubmenuHidden, setSubmenuHidden] = useState(true);

  const toggleSubmenu = () => {
    setSubmenuHidden(!isSubmenuHidden);
  };

  return (
    <>
      <div className="border border-black card-shadow lg:w-1/4 px-2 py-2">
        <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2]">
          <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
            My Profile
          </h2>
          <div className="card-shadow mx-4">
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
              <span
                className="flex items-center h-12 gap-4 cursor-pointer"
                onClick={toggleSubmenu}
              >
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Workspaces</p>
              </span>

              <div
                className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${
                  isSubmenuHidden ? "hidden" : ""
                }`}
                id="submenu"
              >
                {/* <h1 className="cursor-pointer p-2 hover:bg-[#cef9d2] rounded-md mt-1">
                  Social
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-[#cef9d2] rounded-md mt-1">
                  Personal
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-[#cef9d2] rounded-md mt-1">
                  Friends
                </h1> */}
              </div>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Edit My Profile</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Last Logins</p>
              </span>
            </div>
          </div>
        </div>

        <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2] mt-8">
          <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
            Portfolio Notifications
          </h2>
          <div className="card-shadow mx-4">
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">
                  Team Member Chat (098)
                </p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">User Chat (09)</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Public Chat (0045)</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">UX Living Lab Chat</p>
              </span>
            </div>
          </div>
        </div>

        <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2] mt-8">
          <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
            Announcements
          </h2>
          <div className="card-shadow mx-4">
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">To Team Members</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">To Users</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">To Public</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">From UX Living Lab</p>
              </span>
            </div>
          </div>
        </div>

        <div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2] mt-8">
          <h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2">
            My Organisation
          </h2>
          <div className="card-shadow mx-4">
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem] mt-4">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Products (007)</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Team members (00025)</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Users (000025)</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Users (0000234)</p>
              </span>
            </div>
            <div className="bg-[#7a7a7a] px-4  mb-[.1rem]">
              <span className="flex items-center h-12 gap-4">
                <AiFillCaretRight className="text-white" />
                <p className="text-white font-semibold">Public (009)</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
