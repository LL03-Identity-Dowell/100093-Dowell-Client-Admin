import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useEffect, useState } from "react";


interface PortfolioItem {
  username: string[];
  member_type: string;
  product: string;
  data_type: string;
  operations_right: string;
  role: string;
  security_layer: string;
  portfolio_name: string;
  portfolio_code: string;
  portfolio_specification: string | null;
  portfolio_uni_code: string | null;
  portfolio_details: string | null;
  status: string;
}


const ProductForm = () => {
  const productData = useSelector((state: RootState) => state.products);

  const portfolioData = useSelector(
    (state: RootState) => state.adminData.data[0]?.portpolio
  );

  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>("");

  // const [filteredData, setFilteredData] = useState<PortfolioItem[]>([]);

  // const filterDataByProduct = () => {
  //   const filtered: PortfolioItem[] = portfolioData?.filter((item) => item?.product === selectedProduct);
  //   setFilteredData(filtered);
  // };
  const uniqueProducts: any[] = Array.from(new Set(portfolioData?.map(item => item.product)));

  const filterDataByProduct = portfolioData?.filter(item => item.product === selectedProduct);

  const selectedItemData = portfolioData?.find(
    (item) => item?.portfolio_code === selectedItem
  );

  // useEffect(() => {
  //   filterDataByProduct();
  // }, [selectedProduct]);


  console.log(selectedProduct, 'productData', portfolioData?.filter(item => item.product === selectedProduct));
  
  return (
    <>
      <form className="border border-[#54595f] h-full mt-20 p-[50px]">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Product
              </label>
              <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}
                className="outline-none w-full h-12 p-1 text-[17px] font-medium px-4 rounded-md border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option> Select Product </option>
                {portfolioData?.map((product, index) => (
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
              <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}
                className="outline-none w-full h-12 p-1 text-[17px] font-medium px-4 rounded-md border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Portfolio"
              >
                <option> Select Portfolio </option>
                {filterDataByProduct?.map((item, index) => (
                  <option key={index} value={item?.portfolio_code}>
                    {" "}
                    {item?.portfolio_name}, {item?.role}, {item?.data_type}
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
            <button className="w-full h-12 bg-[#7a7a7a] hover:bg-[#61CE70] rounded-[4px] text-white font-roboto">
              Click here to connect selected Portfolio in selected Product
            </button>
          </form>
    </>
  )
}

export default ProductForm