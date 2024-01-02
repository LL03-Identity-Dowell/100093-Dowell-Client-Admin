import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useState, useEffect } from "react";
import axios from "axios";
import { getsetting } from "../../../store/slice/setting";
import { toast } from "react-toastify";
import { Ids, SelectIds } from "../../../Ids";
import Loader from "../../whiteloader";
import { getloaderstate } from "../../../store/slice/loaderstate";

const Settingform7 = () => {
  const defaultlang = useSelector(
    (state: RootState) => state.setting?.data?.default_language
  );
  const currentSetting = useSelector((state: RootState) => state.setting?.data);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultlang);
  const [loadingstate, setLoadingState] = useState(false);

  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  const [defaultusername, setdefaultusername] = useState(adminusername);

  useEffect(() => {
    setdefaultusername(adminusername);
  }, [adminusername]);

  const dispatch = useDispatch();

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postData = async () => {
      try {
        setIsLoading(true);
        const data = {
          username: defaultusername,
          selected_language: selectedLanguage,
        };

        await axios.post(
          "https://100093.pythonanywhere.com/api/settings/",
          data
        );

        dispatch(
          getsetting({
            isSuccess: true,
            data: {
              ...currentSetting,
              default_language: selectedLanguage,
            },
          })
        );
        toast.success("Success");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      // fetch product
    };

    // Call the API when the component mounts
    postData();

    // Make your API call here using the selectedLanguage value
    // For example:
  };

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  const languageMapping: { [key: string]: string } = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    az: "Azerbaijani",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bs: "Bosnian",
    bg: "Bulgarian",
    ca: "Catalan",
    ceb: "Cebuano",
    ny: "Chichewa",
    zh: "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    co: "Corsican",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en: "English",
    eo: "Esperanto",
    et: "Estonian",
    tl: "Filipino",
    fi: "Finnish",
    fr: "French",
    fy: "Frisian",
    gl: "Galician",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    ht: "Haitian Creole",
    ha: "Hausa",
    haw: "Hawaiian",
    he: "Hebrew",
    hi: "Hindi",
    hmn: "Hmong",
    hu: "Hungarian",
    is: "Icelandic",
    ig: "Igbo",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    jv: "Javanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    rw: "Kinyarwanda",
    ko: "Korean",
    ku: "Kurdish (Kurmanji)",
    ky: "Kyrgyz",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mn: "Mongolian",
    my: "Myanmar (Burmese)",
    ne: "Nepali",
    no: "Norwegian",
    or: "Odia (Oriya)",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    pa: "Punjabi",
    ro: "Romanian",
    ru: "Russian",
    sm: "Samoan",
    gd: "Scots Gaelic",
    sr: "Serbian",
    st: "Sesotho",
    sn: "Shona",
    sd: "Sindhi",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    es: "Spanish",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    tg: "Tajik",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    ur: "Urdu",
    ug: "Uyghur",
    uz: "Uzbek",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    zu: "Zulu",
  };
  const languages = Object.entries(languageMapping);
  useEffect(() => {
    const FetchLanguage = () => {
      SelectIds.forEach((id: string) => {
        const select = document.getElementById(id) as HTMLSelectElement | null;
        // Accessing individual options
        if (select) {
          setLoadingState(true);
          const options = select.options;
          for (let i = 0; i < options.length; i++) {
            const translate = async () => {
              try {
                const data = {
                  text: options[i].text,
                  target_language: selectedLanguage,
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
                setLoadingState(false);
              } catch (error) {
                console.error("Translation error:", error);
                setLoadingState(false);
                return options[i].text;
              }
            };
            translate();
          }
        }
      });
      Ids.forEach((id: string) => {
        const text = document.getElementById(id);
        if (text) {
          setLoadingState(true);
          const translate = async () => {
            try {
              const data = {
                text: text.innerText,
                target_language: selectedLanguage,
              };
              const response = await axios.post(
                `https://100093.pythonanywhere.com/api/translate/`,
                data
              );

              const translationData = await response.data;
              text.innerText =
                translationData.data.translations[0].translatedText;
              setLoadingState(false);
            } catch (error) {
              console.error("Translation error:", error);
              setLoadingState(false);
              return text;
            }
          };
          translate();
        }
      });
    };

    if (selectedLanguage) {
      FetchLanguage();
    }
  }, [selectedLanguage, dispatch]);
  console.log({ loadingstate });
  return (
    <div className="form-item">
      {loadingstate ? (
        <Loader></Loader>
      ) : (
        <>
          <div
            id="settingForm7text1"
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
            Set Language for owner
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
            <div className="w-full mb-3">
              <label
                id="settingForm7text2"
                htmlFor="languagesSelect"
                className="text-[18px] font-semibold text-[#7A7A7A]"
              >
                Languages
              </label>
              <select
                id="languagesSelect"
                className="w-full p-1 text-[17px] font-medium text-[#7A7A7A] border-[1px] border-[#7A7A7A] border-solid bg-[#F5F5F5] focus:outline-none rounded-md"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-label="Default select example"
              >
                {languages.map(([code, name]) => {
                  if (name === defaultlang || code === defaultlang) {
                    return (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div className="w-full mb-1">
              <button
                id="settingForm7text3"
                className={`w-full ${
                  color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                    ? "bg-[#14A44D]"
                    : "bg-[#7A7A7A]"
                }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md ${
                  isLoading ? "opacity-50" : null
                }`}
                onClick={handleSubmit}
              >
                {isLoading ? "saving..." : "Set as default Language for me"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Settingform7;
