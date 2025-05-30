import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/NancySmall.svg";
import useShoppingCartStore from "../store/useShoppingCartStore";
import { FaMoneyBill, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import useExchange from "../store/useExchangeStore";
import useAuthStore from "../store/useAuthStore";
import OptionSideBar from "./OptionSideBar";
import { FaUser, FaUserPlus } from "react-icons/fa6";
import { productCategoryTypesConstants } from "../constants/productCategoryTypesConstants";

export default function Example() {
  const navigate = useNavigate();
  const { counterItems } = useShoppingCartStore();
  const [open, setOpen] = useState(false);
  const { exchange, setExchange } = useExchange();
  const { tokens, logout } = useAuthStore();

  /* function logOut */
  const handleLogOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 cursor-pointer"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            {/* Muestra sidebar segun login o no */}
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
              <ul className="space-y-1 font-medium">

                {productCategoryTypesConstants.map((category)=>(
                  <OptionSideBar key={category.slug} text={category.descripcion} onClick={() => {navigate(`productos/${category.slug}`)}} />
                ))}

                <hr className="text-primary" />
                {tokens ? (
                  <>
                    <OptionSideBar
                      key={"Logout"}
                      text="Cerrar sesión"
                      Icon={FaSignOutAlt}
                      onClick={handleLogOut}
                    />
                    <OptionSideBar
                      key={"miPerfil"}
                      text="Mi Perfil"
                      Icon={FaUser}
                      onClick={() => navigate(`/miPerfil/${tokens.id_usuario}`)}
                    />
                  </>
                ) : (
                  /* Sin login */
                  <>
                    <OptionSideBar
                      key={"Login"}
                      text="Conectarse"
                      Icon={FaSignInAlt}
                      onClick={() => navigate("login/")}
                    />
                    <OptionSideBar
                      key={"Register"}
                      text="Registrarse"
                      Icon={FaUserPlus}
                      onClick={() => navigate("registro/")}
                    />
                  </>
                )}
              </ul>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden cursor-pointer"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"}>
                  <span className="sr-only">Doña Nancy</span>
                  <img
                    alt="Logo dona nancy"
                    src={logo}
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
              {/* Navbar pantalla completa validando si esta logeado o no */}
              <div className="ml-auto flex">
                <div className="hidden lg:flex lg:items-center lg:text-center lg:space-x-3">
                  {productCategoryTypesConstants.map((categoria) => (
                    <NavbarItem
                      key={categoria.slug}
                      text={categoria.descripcion}
                      handleClick={() =>
                        navigate(`productos/${categoria.slug}`)
                      }
                    ></NavbarItem>
                  ))}

                  {tokens ? (
                    <>
                      <NavbarItem
                        key={"navLogout"}
                        text="Cerrar Sesión"
                        font="bold"
                        handleClick={handleLogOut}
                      />
                      <div className="ml-4 flow-root lg:ml-6">
                        <Link
                          to={`/miPerfil/${tokens.id_usuario}`}
                          className="group -m-2 flex items-center p-2"
                        >
                          <FaUser
                            aria-hidden="true"
                            className="size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                          />

                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </Link>
                      </div>
                    </>
                  ) : (
                    /* No esta logeado */
                    <>
                      <NavbarItem
                        font="bold"
                        key={"navLogin"}
                        text="Conectarse"
                        handleClick={() => navigate("login/")}
                      />
                      <NavbarItem
                        font="bold"
                        key={"navregister"}
                        text="Registrarse"
                        handleClick={() => navigate("registro/")}
                      />
                    </>
                  )}
                </div>
                {/* Tipo dinero */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    onClick={() => setExchange()}
                    className="group -m-2 flex items-center p-2"
                  >
                    <FaMoneyBill
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-bold text-gray-700 group-hover:text-gray-800">
                      {exchange}
                    </span>
                  </button>
                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a
                    onClick={() => navigate("carrito/")}
                    href=""
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 min-w-[17px]">
                      {counterItems < 99 ? counterItems : "+99"}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

type NavbarItemProps = {
  handleClick: () => void;
  text: string;
  font?: "medium" | "bold";
};
function NavbarItem({ handleClick, text, font = "medium" }: NavbarItemProps) {
  return (
    <button
      onClick={handleClick}
      className={`text-sm font-${font} text-gray-700 hover:text-gray-900 cursor-pointer`}
    >
      {text}
    </button>
  );
}
