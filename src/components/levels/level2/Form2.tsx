import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { ToastContainer, toast } from "react-toastify";
import { getAdminData, setItemData } from "../../../store/slice/adminData";
import { Axios93Base } from "../../../api/axios";

const Form2 = () => {
  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );

  const currentadmindata = useSelector((state: RootState) => state.adminData);
  const [formInputs, setFormInputs] = useState({
    username: userName,
    level: "level2",
    item_name: "",
    item_code: "",
    item_details: "",
    item_unicode: "",
    item_spec: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [_errMsg, setErrMsg] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({ ...formInputs, [e.target.id]: e.target.value });
  };

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormInputs({ ...formInputs, item_details: e.target.value });
  };
  const isnewOwner = useSelector(
    (state: RootState) => state.adminData.data[0]?.isNewOwner
  );
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isnewOwner) {
      setIsLoading(true);
    }
    await Axios93Base.post("/create_item/", formInputs)
      .then((res) => {
        // console.log(res.data);
        if (res.status === 201) {
          setErrMsg("");
          toast.success(res.data);
          const newdata = {
            item_name: formInputs.item_name,
            item_code: formInputs.item_code,
            item_details: formInputs.item_details,
            item_unicode: formInputs.item_unicode,
            item_spec: formInputs.item_spec,
            status: "enable",
          };
          if (isnewOwner) {
            console.log("dispatched");
            dispatch(
              setItemData({
                data: [
                  ...currentadmindata.data[0].organisations[1].level2.items,
                  newdata,
                ],
                type: "level2",
              })
              // getAdminData({
              //   ...currentadmindata,
              //   data: [
              //     {
              //       ...currentadmindata.data[0],
              //       organisations: [
              //         {
              //           ...currentadmindata.data[0].organisations[1],
              //           level2: {
              //             ...currentadmindata.data[0].organisations[1].level2,
              //             items: [
              //               ...currentadmindata.data[0].organisations[1].level2
              //                 .items,
              //               newdata,
              //             ],
              //           },
              //         },
              //       ],
              //     },
              //   ],
              // })
            );
          } else {
            console.log("not dispatched");
            dispatch(
              getAdminData({
                ...currentadmindata,
                data: [
                  {
                    ...currentadmindata.data[0],
                    organisations: [
                      {
                        ...currentadmindata.data[0].organisations[0],
                        level2: {
                          ...currentadmindata.data[0].organisations[0].level2,
                          items: [
                            ...currentadmindata.data[0].organisations[0].level2
                              .items,
                            newdata,
                          ],
                        },
                      },
                    ],
                  },
                ],
              })
            );
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response?.data);
          } else if (error.response.status === 404) {
            toast.error(error.response?.data);
          } else if (error.response.status === 500) {
            toast.error(error.response?.data);
          }
        } else {
          console.log("Error", error.message);
          toast.error("An unexpected error occurred");
        }
      });
    if (!isnewOwner) {
      setIsLoading(false);
    }
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <>
      <ToastContainer position="top-right" />

      <div className="lg:w-1/2 border border-[#54595F] card-shadow">
        <p
          id="level2_subheading_4"
          className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col "
        >
          Create Level 2 Items
        </p>
        <form className="px-[30px] mb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              id="level2_subheading_5"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Item Name <span className="text-[#ff0000] text-xs">*</span>
            </label>
            <input
              type="text"
              placeholder="Item Name"
              required
              onChange={handleOnChange}
              id="item_name"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="level2_subheading_6"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Item Code (Unique){" "}
              <span className="text-[#ff0000] text-xs">*</span>
            </label>
            <input
              type="text"
              placeholder="Item code"
              required
              onChange={handleOnChange}
              id="item_code"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="level2_subheading_7"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Item Specification
            </label>
            <input
              type="text"
              placeholder="Item specification"
              onChange={handleOnChange}
              id="item_spec"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="level2_subheading_8"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Item Universal Code
            </label>
            <input
              type="text"
              placeholder=" Item universal code"
              onChange={handleOnChange}
              id="item_unicode"
              className="outline-none w-full h-10 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            />
          </div>
          <div className="mb-4">
            <label
              id="level2_subheading_9"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
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
            <label
              id="level2_subheading_10"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Barcode
            </label>
            <input type="file" />
          </div>
          <div className="mb-4">
            <label
              id="level2_subheading_11"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Image 1
            </label>
            <input type="file" />
          </div>
          <div className="mb-4">
            <label
              id="level2_subheading_12"
              className="text-[#7A7A7A] text-lg font-roboto font-bold "
            >
              Image 2
            </label>
            <input type="file" />
          </div>

          <button
            id="level2_subheading_13"
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
            {isLoading ? "Creating.." : "Create Item"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form2;
