
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/Store';
import { useState } from 'react';

export default function Language() {
    
  const color_scheme = useSelector(
		(state: RootState) => state.setting?.data?.color_scheme
	);
  const alllang = useSelector(
		(state: RootState) => state.language
	);

    const [currentPage, setCurrentPage] = useState(1);
		const itemsPerPage = 10;

		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = alllang.slice(indexOfFirstItem, indexOfLastItem);

		const totalPages = Math.ceil(alllang.length/ itemsPerPage);

		const handlePageChange = (page: number) => {
			setCurrentPage(page);
		};
  return (
		<>
			<p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
				Language
			</p>
			<form className="px-6 w-full">
				<ol className="list-decimal">
					{currentItems.map(
						(city , index) => {
							return (
								<div key={index}>
									<li className="flex flex-wrap items-center gap-x-3 py-2">
										<input type="checkbox" /> <label>{city.language} - Layer</label>
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
						}
					)}
				</ol>
				<div className="flex gap-2 justify-center flex-wrap w-[80%] my-5">
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
				<button
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
			</form>
		</>
	);
}
