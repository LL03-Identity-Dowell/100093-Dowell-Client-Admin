import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import axios from "axios";
import {
  getlayerbrowsers,
  getlayercontype,
  getlayerdevices,
  getlayerlogintype,
  getlayeros,
  getlayerpasswordstrength,
  getlayerverifyid,
} from "../../store/slice/layers";

import Loader from "../../pages/whiteloader";
import Deviceform from "./form/Deviceform";
import Operatingsystem from "./form/Operatingsystem";
import Browsers from "./form/Browsers";
import Connectiontype from "./form/Connectiontype";
import Logintype from "./form/Logintype";
import Changepassword from "./form/Changepassword";
import Passwordstrenght from "./form/Passwordstrenght";
import Idverifystatus from "./form/Idverifystatus";

const Layers = () => {
  const [isLoading, setIsLoading] = useState(false);

  const adminusername = useSelector(
    (state: RootState) => state.userinfo.userinfo.username
  );

  type devices = {
    "Laptop/Desk top": string;
    "Others not listed above": string;
    "Mobile Phone": string;
    "Tablet / Ipad": string;
    [key: string]: any;
  };
  type os = {
    "Mac OS": string;
    Linux: string;
    Windows: string;
    Android: string;
    IOS: string;
    "Others not listed above": string;
    [key: string]: any;
  };
  type browser = {
    Chrome: string;
    Firefox: string;
    "Others not listed above": string;
    Edge: string;
    Safari: string;
    Bing: string;
    Opera: string;
    [key: string]: any;
  };
  type connection = {
    "Others not listed above": string;
    "Office Wifi/Secured Wifi": string;
    "Public Wifi": string;
    "Mobile Data": string;
    [key: string]: any;
  };
  type login = {
    "User Name & Password": string;
    "Biometric ID": string;
    "Voice ID": string;
    "Video ID": string;
    "Face ID": string;
    "Others not listed above": string;
    [key: string]: any;
  };
  type verification = {
    "Verified ID": string;
    "ID not verified": string;
    "Phone number verified": string;
    "Phone number not verified": string;
    "Email verified": string;
    "Email not verified": string;
    "Others not listed above": string;
    [key: string]: any;
  };
  type password_strength = {
    "Minimum 8 characters": string;
    "Minimum 16 characters": string;
    "Minimum 12 characters": string;
    "Minimum 10 characters": string;
    "Others not listed above": string;
    [key: string]: any;
  };
  const usedispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.layer.devices);
  const operating = useSelector((state: RootState) => state.layer.os);
  const browser = useSelector((state: RootState) => state.layer.browsers);
  const connectionType = useSelector(
    (state: RootState) => state.layer.con_type
  );
  const loginType = useSelector((state: RootState) => state.layer.login_type);
  const verificationType = useSelector(
    (state: RootState) => state.layer.idverify
  );
  const passwordStrengthType = useSelector(
    (state: RootState) => state.layer.password_strength
  );
  const [devicesObj, setDevicesObj] = useState<devices>(devices);
  const [operatingObj, setOperatingObj] = useState<os>(operating);
  const [browserObj, setBrowserObj] = useState<browser>(browser);
  const [loginObj, setLoginObj] = useState<login>(loginType);
  const [passwordStrengthObj, setPasswordStrengthObj] =
    useState<password_strength>(passwordStrengthType);
  const [verificationObj, setVerificationObj] =
    useState<verification>(verificationType);
  const [connectionObj, setConnectionObj] =
    useState<connection>(connectionType);
  useEffect(() => {
    setDevicesObj(devices);
    setOperatingObj(operating);
    setBrowserObj(browser);
    setConnectionObj(connectionType);
    setLoginObj(loginType);
    setPasswordStrengthObj(passwordStrengthType);
    setVerificationObj(verificationType);
  }, [
    devices,
    operating,
    browser,
    connectionType,
    loginType,
    verificationType,
    passwordStrengthType,
  ]);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [devicesKeys, setDevicesKeys] = useState<string[]>([]);
  const [operatingKeys, setOperatingKeys] = useState<string[]>([]);
  const [browserKeys, setBrowserKeys] = useState<string[]>([]);
  const [connectionKeys, setConnectionKeys] = useState<string[]>([]);
  const [loginKeys, setLoginKeys] = useState<string[]>([]);
  const [passwordStrengthKeys, setPasswordStrengthKeys] = useState<string[]>(
    []
  );
  const [verificationKeys, setVerificationKeys] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const SelectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(SelectedValues);

    const DevicesKeys = Object.keys(devicesObj).filter((key) => {
      return SelectedValues.includes(devicesObj[key]);
    });
    const OperatingKeys = Object.keys(operatingObj).filter((key) =>
      SelectedValues.includes(operatingObj[key])
    );
    const BrowserKeys = Object.keys(browserObj).filter((key) =>
      SelectedValues.includes(browserObj[key])
    );
    const connectionKeys = Object.keys(connectionObj).filter((key) =>
      SelectedValues.includes(connectionObj[key])
    );
    const loginKeys = Object.keys(loginObj).filter((key) =>
      SelectedValues.includes(loginObj[key])
    );
    const passwordStrengthKeys = Object.keys(passwordStrengthObj).filter(
      (key) => SelectedValues.includes(passwordStrengthObj[key])
    );
    const verificationKeys = Object.keys(verificationObj).filter((key) =>
      SelectedValues.includes(verificationObj[key])
    );

    setDevicesKeys(DevicesKeys);
    setOperatingKeys(OperatingKeys);
    setBrowserKeys(BrowserKeys);
    setConnectionKeys(connectionKeys);
    setLoginKeys(loginKeys);
    setVerificationKeys(verificationKeys);
    setPasswordStrengthKeys(passwordStrengthKeys);
  };

  useEffect(() => {
    // Function to call the API
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const os = {
          username: adminusername,
          category: "os",
        };

        const osresponse = await axios.post(
          "https://100093.pythonanywhere.com/api/get_layer_data/",
          os
        );

        usedispatch(getlayeros(osresponse.data));

        const devicesdata = {
          username: adminusername,
          category: "devices",
        };

        const deviceresponse = await axios.post(
          "https://100093.pythonanywhere.com/api/get_layer_data/",
          devicesdata
        );

        usedispatch(getlayerdevices(deviceresponse.data));

        const browserdata = {
          username: adminusername,
          category: "browsers",
        };

        const bresponse = await axios.post(
          "https://100093.pythonanywhere.com/api/get_layer_data/",
          browserdata
        );

        usedispatch(getlayerbrowsers(bresponse.data));

        const condata = {
          username: adminusername,
          category: "connection_type",
        };

        const conresponse = await axios.post(
          "https://100093.pythonanywhere.com/api/get_layer_data/",
          condata
        );

        usedispatch(getlayercontype(conresponse.data));

        const logdata = {
          username: adminusername,
          category: "login_type",
        };

        const logresponse = await axios.post(
          "https://100093.pythonanywhere.com/api/get_layer_data/",
          logdata
        );

        usedispatch(getlayerlogintype(logresponse.data));

        const psdata = {
          username: adminusername,
          category: "password_strength",
        };

        const psresponse = await axios.post(
          "https://100093.pythonanywhere.com/api/get_layer_data/",
          psdata
        );

        usedispatch(getlayerpasswordstrength(psresponse.data));

        const verifydata = {
          username: adminusername,
          category: "id_verification",
        };

        const verifyresponse = await axios.post(
          "https://100093.pythonanywhere.com/api/get_layer_data/",
          verifydata
        );

        usedispatch(getlayerverifyid(verifyresponse.data));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the API when the component mounts
    if (adminusername != "") {
      fetchData();
    }
  }, [adminusername]);

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <>
      {isLoading == false ? (
        <div className="mt-8 w-full lg:flex gap-8">
          <div className="lg:w-1/2 h-full border border-[#54595F] card-shadow">
            <span
              className={`${color_scheme == "Red"
                  ? "bg-[#DC4C64]"
                  : color_scheme == "Green"
                    ? "bg-[#14A44D]"
                    : "bg-[#7A7A7A]"
                } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
            >
              <p>Security Layers created in my workspace </p>
            </span>
            <div className="p-[30px]  my-12">
              <p className="text-[#FF0000] text-lg font-roboto font-semibold mb-8">
                Create Layers – Define Security Layers in my workspace
              </p>
              <p className="text-[#7A7A7A] text-lg font-roboto font-bold py-8">
                Set Layers – 1 (High), 2, 3, 4, 5, 6 (Low)
              </p>
              <p className="text-[#FF0000] text-lg font-roboto font-semibold">
                {" "}
                Devices
              </p>
            </div>
            <Deviceform></Deviceform>
            <hr />

            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              {" "}
              Operating Systems
            </p>
            <Operatingsystem></Operatingsystem>

            <hr />

            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              {" "}
              Browsers
            </p>
            <Browsers></Browsers>
            <hr />
            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              {" "}
              Internet Connection Type
            </p>
            <Connectiontype></Connectiontype>
            <hr />

            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              {" "}
              Login Type
            </p>
            <Logintype></Logintype>
            <hr />

            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              {" "}
              Change Password
            </p>
            <Changepassword></Changepassword>
            <hr />
            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              {" "}
              Password Strength
            </p>
            <Passwordstrenght></Passwordstrenght>

            <hr />

            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              {" "}
              ID Verification Status
            </p>
            <Idverifystatus></Idverifystatus>
          </div>

          <div className="lg:w-1/2 ">
            <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
              Search in Security Layers
            </h2>

            <form className=" mb-8 mt-12">
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Security Layer
                </label>
                <select
                  id="SecurityLayer"
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                  value={selectedValues}
                  onChange={handleChange}
                >
                  <option value="layer1">Layer 1</option>
                  <option value="layer2">Layer 2</option>
                  <option value="layer3">Layer 3</option>
                  <option value="layer4">Layer 4</option>
                  <option value="layer5">Layer 5</option>
                  <option value="layer6">Layer 6</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Devices
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  {devicesKeys
                    ? devicesKeys.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Operating Systems
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  {operatingKeys
                    ? operatingKeys.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Browsers
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  {browserKeys
                    ? browserKeys.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Internet Connection Type
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  {connectionKeys
                    ? connectionKeys.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Login Type
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  {loginKeys
                    ? loginKeys.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    : null}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Change Password
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  <option> At least once a Week </option>
                  <option> At least once a Month </option>
                  <option> At least once in 3 Months </option>
                  <option> At least once in 6 Months </option>
                  <option> At least once in a Year </option>
                  <option> Others </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Password Strength
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  {passwordStrengthKeys
                    ? passwordStrengthKeys.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  ID Verification Status
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  {verificationKeys
                    ? verificationKeys.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Geographic Location
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  <option>India </option>
                  <option> Kenya </option>
                  <option> Nigeria </option>
                  <option> Others </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                  Language
                </label>
                <select
                  className="outline-none w-full h-32 px-4 py-2 rounded-sm border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                  multiple
                >
                  <option>English </option>
                  <option> Chinese </option>
                  <option> Korean </option>
                  <option> Others </option>
                </select>
              </div>

              <button
                className={`w-full ${color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                      ? "bg-[#14A44D]"
                      : "bg-[#7A7A7A]"
                  }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
              >
                Refresh Search
              </button>
            </form>
            <hr className="" />
            <h2 className="text-[#7A7A7A] text-lg font-roboto font-bold my-8">
              Set Layers – 1 (High), 2, 3, 4, 5, 6 (Low)
            </h2>
            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              Geographic Location{" "}
            </p>
            <form className="px-6 w-full">
              <ol className="list-decimal">
                <li className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-3">
                    1.
                    <input type="checkbox" /> <label>India - Layer</label>
                    {["1", "2", "3", "4", "5", "6"].map((id) => {
                      return (
                        <div key={id}>
                          <input type="radio" className="px-4" />
                          <label className="whitespace-normal">{id}</label>
                        </div>
                      );
                    })}
                  </div>

                  <ol className="list-decimal pl-6">
                    {[
                      "Delhi",
                      "Mumbai",
                      "Chennai",
                      "Others not listed above",
                    ].map((city) => {
                      return (
                        <div key={city}>
                          <li className="flex flex-wrap items-center gap-x-3">
                            <input type="checkbox" />{" "}
                            <label>{city} - Layer</label>
                            {["1", "2", "3", "4", "5", "6"].map((id) => {
                              return (
                                <div key={id}>
                                  <input type="radio" />
                                  <label className="whitespace-normal">
                                    {id}
                                  </label>
                                </div>
                              );
                            })}
                          </li>
                        </div>
                      );
                    })}
                  </ol>
                </li>

                <li className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-3">
                    2.
                    <input type="checkbox" />{" "}
                    <label className="whitespace-normal">
                      Australia - Layer
                    </label>
                    {["1", "2", "3", "4", "5", "6"].map((id) => {
                      return (
                        <div key={id}>
                          <input type="radio" className="px-4" />
                          <label className="whitespace-normal">{id}</label>
                        </div>
                      );
                    })}
                  </div>

                  <ol className="list-decimal pl-6">
                    {["Brisbane", "Sydney", "Others not listed above"].map(
                      (city) => {
                        return (
                          <div key={city}>
                            <li className="flex flex-wrap items-center gap-x-3">
                              <input type="checkbox" />{" "}
                              <label>{city} - Layer</label>
                              {["1", "2", "3", "4", "5", "6"].map((id) => {
                                return (
                                  <div key={id}>
                                    <input type="radio" />
                                    <label className="whitespace-normal">
                                      {id}
                                    </label>
                                  </div>
                                );
                              })}
                            </li>
                          </div>
                        );
                      }
                    )}
                  </ol>
                </li>
                <li className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-3">
                    3.
                    <input type="checkbox" /> <label>UK - Layer</label>
                    {["1", "2", "3", "4", "5", "6"].map((id) => {
                      return (
                        <div key={id}>
                          <input type="radio" className="px-4" />
                          <label className="">{id}</label>
                        </div>
                      );
                    })}
                  </div>

                  <ol className="list-decimal pl-6">
                    {["London", "Leeds", "Others not listed above"].map(
                      (city) => {
                        return (
                          <div key={city}>
                            <li className="flex flex-wrap items-center gap-x-3">
                              <input type="checkbox" />{" "}
                              <label className="whitespace-normal">
                                {city} - Layer
                              </label>
                              {["1", "2", "3", "4", "5", "6"].map((id) => {
                                return (
                                  <div key={id}>
                                    <input type="radio" />
                                    <label className="whitespace-normal">
                                      {id}
                                    </label>
                                  </div>
                                );
                              })}
                            </li>
                          </div>
                        );
                      }
                    )}
                  </ol>
                </li>
                <li className="flex ">
                  <div className="flex flex-wrap items-center gap-x-3">
                    4.
                    <input type="checkbox" />{" "}
                    <label className="whitespace-normal">
                      Other countries not listed above - Layer
                    </label>
                    {["1", "2", "3", "4", "5", "6"].map((id) => {
                      return (
                        <div key={id}>
                          <input type="radio" className="px-4" />
                          <label className="">{id}</label>
                        </div>
                      );
                    })}
                  </div>
                </li>
              </ol>
              <button
                className={`w-full ${color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                      ? "bg-[#14A44D]"
                      : "bg-[#7A7A7A]"
                  }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
              >
                Save Geographic Settings
              </button>
            </form>
            <hr />
            <p className="text-[#FF0000] text-lg font-roboto font-semibold p-[30px] flex flex-col ">
              Language
            </p>
            <form className="px-6 w-full">
              <ol className="list-decimal">
                {[
                  "English",
                  "Chinese",
                  "Korean",
                  "Others not listed above",
                ].map((city) => {
                  return (
                    <div key={city}>
                      <li className="flex flex-wrap items-center gap-x-3 py-2">
                        <input type="checkbox" /> <label>{city} - Layer</label>
                        {["1", "2", "3", "4", "5", "6"].map((id) => {
                          return (
                            <div key={id}>
                              <input type="radio" />
                              <label className="whitespace-normal">{id}</label>
                            </div>
                          );
                        })}
                      </li>
                    </div>
                  );
                })}
              </ol>
              <button
                className={`w-full ${color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                      ? "bg-[#14A44D]"
                      : "bg-[#7A7A7A]"
                  }  hover:bg-[#61CE70] text-white  py-2 px-4 rounded-md`}
              >
                Save Language Settings
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default Layers;
