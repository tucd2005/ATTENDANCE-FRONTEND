import { RouteObject } from "react-router-dom";
import CommonLayout from "../components/layouts/CommonLayout";
import HomePage from "../page/common/HomePage";

export const commonRoutes: RouteObject[] = [
    {
        element: <CommonLayout/>,
        children : [
            {path: "/" , element: <HomePage/>}
        ]
    }
]