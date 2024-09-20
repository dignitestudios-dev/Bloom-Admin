import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  IoChatboxEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";
import { GrUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { WiDayCloudyWindy } from "react-icons/wi";

export const sidebar = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    url: "/dashboard",
  },
  {
    title: "Chats",
    icon: <IoChatboxEllipsesOutline />,
    url: "/chats",
  },
  {
    title: "Users",
    icon: <HiOutlineUserGroup />,
    url: "/users",
  },
  // {
  //   title: "Revenue",
  //   icon: <LuBadgeDollarSign />,
  //   url: "/revenue",
  // },
  {
    title: "Notifications",
    icon: <IoNotificationsOutline />,
    url: "/notifications",
  },

  {
    title: "Categories",
    icon: <MdOutlineCategory />,
    url: "/categories",
  },

  {
    title: "Update Password",
    icon: <RxUpdate />,
    url: "/profile/change-password",
  },
];
