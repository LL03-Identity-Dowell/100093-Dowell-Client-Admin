import  {useState} from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";

const category = () => {
const [category, setCategory] = useState("")
const [loading, setLoading] = useState(false)

const color_scheme = useSelector(
  (state: RootState) => state.setting?.data?.color_scheme
);
console.log(setCategory, setLoading)
  return (
    <>
        
       <div className="flex flex-col mb-[2rem]">
       {category? 
             <table className="w-full sm:w-auto md:w-full lg:w-auto xl:w-full mt-[2rem] mb-[2rem] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                     <th  className="px-6 py-3">Serial No.</th>
                     <th  className="px-6 py-3 rounded-s-lg">Link</th>
                     <th  className="px-6 py-3 rounded-e-lg">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                     
                       <tr key={1} className="bg-white dark:bg-gray-800">
                         <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{1}</td>
                         <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">hellos</td>
                         <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                           <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Copy link</button>
                         </td>
                       </tr>
                     
                 </tbody>

               </table>


       : <div className="p-4 mb-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span className="font-medium">Alert!</span> You have not generated any category yet
          </div>}
      {/* form */}
      
            <div className="lg:w-1/2 mt-5 h-full border border-[#54595F] ms-auto me-auto card-shadow px-[30px] pb-4">
            <span
              className={`${
                color_scheme == "Red"
                  ? "bg-[#DC4C64]"
                  : color_scheme == "Green"
                  ? "bg-[#14A44D]"
                  : "bg-[#7A7A7A]"
              } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col`}
            >
              <p id="portfolioForm1Text1" className="text-center">Create Category</p>
            </span>
      <form>
        {/* category name  */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="busNumber">Category name</span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
          
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Category name"
              className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
              id="busNumber"
              // onChange={handleOnChange}
              // value={formInputs.busNumber}
            />
          </div>
        </div>

        <button
        id="portfoliotext43"
        // onClick={handleSubmitBus}
        className={`w-full ${
          color_scheme == "Red"
            ? "bg-[#DC4C64]"
            : color_scheme == "Green"
            ? "bg-[#14A44D]"
            : "bg-[#7A7A7A]"
        }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
        >
        {loading ? "Creating":"Create Category"}
        </button>
        </form>
        </div>
        {/* form end  */}

       </div>
    </>
  )
}

export default category