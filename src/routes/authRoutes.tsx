import { RouteObject } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginPage from "../page/auth/LoginPage";
import RegisterPage from "../page/auth/RegisterPage";
import ForgotPasswordPage from "../page/auth/ForgotPasswordPage";
import ResetPassword from "../page/auth/ResetPassword";

const authRoutes: RouteObject[] = [
    {
        element: <AuthLayout/>,
        children: [
            {path: "/login", element: <LoginPage/>},
            {path: "/register", element: <RegisterPage/>},
			{ path: "/forgot-password", element: <ForgotPasswordPage /> },
			{ path: "/reset-password/:resetToken", element: <ResetPassword /> },
        ]
    }
]
export default authRoutes