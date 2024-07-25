import  {useState, useEffect, ChangeEvent} from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { Axios93Base } from '../api/axios';
import { CategoryName } from '../pages/solutionTypes';
import { toast } from "react-toastify";
import Loader from '../pages/whiteloader';

const initialPublicFormInputs: CategoryName = {
  category: "",
};

const category = () => {
const [category, setCategory] = useState([])
const [loading, setLoading] = useState(false)
const [workspaceID, setWorkSpaceID] = useState("")
const [formInputs, setFormInputs] = useState(initialPublicFormInputs);
const [categoryLoader, setCategoryLoader] = useState(false)
const color_scheme = useSelector(
  (state: RootState) => state.setting?.data?.color_scheme
);
const sessionId = localStorage.getItem("sessionId");
const userName = useSelector(
  (state: RootState) => state.userinfo.userinfo.username
);

// function for onchnage input event 
const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
};

// function to get workspace id 
useEffect(() => {
  const fetchuserData = async () => {
    try {
      const response = await Axios93Base.post("/get_data/", {
        session_id: sessionId,
        username: userName,
      });
      setWorkSpaceID(response.data.data[0]._id)
    } catch (error) {
      console.error("Error getting user data:", error);
      // Handle the error
    } finally {
      // setLoading(false);
    }
  };

  fetchuserData()
}, []);

useEffect(() => {
  if (workspaceID) {
    handleGetCategory();
  }
}, [workspaceID]);
console.log(category)
  return (
    <>
        
       <div className="flex flex-col mb-[2rem]">
       {categoryLoader?<div>{category?(
             <table className="w-full sm:w-auto md:w-full lg:w-auto xl:w-full mt-[2rem] mb-[2rem] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                     <th  className="px-6 py-3">Serial No.</th>
                     <th  className="px-6 py-3 rounded-s-lg">Link</th>
                     <th  className="px-6 py-3 rounded-e-lg">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                 {category.map((cat, index) => (
                     
                       <tr key={1} className="bg-white dark:bg-gray-800">
                         <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index}</td>
                         <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{cat}</td>
                         
                       </tr>
                 ))}
                 </tbody>

               </table>
       )

       : <div className="p-4 mb-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span className="font-medium">Alert!</span> You have not generated any category yet
          </div>}</div>:<Loader/>}
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
      <form onSubmit={handleAddCategory}>
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
              id="category"
              onChange={handleOnChange}
              value={formInputs.category}
            />
          </div>
        </div>

        <button
        type='submit'
        id="portfoliotext43"
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