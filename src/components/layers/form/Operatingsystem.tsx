import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useEffect, useState } from "react";

import axios from "axios";
import { getlayeros } from "../../../store/slice/layers";
import { ToastContainer, toast } from "react-toastify";

export default function Operatingsystem() {
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
  const macos = useSelector((state: RootState) => state.layer.os?.["Mac OS"]);

  const [selectedmacos, setselectedmacos] = useState(macos);
  const macos_filterlist = layerlist.filter((item) => item !== macos);

  const linux = useSelector((state: RootState) => state.layer.os?.["Linux"]);

  const [selectedlinux, setselectedlinux] = useState(linux);
  const linuxfilterlist = layerlist.filter((item) => item !== linux);

  const Windows = useSelector(
    (state: RootState) => state.layer.os?.["Windows"]
  );

  const [selectedWindows, setselectedWindows] = useState(Windows);

  const Windowsfilterlist = layerlist.filter((item) => item !== Windows);

  const Android = useSelector(
    (state: RootState) => state.layer.os?.["Android"]
  );

  const [selectedAndroid, setselectedAndroid] = useState(Android);
  const Androidfilterlist = layerlist.filter((item) => item !== Android);

  const ios = useSelector((state: RootState) => state.layer.os?.["IOS"]);

  const [selectedios, setselectedios] = useState(ios);
  const iosfilterlist = layerlist.filter((item) => item !== ios);

  const Other = useSelector(
    (state: RootState) => state.layer.os?.["Others not listed above"] || ""
  );

  const [selectedOther, setselectedOther] = useState(Other);
  const Otherfilterlist = layerlist.filter((item) => item !== Other);

  useEffect(() => {
    setselectedAndroid(Android);
    setselectedOther(Other);
    setselectedWindows(Windows);
    setselectedlinux(linux);
    setselectedios(ios);
    setselectedmacos(macos);
  }, [Android, Other, macos, ios, Windows, linux]);

  const dispatch = useDispatch();
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const postData = async () => {
      const data = {
        username: defaultusername,
        category: "os",
        data: {
          "Mac OS": selectedmacos,
          Linux: selectedlinux,
          Windows: selectedWindows,
          Android: selectedAndroid,
          IOS: selectedios,
          "Others not listed above": selectedOther,
        },
      };

      try {
        // dispatch(getloaderstate(true));

        await axios.post(
          "https://100093.pythonanywhere.com/api/save_device_layers/",
          data
        );

        dispatch(
          getlayeros({
            "Mac OS": "layer1",
            Linux: "layer1",
            Windows: "layer1",
            Android: "layer1",
            IOS: "layer1",
            "Others not listed above": "layer1",
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
						Windows
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedWindows(e.target.value)}
						value={selectedWindows}
					>
						<option selected value={Windows}>
							{Windows}
						</option>
						{Windowsfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Mac OS
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedmacos(e.target.value)}
					>
						<option selected value={macos}>
							{macos}
						</option>
						{macos_filterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Linux
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedlinux(e.target.value)}
					>
						<option selected value={linux}>
							{linux}
						</option>
						{linuxfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						Android
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedAndroid(e.target.value)}
					>
						<option selected value={Android}>
							{Android}
						</option>
						{Androidfilterlist.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
						IOS
					</label>
					<select
						className="outline-none w-full h-12 px-4 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
						onChange={(e) => setselectedios(e.target.value)}
					>
						<option selected value={ios}>
							{ios}
						</option>
						{iosfilterlist.map((item, index) => (
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
						onChange={(e) => setselectedOther(e.target.value)}
					>
						<option selected value={Other}>
							{Other}
						</option>
						{Otherfilterlist.map((item, index) => (
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
					Save OS Settings
				</button>
			</form>
		</>
	);
}
