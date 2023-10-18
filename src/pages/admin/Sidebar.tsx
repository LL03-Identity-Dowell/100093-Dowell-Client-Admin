import { useEffect, useState } from "react";
import Accordion from "../../components/accordion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	getsidebarlastlogin,
	getsidebarworkspace,
} from "../../store/slice/sidebar";
import { RootState } from "../../store/Store";
import { toast } from "react-toastify";
import { getportfolioNotifications } from "../../store/slice/portfolioNotifications";

const Sidebar = () => {
	const adminusername = useSelector(
		(state: RootState) => state.userinfo.userinfo.username
	);
	const allProducts = useSelector(
		(state: RootState) => state.products.products
	);
	const present_org = useSelector(
		(state: RootState) => state.adminData.data[0].organisations[0].org_name
	);

	const usedispatch = useDispatch();

	// const sessionId = localStorage.getItem("sessionId");

	useEffect(() => {
		// Function to call the API

		const fetchData = async () => {
			try {
				const os = {
					username: adminusername,
				};

				const osresponse = await axios.post(
					"https://100093.pythonanywhere.com/api/get_workspaces/",
					os
				);

				usedispatch(getsidebarworkspace(osresponse.data));

				const os2 = {
					username: adminusername,
				};

				const os2response = await axios.post(
					"https://100093.pythonanywhere.com/api/get_last_login/",
					os2
				);

				usedispatch(getsidebarlastlogin(os2response.data));

				// fetch portfolio notifications
				const notificationData = {
					present_org: present_org,
				};
				const notificationResponse = await axios.post(
					"https://100093.pythonanywhere.com/api/fetch_notifications/",
					notificationData
				);
				usedispatch(getportfolioNotifications(notificationResponse.data));
			} catch (error) {
				console.error(error);
			}
		};

		// Call the API when the component mounts
		if (adminusername != "") {
			fetchData();
		}
	}, [adminusername, present_org]);

	const removeNotifications = async (product: string, key: number) => {
		const removeNotificationData = {
			username: adminusername,
			product: product,
		};
		try {
			const removeNotification = notifications.filter((_, id) => id !== key);
			usedispatch(getportfolioNotifications(removeNotification));
			await axios
				.post(
					"https://100093.pythonanywhere.com/api/dismiss_notifications/",
					removeNotificationData
				)
				.then(() => {
					toast.success("success");
				});
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error(error);
			} else {
				console.error("An unknown error occurred:", error);
			}
		}
	};

	const workspace = useSelector((state: RootState) => state.sidebar?.workspace);

	const lastlogin = useSelector(
		(state: RootState) => state.sidebar?.lastlogin[0]
	);

	const team_member = useSelector(
		(state: RootState) =>
			state.adminData.data[0].members.team_members.accept_members
	);

	const public_member = useSelector(
		(state: RootState) =>
			state.adminData.data[0].members.public_members.accept_members
	);

	const user_member = useSelector(
		(state: RootState) =>
			state.adminData.data[0].members.guest_members.accept_members
	);

	const notifications = useSelector(
		(state: RootState) => state.getportfolioNotifications?.notifications
	);
	const loadingstate = useSelector((state: RootState) => state.loaderslice);
	const [isLoading, setIsLoading] = useState(loadingstate);
	useEffect(() => {
		setIsLoading(loadingstate);
	}, [loadingstate]);
	return (
		<>
			{isLoading == false ? (
				""
			) : (
				<div className="border border-black card-shadow lg:w-1/4 px-2 py-2">
					<div className="border border-[#61CE70] pb-2 hover:bg-[#cef9d2]">
						<h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2 mb-4">
							My Profile
						</h2>
						<div className="card-shadow mx-4">
							<Accordion title="Workspaces">
								<div className="bg-[#CEF9D2] py-4 pl-8 box-border">
									<ul>
										{workspace.map((item, index) => (
											<li
												className="text-[#7a7a7a] text-lg font-medium"
												key={index}
											>
												{index + 1}.{item}
											</li>
										))}
									</ul>
								</div>
							</Accordion>
							<Accordion title="Edit My Profile">
								<div className="bg-[#CEF9D2] py-4 pl-8 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											<a
												href={`https://100097.pythonanywhere.com/?session_id=${localStorage.getItem(
													"sessionId"
												)}`}
												className="text-lg font-medium"
											>
												1.Edit to Profile
											</a>
										</li>
									</ul>
								</div>
							</Accordion>
							<Accordion title="Last Logins">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										{lastlogin.map((item, index) => (
											<li
												className="text-[#7a7a7a] text-lg font-medium break-words"
												key={index}
											>
												{index + 1}.{item}
											</li>
										))}
									</ul>
								</div>
							</Accordion>
							<Accordion title="Portfolio Notifications">
								<div className="bg-[#CEF9D2] py-4 pl-8 box-border">
									<ul>
										{notifications?.map((item, key) => (
											<li key={key} className="list-decimal">
												<p>
													{item?.username} asked for creating a portfolio under{" "}
													{item?.product}
												</p>
												<button
													className="bg-black text-white px-2 rounded-sm"
													onClick={() =>
														removeNotifications(item?.product, key)
													}
												>
													Dismiss
												</button>
											</li>
										))}
									</ul>
								</div>
							</Accordion>
						</div>
					</div>

					<div className="border border-[#61CE70] mt-8 pb-2 hover:bg-[#cef9d2]">
						<h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2 mb-4">
							Notifications
						</h2>
						<div className="card-shadow mx-4">
							<Accordion title="Team Member Chat ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
							<Accordion title="User Chat">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
							<Accordion title="Public Chat">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
							<Accordion title="UX Living Lab Chat">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
						</div>
					</div>

					<div className="border border-[#61CE70] mt-8 pb-2 hover:bg-[#cef9d2]">
						<h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2 mb-4">
							Announcements
						</h2>
						<div className="card-shadow mx-4">
							<Accordion title="To Team Member ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
							<Accordion title="To User ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
							<Accordion title="To Public ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
							<Accordion title="From UX Living Lab ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
										<li className="text-[#7a7a7a] text-lg font-medium">
											1.Organization 1
										</li>
									</ul>
								</div>
							</Accordion>
						</div>
					</div>
					<div className="border border-[#61CE70] mt-8 pb-2 hover:bg-[#cef9d2]">
						<h2 className="text-[19px] font-semibold text-[#61CE70] px-4 mt-2 mb-4">
							My Organization
						</h2>
						<div className="card-shadow mx-4">
							<Accordion title="Products ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										{allProducts
											? allProducts.map((product, index) => (
													<li className="text-[#7a7a7a] text-lg font-medium">
														{index + 1}. {product.product_name}
													</li>
											))
											: null}
									</ul>
								</div>
							</Accordion>
							<Accordion title=" Team Member ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										{team_member.map((item, index) => (
											<li
												className="text-[#7a7a7a] text-lg font-medium"
												key={index}
											>
												{index + 1}.{item.name}
											</li>
										))}
									</ul>
								</div>
							</Accordion>
							<Accordion title=" User ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										{user_member.map((item, index) => (
											<li
												className="text-[#7a7a7a] text-lg font-medium"
												key={index}
											>
												{index + 1}.{item.name}
											</li>
										))}
									</ul>
								</div>
							</Accordion>
							<Accordion title=" Public ">
								<div className="bg-[#CEF9D2] p-4 box-border">
									<ul>
										{public_member.map((item, index) => (
											<li
												className="text-[#7a7a7a] text-lg font-medium"
												key={index}
											>
												{index + 1}.{item.name}
											</li>
										))}
									</ul>
								</div>
							</Accordion>
						</div>
					</div>

					<div className="button-container flex justify-between text-center border-black border p-[2px] w-full bg-[#CEF9D2]">
						<a
							href="https://100093.pythonanywhere.com/upload"
							className="m-[5px] px-[20px] py-[10px] bg-transparent border-[red] text-[red] w-[45%] text-center leading-[15px] text-[12px] font-semibold rounded no-underline border"
						>
							Upload
						</a>
					</div>
					<div className="button-container flex justify-between text-center border-black border p-[2px] w-full bg-[#CEF9D2]">
						<a
							href={`https://ll03-identity-dowell.github.io/100096-DowellChat/#/living-lab-chat/?session_id=${localStorage.getItem(
								"sessionId"
							)}`}
							className="m-[5px] px-[20px] py-[10px] bg-transparent border-[red] text-[red] w-[45%] text-center leading-[15px] text-[12px] font-semibold rounded no-underline border"
						>
							Customer Support
						</a>
						<a
							href="#"
							className="m-[5px] px-[20px] py-[10px] bg-transparent border-[red] text-[red] w-[45%] text-center leading-[15px] text-[12px] font-semibold rounded no-underline border"
						>
							Error Reporting
						</a>
					</div>

					<div className="button-container flex justify-between text-center border-black border p-[2px] w-full bg-[#CEF9D2]">
						<a
							href="#"
							className="m-[5px] px-[20px] py-[10px] bg-transparent border-[red] text-[red] w-[45%] text-center leading-[15px] text-[12px] font-semibold rounded no-underline border"
						>
							Buy/Redeem Credits
						</a>
						<a
							href="https://chrome.google.com/webstore/detail/dowell-ux-living-lab/acnnapiadbgagcnidgnclaohnpmbpebl?utm_source=ext_app_menu"
							className="m-[5px] px-[20px] py-[10px] bg-transparent border-[red] text-[red] w-[45%] text-center leading-[15px] text-[12px] font-semibold rounded no-underline border"
						>
							Chrome Extension
						</a>
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
