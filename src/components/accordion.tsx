import  { useState, ReactNode } from "react";
import { BiCaretRight, BiCaretUp } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";

interface AccordionProps {
	title: string;
	
	children: ReactNode;
}
export default function Accordion({ title, children }: AccordionProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen((prevState) => !prevState);
	};
	const color_scheme = useSelector(
			(state: RootState) => state.setting?.data?.color_scheme
		);
	return (
		<>
			<div>
				<button
					className={` ${color_scheme == "Red"
							? "bg-[#DC4C64]"
							: color_scheme == "Green"
								? "bg-[#14A44D]"
								: "bg-[#7A7A7A]"
						} p-4 mb-[1px] flex items-center justify-between w-full focus:outline-none`}
					onClick={toggleAccordion}
				>
					<div className="flex items-center">
						{isOpen ? (
							<BiCaretUp className="text-[#61CE71] text-[20px] mr-2" />
						) : (
							<BiCaretRight className="text-white text-[20px] mr-2" />
						)}
						<div
							className={
								isOpen
									? "text-[#61CE71] font-semibold"
									: "text-white font-semibold"
							}
						>
							{title}
						</div>
					</div>
					<div></div>
				</button>
				{isOpen && <div >{children}</div>}
			</div>
		</>
	);
}
