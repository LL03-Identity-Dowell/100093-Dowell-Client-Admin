import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../pages/whiteloader";
import { PortfolioSelectIds, PortfolioTextIds } from "../../Ids";
import axios from "axios";

const Portfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentadmindata = useSelector((state: RootState) => state.adminData);
  const defaultlang = useSelector(
    (state: RootState) => state.setting?.data?.default_language
  );
  useEffect(() => {
    const FetchLanguage = () => {
      PortfolioSelectIds.forEach((id: string) => {
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
      PortfolioTextIds.forEach((id: string) => {
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
  }, [defaultlang]);

  useEffect(() => {
    if (currentadmindata.data[0]._id == "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [currentadmindata]);

  return (
    <>
      {isLoading == false ? (
        <div className="mt-8 w-full lg:flex">
          <Form1 />
          <Form2 />
        </div>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default Portfolio;
