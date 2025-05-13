import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
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

export default function Example() {
  const navigate = useNavigate();
  const { counterItems } = useShoppingCartStore();
  const [open, setOpen] = useState(false);
  const { exchange, setExchange } = useExchange();
  const { tokens, logout } = useAuthStore();

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
            {tokens ? (
              <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                <ul className="space-y-2 font-medium">
                  <OptionSideBar
                    key={"Logout"}
                    text="Cerrar sesión"
                    Icon={FaSignOutAlt}
                    onClick={logout}
                  />
                  <OptionSideBar
                    key={"miPerfil"}
                    text="Mi Perfil"
                    Icon={FaUser}
                    onClick={() => alert("navigate perfil")}
                  />
                </ul>
              </div>
            ) : (
              <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                <ul className="space-y-2 font-medium">
                  <OptionSideBar key={"Login"} text="Conectarse" Icon={FaSignInAlt} onClick={() => navigate("login/")} />
                  <OptionSideBar key={"Register"} text="Registrarse" Icon={FaUserPlus} onClick={() => navigate("registro/")} />
                </ul>
              </div>
            )}
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
              <div className="ml-auto flex items-center">
                {tokens ? (
                  <>
                    <NavbarItem key={"navLogout"} text="Cerrar Sesión" handleClick={logout} />
                    <div className="ml-4 flow-root lg:ml-6">
                      <a
                        onClick={() => navigate("/")}
                        href=""
                        className="group -m-2 flex items-center p-2"
                      >
                        <FaUser
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />

                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </>
                ) : (
                  /* No esta logeado */
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <NavbarItem key={"navLogin"} text="Conectarse" handleClick={() => navigate("login/")} />
                    <NavbarItem key={"navregister"} text="Registrarse" handleClick={() => navigate("registro/")} />
                  </div>
                )}
                {/* Search */}
                <div className="flex lg:ml-6">
                  <a
                    href=""
                    onClick={() => navigate("/productos/")}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Buscar</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
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
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
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
  handleClick: () => void
  text: string
}
function NavbarItem({ handleClick, text }: NavbarItemProps) {
  return (
    <>
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <button
          onClick={handleClick}
          className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
        >
          {text}
        </button>
      </div>
    </>
  )

}