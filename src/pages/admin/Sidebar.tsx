



import { useEffect } from 'react';
import Accordion from '../../components/accordion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getsidebarlastlogin, getsidebarworkspace } from '../../store/slice/sidebar';
import { RootState } from '../../store/Store';

const Sidebar = () => {
const adminusername = useSelector(
	(state: RootState) => state.userinfo.userinfo.username
);

	

	
	
	const usedispatch = useDispatch()
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


			} catch (error) {
				console.error(error);
			}
		};

		// Call the API when the component mounts
		if (adminusername != '') {
			fetchData();
		}
		
	}, [adminusername]);

	const workspace = useSelector(
		(state: RootState) => state.sidebar?.workspace
	);

	const lastlogin = useSelector(
		(state: RootState) => state.sidebar?.lastlogin[0]
	);
	return (
		<>
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
											href="http://100097.pythonanywhere.com/?session_id={{session_id}}"
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
									<li className="text-[#7a7a7a] text-lg font-medium">
										1.Organization 1
									</li>
									<li className="text-[#7a7a7a] text-lg font-medium">
										1.Organization 1
									</li>
								</ul>
							</div>
						</Accordion>
						<Accordion title=" Team Member ">
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
						<Accordion title=" User ">
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
						<Accordion title=" Public ">
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
			</div>
		</>
	);
};

export default Sidebar;
