import { createBrowserRouter } from "react-router-dom";
import FrontPage from "./UserPages/FrontPage";
import Layout from "../components/Layout";
import ProductPage from "./UserPages/ProductPage/ProductPage";
import CategoryPage from "./UserPages/CategoryPage/CategoryPage";
import ShopingCartPage from "./UserPages/ShopingCartPage/ShopingCartPage";
import OrderHistoryPage from "./UserPages/OrderHistoryPage";
import OrderPage from "./UserPages/OrderPage";
import Registro from "./Registro";
import Login from "./Login";

const router = createBrowserRouter([
  //por cada ruta un objeto
  { path: "registro/", element:<Registro/>},
  { path: "login/", element:<Login/>},
  { path: "/", element: <Layout />, children: [
    {index:true,element:<FrontPage/>},
    {path:"producto/:id/:slug",element:<ProductPage/>},
    {path:"productos/",element:<CategoryPage/>},
    {path:"carrito/",element:<ShopingCartPage/>},
    {path:"misCompras/",element:<OrderHistoryPage/>},
    {path:"misCompras/",element:<OrderPage/>},
  ] },
]);

export default router;
