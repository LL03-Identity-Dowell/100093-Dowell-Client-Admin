import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getlayerlogintype } from "../../../store/slice/layers";
import axios from "axios";

export default function Logintype() {
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
  const usernamep = useSelector(
    (state: RootState) => state.layer.login_type?.["User Name & Password"] || ""
  );

  const [selectedusernamep, setselectedusernamep] = useState(usernamep);
  const usernamep_filterlist = layerlist.filter((item) => item !== usernamep);

  const bid = useSelector(
    (state: RootState) => state.layer.login_type?.["Biometric ID"] || ""
  );

  const [selectedbid, setselectedbid] = useState(bid);
  const bid_filterlist = layerlist.filter((item) => item !== bid);

  const voiid = useSelector(
    (state: RootState) => state.layer.login_type?.["Voice ID"] || ""
  );

  const [selectedvoiid, setselectedvoiid] = useState(voiid);
  const voiid_filterlist = layerlist.filter((item) => item !== voiid);

  const VideoID = useSelector(
    (state: RootState) => state.layer.login_type?.["Video ID"] || ""
  );

  const [selectedVideoID, setselectedVideoID] = useState(VideoID);
  const VideoID_filterlist = layerlist.filter((item) => item !== VideoID);

  const FaceID = useSelector(
    (state: RootState) => state.layer.login_type?.["Face ID"] || ""
  );

  const [selectedFaceID, setselectedFaceID] = useState(FaceID);
  const FaceID_filterlist = layerlist.filter((item) => item !== FaceID);

  const Others = useSelector(
    (state: RootState) =>
      state.layer.login_type?.["Others not listed above"] || ""
  );

  const [selectedOthers, setselectedOthers] = useState(Others);
  const Others_filterlist = layerlist.filter((item) => item !== Others);

  useEffect(() => {
    setselectedFaceID(FaceID);
    setselectedOthers(Others);
    setselectedVideoID(VideoID);
    setselectedbid(bid);
    setselectedusernamep(usernamep);
    setselectedvoiid(voiid);
  }, [usernamep, VideoID, voiid, FaceID, bid, Others]);

  const dispatch = useDispatch();
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postData = async () => {
      const data = {
        username: defaultusername,
        category: "login_type",
        data: {
          "User Name & Password": selectedusernamep,
          "Face ID": selectedFaceID,
          "Voice ID": selectedvoiid,
          "Biometric ID": selectedbid,
          "Video ID": selectedVideoID,
          "Others not listed above": selectedOthers,
        },
      };

      try {
        // dispatch(getloaderstate(true));

        await axios.post(
          "https://100093.pythonanywhere.com/api/save_device_layers/",
          data
        );

        dispatch(
          getlayerlogintype({
            "User Name & Password": selectedusernamep,
            "Face ID": selectedFaceID,
            "Voice ID": selectedvoiid,
            "Biometric ID": selectedbid,
            "Video ID": selectedVideoID,
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
            User Name & Password
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedusernamep(e.target.value)}
            value={selectedusernamep}
          >
            <option disabled={Boolean(usernamep)} selected>
              …select security layer…
            </option>
            {usernamep && (
              <option selected value={usernamep}>
                {usernamep}
              </option>
            )}
            {usernamep_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Face ID
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedFaceID(e.target.value)}
            value={selectedFaceID}
          >
            <option disabled={Boolean(FaceID)} selected>
              …select security layer…
            </option>
            {FaceID && (
              <option selected value={FaceID}>
                {FaceID}
              </option>
            )}
            {FaceID_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Voice ID
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedvoiid(e.target.value)}
            value={selectedvoiid}
          >
            <option disabled={Boolean(voiid)} selected>
              …select security layer…
            </option>
            {voiid && (
              <option selected value={voiid}>
                {voiid}
              </option>
            )}
            {voiid_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Biometric ID
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedbid(e.target.value)}
            value={selectedbid}
          >
            <option disabled={Boolean(bid)} selected>
              …select security layer…
            </option>
            {bid && (
              <option selected value={bid}>
                {bid}
              </option>
            )}
            {bid_filterlist.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Video ID
          </label>
          <select
            className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            onChange={(e) => setselectedVideoID(e.target.value)}
            value={selectedVideoID}
          >
            <option disabled={Boolean(VideoID)} selected>
              …select security layer…
            </option>
            {VideoID && (
              <option selected value={VideoID}>
                {VideoID}
              </option>
            )}
            {VideoID_filterlist.map((item, index) => (
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
          onClick={handleSubmit}
        >
          Save Login type Settings
        </button>
      </form>
    </>
  );
}
