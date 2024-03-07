import axios from "axios";
import { useEffect, useState } from "react";
import { roleItemProps } from "../roles/Roles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Loader from "../../pages/whiteloader";
import { Axios93Base } from "../../api/axios";
const RoleReport = () => {
  const [roleReport, setRoleReport] = useState<roleItemProps[]>();
  const userData = useSelector((state: RootState) => state.userinfo);
  const username = userData.userinfo.username;
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await Axios93Base.post("/role_reports/", {
          username: username,
        });
        setRoleReport(response.data);
      } catch (error) {
        console.log("error =", error);
      }
    };
    fetchRoles();
  }, [username]);
  return (
    <div className="w-full my-10 relative overflow-x-scroll">
      {Object.prototype.toString.call(roleReport) === "[object Array]" ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-2">No</th>
              <th className="border border-gray-400 px-2">level 1 Item</th>
              <th className="border border-gray-400 px-2">level 2 Item</th>
              <th className="border border-gray-400 px-2">level 3 Item</th>
              <th className="border border-gray-400 px-2">level 4 Item</th>
              <th className="border border-gray-400 px-2">level 5 Item</th>
              <th className="border border-gray-400 px-2">Role Code</th>
              <th className="border border-gray-400 px-2">Role Details</th>
              <th className="border border-gray-400 px-2">Role Name</th>
              <th className="border border-gray-400 px-2">
                Role Specification
              </th>
              <th className="border border-gray-400 px-2">
                Role Universal Code
              </th>
              <th className="border border-gray-400 px-2">Security Layer</th>
              <th className="border border-gray-400 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {roleReport?.map((role: roleItemProps, index: number) => (
              <tr key={index.toString()} className="border border-gray-400">
                <td className="border border-gray-400 px-2">{index + 1}</td>
                <td className="border border-gray-400 px-2">
                  {role.level1_item}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.level2_item}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.level3_item}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.level4_item}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.level5_item}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.role_code}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.role_details}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.role_name}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.role_specification}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.role_uni_code}
                </td>
                <td className="border border-gray-400 px-2">
                  {role.security_layer}
                </td>

                <td className="border border-gray-400 px-2">{role.status}</td>
              </tr>
            ))}
            {roleReport?.length === 0 && (
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

export default RoleReport;
