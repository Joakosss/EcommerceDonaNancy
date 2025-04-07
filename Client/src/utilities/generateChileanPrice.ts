export const generateChileanPrice = (price: number) => {
  return price
  .toFixed(0) // Asegura que no haya decimales
  .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formatea con punto para miles
};
