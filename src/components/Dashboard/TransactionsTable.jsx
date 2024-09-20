import React from "react";

const TransactionsTable = () => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow shadow-gray-300 border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gradient"
            >
              User Info
            </th>

            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gradient"
            >
              Plan
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gradient"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gradient"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-gradient"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          <tr className="">
            <th className="px-6 lg:px-4 xl:px-0 flex gap-3  py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">Jack Anderson</div>
                <div className="text-gray-400">jackanderson@gmail.com</div>
              </div>
            </th>

            <td className="px-6 lg:px-4 xl:px-0 py-4 capitalize">Monthly</td>
            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">
              25/06/2024
            </td>

            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">$15</td>

            <td className="px-6 lg:px-4 xl:px-0 py-4">
              <button className="w-auto px-2 h-6 bg-yellow-500/10 border border-yellow-500 hover:opacity-80 text-yellow-500 rounded-full text-xs">
                Pending
              </button>
            </td>
          </tr>
          <tr className="">
            <th className="px-6 lg:px-4 xl:px-0 flex gap-3  py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">Jack Anderson</div>
                <div className="text-gray-400">jackanderson@gmail.com</div>
              </div>
            </th>

            <td className="px-6 lg:px-4 xl:px-0 py-4 capitalize">Monthly</td>
            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">
              25/06/2024
            </td>

            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">$15</td>

            <td className="px-6 lg:px-4 xl:px-0 py-4">
              <button className="w-auto px-2 h-6 bg-red-500/10 border border-red-500 hover:opacity-80 text-red-500 rounded-full text-xs">
                Cancelled
              </button>
            </td>
          </tr>
          <tr className="">
            <th className="px-6 lg:px-4 xl:px-0 flex gap-3  py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">Jack Anderson</div>
                <div className="text-gray-400">jackanderson@gmail.com</div>
              </div>
            </th>

            <td className="px-6 lg:px-4 xl:px-0 py-4 capitalize">Monthly</td>
            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">
              25/06/2024
            </td>

            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">$15</td>

            <td className="px-6 lg:px-4 xl:px-0 py-4">
              <button className="w-auto px-2 h-6 bg-green-500/10 border border-green-500 hover:opacity-80 text-green-500 rounded-full text-xs">
                Completed
              </button>
            </td>
          </tr>
          <tr className="">
            <th className="px-6 lg:px-4 xl:px-0 flex gap-3  py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">Jack Anderson</div>
                <div className="text-gray-400">jackanderson@gmail.com</div>
              </div>
            </th>

            <td className="px-6 lg:px-4 xl:px-0 py-4 capitalize">Monthly</td>
            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">
              25/06/2024
            </td>

            <td className="px-6 lg:px-4 xl:px-0 py-4  font-normal ">$15</td>

            <td className="px-6 lg:px-4 xl:px-0 py-4">
              <button className="w-auto px-2 h-6 bg-pink-500/10 border border-pink-500 hover:opacity-80 text-pink-500 rounded-full text-xs">
                Unsuccessfull
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
