import React, { useEffect, useState } from "react";

const EventsCard = ({ post }) => {
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [time, setTime] = useState(null);

  function formatISODate(isoString) {
    const date = new Date(isoString);

    // Get month and day
    const month = String(date.getMonth() + 1).padStart(2, "0");
    setMonth(month); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    setDate(day);

    // Format time
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Converts 0 hours to 12

    const formattedDate = `${month}/${day}`;
    const formattedTime = `${hours}:${minutes} ${period}`;
    setTime(`${hours} ${period}`);

    return {
      formattedDate,
      formattedTime,
    };
  }

  useEffect(() => {
    formatISODate(post?.createdAt);
  }, []);
  return (
    <div class="flex flex-col w-full bg-white rounded-3xl shadow-lg ">
      <div
        class="w-full h-44 bg-top bg-cover rounded-t"
        style={{
          backgroundImage: `url(${post?.image})`,
        }}
      ></div>
      <div class="flex flex-col w-full md:flex-row">
        <div class="flex flex-row justify-around p-4 font-bold leading-none text-white uppercase bg-purple-500 rounded-bl md:flex-col md:items-center md:justify-center md:w-1/4">
          <div class="md:text-xl">{month}</div>
          <div class="md:text-3xl">{date}</div>
          <div class="md:text-xl">{time}</div>
        </div>
        <div class="p-4 font-normal text-gray-800 md:w-3/4">
          <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-800">
            {post?.title}
          </h1>
          <p class="leading-normal text-sm ">
            {post?.description?.length > 200
              ? post?.description?.slice(0, 200) + "..."
              : post?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
