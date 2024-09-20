import React from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

const Revenue = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <div className="w-full h-12 flex justify-start items-center gap-2  relative">
        <input
          type="text"
          id="name"
          placeholder="e.g. John Smith"
          className="mt-2 block w-full rounded-full border border-gray-200 px-3 h-12 shadow-sm outline-none focus:border-gradient focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />

        <button className="active:scale-95 absolute right-1 top-2 rounded-full bg-purple-500 px-8 h-10 font-medium text-white outline-none   hover:opacity-90">
          Search
        </button>
      </div>
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white px-6 py-2 ">
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
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end items-center">
        <div className="w-auto flex justify-start items-center gap-1">
          <button className="w-10 h-10 rounded-lg  shadow border flex items-center justify-center text-xl text-[#191919] font-medium">
            <RxCaretLeft />
          </button>
          <button className="w-10 h-10 rounded-lg  hover:bg-purple-500 hover:text-white shadow border flex items-center justify-center text-sm text-[#191919] font-medium">
            01
          </button>
          <button className="w-10 h-10 rounded-lg  transition-all duration-150 hover:bg-purple-500 hover:text-white shadow border flex items-center justify-center text-sm text-[#191919] font-medium">
            02
          </button>
          <button className="w-10 h-10 rounded-lg  transition-all duration-150 hover:bg-purple-500 hover:text-white shadow border flex items-center justify-center text-sm text-[#191919] font-medium">
            03
          </button>
          <button className="w-10 h-10 rounded-lg  transition-all duration-150 hover:bg-purple-500 hover:text-white shadow border flex items-center justify-center text-sm text-[#191919] font-medium">
            04
          </button>
          <button className="w-10 h-10 rounded-lg  shadow border flex items-center justify-center text-xl text-[#191919] font-medium">
            <RxCaretRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
