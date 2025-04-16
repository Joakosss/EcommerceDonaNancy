import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {};

function Layout({}: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        position="top-right"
        style={{
          position: "fixed", // Fija la posición en la pantalla
          right: "20px", // Ajusta la distancia desde el borde derecho
          zIndex: 9999, // Asegura que esté encima de otros elementos
        }}
      />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
