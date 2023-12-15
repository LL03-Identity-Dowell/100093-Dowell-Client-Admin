import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState, ChangeEvent, FormEvent, MouseEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { getAdminData } from "../../store/slice/adminData";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../pages/whiteloader";

const Roles = () => {
  const [isLoading, setIsLoading] = useState(false);
  let adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0]?.isNewOwner
  );
  if (isnewOwner) {
    adminusername = useSelector(
      (state: RootState) => state.adminData.data[0]?.Username
    );
  }
  const [defaultusername, setdefaultusername] = useState(adminusername);
  const [loading, setloading] = useState({
    createrole: false,
    enabledisable: false,
    refreshsearch: false,
  });

  useEffect(() => {
    setdefaultusername(adminusername);
  }, [adminusername]);

  const dispatch = useDispatch();

  const rolesdata = useSelector(
    (state: RootState) => state.adminData.data[0].roles
  );

  console.log({ rolesdata });
  const currentadmindata = useSelector((state: RootState) => state.adminData);

  useEffect(() => {
    if (currentadmindata.data[0]._id == "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [currentadmindata]);
  const enablerules = rolesdata.filter((r) => r.status == "enable");
  const disablerules = rolesdata.filter((r) => r.status == "disable");

  interface ruleItem {
    level1_item: string;
    level2_item: string;
    level3_item: string;
    level4_item: string;
    level5_item: string;
    security_layer: string;
    role_name: string;
    role_code: string;
    role_details: null;
    role_uni_code: null;
    role_specification: null;
    status: string;
  }
  const [selectedrule, setselectedrule] = useState<ruleItem>({
    level1_item: "",
    level2_item: "",
    level3_item: "",
    level4_item: "",
    level5_item: "",
    security_layer: "",
    role_name: "",
    role_code: "",
    role_details: null,
    role_uni_code: null,
    role_specification: null,
    status: "",
  });
  const [selectedrulestatus, setselectedrulestatus] = useState("..select");

  const formatObject = (obj: Record<string, any>) => {
    let result = "";
    Object.entries(obj).forEach(([key, value]) => {
      result += `'${key}': '${value}'\n`;
    });
    return result;
  };

  const [rulestatus, setrulestatus] = useState({
    enablestatus: "..select",
    disablestatus: "..select",
  });
  const handledisablerule = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setrulestatus({
      enablestatus: "..select",
      disablestatus: event.target.value,
    });

    const matchrule = disablerules.find(
      (item) => item.role_name === event.target.value
    );
    setselectedrule({
      level1_item: matchrule?.level1_item || "",
      level2_item: matchrule?.level2_item || "",
      level3_item: matchrule?.level3_item || "",
      level4_item: matchrule?.level4_item || "",
      level5_item: matchrule?.level5_item || "",
      security_layer: matchrule?.security_layer || "",
      role_name: matchrule?.role_name || "",
      role_code: matchrule?.role_code || "",
      role_details: matchrule?.role_details || null,
      role_uni_code: matchrule?.role_uni_code || null,
      role_specification: matchrule?.role_specification || null,
      status: matchrule?.status || "",
    });
  };

  const handleenablerule = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setrulestatus({
      enablestatus: event.target.value,
      disablestatus: "..select",
    });
    const matchrule = enablerules.find(
      (item) => item.role_name === event.target.value
    );
    setselectedrule({
      level1_item: matchrule?.level1_item || "",
      level2_item: matchrule?.level2_item || "",
      level3_item: matchrule?.level3_item || "",
      level4_item: matchrule?.level4_item || "",
      level5_item: matchrule?.level5_item || "",
      security_layer: matchrule?.security_layer || "",
      role_name: matchrule?.role_name || "",
      role_code: matchrule?.role_code || "",
      role_details: matchrule?.role_details || null,
      role_uni_code: matchrule?.role_uni_code || null,
      role_specification: matchrule?.role_specification || null,
      status: matchrule?.status || "",
    });
  };

  const [formData, setFormData] = useState({
    username: defaultusername,
    level1_item: "",
    level2_item: "",
    level3_item: "",
    level4_item: "",
    level5_item: "",
    security_layer: "Layer 01",
    role_name: "",
    role_code: "",
    role_spec: "",
    roleucode: "",
    role_det: "",
    status: "enable",
  });
function isAxiosError(error: unknown): error is AxiosError {
	return (error as AxiosError).isAxiosError !== undefined;
}

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading({
      ...loading,
      createrole: true,
    });
    try {
      const response = await axios.post(
        "https://100093.pythonanywhere.com/api/create_role/",
        formData
      );
      if (response.status === 201) {
        console.log(response);

        const statedata = {
          level1_item: formData.level1_item,
          level2_item: formData.level2_item,
          level3_item: formData.level3_item,
          level4_item: formData.level4_item,
          level5_item: formData.level5_item,
          security_layer: formData.security_layer,
          role_name: formData.role_name,
          role_code: formData.role_code,
          role_details: formData.role_det,
          role_uni_code: formData.roleucode,
          role_specification: formData.role_spec,
          status: formData.status,
        };
        const updatedAdminData = {
          ...currentadmindata,
          data: [
            {
              ...currentadmindata.data[0],
              roles: [...currentadmindata.data[0].roles, statedata],
            },
          ],
        };
        dispatch(getAdminData(updatedAdminData));
        toast.success(response.data);
        // Handle the response as needed
        // Reset the form
        setFormData({
          username: defaultusername,
          level1_item: "",
          level2_item: "",
          level3_item: "",
          level4_item: "",
          level5_item: "",
          security_layer: "Layer 01",
          role_name: "",
          role_code: "",
          role_spec: "",
          roleucode: "",
          role_det: "",
          status: "enable",
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          if (
            error.response.status === 400 ||
            error.response.status === 404 ||
            error.response.status === 500
          ) {
            toast.error(error.response.data as string);
          }
        } else {
          console.log("Error", error.message);
          toast.error("An unexpected error occurred");
        }
      }
      // Handle the error appropriately
    } finally {
      setloading({
        ...loading,
        createrole: false,
      });
    }
  };



  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeselectedrulestatus = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setselectedrulestatus(e.target.value);
  };

  const updateselectedrulestatus = async (e: MouseEvent<HTMLButtonElement>) => {
    setloading({
      ...loading,
      enabledisable: true,
    });
    e.preventDefault();
    if (selectedrulestatus == "..select") {
      toast.error(
        "Select Enable/Disable Role From Dropdown Enable / Disable Selected Role "
      );
    } else if (selectedrule.role_code == "") {
      toast.error(
        "Select  Role From Dropdown Enabled Roles or Disabled Roles "
      );
    } else {
      const rulestatusdata = {
        username: defaultusername,
        role_code: selectedrule.role_code,
        role_status: selectedrulestatus,
      };
      try {
        const response = await axios.post(
          "https://100093.pythonanywhere.com/api/update_role_status/",
          rulestatusdata
        );
        console.log(response.data);

        const updatedRoles = currentadmindata.data[0].roles.map((role) => {
          if (role.role_code === selectedrule.role_code) {
            return {
              ...role,
              status: selectedrulestatus,
            };
          }
          return role;
        });

        dispatch(
          getAdminData({
            ...currentadmindata,
            data: [
              {
                ...currentadmindata.data[0],
                roles: updatedRoles,
              },
            ],
          })
        );

        toast.success("success");
      } catch (error) {
        // console.error(error); // Handle the error appropriately
        console.error("Response Status Code:", error);
      }
    }
    setloading({
      ...loading,
      enabledisable: false,
    });
  };

  interface selectionrule {
    [key: string]: string[];
  }
  const [selectionrulestate, setselectionrulestate] = useState<selectionrule>({
    selectlevel1_item: [],
    selectlevel2_item: [],
    selectlevel3_item: [],
    selectlevel4_item: [],
    selectlevel5_item: [],
    selectsecurity_layer: [],
  });

  const clearselection = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setloading({
      ...loading,
      refreshsearch: true,
    });
    setrulestatus({
      enablestatus: "..select",
      disablestatus: "..select",
    });

    setselectionrulestate({
      selectlevel1_item: [],
      selectlevel2_item: [],
      selectlevel3_item: [],
      selectlevel4_item: [],
      selectlevel5_item: [],
      selectsecurity_layer: [],
    });

    setselectedrule({
      level1_item: "",
      level2_item: "",
      level3_item: "",
      level4_item: "",
      level5_item: "",
      security_layer: "",
      role_name: "",
      role_code: "",
      role_details: null,
      role_uni_code: null,
      role_specification: null,
      status: "",
    });
    setloading({
      ...loading,
      refreshsearch: false,
    });
  };

  const handleSelectChangelevels = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setselectionrulestate({
      ...selectionrulestate,
      [e.target.name]: selectedOptions,
    });
  };

  const [enablerulesitem, setenablerulesitem] = useState<ruleItem[]>([]);
  const [disablerulesitem, setdisablerulesitem] = useState<ruleItem[]>([]);

  useEffect(() => {
    console.log(selectionrulestate);
    const filteredData = rolesdata.filter((item) => {
      console.log(`${item.level1_item}`);
      console.log(selectionrulestate.selectlevel1_item);
      return (
        (selectionrulestate.selectlevel1_item.length == 0
          ? true
          : selectionrulestate.selectlevel1_item.includes(
            `${item.level1_item}`
          )) &&
        (selectionrulestate.selectlevel2_item.length == 0
          ? true
          : selectionrulestate.selectlevel2_item.includes(
            `${item.level2_item}`
          )) &&
        (selectionrulestate.selectlevel3_item.length == 0
          ? true
          : selectionrulestate.selectlevel3_item.includes(
            `${item.level3_item}`
          )) &&
        (selectionrulestate.selectlevel4_item.length == 0
          ? true
          : selectionrulestate.selectlevel4_item.includes(
            `${item.level4_item}`
          )) &&
        (selectionrulestate.selectlevel5_item.length == 0
          ? true
          : selectionrulestate.selectlevel5_item.includes(
            `${item.level5_item}`
          )) &&
        (selectionrulestate.selectsecurity_layer.length == 0
          ? true
          : selectionrulestate.selectsecurity_layer.includes(
            `${item.security_layer}`
          ))
      );
    });
    setenablerulesitem(filteredData.filter((r) => r.status == "enable"));
    setdisablerulesitem(filteredData.filter((r) => r.status == "disable"));
    console.log(enablerulesitem);
    console.log(disablerulesitem);
  }, [selectionrulestate, rolesdata]);

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  return (
    <>
      {isLoading == false ? (
        <div>
          <ToastContainer position="top-right" />
          <div className="mt-8 w-full lg:flex gap-8">
            <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
              <span
                className={`${color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                      ? "bg-[#14A44D]"
                      : "bg-[#7A7A7A]"
                  } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
              >
                <p>ROLE</p>
                <p>{`  <${enablerules.length}>`} </p>
              </span>
              <div className="p-[30px]  my-20">
                <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                  Create Roles – Define Roles in my Workspace
                </p>
              </div>
              <form className="px-[30px] mb-8" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 1 - Departments
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    required
                    name="level1_item"
                    onChange={handleChange}
                    value={formData.level1_item}
                  >
                    <option>..select</option>
                    {currentadmindata.data[0].organisations[0].level1.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 2 - products
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    onChange={handleChange}
                    name="level2_item"
                    value={formData.level2_item}
                  >
                    <option>..select</option>
                    {currentadmindata.data[0].organisations[0].level2.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 3 - sub departments
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    placeholder="Select Product"
                    onChange={handleChange}
                    name="level3_item"
                    value={formData.level3_item}
                  >
                    <option>..select</option>
                    {currentadmindata.data[0].organisations[0].level3.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 4 - Task
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    onChange={handleChange}
                    name="level4_item"
                    value={formData.level4_item}
                  >
                    <option>..select</option>
                    {currentadmindata.data[0].organisations[0].level4.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Item in Level 5 - sub task
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    onChange={handleChange}
                    name="level5_item"
                    value={formData.level5_item}
                  >
                    <option>..select</option>
                    {currentadmindata.data[0].organisations[0].level5.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Select Security Layer
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    required
                    onChange={handleChange}
                    name="security_layer"
                    value={formData.security_layer}
                  >
                    <option value="Layer 01">Layer 01</option>
                    <option value="Layer 02">Layer 02</option>
                    <option value="Layer 03">Layer 03</option>
                    <option value="Layer 04">Layer 04</option>
                    <option value="Layer 05">Layer 05</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Name
                    <span className="text-[#ff0000] text-base">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Role name"
                    required
                    onChange={handleChange}
                    name="role_name"
                    value={formData.role_name}
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Code (Unique){" "}
                    <span className="text-[#ff0000] text-base">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Role code"
                    required
                    name="role_code"
                    value={formData.role_code}
                    onChange={handleChange}
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Specification{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Role specification"
                    onChange={handleChange}
                    name="role_spec"
                    value={formData.role_spec}
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Universal Code{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Role universal code"
                    onChange={handleChange}
                    name="roleucode"
                    value={formData.roleucode}
                    className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Role Details{" "}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Role details"
                    onChange={handleTextareaChange}
                    name="role_det"
                    value={formData.role_det}
                    className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                  />
                </div>
                <button
                  className={`w-full h-12  ${loading.createrole == true
                      ? "bg-[#b8b8b8]"
                      : color_scheme == "Red"
                        ? "bg-[#DC4C64]"
                        : color_scheme == "Green"
                          ? "bg-[#14A44D]"
                          : "bg-[#7A7A7A]"
                    }  hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
                  type="submit"
                >
                  {loading.createrole == true ? "Creating..." : "Create Role"}
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 ">
              <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
                Roles created in my organisation
              </h2>

              <form className=" mb-8 mt-12">
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 1
                  </label>
                  <select
                    className="outline-none w-full h-100 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    multiple
                    name="selectlevel1_item"
                    onChange={handleSelectChangelevels}
                    value={selectionrulestate.selectlevel1_item}
                  >
                    {currentadmindata.data[0].organisations[0].level1.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 2
                  </label>
                  <select
                    className="outline-none w-full h-100 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    multiple
                    name="selectlevel2_item"
                    onChange={handleSelectChangelevels}
                    value={selectionrulestate.selectlevel2_item}
                  >
                    {currentadmindata.data[0].organisations[0].level2.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 3
                  </label>
                  <select
                    className="outline-none w-full h-100 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    multiple
                    name="selectlevel3_item"
                    onChange={handleSelectChangelevels}
                    value={selectionrulestate.selectlevel3_item}
                  >
                    {currentadmindata.data[0].organisations[0].level3.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 4
                  </label>
                  <select
                    className="outline-none w-full h-100 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    multiple
                    name="selectlevel4_item"
                    onChange={handleSelectChangelevels}
                    value={selectionrulestate.selectlevel4_item}
                  >
                    {currentadmindata.data[0].organisations[0].level4.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Level 5
                  </label>
                  <select
                    className="outline-none w-full h-100 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    multiple
                    name="selectlevel5_item"
                    onChange={handleSelectChangelevels}
                    value={selectionrulestate.selectlevel5_item}
                  >
                    {currentadmindata.data[0].organisations[0].level5.items.map(
                      (item, index) => (
                        <option key={index} value={item.item_name}>
                          {item.item_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Security Layer
                  </label>
                  <select
                    className="outline-none w-full h-100 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    multiple
                    name="selectsecurity_layer"
                    onChange={handleSelectChangelevels}
                    value={selectionrulestate.selectsecurity_layer}
                  >
                    <option value="Layer 01">Layer 01</option>
                    <option value="Layer 02">Layer 02</option>
                    <option value="Layer 03">Layer 03</option>
                    <option value="Layer 04">Layer 04</option>
                    <option value="Layer 05">Layer 05</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enabled Roles
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    onChange={handleenablerule}
                    name="enablestatus"
                    value={rulestatus.enablestatus}
                  >
                    <option value="..select">..select</option>
                    {enablerulesitem.map((item, index) => (
                      <option key={index} value={item.role_name}>
                        {item.role_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Disabled Roles
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    onChange={handledisablerule}
                    name="disablestatus"
                    value={rulestatus.disablestatus}
                  >
                    <option value="..select">..select</option>
                    {disablerulesitem.map((item, index) => (
                      <option key={index} value={item.role_name}>
                        {item.role_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Details of selected Role
                  </label>
                  <textarea
                    rows={4}
                    placeholder=""
                    className="outline-none w-full px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
                    value={
                      selectedrule.role_name == ""
                        ? ""
                        : `${formatObject(selectedrule)}`
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                    Enable / Disable Selected Role
                  </label>
                  <select
                    className="outline-none w-full h-12 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                    value={selectedrulestatus}
                    onChange={changeselectedrulestatus}
                  >
                    <option value="..select">...select</option>
                    <option value="enable"> Enable </option>
                    <option value="disable"> Disable </option>
                  </select>
                </div>
                <button
                  className={`w-full h-12  ${loading.enabledisable == true
                      ? "bg-[#b8b8b8]"
                      : color_scheme == "Red"
                        ? "bg-[#DC4C64]"
                        : color_scheme == "Green"
                          ? "bg-[#14A44D]"
                          : "bg-[#7A7A7A]"
                    } mb-8 hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
                  type="button"
                  onClick={updateselectedrulestatus}
                >
                  {loading.enabledisable
                    ? selectedrulestatus === "enable"
                      ? "Enabling..."
                      : "Disabling..."
                    : "Enable / Disable selected Role"}
                </button>

                <button
                  className={`w-full h-12  ${color_scheme == "Red"
                      ? "bg-[#DC4C64]"
                      : color_scheme == "Green"
                        ? "bg-[#14A44D]"
                        : "bg-[#7A7A7A]"
                    } mb-8 hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
                >
                  Duplicate selected Role to create new
                </button>
                <button
                  className={`w-full h-12  ${loading.refreshsearch == true
                      ? "bg-[#b8b8b8]"
                      : color_scheme == "Red"
                        ? "bg-[#DC4C64]"
                        : color_scheme == "Green"
                          ? "bg-[#14A44D]"
                          : "bg-[#7A7A7A]"
                    }  hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
                  type="button"
                  onClick={clearselection}
                >
                  {loading.refreshsearch ? "Refreshing..." : "Refresh Search"}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default Roles;
