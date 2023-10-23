import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaRegGem } from "react-icons/fa";
import { useEffect, useState } from "react";

import Products from "./otherproducts/Products";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getotherorgdata } from "../store/slice/otherorgdata";
import { RootState } from "../store/Store";
import Loader from "../pages/whiteloader";

const Otherorgtab = () => {
  const [tabIndex, setTabIndex] = useState(-1);

  const tabTitle = [
    {
      title: "Products",
      icon: <FaRegGem />,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const selectedname = useSelector(
    (state: RootState) => state.selectedorg.orgname
  );
  const selecteddata = useSelector((state: RootState) => state.selectedorg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selecteddata.type !== "owner") {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = {
            username: adminusername,
            org_name: selectedname,
          };
          const response = await axios.post(
            "https://100093.pythonanywhere.com/api/otherorg/",
            data
          );

          dispatch(getotherorgdata(response.data));
          console.log(response.data, "other org data");
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [adminusername, selectedname]);

    const color_scheme = useSelector(
			(state: RootState) => state.setting?.data?.color_scheme
		);
  return (
		<div>
			{isLoading == false ? (
				<Tabs
					className=""
					selectedTabClassName={` ${
						color_scheme == "Red"
							? "bg-[#DC4C64]"
							: color_scheme == "Green"
							? "bg-[#14A44D]"
							: "bg-[#7A7A7A]"
					} text-white`}
					selectedIndex={tabIndex}
					onSelect={(index) => setTabIndex(index)}
				>
					<TabList className="grid lg:grid-cols-3 grid-cols-1 gap-4">
						{tabTitle.map((tabs) => {
							return (
								<Tab
									key={tabs.title}
									className={`xl:w-[90%] card-shadow h-12 flex items-center px-8 text-[#7a7a7a] gap-x-10 xl:gap-x-20 border border-[#7a7a7a] rounded-lg ${
										color_scheme == "Red"
											? "hover:bg-[#DC4C64]"
											: color_scheme == "Green"
											? "hover:bg-[#14A44D]"
											: "hover:bg-[#7A7A7A]"
									} hover:text-white cursor-pointer outline-none`}
								>
									<i className=" text-xl font-black">
										{tabs.icon}
									</i>
									<p className="font-roboto text-lg">{tabs.title}</p>
								</Tab>
							);
						})}
					</TabList>
					<TabPanel>
						<Products />
					</TabPanel>
				</Tabs>
			) : (
				<Loader></Loader>
			)}
		</div>
	);
};

export default Otherorgtab;
