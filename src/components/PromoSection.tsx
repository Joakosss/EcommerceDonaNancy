type Props = {};

function PromoSection({}: Props) {
  return (
    <>
      {/* <!-- component --> */}
      <div className="relative overflow-hidden bg-white">
        {/* <!-- Decorative background image and gradient --> */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-white bg-opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white"></div>
        </div>

        {/* <!-- Callout --> */}
        <section
          aria-labelledby="sale-heading"
          className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2
              id="sale-heading"
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              ¡Lleva Más, Paga Menos!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
              <strong>
                Después del 4to producto, obtén un 25% de descuento en todo lo
                adicional.
              </strong>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default PromoSection;
