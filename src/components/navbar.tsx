import { useDispatch, useSelector } from "react-redux";
import images from "./images";
import { RootState } from "../store/Store";
import { useState } from "react";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { getoverlaysidebar } from "../store/slice/overlaysidebar";

const Navbar = () => {
  const loader = useSelector((state: RootState) => state.loaderslice);
  const [isLoading, setIsLoading] = useState(loader);
  useEffect(() => {
    setIsLoading(loader);
  }, [loader]);
  const dispatch = useDispatch()
  const handleiconClick = () => {
    dispatch(getoverlaysidebar(true));
  }
  return (
		<>
			{isLoading == false ? (
				""
			) : (
				<div className="lg:flex-row flex flex-col items-center sm:justify-center card-shadow border border-b-[#7a7a7a] px-4 pt-4 lg:pt-0 ">
					<FaBars onClick={handleiconClick} className="text-[25px]"></FaBars>
					<h2 className="w-full lg:w-[60%] font-semibold text-center text-black text-3xl lg:m-0 mt-4 uppercase lg:text-right">
						Living Lab Admin
					</h2>
					<div className="w-[35%] flex lg:justify-end justify-center">
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
