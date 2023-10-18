import Layout from "../../components/layout";

import Settingform1 from "./forms/Settingform1";

import Settingform2 from "./forms/settingform2";
import Settingform3 from "./forms/settingform3";
import Settingform4 from "./forms/settingform4";
import Settingform5 from "./forms/settingform5";
import Settingform6 from "./forms/settingform6";
import Settingform7 from "./forms/settingform7";
import Settingform8 from "./forms/settingform8";
import Settingform9 from "./forms/settingform9";
import Settingform10 from "./forms/settingform10";
import Settingform11 from "./forms/settingform11";



import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
import { RootState } from "../../store/Store";
import { useSelector } from "react-redux";
import Loader from "../whiteloader";



const ClientAdmin = () => {
   const loadingstate = useSelector((state: RootState) => state.loaderslice);
		console.log(loadingstate);

  return (
		<>
			<Layout>
				<main className="container mx-auto mb-20 lg:px-0 px-4">
					<Header></Header>

					<section className="mt-4 flex lg:flex-row flex-col-reverse gap-4">
						<Sidebar></Sidebar>
						{loadingstate == false ? (
							<Loader></Loader>
						) : (
							<div className="lg:w-3/4">
								<div className="py-[40px] px-[30px] w-full lg:flex gap-8">
									<div className="lg:w-1/2">
										<Settingform1></Settingform1>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>

										<Settingform2></Settingform2>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>

										<Settingform3></Settingform3>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>

										<Settingform4></Settingform4>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>

										<Settingform5></Settingform5>
									</div>
									<div className="lg:w-1/2">
										<Settingform6></Settingform6>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>
										<Settingform7></Settingform7>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>
										<Settingform8></Settingform8>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>
										<Settingform9></Settingform9>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>
										<Settingform10></Settingform10>
										<div className="w-100 bg-[red] h-[2px] my-8"></div>
										<Settingform11></Settingform11>
									</div>
								</div>
							</div>
						)}
					</section>
				</main>
			</Layout>
		</>
	);
};

export default ClientAdmin;
