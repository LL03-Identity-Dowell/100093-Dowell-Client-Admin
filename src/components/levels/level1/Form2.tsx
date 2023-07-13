import axios from "axios";
import { useState, ChangeEvent } from "react";

type Form2Props = {
  userName: string;
};

const Form2: React.FC<Form2Props> = ({ userName }) => {
  const [formInputs, setFormInputs] = useState({
    username: userName,
    level: "level1",
    item_name: "",
    item_code: "",
    item_details: "",
    item_universal_code: "",
    item_specification: "",
    item_barcode: "",
    item_image1: "",
    item_image2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormInputs({ ...formInputs, item_details: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        // http://127.0.0.1:8000/api/create_item/
        .post("https://100093.pythonanywhere.com/api/create_item/", formInputs)
        .then((res) => {
          console.log(res.data);
          setErrMsg("");
        });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error);
          setErrMsg(error.response?.data);
        } else {
          console.error("An unknown error occurred:", error);
          setErrMsg("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
  };

  // console.log(formInputs);

  return (
    <div className="lg:w-1/2 border border-[#54595F] card-shadow">
      <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
        Create Level 1 Items
      </p>
      <form className="px-[30px] mb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Item Name <span className="text-[#ff0000] text-xs">*</span>
          </label>
          <input
            type="text"
            placeholder="Item Name"
            required
            onChange={handleOnChange}
            id="item_name"
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Item Code (Unique) <span className="text-[#ff0000] text-xs">*</span>
          </label>
          <input
            type="text"
            placeholder="Item code"
            required
            onChange={handleOnChange}
            id="item_code"
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Item Specification
          </label>
          <input
            type="text"
            placeholder="Item specification"
            onChange={handleOnChange}
            id="item_specification"
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Item Universal Code
          </label>
          <input
            type="text"
            placeholder=" Item universal code"
            onChange={handleOnChange}
            id="item_universal_code"
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
          />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Items Details
          </label>
          <textarea
            rows={4}
            placeholder="Item details"
            onChange={handleOnChangeTextArea}
            id="item_details"
            className="outline-none w-full px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto resize-none"
          />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Barcode
          </label>
          <input type="file" />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Image 1
          </label>
          <input type="file" />
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Image 2
          </label>
          <input type="file" />
        </div>

        <button
          disabled={isLoading}
          className={`w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
            isLoading ? "hover:bg-[#7a7a7a] opacity-50" : ""
          }`}
        >
          Create Item
        </button>
        <p className="text-xs text-[#FF0000] text-center pt-2">{errMsg}</p>
      </form>
    </div>
  );
};

export default Form2;
