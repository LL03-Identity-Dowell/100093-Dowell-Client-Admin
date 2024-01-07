import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../pages/whiteloader";
import axios from "axios";
import { PublicSelectIds, PublicTextIds } from "./PublicIds";

function Public() {
  const [isLoading, setIsLoading] = useState(false);
  const currentadmindata = useSelector((state: RootState) => state.adminData);

  useEffect(() => {
    if (currentadmindata.data[0]._id == "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [currentadmindata]);

  const viewAccess = useSelector((state: RootState) => state.viewAccess);
  const [publicAccess, setPublicAccess] = useState(null);
  useEffect(() => {
    if (viewAccess !== null) {
      setPublicAccess(viewAccess[2]["Portfolio Management"]["rights"]);
    }
  }, [viewAccess]);
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const dispatch = useDispatch();
  const defaultlang = useSelector(
    (state: RootState) => state.setting?.data?.default_language
  );
  useEffect(() => {
    const FetchLanguage = () => {
      PublicSelectIds.forEach((id: string) => {
        const select = document.getElementById(id) as HTMLSelectElement | null;
        // Accessing individual options
        if (select) {
          const options = select.options;
          for (let i = 0; i < options.length; i++) {
            const translate = async () => {
              try {
                const data = {
                  text: options[i].text,
                  target_language: defaultlang,
                };
                const response = await axios.post(
                  `https://100093.pythonanywhere.com/api/translate/`,
                  data
                );

                const translationData = await response.data;
                if (id === "settingForm2text1") {
                  console.log(translationData);
                }
                options[i].text =
                  translationData.data.translations[0].translatedText;
              } catch (error) {
                console.error("Translation error:", error);
                return options[i].text;
              }
            };
            translate();
          }
        }
      });
      PublicTextIds.forEach((id: string) => {
        const text = document.getElementById(id);
        if (text) {
          const translate = async () => {
            try {
              const data = {
                text: text.innerText,
                target_language: defaultlang,
              };
              const response = await axios.post(
                `https://100093.pythonanywhere.com/api/translate/`,
                data
              );

              const translationData = await response.data;
              text.innerText =
                translationData.data.translations[0].translatedText;
            } catch (error) {
              console.error("Translation error:", error);
              return text;
            }
          };
          translate();
        }
      });
    };
    if (defaultlang) {
      FetchLanguage();
    }
  }, [defaultlang, dispatch]);
  return (
    <>
      {isLoading == false ? (
        <>
          {publicAccess === "View" && (
            <span id="publictext3" className="text-red-600 text-xl uppercase mb-10">
              you have only view access
            </span>
          )}
          <div className="lg:flex w-full  h-full mt-8">
            <Form1 />
            <Form2 />

            <div className="lg:w-1/3 border border-[#54595F] card-shadow">
              <span
                className={`${
                  color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                    ? "bg-[#14A44D]"
                    : "bg-[#7A7A7A]"
                } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
              >
                <p id="publictext1">Public</p>
                <p id="publictext2">{"<Total public links used>"}</p>
              </span>
            </div>
          </div>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}

export default Public;
