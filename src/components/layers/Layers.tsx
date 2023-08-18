import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import axios from "axios";
import { getlayerbrowsers, getlayercontype, getlayerdevices, getlayerlogintype, getlayeros, getlayerpasswordstrength, getlayerverifyid } from "../../store/slice/layers";
import { getloaderstate } from "../../store/slice/loaderstate";
import Loader from "../../pages/whiteloader";
import Deviceform from "./form/Deviceform";
import Operatingsystem from "./form/Operatingsystem";
import Browsers from "./form/Browsers";
import Connectiontype from "./form/Connectiontype";
import Logintype from "./form/Logintype";
import Changepassword from "./form/Changepassword";
import Passwordstrenght from "./form/Passwordstrenght";
import Idverifystatus from "./form/Idverifystatus";

const Layers = () => {
	const show_loader = useSelector((state: RootState) => state.loaderslice);


const adminusername = useSelector(
	(state: RootState) => state.userinfo.userinfo.username
);



	const usedispatch = useDispatch();

	useEffect(() => {
		// Function to call the API

		const fetchData = async () => {
			try {
				
				const os = {
					username: adminusername,
					category: "os",
				};

				const osresponse = await axios.post(
					"https://100093.pythonanywhere.com/api/get_layer_data/",
					os
				);

				
        usedispatch(getlayeros(osresponse.data));
        
       
const devicesdata = {
	username: adminusername,
	category: "devices",
};

const deviceresponse = await axios.post(
	"https://100093.pythonanywhere.com/api/get_layer_data/",
	devicesdata
);

				usedispatch(getlayerdevices(deviceresponse.data));
				
				const browserdata = {
					"username": adminusername,
					"category": "browsers",
				};

				const bresponse = await axios.post(
					"https://100093.pythonanywhere.com/api/get_layer_data/",
					browserdata
				);

				usedispatch(getlayerbrowsers(bresponse.data));

const condata = {
	username: adminusername,
	category: "connection_type",
};

const conresponse = await axios.post(
	"https://100093.pythonanywhere.com/api/get_layer_data/",
	condata
);

				usedispatch(getlayercontype(conresponse.data));
				


const logdata = {
	username: adminusername,
	category: "login_type",
};

const logresponse = await axios.post(
	"https://100093.pythonanywhere.com/api/get_layer_data/",
	logdata
);

usedispatch(getlayerlogintype(logresponse.data));



				const psdata = {
					username: adminusername,
					category: "password_strength",
				};

				const psresponse = await axios.post(
					"https://100093.pythonanywhere.com/api/get_layer_data/",
					psdata
				);

				usedispatch(getlayerpasswordstrength(psresponse.data));

				
const verifydata = {
	username: adminusername,
	category: "id_verification",
};

const verifyresponse = await axios.post(
	"https://100093.pythonanywhere.com/api/get_layer_data/",
	verifydata
);

usedispatch(getlayerverifyid(verifyresponse.data));


				usedispatch(getloaderstate(false));
				
			} catch (error) {
				console.error(error);
			}
		};

		// Call the API when the component mounts
		if (adminusername != '') {
			fetchData();
		}
	}, [adminusername]);
	return (
		<>
			{show_loader == false ? (
				<div className="mt-8 w-full lg:flex gap-8">
					<div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
						<span className="bg-[#61ce70] font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center">
							<p>Security Layers created in my organisation</p>
						</span>
						<div className="p-[30px]  my-12">
							<p className="text-[#FF0000] text-lg font-roboto font-semibold mb-8">
								Create Layers – Define Security Layers in my organisation
							</p>
							<p className="text-[#7A7A7A] text-lg font-roboto font-bold py-8">
								Set Layers – 1 (High), 2, 3, 4, 5, 6 (Low)
							</p>
							<p className="text-[#FF0000] text-lg font-roboto font-semibold">
								{" "}
								Devices
							</p>
						</div>
						<Deviceform></Deviceform>
						<hr />

						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							{" "}
							Operating Systems
						</p>
						<Operatingsystem></Operatingsystem>

						<hr />

						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							{" "}
							Browsers
						</p>
						<Browsers></Browsers>
						<hr />
						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							{" "}
							Internet Connection Type
						</p>
						<Connectiontype></Connectiontype>
						<hr />

						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							{" "}
							Login Type
						</p>
						<Logintype></Logintype>
						<hr />

						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							{" "}
							Change Password
						</p>
						<Changepassword></Changepassword>
						<hr />
						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							{" "}
							Password Strength
						</p>
						<Passwordstrenght></Passwordstrenght>

						<hr />

						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							{" "}
							ID Verification Status
						</p>
						<Idverifystatus></Idverifystatus>
					</div>

					<div className="lg:w-1/2 ">
						<h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
							Search in Security Layers
						</h2>

						<form className=" mb-8 mt-12">
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Security Layer
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>Layer 1 </option>
									<option>Layer 2 </option>
									<option>Layer 3 </option>
									<option>Layer 4 </option>
									<option>Layer 5 </option>
									<option>Layer 6 </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Devices
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>Laptop/desktop </option>
									<option>Mobile phone </option>
									<option>Tablet/Ipad </option>
									<option>Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Operating Systems
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>Windows </option>
									<option>Mac OS </option>
									<option>Linux </option>
									<option>Android </option>
									<option>IOS </option>
									<option>Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Browsers
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>Chrome </option>
									<option>Safari </option>
									<option>Bing </option>
									<option>Firefox </option>
									<option>Edge </option>
									<option>Opera </option>
									<option>Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Internet Connection Type
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>Mobile Data </option>
									<option>Secured Wifi </option>
									<option>Public Wifi </option>
									<option>Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Login Type
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>User Name & Password </option>
									<option>Face ID </option>
									<option>Voice ID </option>
									<option>Biometric ID </option>
									<option>Video ID </option>
									<option>Others </option>
								</select>
							</div>

							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Change Password
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option> At least once a Week </option>
									<option> At least once a Month </option>
									<option> At least once in 3 Months </option>
									<option> At least once in 6 Months </option>
									<option> At least once in a Year </option>
									<option> Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Geographic Location
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option> 8 characters </option>
									<option> 10 characters </option>
									<option> 12 characters </option>
									<option> 16 characters </option>
									<option> Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									ID Verification Status
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option> Verified ID </option>
									<option> ID not verified </option>
									<option> Phone number verified </option>
									<option> Phone number not verified </option>
									<option> Email verified </option>
									<option> Email not verified </option>
									<option> Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Geographic Location
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>India </option>
									<option> Kenya </option>
									<option> Nigeria </option>
									<option> Others </option>
								</select>
							</div>
							<div className="mb-4">
								<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
									Language
								</label>
								<select
									className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
									multiple
								>
									<option>English </option>
									<option> Chinese </option>
									<option> Korean </option>
									<option> Others </option>
								</select>
							</div>

							<button className="w-full h-12 mb-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-lg text-white font-roboto">
								Refresh Search
							</button>
						</form>
						<hr className="" />
						<h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
							Set Layers – 1 (High), 2, 3, 4, 5, 6 (Low)
						</h2>
						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							Geographic Location{" "}
						</p>
						<form className="px-6 w-full">
							<ol className="list-decimal">
								<li className="flex flex-col">
									<div className="flex flex-wrap items-center gap-x-3">
										1.
										<input type="checkbox" /> <label>India - Layer</label>
										{["1", "2", "3", "4", "5", "6"].map((id) => {
											return (
												<div key={id}>
													<input type="radio" className="px-4" />
													<label className="whitespace-normal">{id}</label>
												</div>
											);
										})}
									</div>

									<ol className="list-decimal pl-6">
										{[
											"Delhi",
											"Mumbai",
											"Chennai",
											"Others not listed above",
										].map((city) => {
											return (
												<div key={city}>
													<li className="flex flex-wrap items-center gap-x-3">
														<input type="checkbox" />{" "}
														<label>{city} - Layer</label>
														{["1", "2", "3", "4", "5", "6"].map((id) => {
															return (
																<div key={id}>
																	<input type="radio" />
																	<label className="whitespace-normal">
																		{id}
																	</label>
																</div>
															);
														})}
													</li>
												</div>
											);
										})}
									</ol>
								</li>

								<li className="flex flex-col">
									<div className="flex flex-wrap items-center gap-x-3">
										2.
										<input type="checkbox" />{" "}
										<label className="whitespace-normal">
											Australia - Layer
										</label>
										{["1", "2", "3", "4", "5", "6"].map((id) => {
											return (
												<div key={id}>
													<input type="radio" className="px-4" />
													<label className="whitespace-normal">{id}</label>
												</div>
											);
										})}
									</div>

									<ol className="list-decimal pl-6">
										{["Brisbane", "Sydney", "Others not listed above"].map(
											(city) => {
												return (
													<div key={city}>
														<li className="flex flex-wrap items-center gap-x-3">
															<input type="checkbox" />{" "}
															<label>{city} - Layer</label>
															{["1", "2", "3", "4", "5", "6"].map((id) => {
																return (
																	<div key={id}>
																		<input type="radio" />
																		<label className="whitespace-normal">
																			{id}
																		</label>
																	</div>
																);
															})}
														</li>
													</div>
												);
											}
										)}
									</ol>
								</li>
								<li className="flex flex-col">
									<div className="flex flex-wrap items-center gap-x-3">
										3.
										<input type="checkbox" /> <label>UK - Layer</label>
										{["1", "2", "3", "4", "5", "6"].map((id) => {
											return (
												<div key={id}>
													<input type="radio" className="px-4" />
													<label className="">{id}</label>
												</div>
											);
										})}
									</div>

									<ol className="list-decimal pl-6">
										{["London", "Leeds", "Others not listed above"].map(
											(city) => {
												return (
													<div key={city}>
														<li className="flex flex-wrap items-center gap-x-3">
															<input type="checkbox" />{" "}
															<label className="whitespace-normal">
																{city} - Layer
															</label>
															{["1", "2", "3", "4", "5", "6"].map((id) => {
																return (
																	<div key={id}>
																		<input type="radio" />
																		<label className="whitespace-normal">
																			{id}
																		</label>
																	</div>
																);
															})}
														</li>
													</div>
												);
											}
										)}
									</ol>
								</li>
								<li className="flex ">
									<div className="flex flex-wrap items-center gap-x-3">
										4.
										<input type="checkbox" />{" "}
										<label className="whitespace-normal">
											Other countries not listed above - Layer
										</label>
										{["1", "2", "3", "4", "5", "6"].map((id) => {
											return (
												<div key={id}>
													<input type="radio" className="px-4" />
													<label className="">{id}</label>
												</div>
											);
										})}
									</div>
								</li>
							</ol>
							<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
								Save Geographic Settings
							</button>
						</form>
						<hr />
						<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
							Language
						</p>
						<form className="px-6 w-full">
							<ol className="list-decimal">
								{[
									"English",
									"Chinese",
									"Korean",
									"Others not listed above",
								].map((city) => {
									return (
										<div key={city}>
											<li className="flex flex-wrap items-center gap-x-3 py-2">
												<input type="checkbox" /> <label>{city} - Layer</label>
												{["1", "2", "3", "4", "5", "6"].map((id) => {
													return (
														<div key={id}>
															<input type="radio" />
															<label className="whitespace-normal">{id}</label>
														</div>
													);
												})}
											</li>
										</div>
									);
								})}
							</ol>
							<button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
								Save Language Settings
							</button>
						</form>
					</div>
				</div>
			) : (
				<Loader></Loader>
			)}
		</>
	);
};

export default Layers;
