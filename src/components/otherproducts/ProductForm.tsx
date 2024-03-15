import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Axios93Base } from "../../api/axios";

const ProductForm = () => {
  // select product data ,user name, and selected orgname from org
  const productData = useSelector(
    (state: RootState) => state.otherorgdata.data
  );
  const userName = useSelector(
    (state: RootState) => state.userinfo?.userinfo?.username
  );
  const selectedorgname = useSelector(
    (state: RootState) => state.selectedorg.orgname
  );

  //
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const filterDataByProduct = productData.find(
    (item) => item.product === selectedProduct
  );

  const selectedItemData = filterDataByProduct?.portfolios.find(
    (item) => item?.portfolio_code === selectedItem
  );
  const sessionId = localStorage.getItem("sessionId");

  // handle connect button
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      username: userName,
      action: "connect_portfolio",
      portfl: selectedItem,
      product: selectedProduct,
      present_org: selectedorgname,
      session_id: sessionId,
    };

    try {
      await Axios93Base.post("/connect_portfolio/", data).then((res) => {
        console.log(res.data);
        setErrMsg("");
        toast.success("success");
        window.location.href = res.data;
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
        console.error(error);
        setErrMsg(error.response?.data);
      } else {
        toast.error("something went wrong, please try connecting again");
        console.error("An unknown error occurred:", error);
        setErrMsg("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatObject = (obj: Record<string, any>) => {
    let result = "";
    Object.entries(obj).forEach(([key, value]) => {
      result += `'${key}': '${value}'\n`;
    });
    return result;
  };

  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
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

            {productData.map((product, index) => (
              <option key={index} value={product.product}>
                {" "}
                {product.product}{" "}
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
            {filterDataByProduct?.portfolios.map((item, index) => (
              <option key={index} value={item.portfolio_code}>
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
            value={selectedItemData ? `${formatObject(selectedItemData)}` : ""}
            className="outline-none border border-[#7a7a7a] resize-none p-4 rounded-md text-[#7a7a7a]"
          />
        </div>
        <button
          disabled={isLoading}
          className={`w-full h-12 ${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          } hover:bg-[#61CE70] rounded-[4px] text-white font-roboto ${
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
