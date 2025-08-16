import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenExpired } from "../utils";

export const ProtectRoute = ({ redirectPath = "/login" }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      // optionally redirect to login or set auth state to null
      // navigate('/', {replace: true});
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) return null

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} replace/>
  );
};

export default ProtectRoute;


// import { useEffect, useState } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { isTokenExpired } from "../utils";
// import { useDataContext } from ".";

// export const ProtectRoute = ({ redirectPath = "/login" }) => {
//   const location = useLocation();
//   const { isAuthenticated } = useDataContext();

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");

//   //   if (!token || isTokenExpired(token)) {
//   //     localStorage.removeItem("token");
//   //     localStorage.removeItem("userData");
//   //     // optionally redirect to login or set auth state to null
//   //     // navigate('/', {replace: true});
//   //     setIsAuthenticated(false);
//   //   } else {
//   //     setIsAuthenticated(true);
//   //   }
//   // }, []);

//   // if (isAuthenticated === null) return null;

//   return isAuthenticated ? (
//     <Outlet />
//   ) : (
//     <Navigate to={redirectPath} state={{ from: location }} replace />
//   );
// };

// export default ProtectRoute;
