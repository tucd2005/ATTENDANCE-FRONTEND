import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"
import NotFound from "../page/common/NotFound"
import { commonRoutes } from "./commonRoutes"
import authRoutes from "./authRoutes"
import { adminRoutes } from "./adminRoutes"

const routes : RouteObject[] = [
        ...commonRoutes,
        ...authRoutes,
        ...adminRoutes,
        
    {path: "*", element: <NotFound/>}
]

const Routes = createBrowserRouter(routes)
export const AppRoutes = () => {
    return (
        <>
            <RouterProvider router ={Routes}/>
        </>
    )
}