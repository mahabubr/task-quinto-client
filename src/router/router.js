import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import Team from "../components/Dashboard/Team/Team";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "",
        Component: Dashboard,
      },
      {
        path: "team",
        Component: Team,
      },
    ],
  },
]);

export default router;
