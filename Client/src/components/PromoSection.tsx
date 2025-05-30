function PromoSection() {
  return (
    <section
      aria-labelledby="sale-heading"
      className="relative mx-auto flex max-w-7xl flex-col items-center px-4 p-32 text-center sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h2
          id="sale-heading"
          className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl"
        >
          ¡Lleva Más, Paga Menos!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-xl text-primary/70">
          <strong>
            Después del 4to producto, obtén un 25% de descuento en todo lo
            adicional.
          </strong>
        </p>
      </div>
    </section>
  );
}
export default PromoSection;
