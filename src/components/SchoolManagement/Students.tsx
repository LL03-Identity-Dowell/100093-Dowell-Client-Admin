import { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";
import {StudentInput} from "../../pages/solutionTypes"
import { isNewOwner, setAdminData } from "../../store/slice/adminData"
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getViewAccess } from "../../store/slice/viewAccess";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getstudent } from "../../store/slice/student";

interface departmentProps {
  dept_head:string,
  dept_id:number,
  dept_name:string,
  workspace_id:number,
  _id:number,
}

interface SchoolClassProps {
  class_name:string,
portfolio:string,
workspace_id:number,
_id:number
}

interface BusProps {
  bus_admin:string
  bus_num:number
  portfolio:number,
  workspace_id:number,
  _id:number,
}

const initialFormInputs: StudentInput = {
    studentName:"",
    departmentName:"",
    className:"",
    busNumber:0
  };
const Students = () => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const [schoolclass, setSchoolClass] = useState<SchoolClassProps[]>();
  const [departments, setDepartments] = useState<departmentProps[]>();
  const [bus, setBus] = useState<BusProps[]>();
  const [loading, setLoading] = useState(false)
  const userData = useSelector((state: RootState) => state.userinfo);
  const dispatch = useDispatch();
  const sessionId = localStorage.getItem("sessionId");
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0].isNewOwner
  );
  const fetchIsOwnerData = async () => {
    if (localStorage.getItem("username")) {
      if (!isnewOwner) {
        const username = localStorage.getItem("username");
        const responseAdmin = await Axios93Base.post("/get_data/", {
          username: username,
          session_id: sessionId,
        });
        const response = await Axios93Base.post("/settings/", {
          username: username,
        });
        dispatch(isNewOwner(username));
        dispatch(setAdminData(responseAdmin.data.data[0]));
        dispatch(getselectedorgs({ orgname: username, type: "owner" }));
        dispatch(getViewAccess(response.data.data.processes_to_portfolio));
      }
    } else {
      dispatch(isNewOwner(null));
    }
  };
  fetchIsOwnerData();
  const client_admin_id = userData.userinfo.client_admin_id;
 
  // fetch departments 
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await Axios93Base.post("/departments/", {
          owner_id: client_admin_id,
        });
        setDepartments(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchDepartment();
  }, [client_admin_id]);

  // fetch class names 
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await Axios93Base.post("/class/", {
          owner_id: client_admin_id,
        });
        setSchoolClass(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchClass();
  }, [client_admin_id]);

    // fetch Bus number 
    useEffect(() => {
      const fetchBus = async () => {
        try {
          const response = await Axios93Base.post("/bus/", {
            owner_id: client_admin_id,
          });
          setBus(response.data.data);
          console.log(response.data)
        } catch (error) {
          console.log("error =", error);
        }
      };
      fetchBus();
    }, [client_admin_id]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };
  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const handleSubmitBus = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const postTeacher = async () => {
      if (!formInputs.studentName) {
        toast.error("Student Name is required.");
        return; 
      }
      if (!formInputs.className) {
        toast.error("Select Class Name");
        return; 
      }
      if (!formInputs.departmentName) {
        toast.error("Select Department Name");
        return; 
      }
      if (!formInputs.busNumber) {
        toast.error("Select Bus Number");
        return; 
      }
     
  const client_admin_id = userData.userinfo.client_admin_id
      try {
        setLoading(true)
        const dataStudent={
          "workspace_id":client_admin_id,
          "student_name":formInputs.studentName,
          "dept_name":formInputs.departmentName,
          "class_name":formInputs.className,
          "bus_num":formInputs.busNumber
      }
      console.log(dataStudent)

        await Axios93Base.post("/student/", dataStudent);

        dispatch(
          getstudent({
            "workspace_id":client_admin_id,
            "student_name":formInputs.studentName,
            "dept_name":formInputs.departmentName,
            "class_name":formInputs.className,
            "bus_num":formInputs.busNumber
          })
        );
        setLoading(false)
        toast.success("success");
        // dispatch(getloaderstate(false));
      } catch (error) {
        toast.error("Failure")
        setLoading(false)
      }

      // fetch product
    };

    // Call the API when the component mounts
    postTeacher();

    // Make your API call here using the selectedLanguage value
    // For example:
  };
  return (
    <div className="w-full my-10 relative  lg:justify-center lg:flex">
      <ToastContainer position="top-right" />

      {/* {Object.prototype.toString.call(schoolclass)=== "[object Array]" && Object.prototype.toString.call(departments)=== "[object Array]" && Object.prototype.toString.call(bus)=== "[object Array]" ? ( */}
      {schoolclass && departments && bus ?(
          <div className="lg:w-1/2  h-full border border-[#54595F] card-shadow px-[30px] pb-4">
          <span
            className={`${
              color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col`}
          >
            <p id="portfolioForm1Text1" className="text-center">Students</p>
          </span>
         <form>

         {/* student name  */}
         <div className="mb-4">
           <div className="flex items-center gap-3">
             <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
               <span id="studentName">Student Name</span>
               <span className="text-[#ff0000] text-base">*</span>
             </label>
           
           </div>
           <div className="w-full">
             <input
               type="text"
               placeholder="Student Name"
               className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
               id="studentName"
               onChange={handleOnChange}
               value={formInputs.studentName}
             />
           </div>
         </div>

         
         {/* Class name  */}
         <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              <span id="class">Select Class </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              value={formInputs.className}
              id="className"
              name="className"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Class"
            >
              <option value="">...select...</option>
              {schoolclass?.length > 0 ?( 
              schoolclass?.map((schoolclass, index) => (
                <option key={index} value={schoolclass.class_name}>
                  {" "}
                  {schoolclass.class_name}{" "}
                </option>
              )) )
               : (
                <option>No Class exist</option>
            )
            }
            </select>
          </div>

         {/* department name  */}
         <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              <span id="portfolio">Select Department </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              value={formInputs.departmentName}
              id="departmentName"
              name="departmentName"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Department"
            >
              <option value="">...select...</option>
              {departments?.length > 0 ?( 
              departments?.map((department, index) => (
                <option key={index} value={department.dept_name}>
                  {" "}
                  {department.dept_name}{" "}
                </option>
              )) )
               : (
                <option>No Department exist</option>
            )
            }
            </select>
          </div>

        {/* Bus Number  */}
        <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              <span id="portfolio">Select Bus </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              value={formInputs.busNumber}
              id="busNumber"
              name="busNumber"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Bus"
            >
              <option value="">...select...</option>
              {bus?.length > 0 ?( 
              bus?.map((bus, index) => (
                <option key={index} value={bus.bus_num}>
                  {" "}
                  {bus.bus_num}{" "}
                </option>
              )) )
               : (
                <option>No Bus number exist</option>
            )
            }
            </select>
          </div>


         <button
          id="portfoliotext43"
          onClick={handleSubmitBus}
          className={`w-full ${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
        >
          {loading ? "Creating":"Create Student"}
        </button>
         </form>
         </div>
       ) : ( 
        <Loader /> 
      )}  
    </div>
  );
};

export default Students;
