import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";


const ProductForm = () => {
  const productData = useSelector((state: RootState) => state.products);

  return (
    <>
      <form className="border border-[#54595f] h-full mt-20 p-[50px]">
            <div className="mb-4">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold ">
                Select Product
              </label>
              <select
                className="outline-none w-full h-12 p-1 text-[17px] font-medium px-4 rounded-md border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option> Select Product </option>
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
                className="outline-none w-full h-12 p-1 text-[17px] font-medium px-4 rounded-md border border-[#7A7A7A] bg-[#f5f5f5] text-[#7a7a7a] font-roboto"
                placeholder="Select Product"
              >
                <option> Portfolio name 01, Role Name, Member Type </option>
                <option> Portfolio name 02, Role Name, Member Type </option>
                <option>Portfolio name 03, Role Name, Member Type </option>
                <option>Portfolio name 04, Role Name, Member Type </option>
                <option>Portfolio name 05, Role Name, Member Type </option>
              </select>
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-[#7A7A7A] text-lg font-roboto font-bold">
                Details of selected Portfolio
              </label>
              <textarea
                rows={4}
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