import Layout from "../../components/layout";

import AdminTabs from "../../components/tabs";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Otherorgtab from "../../components/otherorgtab";
import Loader from "../whiteloader";

const ClientAdmin = () => {
	const selectedOrg = useSelector((state: RootState) => state.selectedorg);
	const loadingstate = useSelector((state: RootState) => state.loaderslice);
	const overlaysidebarstate = useSelector(
		(state: RootState) => state.overlaysidebar
	);
	console.log(loadingstate);
	return (
		<>
			<div className="relative">
				<Layout>
					<main>
						<div className="container mx-auto mb-20 lg:px-0 px-4">
							<Header />

							<section className="mt-4 flex lg:flex-row flex-col-reverse gap-8 justify-end">
								
								{loadingstate === true ? (
									<div className="lg:w-[90%] ">
										{selectedOrg.type === "owner" ? (
											<AdminTabs />
										) : (
											<Otherorgtab />
										)}
									</div>
								) : (
									<Loader></Loader>
								)}
							</section>
						</div>
					</main>
        </Layout>
        <div className={`absolute transition  duration-500 ease-in-out top-0 left-0  w-full  bg-black bg-opacity-50 ${
          overlaysidebarstate ? 'translate-x-0' : '-translate-x-full'
        }`}>
						<Sidebar />
					</div>
				
			</div>
		</>
	);
};

export default ClientAdmin;
