import { useSelector } from "react-redux";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useEffect } from "react";
import { useState } from "react";
import { RootState } from "../../../store/Store";
import Loader from "../../../pages/whiteloader";
// import { TeamSelectIds, TeamTextIds } from "./TeamIds";
// import axios from "axios";
// import { Axios93Base } from "../../../api/axios";

const TeamMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentadmindata = useSelector((state: RootState) => state.adminData);
  const viewAccess = useSelector((state: RootState) => state.viewAccess);
  const [teamMemberAccess, setTeamMemberAccess] = useState(null);
  useEffect(() => {
    if (viewAccess !== null) {
      setTeamMemberAccess(viewAccess[1]["Member Management"]["rights"]);
    }
  }, [viewAccess]);
  useEffect(() => {
    if (currentadmindata.data[0]._id == "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [currentadmindata]);
  // const dispatch = useDispatch();
  // const defaultlang = useSelector(
  //   (state: RootState) => state.setting?.data?.default_language
  // );
  // useEffect(() => {
  //   const FetchLanguage = () => {
  //     TeamSelectIds.forEach((id: string) => {
  //       const select = document.getElementById(id) as HTMLSelectElement | null;
  //       // Accessing individual options
  //       if (select) {
  //         const options = select.options;
  //         for (let i = 0; i < options.length; i++) {
  //           const translate = async () => {
  //             try {
  //               const data = {
  //                 text: options[i].text,
  //                 target_language: defaultlang,
  //               };
  //               const response = await Axios93Base.post(`/translate/`, data);

  //               const translationData = await response.data;
  //               if (id === "settingForm2text1") {
  //                 console.log(translationData);
  //               }
  //               options[i].text =
  //                 translationData.data.translations[0].translatedText;
  //             } catch (error) {
  //               console.error("Translation error:", error);
  //               return options[i].text;
  //             }
  //           };
  //           translate();
  //         }
  //       }
  //     });
  //     TeamTextIds.forEach((id: string) => {
  //       const text = document.getElementById(id);
  //       if (text) {
  //         const translate = async () => {
  //           try {
  //             const data = {
  //               text: text.innerText,
  //               target_language: defaultlang,
  //             };
  //             const response = await axios.post(
  //               `https://100093.pythonanywhere.com/api/translate/`,
  //               data
  //             );

  //             const translationData = await response.data;
  //             text.innerText =
  //               translationData.data.translations[0].translatedText;
  //           } catch (error) {
  //             console.error("Translation error:", error);
  //             return text;
  //           }
  //         };
  //         translate();
  //       }
  //     });
  //   };
  //   if (defaultlang) {
  //     FetchLanguage();
  //   }
  // }, [defaultlang, dispatch]);
  return (
    <>
      {isLoading == false ? (
        <>
          {teamMemberAccess === "View" && (
            <span className="text-red-600 text-xl uppercase mt-10">
              you have only view access
            </span>
          )}
          <div className="lg:flex w-full  h-full mt-8">
            <Form1 />
            <Form2 />
            <Form3 />
          </div>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default TeamMember;
