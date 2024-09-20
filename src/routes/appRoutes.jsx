import Categories from "../pages/App/categories/Categories";
import AppLayout from "../layouts/AppLayout";
import { Chats } from "../pages/App/Chats";
import Dashboard from "../pages/App/Dashboard";
import Notifications from "../pages/App/Notifications";
import Revenue from "../pages/App/Revenue";
import Users from "../pages/App/Users";
import DailyDevo from "../pages/App/categories/DailyDevo";
import ChangePassword from "../pages/App/profile/ChangePassword";
import CreatePost from "../pages/App/CreatePost";

export const appRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    page: <AppLayout page={<Dashboard />} />,
  },
  {
    title: "Chats",
    url: "/chats",
    page: <AppLayout page={<Chats />} />,
  },
  {
    title: "Users",
    url: "/users",
    page: <AppLayout page={<Users />} />,
  },
  // {
  //   title: "Revenue",
  //   url: "/revenue",
  //   page: <AppLayout page={<Revenue />} />,
  // },
  {
    title: "Notifications",
    url: "/notifications",
    page: <AppLayout page={<Notifications />} />,
  },
  {
    title: "Change Password",
    url: "/profile/change-password",
    page: <AppLayout page={<ChangePassword />} />,
  },
  {
    title: "Categories",
    url: "/categories",
    page: <AppLayout page={<Categories />} />,
  },
  {
    title: "Daily Devo",
    url: "/categories/daily-devo",
    page: <AppLayout page={<DailyDevo />} />,
  },
  {
    title: "Create Post",
    url: "/create-post",
    page: <AppLayout page={<CreatePost />} />,
  },
];
