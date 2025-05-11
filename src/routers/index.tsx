import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LandingPage from "../components/LandingPage";
import GrantPermission from "../pages/GrantPermission";
import Join from "../pages/Join";
import ProtectRoute from '../contexts/ProtectRoute';
import Register from "../pages/Register";
import Login from "../pages/Login";
import ActiveChat from "../components/ActiveChat";

const router = createBrowserRouter([
  {
    element: <ProtectRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "/:chatID",
            element: <ActiveChat/>
          }
        ],
      },
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/grant-permission",
    element: <GrantPermission />,
  },
  {
    path: "join",
    element: <Join />,
  },
]);

export default router;


