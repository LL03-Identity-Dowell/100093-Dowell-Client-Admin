import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";

interface LevelFourReportProps {
  data?: {
    items: {
      item_bardcode: string;
      item_code: string;
      item_details: string;
      item_image1: string;
      item_image2: string;
      item_name: string;
      item_specification: string;
      item_universal_code: string;
      status: string;
    }[];
    level_name: string;
    roles: string[];
  };
}
const LevelFourReport: React.FC<LevelFourReportProps> = ({ data }) => {
  const color_scheme = useSelector(
    (state: RootState) => state.setting?.data?.color_scheme
  );
  return (
    <div className="w-full my-10 relative overflow-x-scroll flex flex-col items-center">
      {Object.prototype.toString.call(data?.items) === "[object Array]" ? (
        <>
          <div
            className={`${
              color_scheme == "Red"
                ? "bg-[#DC4C64]"
                : color_scheme == "Green"
                ? "bg-[#14A44D]"
                : "bg-[#7A7A7A]"
            } w-fit text-center text-xl px-10 py-2 rounded-lg font-semibold mb-10 text-white`}
          >
            LEVEL NAME: {data?.level_name}
          </div>
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 px-2">No</th>
                <th className="border border-gray-400 px-2">Item Name</th>
                <th className="border border-gray-400 px-2">Item Code</th>
                <th className="border border-gray-400 px-2">Item Barcode</th>
                <th className="border border-gray-400 px-2">
                  Item Universal Code
                </th>
                <th className="border border-gray-400 px-2">Item Details</th>
                <th className="border border-gray-400 px-2">
                  Item Specification
                </th>
                <th className="border border-gray-400 px-2">Item Image 1</th>
                <th className="border border-gray-400 px-2">Item Image 2</th>
                <th className="border border-gray-400 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((item, index: number) => (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400 px-2">{index + 1}</td>
                  <td className="border border-gray-400 px-2">
                    {item?.item_name}
                  </td>
                  <td className="border border-gray-400 px-2">
                    {item.item_code}
                  </td>
                  <td className="border border-gray-400 px-2">
                    {item.item_bardcode}
                  </td>
                  <td className="border border-gray-400 px-2">
                    {item.item_universal_code}
                  </td>
                  <td className="border border-gray-400 px-2">
                    {item.item_details}
                  </td>
                  <td className="border border-gray-400 px-2">
                    {item.item_specification}
                  </td>
                  <td className="border border-gray-400 px-2">
                    {item.item_image1}
                  </td>
                  <td className="border border-gray-400 px-2">
                    {item.item_image2}
                  </td>
                  <td className="border border-gray-400 px-2">{item.status}</td>
                </tr>
              ))}
              {data?.items?.length === 0 && (
                <tr>
                  <td colSpan={3}>No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LevelFourReport;
