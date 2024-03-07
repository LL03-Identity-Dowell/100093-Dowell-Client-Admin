import Loader from "../../pages/whiteloader";

interface guestMembersProps {
  accept_members?: {
    name: string;
    link: string;
    member_code: string;
    member_spec: string;
    member_details: string;
    member_uni_code: string;
    status: string;
  }[];
  pending_members?: {
    name: string;
    link: string;
    member_code: string;
    member_spec: string;
    member_details: string;
    member_uni_code: string;
    status: string;
  }[];
}
const GuestReport: React.FC<guestMembersProps> = ({
  accept_members,
  pending_members,
}) => {
  return (
    <div className="w-full my-10 relative overflow-x-scroll">
      {Object.prototype.toString.call(pending_members) === "[object Array]" &&
      Object.prototype.toString.call(accept_members) === "[object Array]" ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-2">No</th>
              <th className="border border-gray-400 px-2">Name</th>
              <th className="border border-gray-400 px-2">Member Code</th>
              <th className="border border-gray-400 px-2">
                Member Specification
              </th>
              <th className="border border-gray-400 px-2">Member Details</th>

              <th className="border border-gray-400 px-2">
                Member Universal Code
              </th>
              <th className="border border-gray-400 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {accept_members?.map((item, index: number) => (
              <tr key={index.toString()} className="border border-gray-400">
                <td className="border border-gray-400 px-2">{index + 1}</td>
                <td className="border border-gray-400 px-2">{item.name}</td>
                <td className="border border-gray-400 px-2">
                  {item.member_code}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.member_spec}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.member_details}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.member_uni_code}
                </td>
                <td className="border border-gray-400 px-2">{item.status}</td>
              </tr>
            ))}
            {pending_members?.map((item, index: number) => (
              <tr key={index.toString()} className="border border-gray-400">
                <td className="border border-gray-400 px-2">{index + 1}</td>
                <td className="border border-gray-400 px-2">{item.name}</td>
                <td className="border border-gray-400 px-2">
                  {item.member_code}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.member_spec}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.member_details}
                </td>
                <td className="border border-gray-400 px-2">
                  {item.member_uni_code}
                </td>
                <td className="border border-gray-400 px-2">{item.status}</td>
              </tr>
            ))}
            {pending_members?.length === 0 && accept_members?.length === 0 && (
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

export default GuestReport;
