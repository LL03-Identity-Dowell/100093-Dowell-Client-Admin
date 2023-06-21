import { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./myLinks";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  // const [subHeading, setSubHeading] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
             
            >
              {link.name}
             
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <FaChevronDown />
              </span>
            </h1>
            <div className="absolute bg-[#f4f4f4] top-20 hidden group-hover:md:block hover:md:block text-gray-800 shadow-xl rounded-md">
              {link.sublinks.map((slink) => (
                 <li className="py-3 w-[220px] px-6">
                 <Link to={slink.link}>{slink.name}</Link>
               </li>
              ))}
            </div>
            
           

          </div>
          
          {/* Mobile menus */}
         
        </div>
      ))}
    </>
  );
};

export default NavLinks;