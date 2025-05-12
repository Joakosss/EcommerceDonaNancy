import { IconType } from "react-icons/lib";
import { menuItems } from "../../constants/dashBoardMenuItems";
import { FaSignOutAlt } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
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
        </ul>
      </div>
    </aside>
  );
}
export default SideBar;
type OptionSideBarProps = {
  Icon: IconType;
  text: string;
  onClick: () => void;
};

function OptionSideBar({ Icon, text, onClick }: OptionSideBarProps) {
  return (
    <li>
      <button
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer min-w-[13rem]"
        onClick={onClick}
      >
        <Icon
          className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
          size={21}
        />

        <span className="ms-3">{text}</span>
      </button>
    </li>
  );
}
