import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { FormInputs, Option, PublicResponse } from "./types";
import { setAdminData } from "../../store/slice/adminData";

const initialFormInputs: FormInputs = {
  username: "",
  member_type: "",
  member: [],
  product: "",
  data_type: "",
  op_rights: "",
  role: "",
  portfolio_name: "",
  portfolio_code: "",
  portfolio_status: "",
  portfolio_spec: "",
  portfolio_u_code: "",
  portfolio_det: "",
};

const Form1 = () => {
  const [formInputs, setFormInputs] = useState(initialFormInputs);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rangeInput, setRangeInput] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [shouldContinue, setShouldContinue] = useState(false);
  const [publicData, setPublicData] = useState<PublicResponse[]>([]);
  const [link, setLink] = useState("");
  const [imagelink, setimageLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const portfolioLength = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio?.length
  );
  const productData = useSelector((state: RootState) => state.products);

  let userName = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0]?.isNewOwner
  );
  const userName2 = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );
  if (isnewOwner) {
    userName = userName2;
  }
  const getMembers = useSelector(
    (state: RootState) => state.adminData.data[0]?.members
  );

  const rolesdata = useSelector(
    (state: RootState) => state.adminData.data[0]?.roles
  );

  const filterUserMember = getMembers?.guest_members?.accept_members.filter(
    (item) => item
  );
  const filterTeamMember = getMembers?.team_members?.accept_members.filter(
    (item) => item
  );
  const sessionId = localStorage.getItem("sessionId");

  const query: Option[] = getAllMemberOptions().map((option) => ({
    value: option,
    label: option,
  }));

  const handleSearchInputChange = (query: unknown) => {
    if (query) {
      const selectedOptions = (query as Option[]).map((option) => option.value);
      const selected: HTMLSelectElement | null = document.getElementById(
        "portfolioForm1Select2"
      ) as HTMLSelectElement;
      Array.from(selected.options).forEach((option) => {
        if (selectedOptions.includes(option.textContent || "")) {
          option.selected = true;
        }
      });
      setSelectedItems([...selectedOptions]);
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        session_id: sessionId,
      };

      try {
        const response = await axios.post(
          "https://100093.pythonanywhere.com/api/public_user/",
          data
        );
        response.data[0].id != undefined ? setPublicData(response.data) : "";
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [sessionId]);

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormInputs({ ...formInputs, portfolio_det: e.target.value });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleSelectAll = () => {
    let allOptions: string[] = [];
    if (formInputs.member_type === "user") {
      allOptions = filterUserMember?.map((member) => member.name) || [];
    } else if (formInputs.member_type === "team_member") {
      allOptions =
        filterTeamMember?.map((member) =>
          member.name === "owner" ? userName : member?.name
        ) || [];
    } else if (formInputs.member_type === "public") {
      allOptions = publicData?.map((member) => member?.id) || [];
    } else if (formInputs.member_type === "owner") {
      allOptions = [userName];
    }
    const selected: HTMLSelectElement | null = document.getElementById(
      "portfolioForm1Select2"
    ) as HTMLSelectElement;
    Array.from(selected.options).forEach((option) => {
      if (allOptions.includes(option.textContent || "")) {
        option.selected = true;
      }
    });
    setSelectedItems(allOptions);
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      handleSelectAll();
    } else {
      setSelectedItems([]);
    }
  };

  function getAllMemberOptions() {
    if (formInputs.member_type === "user") {
      return filterUserMember?.map((member) => member.name) || [];
    } else if (formInputs.member_type === "team_member") {
      return (
        filterTeamMember?.map((member) =>
          member.name === "owner" ? userName : member?.name
        ) || []
      );
    } else if (formInputs.member_type === "public") {
      return publicData?.map((member) => member?.id) || [];
    } else if (formInputs.member_type === "owner") {
      return [userName];
    }
    return [];
  }

  const handleSelectRange = (start: number, end: number) => {
    const allOptions = getAllMemberOptions();
    const selectedRange = allOptions.slice(start - 1, end);
    setSelectedItems(selectedRange);
  };

  const handleRangeInput = () => {
    const [startStr, endStr] = rangeInput.split("-").map((str) => str.trim());
    const start = parseInt(startStr);
    const end = parseInt(endStr);

    if (!isNaN(start) && !isNaN(end)) {
      handleSelectRange(start, end);
    }
  };

  const dispatch = useDispatch();
  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selected: HTMLSelectElement | null = document.getElementById(
      "portfolioForm1Select2"
    ) as HTMLSelectElement;
    const selectedOptions: string[] = [];
    Array.from(selected.selectedOptions).forEach((option) => {
      selectedOptions.push(option.value);
    });
    if (!shouldContinue) {
      if (selectedOptions.length > 500) {
        setShowModal(true);
        return;
      }
    }
    const data = {
      username: userName,
      member_type: formInputs.member_type,
      member: JSON.stringify(selectedOptions),
      product: formInputs.product,
      data_type: formInputs.data_type,
      op_rights: formInputs.op_rights,
      role: formInputs.role,
      portfolio_name: formInputs.portfolio_name,
      portfolio_code: formInputs.portfolio_code,
      portfolio_spec: formInputs.portfolio_spec,
      portfolio_u_code: formInputs.portfolio_u_code,
      portfolio_det: formInputs.portfolio_det,
    };
    try {
      setIsLoading(true);
      await axios
        .post("https://100093.pythonanywhere.com/api/create_portfolio/", data)
        .then(async (res) => {
          if (data.member_type === "public") {
            setLink(res.data.masterlink);
          }
          if (res.data.success) {
            toast.success(res.data.success);
            res.data.qrcode != undefined ? setimageLink(res.data.qrcode) : "";
            if (data.member_type === "public" && res.data.success) {
              const usedLink = await axios.post(
                "https://100093.pythonanywhere.com/api/remove_used_public/",
                {
                  public: JSON.parse(data.member),
                  username: data.username,
                }
              );
              setPublicData(
                publicData?.filter(
                  (member) => !JSON.parse(data.member).includes(member?.id)
                )
              );
              console.log("usedLInk", usedLink);
            }
            // if (isnewOwner) {
            //   return;
            // } else {
            //   window.location.reload();
            // }
          } else {
            toast.error(res.data.resp);
          }

          setFormInputs({
            username: "",
            member_type: "",
            member: [],
            product: "",
            data_type: "",
            op_rights: "",
            role: "",
            portfolio_name: "",
            portfolio_code: "",
            portfolio_status: "",
            portfolio_spec: "",
            portfolio_u_code: "",
            portfolio_det: "",
          });
          console.log(formInputs);
        });
      const responseAdmin = await axios.post(
        "https://100093.pythonanywhere.com/api/get_data/",
        { username: userName }
      );
      dispatch(setAdminData(responseAdmin.data.data[0]));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        toast.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRangeInput();
    }
  };

  const handleCopyToClipBoard = () => {
    console.log(link);
    if (!link) {
      toast.error("Unable to copy link");
    } else {
      const linkRegex = /(https?:\/\/\S+)/;
      const extractedLink = link.match(linkRegex);
      if (extractedLink) {
        navigator.clipboard
          .writeText(extractedLink[0])
          .then(() => {
            setIsCopied(true);
            toast.success("Copied");
          })
          .catch((error) => console.error("Error copying link", error));
      }
    }
  };

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const handleDownloadClick = async () => {
    try {
      const response = await fetch(imagelink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "QRCode.png"; // Set the desired filename for the downloaded image
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  return (
    <>
      <ToastContainer position="top-right" />

      <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow px-[30px] pb-4">
        <span
          className={`${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
        >
          <p id="portfolioForm1Text1">PORTFOLIO</p>
          <p>{`<${portfolioLength}>`}</p>
        </span>
        <div className="my-20">
          <p
            id="portfolioForm1Text2"
            className="text-[#FF0000] text-lg font-roboto font-semibold"
          >
            Assign Portfolio – Products, Data types, Operational Rights and
            Roles to Members
          </p>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold flex items-end gap-1">
              <span id="portfolioForm1Text3">Select Member Type </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              onChange={handleSelectStatus}
              id="portfolioForm1Select1"
              name="member_type"
              value={formInputs.member_type}
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              required
            >
              <option value="">...select...</option>
              <option value="owner">Owner </option>
              <option value="team_member"> Team Member </option>
              <option value="user">User </option>
              <option value="public"> Public</option>
            </select>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                <span id="portfolioForm1Text4">Select Member </span>
                <span className="text-[#ff0000] text-base">*</span>
              </label>
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold flex items-center gap-2">
                <span id="portfolioForm1Text5"> Select All</span>
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={
                    selectedItems.length > 0 &&
                    selectedItems.length === getAllMemberOptions().length
                  }
                />
              </label>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="separate numbers with '-'e.g 1-10"
                onChange={(e) => setRangeInput(e.target.value)}
                className="w-full outline-none border border-black mb-[10px] p-2 rounded-[4px]"
                onBlur={handleRangeInput}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div className="mb-4 flex items-center justify-between border border-black rounded-[4px] p-2 gap-2">
              <span id="portfolioForm1Text6" className="font-roboto text-base">
                Select with username: (Total members:{" "}
                {getAllMemberOptions().length})
              </span>
              <Select
                classNames={{
                  control: () => "border border-none shadow-none rounded-md",
                }}
                className="w-full outline-none shadow-none"
                isMulti
                options={query}
                placeholder="Search..."
                onChange={handleSearchInputChange}
              />
            </div>
            <select
              required
              multiple
              name="portfolioForm1Select2"
              id="portfolioForm1Select2"
              className="outline-none w-full h-40 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              {getAllMemberOptions().map((option, key) => (
                <option
                  key={key}
                  className={
                    selectedItems.includes(option)
                      ? "bg-[#007BFF] text-white"
                      : ""
                  }
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
              <span id="portfolioForm1Text7">Select Product </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              value={formInputs.product}
              id="portfolioForm1Select3"
              name="product"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              placeholder="Select Product"
            >
              <option value="">...select...</option>
              {productData?.products?.map((product) => (
                <option key={product._id} value={product.product_name}>
                  {" "}
                  {product.product_name}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text8">Select Data Type </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              onChange={handleSelectStatus}
              name="data_type"
              value={formInputs.data_type}
              id="portfolioForm1Select4"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              required
            >
              <option value="">...select...</option>
              <option value="real_data">Real Data</option>
              <option value="learning_data">Learning Data</option>
              <option value="testing_data">Testing Data</option>
              <option value="archived_data">Archived Data</option>{" "}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text9"> Select Operational Rights </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              onChange={handleSelectStatus}
              id="portfolioForm1Select5"
              name="op_rights"
              value={formInputs.op_rights}
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              required
            >
              <option value="">...select...</option>
              <option value="view">View</option>
              <option value="add/edit">Add/Edit</option>
              <option value="delete">Delete</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text10"> Select Roles</span>{" "}
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <select
              required
              onChange={handleSelectStatus}
              name="role"
              value={formInputs.role}
              id="portfolioForm1Select6"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              <option value="">...select...</option>
              {rolesdata?.map((roles, key) =>
                roles.status === "enable" ? (
                  <option key={key} value={roles.role_code}>
                    {roles.role_name}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text11">Portfolio Name </span>
              <span className="text-xs text-[#FF0000]">
                {" "}
                <span id="portfolioForm1Text12">
                  {" "}
                  (Don't use & symbol in portfolio name){" "}
                </span>
                <span className="text-[#ff0000] text-base">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Portfolio name"
              required
              value={formInputs.portfolio_name}
              onChange={handleOnChange}
              id="portfolio_name"
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text13">Portfolio Code (Unique) </span>
              <span className="text-[#ff0000] text-base">*</span>
            </label>
            <input
              type="text"
              placeholder="Portfolio code"
              required
              onChange={handleOnChange}
              id="portfolio_code"
              value={formInputs.portfolio_code}
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text14">Portfolio Specification </span>
            </label>
            <input
              type="text"
              placeholder="Portfolio specification"
              onChange={handleOnChange}
              id="portfolio_spec"
              value={formInputs.portfolio_spec}
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text15"> Portfolio Universal Code </span>
            </label>
            <input
              type="text"
              placeholder="Portfolio universal code"
              onChange={handleOnChange}
              id="portfolio_u_code"
              value={formInputs.portfolio_u_code}
              className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              <span id="portfolioForm1Text16"> Portfolio Details </span>
            </label>
            <textarea
              rows={4}
              placeholder="Portfolio details"
              onChange={handleOnChangeTextArea}
              value={formInputs.portfolio_det}
              id="portfolio_det"
              className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
            />
          </div>
          <button
            id="portfolioForm1Text17"
            disabled={isLoading}
            className={`w-full h-12  ${
              isLoading == true
                ? "bg-[#b8b8b8]"
                : color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            } mb-8 hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
          >
            {isLoading ? "Creating..." : "Create Portfolio"}
          </button>
        </form>

        {link != "" ? (
          <button
            id="portfolioForm1Text18"
            className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto"
            onClick={handleCopyToClipBoard}
          >
            {isCopied ? "Copied" : "Copy master link"}
          </button>
        ) : (
          ""
        )}

        {imagelink != "" ? (
          <>
            <div className=" p-4 flex flex-col items-center justify-center bg-[#f1f3f5] ">
              <div className="mb-4">
                <img src={imagelink} className="w-[280px]" alt="" />
                <p id="portfoliotext42" className="text-center mt-1">
                  QR code for link
                </p>
              </div>
              <button
                id="portfoliotext43"
                onClick={handleDownloadClick}
                // disabled={teamMemberAccess === "View"}
                className={`w-full ${
                  color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                    ? "bg-[#14A44D]"
                    : "bg-[#7A7A7A]"
                }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
              >
                Download Master link QR code
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {showModal && (
        <div className="fixed bg-[#00000099] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="h-40 w-96 bg-white rounded-md p-5 flex flex-col items-center justify-between">
            <p className="text-xl text-center">
              Are you sure you need more than "500" public portfolio now?
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#FF0000] text-white py-1 px-4 rounded-md"
              >
                NO
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShouldContinue(true);
                }}
                className="bg-[#2c9b2c] text-white py-1 px-4 rounded-md"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form1;
