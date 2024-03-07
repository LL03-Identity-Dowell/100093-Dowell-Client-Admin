import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";
interface layerItemProps {
  category: string;
  details: any;
}
const LayerReport: React.FC = () => {
  const [layerReport, setLayerReport] = useState<layerItemProps[]>();
  const userData = useSelector((state: RootState) => state.userinfo);
  const username = userData.userinfo.username;
  useEffect(() => {
    const fetchLayers = async () => {
      try {
        const response = await Axios93Base.post("/layer_reports/", {
          username: username,
        });
        setLayerReport(response.data);
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchLayers();
  }, [username]);
  // State to store checkbox values
  let idCounter = 0;
  return (
    <div className="w-full my-10 relative overflow-x-scroll">
      {Object.prototype.toString.call(layerReport) === "[object Array]" ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-2">ID</th>
              <th className="border border-gray-400 px-2">Category</th>
              <th className="border border-gray-400 px-2">Details</th>
              <th className="border border-gray-400 px-2">Layer 1</th>
              <th className="border border-gray-400 px-2">Layer 2</th>
              <th className="border border-gray-400 px-2">Layer 3</th>
              <th className="border border-gray-400 px-2">Layer 4</th>
              <th className="border border-gray-400 px-2">Layer 5</th>
              <th className="border border-gray-400 px-2">Layer 6</th>
            </tr>
          </thead>
          <tbody>
            {layerReport?.map((item: any) => {
              const detailKeys = Object.keys(item.details);
              const numRows = Math.max(detailKeys.length, 1);

              return Array.from({ length: numRows }).map((_, index) => {
                idCounter++;
                return (
                  <tr
                    key={`${item.id}-${index}`}
                    className="border border-gray-400 px-2"
                  >
                    <td className="border border-gray-400 px-2">{idCounter}</td>
                    <td className="border border-gray-400 px-2">
                      {item.category}
                    </td>
                    <td className="border border-gray-400 px-2">
                      {index < detailKeys.length ? detailKeys[index] : ""}
                    </td>
                    <td className="border border-gray-400 px-2">
                      <input
                        type="checkbox"
                        width={20}
                        height={20}
                        className="h-5 w-5 border-2 border-gray-600 rounded-md disabled:bg-gray-400"
                        checked={
                          item.details[`${detailKeys[index]}`] === "layer1"
                        }
                        disabled
                      />
                    </td>
                    <td className="border border-gray-400 px-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 border-2 border-gray-600 rounded-md disabled:bg-gray-400"
                        checked={
                          item.details[`${detailKeys[index]}`] === "layer2"
                        }
                        disabled
                      />
                    </td>
                    <td className="border border-gray-400 px-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 border-2 border-gray-600 rounded-md disabled:bg-gray-400"
                        checked={
                          item.details[`${detailKeys[index]}`] === "layer3"
                        }
                        disabled
                      />
                    </td>
                    <td className="border border-gray-400 px-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 border-2 border-gray-600 rounded-md disabled:bg-gray-400"
                        checked={
                          item.details[`${detailKeys[index]}`] === "layer4"
                        }
                        disabled
                      />
                    </td>
                    <td className="border border-gray-400 px-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 border-2 border-gray-600 rounded-md disabled:bg-gray-400"
                        checked={
                          item.details[`${detailKeys[index]}`] === "layer5"
                        }
                        disabled
                      />
                    </td>
                    <td className="border border-gray-400 px-2">
                      <input
                        type="checkbox"
                        className="h-5 w-5 border-2 border-gray-600 rounded-md disabled:bg-gray-400"
                        checked={
                          item.details[`${detailKeys[index]}`] === "layer6"
                        }
                        disabled
                      />
                    </td>
                  </tr>
                );
              });
            })}
            {layerReport?.length === 0 && (
              <tr>
                <td colSpan={3}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LayerReport;
