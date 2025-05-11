import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../utils';

export const ProtectRoute = ({ redirectPath = "/login" }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        // optionally redirect to login or set auth state to null
        navigate('/', {replace: true});
      }

    return token ? <Outlet /> : <Navigate to={redirectPath} state={{ from: location }} />

}

export default ProtectRoute