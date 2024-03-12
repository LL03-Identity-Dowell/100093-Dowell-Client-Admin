import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getlayerverifyid } from "../../../store/slice/layers";
import { Axios93Base } from "../../../api/axios";

export default function Idverifystatus() {
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

  const VerifiedID = useSelector(
    (state: RootState) => state.layer.idverify?.["Verified ID"] || ""
  );

  const [selectedVerifiedID, setselectedVerifiedID] = useState(VerifiedID);
  const VerifiedID_filterlist = layerlist.filter((item) => item !== VerifiedID);

  const IDnotverify = useSelector(
    (state: RootState) => state.layer.idverify?.["ID not verified"] || ""
  );

  const [selectedIDnotverify, setselectedIDnotverify] = useState(IDnotverify);
  const IDnotverify_filterlist = layerlist.filter(
    (item) => item !== IDnotverify
  );

  const pverify = useSelector(
    (state: RootState) => state.layer.idverify?.["Phone number verified"] || ""
  );

  const [selectedpverify, setselectedpverify] = useState(pverify);
  const pverify_filterlist = layerlist.filter((item) => item !== pverify);

  const pnotverify = useSelector(
    (state: RootState) =>
      state.layer.idverify?.["Phone number not verified"] || ""
  );

  const [selectedpnotverify, setselectedpnotverify] = useState(pnotverify);
  const pnotverify_filterlist = layerlist.filter((item) => item !== pnotverify);

  const everify = useSelector(
    (state: RootState) => state.layer.idverify?.["Email verified"] || ""
  );

  const [selectedeverify, setselectedeverify] = useState(everify);
  const everify_filterlist = layerlist.filter((item) => item !== everify);

  const enotverify = useSelector(
    (state: RootState) => state.layer.idverify?.["Email not verified"] || ""
  );

  const [selectedenotverify, setselectedenotverify] = useState(enotverify);
  const enotverify_filterlist = layerlist.filter((item) => item !== enotverify);

  const Others = useSelector(
    (state: RootState) =>
      state.layer.idverify?.["Others not listed above"] || ""
  );

  const [selectedOthers, setselectedOthers] = useState(Others);
  const Othersfilterlist = layerlist.filter((item) => item !== Others);

  useEffect(() => {
    setselectedVerifiedID(VerifiedID);
    setselectedIDnotverify(IDnotverify);
    setselectedpverify(pverify);
    setselectedpnotverify(pnotverify);
    setselectedeverify(everify);
    setselectedenotverify(enotverify);
    setselectedOthers(Others);
  }, [
    VerifiedID,
    IDnotverify,
    pverify,
    pnotverify,
    enotverify,
    everify,
    Others,
  ]);

  const dispatch = useDispatch();
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postData = async () => {
      const data = {
        username: defaultusername,
        category: "id_verification",
        data: {
          "Verified ID": selectedVerifiedID,
          "ID not verified": selectedIDnotverify,
          "Phone number verified": selectedpverify,
          "Phone number not verified": selectedpnotverify,
          "Email verified": selectedeverify,
          "Email not verified": selectedenotverify,
          "Others not listed above": selectedOthers,
        },
      };

      try {
        // dispatch(getloaderstate(true));

        await Axios93Base.post("/save_device_layers/", data);

        dispatch(
          getlayerverifyid({
            "Verified ID": selectedVerifiedID,
            "ID not verified": selectedIDnotverify,
            "Phone number verified": selectedpverify,
            "Phone number not verified": selectedpnotverify,
            "Email verified": selectedeverify,
            "Email not verified": selectedenotverify,
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
    postData();

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
            Verified ID
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedVerifiedID(e.target.value)}
            value={selectedVerifiedID}
          >
            <option disabled={Boolean(VerifiedID)} selected>
              …select security layer…
            </option>
            {VerifiedID && (
              <option selected value={VerifiedID}>
                {VerifiedID}
              </option>
            )}
            {VerifiedID_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            ID not verified
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedIDnotverify(e.target.value)}
            value={selectedIDnotverify}
          >
            <option disabled={Boolean(IDnotverify)} selected>
              …select security layer…
            </option>
            {IDnotverify && (
              <option selected value={IDnotverify}>
                {IDnotverify}
              </option>
            )}
            {IDnotverify_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Phone number verified
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedpverify(e.target.value)}
            value={selectedpverify}
          >
            <option disabled={Boolean(pverify)} selected>
              …select security layer…
            </option>
            {pverify && (
              <option selected value={pverify}>
                {pverify}
              </option>
            )}
            {pverify_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Phone number not verified
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedpnotverify(e.target.value)}
            value={selectedpnotverify}
          >
            <option disabled={Boolean(pnotverify)} selected>
              …select security layer…
            </option>
            {pnotverify && (
              <option selected value={pnotverify}>
                {pnotverify}
              </option>
            )}
            {pnotverify_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Email verified
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedeverify(e.target.value)}
            value={selectedeverify}
          >
            <option disabled={Boolean(everify)} selected>
              …select security layer…
            </option>
            {everify && (
              <option selected value={everify}>
                {everify}
              </option>
            )}
            {everify_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Email not verified
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedenotverify(e.target.value)}
            value={selectedenotverify}
          >
            <option disabled={Boolean(enotverify)} selected>
              …select security layer…
            </option>
            {enotverify && (
              <option selected value={enotverify}>
                {enotverify}
              </option>
            )}
            {enotverify_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Others not listed above
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedOthers(e.target.value)}
            value={selectedOthers}
          >
            <option disabled={Boolean(Others)} selected>
              …select security layer…
            </option>
            {Others && (
              <option selected value={Others}>
                {Others}
              </option>
            )}
            {Othersfilterlist.map((item, index) => (
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
          onClick={handleSubmit}
        >
          Save Verified ID Settings
        </button>
      </form>
    </>
  );
}
