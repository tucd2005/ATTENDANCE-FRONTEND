import { RouteObject } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import UserManagementPage from "../page/admin/manager-user/UserManagementPage";
import ProtectedRoute from "./ProtectedRoute";
import { RoleEnum } from "../common/types";

export const adminRoutes: RouteObject[] = [
    {
        path: "/super-admin",
        element: (
    <ProtectedRoute allowedRoles={[RoleEnum.SUPER_ADMIN]}>
        <AdminLayout />
    </ProtectedRoute>    
    
    ),
        children: [
            {path:"users", element: <UserManagementPage/> }
        ]
    }
]