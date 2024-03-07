import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";

interface portfolioProps {
  data_type: string;
  member_type: string;
  operations_right: string;
  portfolio_code: string;
  portfolio_details: string;
  portfolio_name: string;
  portfolio_specification: string;
  portfolio_uni_code: string;
  role: string;
  security_layer: string;
  product: string;
  status: string;
  username: string[];
}
const PortfolioReport = () => {
  const [portfolioReport, setPortfolioReport] = useState<portfolioProps[]>();
  const userData = useSelector((state: RootState) => state.userinfo);
  const username = userData.userinfo.username;
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await Axios93Base.post("/portfolio_reports/", {
          username: username,
        });

        setPortfolioReport(response.data);
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchPortfolios();
  }, [username]);
  return (
    <div className="w-full my-10 relative overflow-x-scroll">
      {Object.prototype.toString.call(portfolioReport) === "[object Array]" ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-2">No</th>
              <th className="border border-gray-400 px-2">Portfolio Name</th>
              <th className="border border-gray-400 px-2">Member Type</th>
              <th className="border border-gray-400 px-2">Role</th>
              <th className="border border-gray-400 px-2">Member Name</th>
              <th className="border border-gray-400 px-2">Product Assigned</th>
              <th className="border border-gray-400 px-2">Data Type</th>
              <th className="border border-gray-400 px-2">
                Operations of Rights
              </th>
              <th className="border border-gray-400 px-2">
                Portfolio Code(Unique)
              </th>
              <th className="border border-gray-400 px-2">
                Portfolio Universal Code
              </th>
              <th className="border border-gray-400 px-2">Portfolio Details</th>
              <th className="border border-gray-400 px-2">Enable/ Disable</th>
            </tr>
          </thead>
          <tbody>
            {portfolioReport?.map((item, index: number) => (
              <tr key={index.toString()} className="border border-gray-400">
                <td className="border border-gray-400 px-2">{index + 1}</td>
                <td className="border border-gray-400 px-2">
                  {item.portfolio_name}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.member_type}
                </td>
                <td className="border border-gray-400 px-2">{item.role}</td>
                <td className="border border-gray-400 px-2">
                  {item.username[0]}
                </td>
                <td className="border border-gray-400 px-2">{item.product}</td>
                <td className="border border-gray-400 px-2">
                  {item.data_type}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.operations_right}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.portfolio_code}
                </td>

                <td className="border border-gray-400 px-2">
                  {item.portfolio_uni_code}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.portfolio_details}
                </td>
                <td className="border border-gray-400 px-2">{item.status}</td>
              </tr>
            ))}
            {portfolioReport?.length === 0 && (
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

export default PortfolioReport;
