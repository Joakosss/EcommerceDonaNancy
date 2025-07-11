import { menuItems } from "../../constants/dashBoardMenuItems";
import { FaKey, FaSignOutAlt } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import OptionSideBar from "../../components/OptionSideBar";
type Props = {
  isSidebarOpen: boolean;
};

function SideBar({ isSidebarOpen }: Props) {
  const { logout,tokens } = useAuthStore();
  const navigate = useNavigate();

  const filteredMenuItems = menuItems.filter((item) => {
    if (!tokens || !tokens.autorization) {
      logout();
      return;
    }
    if (item.label === "Usuarios") {
      return tokens.autorization === "0";
    }
    if (item.label === "Productos") {
      return tokens.autorization !== "4";
    }

    return true;
  });

  //no se ejecuta navigate hasta que logout se ejecute
  const handleLogOut = async () => {
    navigate("/");
    logout();
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {filteredMenuItems.map(({ label, icon: Icon }) => (
            <OptionSideBar
              key={label}
              Icon={Icon}
              text={label}
              onClick={() => navigate(`${label.toLowerCase()}/`)}
            />
          ))}
          <OptionSideBar
            key={"ModPassword"}
            text="Cambiar clave"
            onClick={() => navigate("cambiar_clave/")}
            Icon={FaKey}
          />
          <OptionSideBar
            key={"Logout"}
            text="Cerrar sesión"
            onClick={handleLogOut}
            Icon={FaSignOutAlt}
          />
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
