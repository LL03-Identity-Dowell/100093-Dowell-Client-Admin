import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProductForm = () => {
  const productData = useSelector((state: RootState) => state.products);

  const portfolioData = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );
  const userName = useSelector(
    (state: RootState) => state.adminData.data[0]?.Username
  );

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const filterDataByProduct = portfolioData?.filter(
    (item) => item.product === selectedProduct
  );

  const selectedItemData = portfolioData?.find(
    (item) => item?.portfolio_code === selectedItem
  );
  const sessionId = localStorage.getItem("sessionId");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      action: "connect_portfolio",
      portfl: selectedItem,
      product: selectedProduct,
      present_org: userName,
      session_id: sessionId,
    };

    try {
      await axios
        .post("https://100093.pythonanywhere.com/api/connect_portfolio/", data)
        .then((res) => {
          console.log(res.data);
          setErrMsg("");
          toast.success("success");
          window.location.replace(res.data);
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setErrMsg(error.response?.data);
      } else {
        console.error("An unknown error occurred:", error);
        setErrMsg("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

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
            {/* {portfolioData?.map((product, index) => (
              <option key={index} value={product.product}>
                {" "}
                {product.product}{" "}
              </option>
            ))} */}
            {productData?.products?.map((product) => (
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
              <option key={index} value={item?.portfolio_name}>
                {" "}
                {item?.portfolio_name}
              </option>
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
            value={JSON.stringify(selectedItemData, null, 1)?.slice(1, -1)}
            className="outline-none border border-[#7a7a7a] resize-none p-4 rounded-md text-[#7a7a7a]"
          />
        </div>
        <button
          disabled={isLoading}
          className={`w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
            isLoading ? "hover:bg-[#7a7a7a] opacity-50" : ""
          }`}
        >
          Click here to connect selected Portfolio in selected Product
        </button>
        <p className="text-xs text-[#FF0000] text-center pt-2">{errMsg}</p>
      </form>
    </>
  );
};

export default ProductForm;
