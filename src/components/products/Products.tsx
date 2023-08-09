import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import axios from "axios";
import Loader from "../../pages/whiteloader";
import ProductForm from "./ProductForm";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const productData = useSelector((state: RootState) => state.products);
  const show_loader = useSelector((state: RootState) => state.loaderslice);
  const userData = useSelector((state: RootState) => state.userinfo);
  const userName = userData.userinfo.username;

  const [isHovering, setIsHovering] = useState(false);
  const [hovertitle, setHovertitle] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");

  const portfolioData = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );

  const filterDataByProduct = portfolioData?.filter(
    (item) => item.product === hovertitle
  );

  const handleMouseOver = (title: string) => {
    setIsHovering(true);
    setHovertitle(title);
  };

  const handleMouseOut = (title: string) => {
    setIsHovering(false);
    setHovertitle(title);
  };

  const sessionId = localStorage.getItem("sessionId");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          toast.success("success");
          window.location.href = res.data;
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

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
            <main className={`flex flex-col w-full `}>
<div className="flex flex-wrap justify-center w-full ">
              {productData?.products?.length > 1 && (
                <>
                  {productData?.products?.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="relative flex flex-col flex-wrap h-full hover:accordion_hover"
                        onMouseOver={() =>
                          handleMouseOver(product.product_name)
                        }
                        onMouseOut={() => handleMouseOut(product?.product_name)}
                        onChange={() =>
                          setSelectedProduct(product.product_name)
                        }
                      >
                        <div className="">
                          <img
                            src={`${
                              product.product_logo?.includes(
                                "https://100093.pythonanywhere.com"
                              )
                                ? product.product_logo
                                : `https://100093.pythonanywhere.com${product.product_logo}`
                            } `}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                        {isHovering && product.product_name === hovertitle && (
                          <div className="absolute top-0 w-full h-full">
                            <form
                              className="relative w-full h-full"
                              onSubmit={handleSubmit}
                            >
                              <div className="bg-[#a2a2a2] opacity-50 w-full h-full p-50 rounded-sm"></div>
                              <div className="bg-transparent absolute w-full h-full top-0 text-center flex flex-col justify-between py-16 items-center">
                                <h2 className="text-white text-[1.78rem] font-semibold">
                                  {product.product_name}
                                </h2>
                                <div>
                                  <select
                                    className="outline-none h-8 w-full"
                                    value={selectedItem}
                                    onChange={(e) =>
                                      setSelectedItem(e.target.value)
                                    }
                                  >
                                    <option> Select Portfolio </option>
                                    {filterDataByProduct?.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item?.portfolio_name}
                                      >
                                        {" "}
                                        {item?.portfolio_name}, {item?.role},{" "}
                                        {item?.data_type}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <button className="bg-black text-white h-12 px-6 py-4 rounded-md flex items-center hover:bg-[#666666]">
                                  Connect
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
