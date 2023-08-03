import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Form3 = () => {
  const level2Items = useSelector(
    (state: RootState) =>
      state.adminData.data[0]?.organisations[0]?.level5?.items
  );
  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [status, setStatus] = useState("");
  const [statusErrMsg, setStatusErrMsg] = useState("");
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = event.target.value;
    setSelectedItem(selectedItemName);
  };

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const selectedItemData = level2Items.find(
    (item) => item.item_code === selectedItem
  );

  const handleSubmitStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingStatus(true);

    const data = {
      username: userName,
      item_level: "level2",
      item_code: selectedItem,
      item_status: status.toLowerCase(),
    };
    console.log(data);

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/update_item_status/", data)
        .then((res) => {
          console.log(res.data);
          setStatusErrMsg("");
          toast.success(res.data.success);
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setStatusErrMsg(error.response?.data.error);
      } else {
        console.error("An unknown error occurred:", error);
        setStatusErrMsg("An unknown error occurred");
      }
    } finally {
      setIsLoadingStatus(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="lg:w-1/2 border border-[#54595F] card-shadow">
        <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
          Items created in Level 2
        </p>
        <div className="px-[30px] mb-8">
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Enabled Items
            </label>
            <select
              onChange={handleSelectChange}
              value={selectedItem}
              id="enable_item"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              <option> ...Select... </option>
              {level2Items.map((item, index) =>
                item.status === "enable" ? (
                  <option key={index} value={item.item_code}>
                    {item.item_name}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Disabled Items
            </label>
            <select
              onChange={handleSelectChange}
              id="disable_item"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            >
              <option> ...Select... </option>
              {level2Items.map((item, index) =>
                item.status === "disable" ? (
                  <option key={index}>{item.item_name}</option>
                ) : null
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
              Details of selected Item
            </label>
            <textarea
              rows={4}
              placeholder=""
              readOnly
              value={JSON.stringify(selectedItemData, null, 1)?.slice(1, -1)}
              className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
            />
          </div>

          <form onSubmit={handleSubmitStatus}>
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Enable / Disable selected Item
              </label>
              <select
                onChange={handleSelectStatus}
                id="status"
                className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
              >
                <option> ...Select... </option>
                <option> Enable </option>
                <option> Disable </option>
              </select>
            </div>

            <button
              className={`w-full h-10 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white text-[14px] font-roboto ${
                isLoadingStatus ? "hover:bg-[#7a7a7a] opacity-50" : ""
              }`}
            >
              Enable / Disable selected Item
            </button>
            {statusErrMsg && (
              <p className="text-xs text-[#FF0000] text-center pt-2">
                {statusErrMsg}
              </p>
            )}
          </form>

          <button className="w-full h-10 mt-20 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white text-[14px] font-roboto">
            Duplicate selected Item to create new
          </button>
        </div>
      </div>
    </>
  );
};

export default Form3;
