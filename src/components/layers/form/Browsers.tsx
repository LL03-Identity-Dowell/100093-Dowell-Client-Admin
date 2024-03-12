import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { getlayerbrowsers } from "../../../store/slice/layers";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Axios93Base } from "../../../api/axios";

export default function Browsers() {
  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  const [defaultusername, setdefaultusername] = useState(adminusername);

  useEffect(() => {
    setdefaultusername(adminusername);
  }, [adminusername]);

  const layerlist = [
    "layer1",
    "layer2",
    "layer3",
    "layer4",
    "layer5",
    "layer6",
  ];
  const Chrome = useSelector(
    (state: RootState) => state.layer.browsers?.["Chrome"] || ""
  );

  const [selectedChrome, setselectedChrome] = useState(Chrome);
  const Chrome_filterlist = layerlist.filter((item) => item !== Chrome);

  const Firefox = useSelector(
    (state: RootState) => state.layer.browsers?.["Firefox"] || ""
  );

  const [selectedFirefox, setselectedFirefox] = useState(Firefox);
  const Firefox_filterlist = layerlist.filter((item) => item !== Firefox);

  const Bing = useSelector(
    (state: RootState) => state.layer.browsers?.["Bing"] || ""
  );

  const [selectedBing, setselectedBing] = useState(Bing);
  const Bing_filterlist = layerlist.filter((item) => item !== Bing);

  const Safari = useSelector(
    (state: RootState) => state.layer.browsers?.["Safari"]
  );

  const [selectedSafari, setselectedSafari] = useState(Safari);
  const Safari_filterlist = layerlist.filter((item) => item !== Safari);

  const Edge = useSelector(
    (state: RootState) => state.layer.browsers?.["Edge"]
  );

  const [selectedEdge, setselectedEdge] = useState(Edge);
  const Edge_filterlist = layerlist.filter((item) => item !== Edge);

  const Opera = useSelector(
    (state: RootState) => state.layer.browsers?.["Opera"]
  );

  const [selectedOpera, setselectedOpera] = useState(Opera);
  const Opera_filterlist = layerlist.filter((item) => item !== Opera);

  const Others = useSelector(
    (state: RootState) => state.layer.browsers?.["Others not listed above"]
  );

  const [selectedOthers, setselectedOthers] = useState(Others);
  const Others_filterlist = layerlist.filter((item) => item !== Others);

  useEffect(() => {
    setselectedBing(Bing);
    setselectedChrome(Chrome);
    setselectedEdge(Edge);
    setselectedFirefox(Firefox);
    setselectedOpera(Opera);
    setselectedSafari(Safari);
    setselectedOthers(Others);
  }, [Safari, Chrome, Firefox, Bing, Edge, Opera, Others]);

  const dispatch = useDispatch();
  const handleSubmitbrowser = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postbrowser = async () => {
      try {
        // dispatch(getloaderstate(true));
        const databrowser = {
          username: defaultusername,
          category: "browsers",
          data: {
            Chrome: selectedChrome,
            Safari: selectedSafari,
            Bing: selectedBing,
            Firefox: selectedFirefox,
            Edge: selectedEdge,
            Opera: selectedOpera,
            "Others not listed above": selectedOthers,
          },
        };

        await Axios93Base.post("/save_device_layers/", databrowser);

        dispatch(
          getlayerbrowsers({
            Chrome: selectedChrome,
            Safari: selectedSafari,
            Bing: selectedBing,
            Firefox: selectedFirefox,
            Edge: selectedEdge,
            Opera: selectedOpera,
            "Others not listed above": selectedOthers,
          })
        );
        toast.success("success");
        // dispatch(getloaderstate(false));
      } catch (error) {
        console.error(error);
      }

      // fetch product
    };

    // Call the API when the component mounts
    postbrowser();

    // Make your API call here using the selectedLanguage value
    // For example:
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <>
      <ToastContainer position="top-right" />
      <form className="px-[30px] mb-8">
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Chrome
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedChrome(e.target.value)}
          >
            <option disabled={Boolean(Chrome)} selected>
              …select security layer…
            </option>
            {Chrome && (
              <option selected value={Chrome}>
                {Chrome}
              </option>
            )}
            {Chrome_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Safari
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedSafari(e.target.value)}
          >
            <option disabled={Boolean(Safari)} selected>
              …select security layer…
            </option>
            {Safari && (
              <option selected value={Safari}>
                {Safari}
              </option>
            )}
            {Safari_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Bing
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedBing(e.target.value)}
          >
            <option disabled={Boolean(Bing)} selected>
              …select security layer…
            </option>
            {Bing && (
              <option selected value={Bing}>
                {Bing}
              </option>
            )}
            {Bing_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Firefox
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedFirefox(e.target.value)}
          >
            <option disabled={Boolean(Firefox)} selected>
              …select security layer…
            </option>
            {Firefox && (
              <option selected value={Firefox}>
                {Firefox}
              </option>
            )}
            {Firefox_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Edge
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedEdge(e.target.value)}
          >
            <option disabled={Boolean(Edge)} selected>
              …select security layer…
            </option>
            {Edge && (
              <option selected value={Edge}>
                {Edge}
              </option>
            )}
            {Edge_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Opera
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedOpera(e.target.value)}
          >
            <option disabled={Boolean(Opera)} selected>
              …select security layer…
            </option>
            {Opera && (
              <option selected value={Opera}>
                {Opera}
              </option>
            )}
            {Opera_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#756464] text-lg font-roboto font-bold ">
            Others not listed above
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedOthers(e.target.value)}
          >
            <option disabled={Boolean(Others)} selected>
              …select security layer…
            </option>
            {Others && (
              <option selected value={Others}>
                {Others}
              </option>
            )}
            {Others_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`w-full ${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
          onClick={handleSubmitbrowser}
        >
          Save Browser Settings
        </button>
      </form>
    </>
  );
}
