import { Button } from "../ui/button";

const BalanceView = ({ userData, onBack }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h3 className="text-lg font-semibold text-black mb-4">
        Your balance: ${userData?.points}
      </h3>
      <div className="overflow-x-auto overflow-y-scroll max-h-52 rounded-lg shadow-md">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Points
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userData?.transactions?.map((transaction, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction?.points}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction?.expiresAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction?.status.replace(/_/g, " ")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black">
                  {transaction?.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-b-lg bg-gray-100 p-4 text-center">
        <Button
          variant="outline"
          className="w-full text-black"
          onClick={onBack}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default BalanceView;
