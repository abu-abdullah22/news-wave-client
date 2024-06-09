import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AllArticlesApproval from "../Pages/Dashboard/AllArticlesApproval";
import AddPublishers from "../Pages/Dashboard/AddPublishers";
import AdminRoute from "./AdminRoute";
import AddArticles from "../Pages/user/AddAritcles";
import AllArticles from "../Pages/user/AllArticles";
import MyArticles from "../Pages/user/MyArticles";
import PremiumArticles from "../Premium/PremiumArticles";
import Error from '../Pages/Error/Error'
import ArticleDetails from "../Pages/user/ArticleDetails";
import Admin from "../Pages/Dashboard/Admin";
import UpdateArticle from "../Pages/user/UpdateArticle";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
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
        element: <PrivateRoute><AddArticles /></PrivateRoute>
      },
      {
        path: '/allArticles',
        element: <AllArticles></AllArticles>
      },
      {
        path: '/myArticles',
        element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
      },
      {
        path: '/premiumArticles',
        element: <PremiumArticles></PremiumArticles>
      },
      {
        path: '/article/:id',
        element:<PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>, 
      },
      {
        path: '/update/:id',
        element: <PrivateRoute><UpdateArticle></UpdateArticle></PrivateRoute>
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
      },
      {
        path: 'admin',
        element: <AdminRoute><Admin></Admin></AdminRoute>
      }
    ]
  }
]);

export default router;