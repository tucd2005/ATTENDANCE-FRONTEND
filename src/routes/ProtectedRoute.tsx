import { jwtDecode } from "jwt-decode";
import { RoleEnum } from "../common/types";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: RoleEnum[];
}
function isTokenExpired(token?:string | null) : boolean {
    if(!token) return true;
    try {
        const decoded: any = jwtDecode(token);
        if(!decoded.exp) return true;
        const now = Date.now() / 1000;
        return decoded.exp < now;
    } catch (error) {
        return true;
    }
}

const ProtectedRoute = ({children, allowedRoles} : ProtectedRouteProps) => {
    const user: any = JSON.parse(localStorage.getItem("user") || "null");
    const accessToken = localStorage.getItem("accessToken");

    if(!user || !accessToken || isTokenExpired(accessToken) || !allowedRoles.includes(user.role)) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        return <Navigate to="/login" replace />
    }
  return  children
}

export default ProtectedRoute
