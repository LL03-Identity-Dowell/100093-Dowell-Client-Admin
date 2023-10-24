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
        <div className="lg:flex items-center shadow-xl ring-1 ring-slate-900/5">
          <h2 className="w-[60%] font-semibold text-black text-3xl lg:pb-0 pb-8 uppercase text-right">
            Living Lab Admin
          </h2>
          <div className="w-[35%] flex justify-end">
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
