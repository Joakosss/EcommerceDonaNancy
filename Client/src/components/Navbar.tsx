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
import { FaMoneyBill } from "react-icons/fa";
import useExchange from "../store/useExchangeStore";
import useAuthStore from "../store/useAuthStore";

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
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <button
                    onClick={logout}
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link
                    to={"login/"}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Conectarse
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    to={"registro/"}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Registrarse
                  </Link>
                </div>
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
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <button
                      onClick={logout}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  /* No esta logeado */
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to={"login/"}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Conectarse
                    </Link>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    <Link
                      to={"registro/"}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Registrarse
                    </Link>
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
                    onClick={() => navigate("/carrito/")}
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
