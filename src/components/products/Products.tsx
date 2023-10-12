import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import axios from "axios";
import Loader from "../../pages/whiteloader";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import { getportfolioNotifications } from "../../store/slice/portfolioNotifications";
import Select from "react-select";

const Products = () => {
  const productData = useSelector((state: RootState) => state.products);
  const show_loader = useSelector((state: RootState) => state.loaderslice);
  const userData = useSelector((state: RootState) => state.userinfo);
  const userName = userData.userinfo.username;

  const portfolioData = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );

  const present_org = useSelector(
    (state: RootState) => state.adminData.data[0]?.organisations[0]?.org_name
  );

  const [hovertitle, setHovertitle] = useState("");

  const filteredProducts =
    userName === "uxliveadmin"
      ? productData?.products
      : productData?.products?.filter(
          (product) => product.product_name !== "Living Lab Monitoring"
        );

  const filterDataByProduct = portfolioData?.filter(
    (item) => item?.product === hovertitle
  );

  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseOver = (title: string) => {
    setHovertitle(title);
    setSelectedProduct(title);

    if (selectedProduct !== title && selectedItem) {
      const defaultSelectedItem =
        filterDataByProduct
          ?.filter((item) => item?.product === title)
          .map((item) => item?.portfolio_code)[0] || "";

      setSelectedItem(defaultSelectedItem);
    }
  };

  const sessionId = localStorage.getItem("sessionId");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      action: "connect_portfolio",
      portfl:
        selectedItem ||
        filterDataByProduct?.map((item) => item.portfolio_code)[0],
      product: selectedProduct,
      present_org: present_org,
      session_id: sessionId,
    };
    console.log(data, "data");

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/connect_portfolio/", data)
        .then((res) => {
          toast.success("success");
          window.location.href = res.data;
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const dispatch = useDispatch();

  const handleRequestPortfolio = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const data = {
      username: userName,
      product: selectedProduct,
      present_org: present_org,
    };

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/request_portfolio/", data)
        .then((res) => {
          toast.success("success");
          dispatch(getportfolioNotifications(res.data));
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        toast.error("An error occurred");
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectedItem(selectedOption ? selectedOption.value : "");
  };

  return (
    <>
      {!show_loader ? (
        <div className="mt-8">
          <div className="pl-8">
            <p className="font-roboto text-lg text-[#7a7a7a] font-semibold my-8">
              Products of{" "}
              <span className="text-[#FF0000]">
                {userData.userinfo.username}
              </span>
              , Owner{" "}
              <span className="text-[#FF0000]">
                {userData.userinfo.first_name} {userData.userinfo.last_name}
              </span>
            </p>
            <p className="font-roboto text-lg text-[#7a7a7a] font-semibold">
              Select product & Portfolio to connect
            </p>
          </div>

          <section className="relative">
            <main className={`flex flex-col w-full`}>
              <div className="flex flex-wrap w-full justify-between">
                {filteredProducts.length > 1 && (
                  <>
                    {filteredProducts.map((product) => {
                      const title = product.product_name;

                      const options = filterDataByProduct
                        .filter((item) => item?.product === title)
                        .map((item) => ({
                          value: item?.portfolio_code,
                          label: `${item?.portfolio_name}, ${item?.role}, ${item?.data_type}`,
                        }));

                      const selectedOption = options.find(
                        (option) => option.value === selectedItem
                      );

                      return (
                        <div
                          key={product._id}
                          className="relative box"
                          onMouseEnter={() =>
                            handleMouseOver(product.product_name)
                          }
                        >
                          <div className="h-80 w-80 ">
                            <img
                              src={`${
                                product.product_logo?.includes(
                                  "https://100093.pythonanywhere.com"
                                )
                                  ? product.product_logo
                                  : `https://100093.pythonanywhere.com${product.product_logo}`
                              } `}
                              alt=""
                              className={`w-full h-full ${
                                product.product_name === hovertitle
                                  ? "absolute"
                                  : ""
                              }`}
                            />
                          </div>
                          {hovertitle &&
                            product.product_name === hovertitle && (
                              <div className="absolute top-0 w-full h-full dropdown-container">
                                <form
                                  className="relative w-full h-full"
                                  onSubmit={
                                    filterDataByProduct.length > 0 ||
                                    selectedProduct === "Dowell Services"
                                      ? handleSubmit
                                      : handleRequestPortfolio
                                  }
                                >
                                  <div className="bg-[#a2a2a2] opacity-50 w-full h-full rounded-md"></div>
                                  <div className="bg-transparent absolute w-full h-full top-0 text-center flex flex-col justify-around items-center">
                                    <h2 className="text-white text-[1.78rem] font-semibold">
                                      {product.product_name}
                                    </h2>
                                    <div className="w-full  px-6 ">
                                      {filterDataByProduct.length > 0 && (
                                        <Select
                                          id="productSelect"
                                          options={options}
                                          onChange={handleSelectChange}
                                          defaultValue={options[0]}
                                          value={selectedOption}
                                        />
                                      )}

                                      {filterDataByProduct.length === 0 &&
                                        selectedProduct !==
                                          "Dowell Services" && (
                                          <select>
                                            <option>
                                              Waiting for portfolio from owner
                                            </option>
                                          </select>
                                        )}
                                      {filterDataByProduct.length === 0 &&
                                        selectedProduct ===
                                          "Dowell Services" && (
                                          <select>
                                            <option>
                                              Waiting for portfolio from owner
                                            </option>
                                          </select>
                                        )}
                                    </div>
                                    <button className="bg-black text-white h-12 px-6 py-4 rounded-md flex items-center hover:bg-[#666666]">
                                      {filterDataByProduct.length > 0 ||
                                      selectedProduct === "Dowell Services" ? (
                                        <p>
                                          {isLoading ? "Loading..." : "Connect"}
                                        </p>
                                      ) : (
                                        "Request For Connect"
                                      )}
                                    </button>
                                  </div>
                                </form>
                              </div>
                            )}
                        </div>
                      );
                    })}
                    {filteredProducts.length % 3 == 2 ? (
                      <div className="relative box-placer"></div>
                    ) : (
                      ""
                    )}
                    {filteredProducts.length % 3 == 1 ? (
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
