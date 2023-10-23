import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";

const Settingform3 = () => {
  const mandatory_sections = useSelector(
    (state: RootState) => state.setting?.data?.mandatory_sections
  );
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
		<div className="form-item">
			<div
				className={`${
					color_scheme == "Red"
						? "bg-[lightcoral]"
						: color_scheme == "Green"
						? "bg-[lightgreen]"
						: "bg-[#a1a1a1] "
				} p-3 text-[18px] font-semibold text-white border-[1px] border-[#61CE70] ${
					color_scheme == "Red"
						? "border-[#DC4C64]"
						: color_scheme == "Green"
						? "border-[#14A44D]"
						: "border-[#7A7A7A]"
				} border-solid`}
			>
				Set sections of Member profile mandatory for joining my organisation
			</div>
			<form
				action=""
				className={` p-3 border-[1px] ${
					color_scheme == "Red"
						? "border-[#DC4C64]"
						: color_scheme == "Green"
						? "border-[#14A44D]"
						: "border-[#7A7A7A]"
				} border-solid`}
			>
				<div className="w-full mb-3">
					<label
						htmlFor=""
						className="text-[18px] font-semibold text-[#7A7A7A]"
					>
						Section Profiles
					</label>
					<select
						className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
						aria-label="Default select example"
						multiple
					>
						{mandatory_sections.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className="w-full mb-1">
					<button
						className={`w-full ${
							color_scheme == "Red"
								? "bg-[#DC4C64]"
								: color_scheme == "Green"
								? "bg-[#14A44D]"
								: "bg-[#7A7A7A]"
						}  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
					>
						Set as mandatory sections
					</button>
				</div>
			</form>
		</div>
	);
};

export default Settingform3;
