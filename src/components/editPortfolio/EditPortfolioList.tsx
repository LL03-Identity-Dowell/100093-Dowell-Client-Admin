import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { ToastContainer } from "react-toastify";

type Portfolio = {
  username: string[];
  member_type: string;
  product: string;
  data_type: string;
  operations_right: string;
  role: string;
  security_layer: string;
  portfolio_name: string;
  portfolio_code: string;
  portfolio_specification: string;
  portfolio_uni_code: string;
  portfolio_details: string;
  status: string;
};

const PortfolioList = () => {
  const adminData = useSelector((state: RootState) => state.adminData.data[0]);
  const portfolioData: Portfolio[] = adminData?.portpolio || [];
  const filteredPortfolios = portfolioData.filter(
    (portfolio) => portfolio.product !== "all"
  );
  const productData = useSelector((state: RootState) => state.products);

  console.log({ productData });
  console.log({ filteredPortfolios });

  const sessionId = localStorage.getItem("sessionId");
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <>
      <ToastContainer position="top-right" />

      <div className="lg:w-1/2 px-5">
        <span
          className={`${
            color_scheme == "Red"
              ? "bg-[#DC4C64]"
              : color_scheme == "Green"
              ? "bg-[#14A44D]"
              : "bg-[#7A7A7A]"
          } font-roboto text-lg text-white p-[30px] m-5 font-semibold flex flex-col items-center`}
        >
          <p id="portfolioEditFormText1">PORTFOLIO LIST</p>
        </span>

        <div className="mb-8 mt-12">
          {productData.products?.map((product) => (
            <>
              <div
                className={`text-lg py-2 px-1 my-2 ${
                  color_scheme == "Red"
                    ? "bg-[#DC4C64]"
                    : color_scheme == "Green"
                    ? "bg-[#14A44D]"
                    : "bg-[#7A7A7A]"
                }`}
              >
                {product.product_name}
              </div>
              <div className="ml-2">
                {filteredPortfolios.filter(
                  (portfolio) => portfolio.product === product.product_name
                ).length ? (
                  filteredPortfolios
                    .filter(
                      (portfolio) => portfolio.product === product.product_name
                    )
                    .map((portfolio) => (
                      <div className="p-2 border-b cursor-pointer">
                        {portfolio.portfolio_name}
                      </div>
                    ))
                ) : (
                  <div>No portfolio</div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioList;
