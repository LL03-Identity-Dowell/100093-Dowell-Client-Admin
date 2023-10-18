import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import axios from "axios";
import Loader from "../../pages/whiteloader";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import { getportfolioNotifications } from "../../store/slice/portfolioNotifications";
import Select from "react-select";

type Product = {
  _id: string;
  product_name: string;
  product_logo: string;
};

interface ProductCardProps {
  product: Product;
  hovertitle: string;
  handleMouseOver: (title: string) => void;
  selectedProduct: string;
  defaultOptions: Record<string, any>;
  selectedOptions: Record<string, any>;
  handleSelectChange: (selectedOption: any, title: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, title: string) => void;
  handleRequestPortfolio: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const Products: React.FC = () => {
  const productData = useSelector((state: RootState) => state.products);
  const showLoader = useSelector((state: RootState) => state.loaderslice);
  const userData = useSelector((state: RootState) => state.userinfo);
  const userName = userData.userinfo.username;

  const adminData = useSelector((state: RootState) => state.adminData.data[0]);
  const portfolioData = adminData?.portpolio;
  const presentOrg = adminData?.organisations[0]?.org_name;

  const [hovertitle, setHovertitle] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>(
    {}
  );

  const filterDataByProduct = portfolioData?.filter(
    (item) => item?.product === hovertitle
  );

  const filteredProducts =
    userName === "uxliveadmin"
      ? productData?.products
      : productData?.products?.filter(
          (product) => product.product_name !== "Living Lab Monitoring"
        );

  const defaultOptions = useMemo(() => {
    const initialDefaultOptions: Record<string, any> = {};
    filteredProducts.forEach((product) => {
      const optionsForProduct = filterDataByProduct
        .filter(
          (item) =>
            item?.product === product.product_name &&
            item?.member_type === "owner"
        )
        .map((item) => ({
          value: item?.portfolio_code,
          label: `${item?.portfolio_name}, ${item?.role}, ${item?.data_type}`,
        }));

      if (optionsForProduct.length > 0) {
        initialDefaultOptions[product.product_name] = optionsForProduct[0];
      }
    });
    return initialDefaultOptions;
  }, [filteredProducts]);

  const handleMouseOver = (title: string) => {
    setHovertitle(title);
    setSelectedProduct(title);
  };

  const handleSelectChange = (selectedOption: any, title: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [title]: selectedOption,
    }));
  };

  const sessionId = localStorage.getItem("sessionId");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const selectedOption = selectedOptions[title] || defaultOptions[title];

    const data = {
      username: userName,
      action: "connect_portfolio",
      portfl: selectedOption?.value,

      product: selectedProduct,
      present_org: presentOrg,
      session_id: sessionId,
    };
    console.log(
      data,
      "data",
      selectedOptions[title]?.value,
      defaultOptions[title]?.value,
      title
    );

    try {
      const response = await axios.post(
        "https://100093.pythonanywhere.com/api/connect_portfolio/",
        data
      );
      toast.success("success");
      window.location.href = response.data;
    } catch (error) {
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
      present_org: presentOrg,
    };

    try {
      const response = await axios.post(
        "https://100093.pythonanywhere.com/api/request_portfolio/",
        data
      );
      toast.success("success");
      dispatch(getportfolioNotifications(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        toast.error("An error occurred");
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <>
      {!showLoader ? (
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
            <main className="flex flex-col w-full">
              <div className="flex flex-wrap w-full justify-between">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    hovertitle={hovertitle}
                    handleMouseOver={handleMouseOver}
                    selectedProduct={selectedProduct}
                    defaultOptions={defaultOptions}
                    selectedOptions={selectedOptions}
                    handleSelectChange={handleSelectChange}
                    handleSubmit={handleSubmit}
                    handleRequestPortfolio={handleRequestPortfolio}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            </main>
          </section>

          <ProductForm />
        </div>
      ) : (
        <div className="mt-4">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Products;

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hovertitle,
  handleMouseOver,
  selectedProduct,
  defaultOptions,
  selectedOptions,
  handleSelectChange,
  handleSubmit,
  handleRequestPortfolio,
  isLoading,
}) => {
  const title = product.product_name;
  const portfolioData = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );

  const filterDataByProduct = portfolioData?.filter(
    (item) => item?.product === hovertitle
  );

  const options = filterDataByProduct
    .filter((item) => item?.product === title && item?.member_type === "owner")
    .map((item) => ({
      value: item?.portfolio_code,
      label: `${item?.portfolio_name}, ${item?.role}, ${item?.data_type}`,
    }));

  const selectedOption = selectedOptions[title] || defaultOptions[title];

  return (
    <div
      className="relative box"
      onMouseEnter={() => handleMouseOver(product.product_name)}
    >
      <div className="h-80 w-80">
        <img
          src={`${
            product.product_logo?.includes("https://100093.pythonanywhere.com")
              ? product.product_logo
              : `https://100093.pythonanywhere.com${product.product_logo}`
          } `}
          alt="product logo"
          className={`w-full h-full ${
            product.product_name === hovertitle ? "absolute" : ""
          }`}
        />
      </div>

      {hovertitle && product.product_name === hovertitle && (
        <div className="absolute top-0 w-full h-full dropdown-container">
          <form
            className="relative w-full h-full"
            onSubmit={
              filterDataByProduct.length > 0 ||
              selectedProduct === "Dowell Services"
                ? (e) => handleSubmit(e, title)
                : handleRequestPortfolio
            }
          >
            <div className="bg-[#a2a2a2] opacity-50 w-full h-full rounded-md"></div>
            <div className="bg-transparent absolute w-full h-full top-0 text-center flex flex-col justify-around items-center">
              <h2 className="text-white text-[1.78rem] font-semibold">
                {product.product_name}
              </h2>
              <div className="w-full px-6 ">
                {filterDataByProduct.length > 0 && (
                  <Select
                    id="productSelect"
                    options={options}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, title)
                    }
                    defaultValue={options[0]}
                    value={selectedOption}
                  />
                )}

                {filterDataByProduct.length === 0 &&
                  selectedProduct !== "Dowell Services" && (
                    <select>
                      <option>Waiting for portfolio from owner</option>
                    </select>
                  )}

                {filterDataByProduct.length === 0 &&
                  selectedProduct === "Dowell Services" && (
                    <select>
                      <option>Waiting for portfolio from owner</option>
                    </select>
                  )}
              </div>
              <button className="bg-black text-white h-12 px-6 py-4 rounded-md flex items-center hover:bg-[#666666]">
                {filterDataByProduct.length > 0 ||
                selectedProduct === "Dowell Services" ? (
                  <p>{isLoading ? "Loading..." : "Connect"}</p>
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
};
