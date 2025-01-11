import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Register from "../componemts/Register";
import AddService from "../pages/AddService";
import Service from "../pages/Service";
import Login from "../componemts/Login";
import ServiceDetails from "../componemts/ServiceDetails";
import MyService from "../componemts/MyService";
import MyReview from "../componemts/MyReview";
import UpdateMyservice from "../componemts/UpdateMyservice";
import UpdatedReview from "../componemts/UpdatedReview";
import PrivateRoute from "./PrivateRoute";
import ErrorRoute from "./ErrorRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement:<ErrorRoute/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "service",
                element: <Service />
            },
            {
                path: "addService",
                element: <PrivateRoute> <AddService /></PrivateRoute>
            },
            {
                path: "/serviceDetails/:id",
                element: <PrivateRoute><ServiceDetails /></PrivateRoute>
            },
            {
                path: "myService",
                element: <PrivateRoute><MyService /></PrivateRoute>
            },
            {
                path: "myReview",
                element: <PrivateRoute><MyReview /></PrivateRoute>
            },
            {
                path: "/update-myService/:id",
                element: <PrivateRoute><UpdateMyservice /></PrivateRoute>
            },
            {
                path: "/update-myReview/:id",
                element: <PrivateRoute><UpdatedReview /></PrivateRoute>
            }
        ]
    }
])

export default router