import Loader from "../../pages/whiteloader";

interface guestMembersProps {
  accept_members?: {
    name: string;
    portfolio_name: string;
    product: string;
    link: string;
    status: string;
  }[];
  pending_members?: {
    name: string;
    portfolio_name: string;
    product: string;
    link: string;
    status: string;
  }[];
}
const TeamReport: React.FC<guestMembersProps> = ({
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
              <th className="border border-gray-400 px-2">Portfolio Name</th>
              <th className="border border-gray-400 px-2">Product</th>
              <th className="border border-gray-400 px-2">Link</th>

              <th className="border border-gray-400 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {accept_members?.map((item, index: number) => (
              <tr key={index} className="border border-gray-400">
                <td className="border border-gray-400 px-2">{index + 1}</td>
                <td className="border border-gray-400 px-2">{item.name}</td>
                <td className="border border-gray-400 px-2">
                  {item.portfolio_name}
                </td>
                <td className="border border-gray-400 px-2">{item.product}</td>
                <td className="border border-gray-400 px-2">{item.link}</td>
                <td className="border border-gray-400 px-2">{item.status}</td>
              </tr>
            ))}
            {pending_members?.map((item, index: number) => (
              <tr key={index} className="border border-gray-400">
                <td className="border border-gray-400 px-2">{index + 1}</td>
                <td className="border border-gray-400 px-2">{item.name}</td>
                <td className="border border-gray-400 px-2">
                  {item.portfolio_name}
                </td>
                <td className="border border-gray-400 px-2">{item.product}</td>
                <td className="border border-gray-400 px-2">{item.link}</td>
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

export default TeamReport;
