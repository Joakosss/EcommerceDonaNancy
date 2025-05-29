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
import UserTable from "./DashBoard/WorkSpaces/UserTable";
import ProductTable from "./DashBoard/WorkSpaces/ProductTable";
import OrdersTable from "./DashBoard/WorkSpaces/OrdersTable";
import ProcessPay from "./UserPages/reponseShopping/ProcessPay";
import ChangePassAdmin from "./DashBoard/changePassAdmin";
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
      { path: "Productos/:category/", element: <CategoryPage /> },
      { path: "carrito/", element: <ShopingCartPage /> },
      { path: "misCompras/", element: <MyPurchasesPage /> },
      { path: "success/:idOrden", element: <Success /> }, //esto es lo que sale despues de venta exitosa
      { path: "processPay/:idPedido", element: <ProcessPay /> }, //esto es lo que sale despues de venta exitosa con transferencia
      { path: "miPerfil/:id", element: <ProfilePage /> },
      { path: "failure/:error", element: <Failure /> },
    ],
  },
  {
    element: <DashBoardGuard />,
    children: [
      {
        path: "dashboard/",
        element: <DashBoard />,
        children: [
          { path: "usuarios/", element: <UserTable /> },
          { path: "productos/", element: <ProductTable /> },
          { path: "informes/", element: <ProductTable /> },
          { path: "pedidos/", element: <OrdersTable /> },
          { path: "cambiar_clave/", element: <UpdatePass /> },
        ],
      }
    ],
  },
  { path: "admin/changePassword", element: <ChangePassAdmin /> },
  { path: "*", element: <Page404 /> },
]);

export default router;
