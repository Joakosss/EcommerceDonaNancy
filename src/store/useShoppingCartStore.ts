import { create } from "zustand";
import { ProductType } from "../types/ProductType";
import { persist } from "zustand/middleware";

type ShoppingCartStore = {
  shoppingCart: ProductCartType[];
  totalPrice: number;
  counterItems: number;
  add: (product: ProductType) => void;
  destroy: (id: string) => void;
  /* update: (id: string, newProduct: ProductType) => void; */
  empty: () => void;
  /* calculateTotal: () => number; */
  increase: (id: string) => void;
  decrease: (id: string) => void;
};

export type ProductCartType = {
  product: ProductType;
  quantity: number;
};

const useShoppingCartStore = create<ShoppingCartStore>()(
  persist(
    (set) => ({
      shoppingCart: [],
      totalPrice: 0,
      counterItems: 0,
      /*  */
      add: (product) =>
        set((state) => {
          const existingItem = state.shoppingCart.find(
            (p) => p.product.id_producto === product.id_producto
          );

          if (!existingItem) {
            return {
              ...state,
              shoppingCart: [
                ...state.shoppingCart,
                { product: product, quantity: 1 },
              ],
              totalPrice: state.totalPrice + product.precio,
              counterItems: state.counterItems + 1,
            };
          }
          return { ...state };
        }),

      /* Eliminar un objeto del carrito */
      destroy: (id) =>
        set((state) => {
          const itemRemoved = state.shoppingCart.find(
            (p) => p.product.id_producto === id
          );
          if (!itemRemoved) return state; /* si no existe retorna nada */
          const cartWithoutItem = state.shoppingCart.filter(
            (p) => p.product.id_producto !== id
          );
          return {
            ...state,
            shoppingCart: cartWithoutItem,
            totalPrice:
              state.totalPrice -
              itemRemoved.product.precio * itemRemoved.quantity,
            counterItems: state.counterItems - itemRemoved.quantity,
          };
        }),

      /* sin uso puede eliminarse */
 /*      update: (id, newProduct) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.map((p) =>
            p.product.id_producto === id ? { ...p, product: newProduct } : p
          ),
        })), */

      empty: () =>
        set(() => ({
          shoppingCart: [],
        })),


 /*      calculateTotal: () => {
        const { shoppingCart } = get();
        const result = shoppingCart.reduce(
          (accumulator, product) => {
            accumulator.totalPrice += product.product.precio * product.quantity;
            accumulator.totalProducts += product.quantity;
            return accumulator;
          },
          { totalPrice: 0, totalProducts: 0 } 
        );
        return result.totalProducts >= 4
          ? result.totalPrice * 0.75
          : result.totalPrice;
      }, */

      increase: (id) =>
        set((state) => {
          const itemRemoved = state.shoppingCart.find(
            (p) => p.product.id_producto === id
          );
          const newCart = state.shoppingCart.map((p) =>
            p.product.id_producto === id && p.quantity > 0
              ? { ...p, quantity: p.quantity + 1 }
              : p
          );
          return {
            ...state,
            shoppingCart: newCart,
            totalPrice: state.totalPrice + itemRemoved!.product.precio,
            counterItems:
              state.counterItems > 0
                ? state.counterItems + 1
                : state.counterItems,
          };
        }),

      decrease: (id) =>
        set((state) => {
          const itemRemoved = state.shoppingCart.find(
            (p) => p.product.id_producto === id
          );
          if (itemRemoved!.quantity <= 1) return state;

          const newCart = state.shoppingCart.map((p) =>
            p.product.id_producto === id && p.quantity > 1
              ? { ...p, quantity: p.quantity - 1 }
              : p
          );
          return {
            ...state,
            shoppingCart: newCart,
            totalPrice: state.totalPrice - itemRemoved!.product.precio,
            counterItems:
              state.counterItems > 1
                ? state.counterItems - 1
                : state.counterItems,
          };
        }),
    }),
    /* Aqui determino que guarde en este nombre el carrito de compras en localstorage */
    {
      name: "shopping-cart-storage",
    }
  )
);
export default useShoppingCartStore;
