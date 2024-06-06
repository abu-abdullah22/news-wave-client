import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddAritcles from "../Pages/AddAritcles";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AllArticlesApproval from "../Pages/Dashboard/AllArticlesApproval";
import AddPublishers from "../Pages/Dashboard/AddPublishers";
import AdminRoute from "./AdminRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/addArticles',
        element: <PrivateRoute><AddAritcles></AddAritcles></PrivateRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
    children: [
      {
        path: 'allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'allArticlesApproval',
        element: <AdminRoute><AllArticlesApproval></AllArticlesApproval></AdminRoute>
      },
      {
        path: 'addPublishers',
        element: <AdminRoute><AddPublishers></AddPublishers></AdminRoute>
      }
    ]
  }
]);

export default router;