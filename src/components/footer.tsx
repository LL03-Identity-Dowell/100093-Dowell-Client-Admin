import images from "./images";
import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <>
      <footer className="lg:h-96 bg-[#20133b]">
        <div className="flex flex-col px-6 container mx-auto  justify-around">
          <div className=" items-center justify-between w-full border-y-2 border-[#61ce70] my-8">
            <div className=" w-full lg:flex justify-between mt-8">
              <div className="lg:mb-8 lg:w-3/5">
                <img src={images.logo} alt="logo" className="w-[100px] h-[100px]" />
                <span className="lg:flex justify-start lg:mt-0 mt-8">
                  <ul className="mt-4">
                    <p className="font-raleway text-xs text-[#fffff9]">
                    Grow With Dowell Ux Living Lab

                    </p>
                    
                    <ul className="list-none mt-4">
                    <li className="flex justify-start">
                      
                      <span className="mr-4 border border-[#61ce70] p-2">
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          
                          <FaFacebookF className='text-white text-lg hover:text-[#61ce70]' />
                        </a>
                      </span>
                      <span className="mr-4 border border-[#61ce70] p-2">
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          
                          <AiOutlineInstagram className='text-white text-lg hover:text-[#61ce70]' />
                        </a>
                      </span>
                      <span className="mr-4 border border-[#61ce70] p-2">
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          
                          <FaTwitter className='text-white text-lg hover:text-[#61ce70]' />
                        </a>
                      </span>
                      <span className="mr-4 border border-[#61ce70] p-2">
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          
                          <FaYoutube className='text-white text-lg hover:text-[#61ce70]' />
                        </a>
                      </span>
                      <span className="mr-4 border border-[#61ce70] p-2">
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          
                          <FaGoogle className='text-white text-lg hover:text-[#61ce70]' />
                        </a>
                      </span>
                    </li>
                    
                  </ul>

                  </ul>
                </span>
              </div>

              <div className="flex flex-col lg:flex-row justify-around lg:w-2/5">
               

               

               

                <span className="lg:w-1/3 lg:flex flex-col justify-start lg:mt-0 mt-8">
                  <p className="text-[#fffff9] text-2xl">Company</p>
                  <ul className="mt-4">
                  <li className="text-[#fffff9] hover:text-[#A2D95E] font-raleway">
                      <a href="/">Home</a>
                    </li>
                    <li className="text-[#fffff9] hover:text-[#A2D95E] font-raleway">
                      <a href="/about-us">About us</a>
                    </li>
                    <li className="text-[#fffff9] hover:text-[#A2D95E] font-raleway">
                      <a href="http://www.salesagent.dowellstore.org/">Sales Agent</a>
                    </li>
                  </ul>
                </span>

                <span className="lg:w-1/3 lg:flex flex-col justify-start lg:mt-0 mt-8">
                  <p className="text-[#fffff9] text-2xl">Support</p>
                  <ul className="mt-4">
                  <li className="text-[#fffff9] hover:text-[#A2D95E] font-raleway">
                      <a href="/faq">FAQ</a>
                    </li>
                    <li className="text-[#fffff9] hover:text-[#A2D95E] font-raleway">
                      <a href="/contact">Contact us</a>
                    </li>
                    <li className="text-[#fffff9] hover:text-[#A2D95E] font-raleway">
                      <a href="/job">Jobs</a>
                    </li>
                  </ul>
                </span>

               
              </div>
            </div>
          </div>
          <div className="text-white lg:flex items-center justify-between text-center text-xs mb-8">
            <p>Copyright © 2023 UxLiving Lab, All rights reserved.</p>
            <ul className="flex items-center gap-2 justify-center">
              <li className=" hover:text-[#61ce70] text-white">
              <a href="/terms-and-conditions">Term of services</a>
              </li>
               |
               <li className=" hover:text-[#61ce70] text-white">
              <a href="/privacy-policy">Privacy policy</a></li>

            </ul>
          </div>
          
        </div>
      </footer>
    </>
  );
}
