import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ChangeEvent, useEffect, useState } from "react";
import { getlangData } from "../../../store/slice/languagedata";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Language() {
	// Select theme and language form redux
	const color_scheme = useSelector(
		(state: RootState) => state.setting?.data?.color_scheme
	);
	const alllang = useSelector((state: RootState) => state.language);
// pagination 
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = alllang.slice(indexOfFirstItem, indexOfLastItem);

	const totalPages = Math.ceil(alllang.length / itemsPerPage);
//change pagination
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};



const usedispatch = useDispatch()

		const languagedata = useSelector((state: RootState) => state.langdata);
	const [countryCode, setCountryCode] = useState<string | null>(null);


	const initializeSelectedLayers = (
		data: any
	): { [key: string]: { [key: string]: string } } => {
		const initialSelectedLayers: { [key: string]: { [key: string]: string } } =
			{};

		data.forEach((country: any) => {
			// const cityLayers: { [key: string]: number } = {};
			// country.cities.forEach((city: any) => {
			// 	cityLayers[city.city] = city.layer;
			// });
			initialSelectedLayers[country.language] = {
			
				layer: country.layer,
			};
		});

		return initialSelectedLayers;
	};

	const [selectedLayers, setSelectedLayers] = useState<{
		[key: string]: { [key: string]: string };
	}>(() => initializeSelectedLayers(languagedata.langdata));

	useEffect(() => {
		setSelectedLayers(initializeSelectedLayers(languagedata.langdata));
	}, [languagedata.langdata]);
	const handlelangData = async (
		event: ChangeEvent<HTMLInputElement>,
		selectedCountry: string,
		id: string
	) => {
		if (event.target.checked) {
			usedispatch(getlangData({ language: selectedCountry, layer: id }));
		} else {
			setCountryCode("");
		}
	};





	const handlelangDataSubmit = async () => {
		console.log(languagedata);
		const submit = await axios.post(
			"https://100093.pythonanywhere.com/api/languages/",
			languagedata
		);
		if (submit?.data?.message) {
			toast.success(submit.data.message);
		}
	};


	const handlelanguageCheck = async (
		event: ChangeEvent<HTMLInputElement>,
		code: string
	) => {
		if (event.target.checked) {
			setCountryCode(code);
			
			
		} else {
			if (code === countryCode) setCountryCode(null);
		}
	};

	return (
		<>
			<ToastContainer position="top-right" />
			<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
				Language
			</p>
			<div className="px-6 w-full">
				<div className="flex flex-col gap-3">
					{currentItems.map((country, index) => {
						const selectedLayer = selectedLayers[country.language] || null;
						console.log(selectedLayer);
						return (
							<div>
								<div
									key={index}
									className="flex flex-wrap items-center gap-x-3"
								>
									{index + 1}
									<input
										type="checkbox"
										checked={countryCode == country.language}
										onChange={(e) => handlelanguageCheck(e, country.language)}
									/>{" "}
									<label>{country.language} - Layer</label>
									{["1", "2", "3", "4", "5", "6"].map((id) => {
										return (
											<div key={id}>
												<input
													checked={selectedLayer?.layer == id}
													type="radio"
													className="px-4"
													name={`${country.language}-layer`}
													onChange={(e) =>
														handlelangData(e, country.language, id)
													}
												/>
												<label className="whitespace-normal">{id}</label>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
					<div className="flex gap-2 justify-center w-[80%] my-5 flex-wrap">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => {
							return (
								<button
									onClick={() => handlePageChange(item)}
									className={`px-4 text-base border rounded-sm ${
										item === currentPage && "bg-green-600 text-white"
									}`}
									disabled={currentPage === item}
								>
									{item}
								</button>
							);
						})}
					</div>
				</div>

				{/* <li className="flex ">
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
                </li> */}
				<button
					onClick={handlelangDataSubmit}
					className={`w-full ${
						color_scheme == "Red"
							? "bg-[#DC4C64]"
							: color_scheme == "Green"
							? "bg-[#14A44D]"
							: "bg-[#7A7A7A]"
					}  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
				>
					Save Language Settings
				</button>
			</div>
		</>
	);
}
