import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = () => {
  const productData = useSelector((state: RootState) => state.products);

  const portfolioData = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo?.userinfo?.username
  );

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredProducts =
    userName === "uxliveadmin"
      ? productData?.products
      : productData?.products?.filter(
          (product) =>
            product.product_name !== "Living Lab Monitoring" &&
            product.product_name !== "Dowell Wallet"
        );

  const filterDataByProduct = portfolioData?.filter(
		(item) => item.product === selectedProduct || item?.product === "all"
	);

  const selectedItemData = portfolioData?.find(
		(item) => item?.portfolio_code === selectedItem 
	);
  const sessionId = localStorage.getItem("sessionId");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
const selectedporfolio = portfolioData?.find(
	(item) => item?.portfolio_code === selectedItem
);

    const data = {
			username: userName,
			action: "connect_portfolio",
			portfl: selectedItem,
			product: selectedProduct,
			present_org: userName,
			session_id: sessionId,
		} as {
			username: string;
			action: string;
			portfl: string;
			product: string;
			present_org: string;
			session_id: string;
			portfolio_name?: string;
      };
    
     if (selectedporfolio?.product === "all") {
				data.portfolio_name = "default";
			}

    console.log(data);
    if (data.portfl && data.product) {
      try {
        await axios
          .post(
            "https://100093.pythonanywhere.com/api/connect_portfolio/",
            data
          )
          .then((res) => {
            console.log(res.data);
            toast.success("success");
            window.location.href = res.data;
          });
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
    } else {
      toast.error("Please select a portfolio and product");
      setIsLoading(false);
    }
  };
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );

  return (
    <>
      <form
        className="border border-[#54595f] h-full mt-20 p-[50px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Select Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="outline-none w-full h-12 p-1 text-[17px] font-medium px-4 rounded-md border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            placeholder="Select Product"
          >
            <option> Select Product </option>

            {filteredProducts.map((product) => (
              <option key={product._id} value={product.product_name}>
                {" "}
                {product.product_name}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
            Select Portfolio
          </label>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="outline-none w-full h-12 p-1 text-[17px] font-medium px-4 rounded-md border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
            placeholder="Select Portfolio"
          >
            <option> Select Portfolio </option>
            {filterDataByProduct?.map((item, index) => (
              <>
                {item.member_type === "owner" && (
                  <option key={index} value={item?.portfolio_code}>
                    {item?.portfolio_name}
                  </option>
                )}
              </>
            ))}
          </select>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
            Details of selected Portfolio
          </label>
          <textarea
            rows={4}
            readOnly
            value={
              selectedItemData &&
              JSON.stringify(selectedItemData, null, 1)?.slice(1, -1)
            }
            className="outline-none border border-[#7a7a7a] resize-none p-4 rounded-md text-[#7a7a7a]"
          />
        </div>
        <button
          disabled={isLoading}
          className={`w-full h-12  ${
            isLoading == true
              ? "bg-[#b8b8b8]"
              : color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          } mb-8 hover:bg-[#61CE70] rounded-[4px] text-white font-roboto`}
        >
          {isLoading
            ? "Connecting..."
            : "Click here to connect selected Portfolio in selected Product"}
        </button>
      </form>
    </>
  );
};

export default ProductForm;
