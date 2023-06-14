import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import images from "./images";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="sticky top-0 py-2 z-50 bg-white shadow-md">
      <div className="container mx-auto  flex flex-wrap items-center justify-between px-6">
          <div className="w-full sticky flex justify-between lg:w-auto lg:static lg:justify-start h-[10vh] items-center">
            <a
              href="/"
              className="font-medium tracking-wider transition-colors"
            >
              <img src={images.logo} alt="logo" className="w-40" />
            </a>

            <div className="flex items-center">
              <div className="lg:hidden"></div>
              <button
                className="text-[#A2D95E] cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-[#00000033] rounded-[0.25rem] h-[3rem] block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                {navbarOpen ? (
                  <AiOutlineClose />
                ) : (
                  <FaBars />
                )}
              </button>
            </div>
          </div>

          <div
            className={
              "lg:flex items-center lg:h-auto h-screen lg:justify-center justify-start lg:w-2/5" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row w-full lg:items-center items-baseline relative justify-between list-none lg:ml-auto lg:transform-none translate-y-[-60%] ">
              <li className="px-4 py-2 flex items-center leading-snug hover:text-[#A2D95E]">
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li className="px-4 py-2 flex items-center leading-snug hover:text-[#A2D95E]">
                <NavLink
                  to="/about-us"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  About Us
                </NavLink>
              </li>
              <li className="px-4 py-2 flex items-center leading-snug hover:text-[#A2D95E]">
                <NavLink
                  to="/faq"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  FAQ
                </NavLink>
              </li>

              {/* <li className="mx-auto flex  items-center lg:justify-center justify-between hover:text-[#A2D95E]"> */}
                <div className="group relative cursor-pointer lg:px-0 px-4 hover:text-[#A2D95E]">
                  <div className="flex items-center lg:justify-center justify-between bg-white">
                    <a className="menu-hover my-2 lg:mx-4">
                      Shop{" "}
                    </a>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    className="invisible absolute z-50 flex lg:min-w-[220px] lg:w-auto w-full flex-col bg-[#f4f4f4] py-1 px-4 text-gray-800 shadow-xl group-hover:visible"
                    // onClick=""
                  >
                    <a href="#" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Amazon
                    </a>

                    <a href="#" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Shopify
                    </a>
                    <a href="#" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Shopping Cart
                    </a>
                   
                  </div>
                </div>
              {/* </li> */}

              <div className="group relative cursor-pointer lg:px-0 px-4 hover:text-[#A2D95E]">
                  <div className="flex items-center lg:justify-center justify-between bg-white">
                    <a className="menu-hover my-2 lg:mx-4">
                    Login{" "}
                    </a>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    className="invisible absolute z-50 flex lg:min-w-[220px] lg:w-auto w-full flex-col bg-[#f4f4f4] py-1 px-4 text-gray-800 shadow-xl group-hover:visible"
                    // onClick=""
                  >
                    <a href="#" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Weblogin
                    </a>

                    <a href="#" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Extension
                    </a>
                    <a href="#" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Google Playstore
                    </a>
                    <a href="#" className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                      Apple Store
                    </a>
                  </div>
                </div>
          
              
            </ul>
          </div>

<div>
<div
                      className={
                        isOpen
                          ? "flex items-center text-sm text-[#A2D95E] relative w-4/5 justify-between"
                          : "flex items-center text-sm text-[#858484] relative  w-4/5 justify-between"
                      }
                      onClick={toggleDropdown}
                    >
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="w-5 text-2xl"
                        >
                          <path
                            d="M16.6665 4.99999H14.1665V3.33332C14.1665 2.41416 13.419 1.66666 12.4998 1.66666H7.49984C6.58067 1.66666 5.83317 2.41416 5.83317 3.33332V4.99999H3.33317C2.414 4.99999 1.6665 5.74749 1.6665 6.66666V9.16666H18.3332V6.66666C18.3332 5.74749 17.5857 4.99999 16.6665 4.99999ZM7.49984 3.33332H12.4998V4.99999H7.49984V3.33332ZM11.6665 11.6667H8.33317V9.99999H1.6665V15.8333C1.6665 16.7525 2.414 17.5 3.33317 17.5H16.6665C17.5857 17.5 18.3332 16.7525 18.3332 15.8333V9.99999H11.6665V11.6667Z"
                            fill="currentColor"
                          />
                        </svg>
                        <button className="font-fontMono text-base pl-3 w-max">
                          English{" "}
                        </button>
                      </span>
                      <IoMdArrowDropdown className="text-2xl" />
                      {isOpen && (
                        <div className="absolute top-0 right-0 left-0 mt-12 w-full py-2 bg-white border border-gray-200 rounded-md shadow-lg">
                          {/* {adminPage?.map((item) => {
                            return ( */}
                              <ul>
                                <li
                                  className="p-2 hover:bg-gray-100 text-[#141317] hover:text-[#01CAB9] flex items-center gap-2"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {/* <img
                                    src={item?.mediaUrl}
                                    alt=""
                                    width={35}
                                    height={35}
                                  /> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="w-5 text-2xl"
                                  >
                                    <path
                                      d="M16.6665 4.99999H14.1665V3.33332C14.1665 2.41416 13.419 1.66666 12.4998 1.66666H7.49984C6.58067 1.66666 5.83317 2.41416 5.83317 3.33332V4.99999H3.33317C2.414 4.99999 1.6665 5.74749 1.6665 6.66666V9.16666H18.3332V6.66666C18.3332 5.74749 17.5857 4.99999 16.6665 4.99999ZM7.49984 3.33332H12.4998V4.99999H7.49984V3.33332ZM11.6665 11.6667H8.33317V9.99999H1.6665V15.8333C1.6665 16.7525 2.414 17.5 3.33317 17.5H16.6665C17.5857 17.5 18.3332 16.7525 18.3332 15.8333V9.99999H11.6665V11.6667Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  English
                                </li>
                                
                              </ul>
                            {/* ); */}
                          {/* })} */}
                        </div>
                      )}
                    </div>
</div>
          <div className="hidden lg:block"></div>
        </div>
      </nav>

      
    </>
  );
}
