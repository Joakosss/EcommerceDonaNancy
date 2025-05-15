import { createBrowserRouter } from "react-router-dom";
import FrontPage from "./UserPages/FrontPage";
import Layout from "../components/Layout";
import ProductPage from "./UserPages/ProductPage/ProductPage";
import CategoryPage from "./UserPages/CategoryPage/CategoryPage";
import ShopingCartPage from "./UserPages/ShopingCartPage/ShopingCartPage";
import Registro from "./Registro/Registro";
import Login from "./Login";
import Success from "./UserPages/reponseShopping/Success";
import Failure from "./UserPages/reponseShopping/Failure";
import MyPurchasesPage from "./UserPages/MyPurchasesPage/MyPurchasesPage";
import DashBoard from "./DashBoard/DashBoard";
import Page404 from "./Page404";
import DashBoardGuard from "./Guards/DashBoardGuard";
import ProfilePage from "./UserPages/Profile/ProfilePage";
import UpdatePass from "./DashBoard/UpdatePass";

const router = createBrowserRouter([
  //por cada ruta un objeto
  { path: "registro/", element: <Registro /> },
  { path: "login/", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <FrontPage /> },
      { path: "producto/:id/:slug", element: <ProductPage /> },
      { path: "productos/", element: <CategoryPage /> },
      { path: "carrito/", element: <ShopingCartPage /> },
      { path: "misCompras/", element: <MyPurchasesPage /> },
      { path: "success/", element: <Success /> }, //esto es lo que sale despues de venta exitosa
      { path: "miPerfil/:id", element: <ProfilePage /> },
      { path: "failure/:error", element: <Failure /> },
    ],
  },
  {
    element: <DashBoardGuard />,
    children: [
      {
        path: "DashBoard/", element: <DashBoard />, children: [
        ]
      },
      { path: "cambiar_clave/", element: <UpdatePass /> },
      { path: "Administrador/", element: <Layout />, children: [] },
      { path: "Vendedor/", element: <Layout />, children: [] },
      { path: "Bodeguero/", element: <Layout />, children: [] },
      { path: "Contador/", element: <Layout />, children: [] },
    ],
  },
  { path: "*", element: <Page404 /> },
]);

export default router;
