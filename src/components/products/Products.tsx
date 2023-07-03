import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import axios from "axios";
import { getproducts } from "../../store/slice/products";
import { getloaderstate } from "../../store/slice/loaderstate";
import Loader from "../../pages/loader";
import ProductForm from "./ProductForm";

const Products = () => {
  const productData = useSelector((state: RootState) => state.products);
  const show_loader = useSelector((state: RootState) => state.loaderslice);
  const userData = useSelector((state: RootState) => state.userinfo);

  const [isHovering, setIsHovering] = useState(false);
  const [hovertitle, setHovertitle] = useState("");

  const handleMouseOver = (title: string) => {
    setIsHovering(true);
    setHovertitle(title);
  };

  const handleMouseOut = (title: string) => {
    setIsHovering(false);
    setHovertitle(title);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getloaderstate(false));
      const username = "uxliveadmin";
      if (username) {
        const url = "http://100093.pythonanywhere.com/api/getproducts/";
        axios
          .post(url, { username: username })
          .then((response) => {
            try {
              dispatch(getproducts(response.data));
            } catch (e) {
              console.log("Failed to parse response");
            } finally {
              dispatch(getloaderstate(true));
            }
          })
          .catch((error) => {
            console.log("Request failed", error);
            dispatch(getloaderstate(true));
          });
      }
    };
    fetchData();
  }, []);

  // console.log(productData, "productData");

  return (
    <>
      {show_loader ? (
        <div className="mt-8">
          <div className="pl-8">
            <p className="font-roboto text-lg text-[#7a7a7a] font-semibold my-8">
              Products of{" "}
              <span className="text-[#FF0000]">
                {" "}[Organization]
                {userData.userinfo.username}              </span>
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
            <main className={`grid lg:grid-cols-3 grid-cols-1 w-full`}>
              {productData.products.length > 1 && (
                <>
                  {productData?.products.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="relative w-full h-full "
                        onMouseOver={() =>
                          handleMouseOver(product.product_name)
                        }
                        onMouseOut={() => handleMouseOut(product?.product_name)}
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
                            <div className="relative w-full h-full">
                              <div className="bg-[#a2a2a2] opacity-50 w-full h-full p-50 rounded-sm"></div>
                              <div className="bg-transparent absolute w-full h-full top-0 text-center flex flex-col justify-between py-16 items-center">
                                <h2 className="text-white text-[1.78rem] font-semibold">
                                  {product.product_name}
                                </h2>
                                <div>
                                  <select className="outline-none h-8">
                                    <option className="">
                                      Portfolio 01, Role Name, Member Type
                                    </option>
                                    <option className="">
                                      Portfolio 02, Role Name, Member Type
                                    </option>
                                    <option className="">
                                      Portfolio 03, Role Name, Member Type
                                    </option>
                                  </select>
                                </div>
                                <button
                                  className="bg-black text-white h-12 px-6 py-4 rounded-md flex items-center hover:bg-[#666666]"
                                  onClick={() =>
                                    window.location.assign(product.product_link)
                                  }
                                >
                                  Connect
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </main>
          </section>

          <ProductForm  />
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
