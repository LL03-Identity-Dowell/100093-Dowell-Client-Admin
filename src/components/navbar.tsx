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
        <div className="lg:flex items-center shadow-xl ring-1 ring-slate-900/5 lg:justify-around">
          <div className="lg:flex-col flex justify-center">
            <img
              src={images.admin_logo}
              alt=""
              className="w-[112.5px] h-[112.5px]"
            />
          </div>
          <h2 className="font-semibold text-black text-3xl text-center lg:pb-0 pb-8 uppercase">
            LivingLab Admin
          </h2>
        </div>
      )}
    </>
  );
};

export default Navbar;
