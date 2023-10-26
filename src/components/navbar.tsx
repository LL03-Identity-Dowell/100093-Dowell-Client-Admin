import { useSelector } from "react-redux";
import images from "./images";
import { RootState } from "../store/Store";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const loader = useSelector((state: RootState) => state.loaderslice);
  const [isLoading, setIsLoading] = useState(loader);
  useEffect(() => {
    setIsLoading(loader);
  }, [loader]);
  return (
    <>
      {isLoading == false ? (
        ""
      ) : (
        <div className="flex flex-col max-sm:py-4 md:flex-row items-center card-shadow border border-b-[#7a7a7a]">
          <h2 className="md:w-[60%] font-semibold text-black text-3xl uppercase text-right">
            Living Lab Admin
          </h2>
          <div className="md:w-[35%] flex justify-end">
            <img
              src={images.admin_logo}
              alt=""
              className="w-[112.5px] h-[112.5px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
