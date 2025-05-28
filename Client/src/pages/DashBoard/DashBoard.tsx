import { useState } from "react";
import NancySmall from "../../images/NancySmall.svg";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ToastContainer } from "react-toastify";
import { menuItems } from "../../constants/dashBoardMenuItems";
import { FaBars } from "react-icons/fa6";
import useAuthStore from "../../store/useAuthStore";

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [animationParent] = useAutoAnimate();

  return (
    <>
      <NavbarDashBoard
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <SideBar isSidebarOpen={isSidebarOpen} />
      <div className="p-4 bg-gray-100">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 min-h-[89vh]">
          {/* Menu de opciones */}
          <MenuDashBoard />
          {/*  */}
          {/* Tablas de actividades */}
          <div ref={animationParent} className="grid grid-cols-1 gap-4 ">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        style={{
          position: "fixed", // Fija la posición en la pantalla
          right: "20px", // Ajusta la distancia desde el borde derecho
          zIndex: 9999, // Asegura que esté encima de otros elementos
        }}
      />
    </>
  );
}

export default DashBoard;

function NavbarDashBoard({
  setIsSidebarOpen,
  isSidebarOpen,
}: {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  isSidebarOpen: boolean;
}) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {/* boton de sidebar */}
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            >
              <span className="sr-only">Abrir sideBar</span>
              <FaBars size={20} />
            </button>
            {/* Logo */}
            <Link to={"/dashboard"} className="flex ms-2 md:me-24">
              <img src={NancySmall} className="h-10 me-3" alt="FlowBite Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-primary">
                Doña Nancy
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MenuDashBoard() {
  const { tokens, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const filteredMenuItems = menuItems.filter((item) => {
    if (!tokens || !tokens.autorization) {
      logout();
      return;
    }
    if (item.label === "Usuarios") {
      return tokens.autorization === "0";
    }
    return true;
  });

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {filteredMenuItems.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center justify-center rounded-sm bg-white h-28 "
        >
          <button
            className="text-2xl text-gray-400 flex items-center justify-center flex-col"
            onMouseEnter={() => setIsHovered(label)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => navigate(`${label.toLowerCase()}/`)}
          >
            <Icon
              className={
                location.pathname === `/dashboard/${label.toLowerCase()}/` ||
                isHovered === label
                  ? "text-primary duration-250 size-14"
                  : "size-12 duration-250"
              }
            />

            <p
              className={
                location.pathname === `/dashboard/${label}/` ||
                isHovered === label
                  ? "duration-250 text-primary text-sm md:text-xl"
                  : "duration-250 text-gray-500 text-sm md:text-xl"
              }
            >
              {label}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}
