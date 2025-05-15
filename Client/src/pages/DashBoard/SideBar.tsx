import { menuItems } from "../../constants/dashBoardMenuItems";
import { FaKey, FaSignOutAlt } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import OptionSideBar from "../../components/OptionSideBar";
type Props = {
  isSidebarOpen: boolean;
  setIsSelected: (label: string) => void;
};

function SideBar({ isSidebarOpen, setIsSelected }: Props) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  //no se ejecuta navigate hasta que logout se ejecute
  const handleLogOut = async () => {
    await logout();
    navigate("/");
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
          {menuItems.map(({ label, icon: Icon }) => (
            <OptionSideBar
              key={label}
              Icon={Icon}
              text={label}
              onClick={() => setIsSelected(label)}
            />
          ))}
          <OptionSideBar
            key={"Logout"}
            text="Cerrar sesión"
            onClick={handleLogOut}
            Icon={FaSignOutAlt}
          />
          <OptionSideBar
            key={"ModPassword"}
            text="Cambiar clave"
            onClick={()=>navigate("/cambiar_clave/")}
            Icon={FaKey}
          />
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;