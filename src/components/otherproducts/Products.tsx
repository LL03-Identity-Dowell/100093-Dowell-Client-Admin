import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../pages/whiteloader";
import ProductForm from "./ProductForm";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { RootState } from "../../store/Store";
import { Option } from "../portfolio/types";
import { isNewOwner, setAdminData } from "../../store/slice/adminData";
import { getselectedorgs } from "../../store/slice/selectedorg";
import { getViewAccess } from "../../store/slice/viewAccess";
import Lottie from "lottie-react";
import LoaderAnim from "../../assets/json/loader.json";
const Products = () => {
  const defaultproductData = useSelector(
    (state: RootState) => state.otherorgdata.data
  );

  const productData = defaultproductData.filter((e) => e.product != "");
  const showLoader = useSelector((state: RootState) => state?.loaderslice);
  const selectedOrgName = useSelector(
    (state: RootState) => state.selectedorg.orgname
  );
  const userData = useSelector((state: RootState) => state.userinfo);
  const userName = userData.userinfo.username;
  const [isHovering, setIsHovering] = useState(false);
  const [hovertitle, setHovertitle] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleMouseOver = (title: string) => {
    setIsHovering(true);
    setHovertitle(title);
    setSelectedProduct(title);
  };

  const sessionId = localStorage.getItem("sessionId");

  const handleOnChange = (option: Option | null) => {
    setSelectedItem(option);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedItem != null) {
      setIsLoading(true);
      const data = {
        username: userName,
        action: "connect_portfolio",
        portfl: selectedItem?.value,
        product: selectedProduct,
        present_org: selectedOrgName,
        session_id: sessionId,
      };
      setTimeout(async () => {
        try {
          const response = await axios.post(
            "https://100093.pythonanywhere.com/api/connect_portfolio/",
            data
          );
          if (data.product === "Living Lab Admin") {
            const username = response.data.split("?")[1].split("=")[1];
            try {
              const responseAdmin = await axios.post(
                "https://100093.pythonanywhere.com/api/get_data/",
                { username: username }
              );
              const response = await axios.post(
                "https://100093.pythonanywhere.com/api/settings/",
                { username: username }
              );
              toast.success("Success");
              dispatch(isNewOwner(username));
              localStorage.setItem("username", username);
              dispatch(
                getViewAccess(response.data.data.processes_to_portfolio)
              );
              dispatch(setAdminData(responseAdmin.data.data[0]));
              dispatch(getselectedorgs({ orgname: userName, type: "owner" }));
            } catch (error: unknown) {
              toast.error("an unknown error occurred, please try again");
              console.error(error);
            }
          } else {
            toast.success("Success");
            window.location.href = response.data;
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(error);
            toast.error(error.response?.data);
          } else {
            console.error("An unknown error occurred:", error);
            toast.error("An unknown error occurred");
          }
        } finally {
          setIsLoading(false);
        }
        setIsLoading(false);
      }, 0);
    } else {
      toast.error("Select Portfolio From Dropdown");
      setIsLoading(false);
    }
  };

  const options: Option[] | undefined = productData
    .find((item) => item.product === hovertitle)
    ?.portfolios?.map((item) => ({
      value: item?.portfolio_code,
      label: `${item?.portfolio_name}, ${item?.role}, ${item?.data_type}`,
    }));

  return (
    <>
      <ToastContainer position="top-right" />

      {showLoader ? (
        <div className="mt-8">
          <div className="pl-8">
            <p className="font-roboto text-lg text-[#7a7a7a] font-semibold my-8">
              Products of{" "}
              <span className="text-[#FF0000]">{selectedOrgName}</span>, Owner{" "}
              <span className="text-[#FF0000]">{selectedOrgName}</span>
            </p>
            <p className="font-roboto text-lg text-[#7a7a7a] font-semibold">
              Select product & Portfolio to connect
            </p>
          </div>

          <section className="relative">
            <main className="flex flex-col w-full">
              <div className="flex flex-wrap w-full justify-between">
                {productData?.length > 0 && (
                  <>
                    {productData?.map((product) => (
                      <div
                        key={product.org_id}
                        className="relative box "
                        onMouseEnter={() => handleMouseOver(product.product)}
                      >
                        <div className="h-80 w-80 ">
                          <img
                            src={
                              product.product_logo.includes(
                                "https://100093.pythonanywhere.com"
                              )
                                ? product.product_logo
                                : `https://100093.pythonanywhere.com${product.product_logo}`
                            }
                            alt=""
                            className={`w-full h-full absolute ${
                              isHovering ? "object-cover" : ""
                            }`}
                          />
                        </div>
                        {isHovering && product.product === hovertitle && (
                          <div className="absolute top-0 w-full h-full">
                            <form
                              className="relative w-full h-full"
                              onSubmit={handleSubmit}
                            >
                              <div className="bg-[#a2a2a2] opacity-50 w-full h-full rounded-md"></div>
                              <div className="bg-transparent absolute w-full h-full top-0 text-center flex flex-col justify-around items-center">
                                <h2 className="text-white text-[1.78rem] font-semibold">
                                  {product.product}
                                </h2>
                                <div className="w-full  px-6 ">
                                  <Select
                                    options={options}
                                    onChange={handleOnChange}
                                    value={selectedItem}
                                    placeholder="Select a portfolio"
                                  />
                                </div>
                                <button
                                  className="bg-black text-white h-12 px-6 py-4 rounded-md flex items-center hover:bg-[#666666]"
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <Lottie
                                      animationData={LoaderAnim}
                                      loop={true}
                                      style={{ width: "50px" }}
                                    />
                                  ) : (
                                    "Connect"
                                  )}
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    ))}
                    {productData?.length % 3 == 2 ? (
                      <div className="relative box-placer"></div>
                    ) : (
                      ""
                    )}
                    {productData?.length % 3 == 1 ? (
                      <>
                        <div className="relative box-placer"></div>
                        <div className="relative box-placer"></div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </main>
          </section>

          <ProductForm />
        </div>
      ) : (
        <div className="mt-4">
          <Loader></Loader>
        </div>
      )}
    </>
  );
};

export default Products;
