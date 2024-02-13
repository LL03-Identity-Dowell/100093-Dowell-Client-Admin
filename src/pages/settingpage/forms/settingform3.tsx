import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import axios from "axios";
import { useEffect, useState } from "react";

const Settingform3 = () => {
  const mandatory_sections = useSelector(
    (state: RootState) => state.setting?.data?.mandatory_sections
  );
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const adminusername = useSelector(
    (state: RootState) => state.userinfo?.userinfo?.username
  );
  const sessionId = localStorage.getItem("sessionId");

  const [sections, setSections] = useState({});
  const [sectionIndex, setSectionIndex] = useState<any>("");
  useEffect(() => {
    const handleSections = async () => {
      let content: any = undefined;
      const postData = async () => {
        try {
          const data = {
            username: adminusername,
            session_id: sessionId,
          };
          const response = await axios.post(
            "https://100097.pythonanywhere.com/get_user_sections",
            data
          );
          if (content === undefined) content = response.data.data;
        } catch (error) {
          console.error(error);
        }
      };
      await postData();
      setSections(content);
    };
    handleSections();
  }, [adminusername, sessionId]);
  console.log(Object.entries(sections));
  return (
    <div className="form-item">
      <div
        id="settingForm3text1"
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
        <div className="w-full mb-3 relative">
          <label
            id="settingForm3text2"
            htmlFor=""
            className="text-[18px] font-semibold text-[#7A7A7A]"
          >
            Section Profiles
          </label>
          <select
            id="settingForm3Select1"
            className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
            aria-label="Default select example"
            multiple
          >
            {sections &&
              Object.entries(sections).map((key, index) => (
                <option
                  key={index}
                  value={key[0]}
                  onMouseEnter={() => setSectionIndex(key[1])}
                  onMouseLeave={() => setSectionIndex("")}
                  className="hover:bg-slate-300"
                >
                  {key[0]}
                </option>
              ))}
          </select>
          {sectionIndex && (
            <div className="absolute flex flex-col gap-3 bg-white rounded-lg p-4 border border-[#33a753] left-32 top-1">
              {Object.entries(sectionIndex).map((item, itemIndex) => (
                <div key={itemIndex} className="flex place-items-center gap-3">
                  {item[0]}:{" "}
                  <span>
                    {item[1] === true
                      ? "true"
                      : item[1] === false
                      ? "false"
                      : (item[1] as any)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full mb-1">
          <button
            id="settingForm3text3"
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
