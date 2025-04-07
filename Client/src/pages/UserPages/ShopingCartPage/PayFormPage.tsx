function PayFormPage() {
  return (
    <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
        <div className="min-w-0 flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 ">
              Preparemos tu compra
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fecha_entrega"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Fecha Entrega*
                </label>
                <input
                  type="date"
                  id="fecha_entrega"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Bonnie Green"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="your_email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Dirección*
                </label>
                <input
                  type="email"
                  id="your_email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <label
                    htmlFor="select-country-input-3"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Tipo Entrega*
                  </label>
                </div>
                <select
                  id="select-country-input-3"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option selected>United States</option>
                  <option value="AS">Australia</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <label
                    htmlFor="select-city-input-3"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Sucursal Entrega*
                  </label>
                </div>
                <select
                  id="select-city-input-3"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option selected>San Francisco</option>
                  <option value="NY">New York</option>
                  <option value="LA">Los Angeles</option>
                  <option value="CH">Chicago</option>
                  <option value="HU">Houston</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 ">Payment</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="credit-card"
                      aria-describedby="credit-card-text"
                      type="radio"
                      name="payment-method"
                      value=""
                      className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                      checked
                    />
                  </div>

                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="credit-card"
                      className="font-medium leading-none text-gray-900 "
                    >
                      MercadoPago
                    </label>
                    <p
                      id="credit-card-text"
                      className="mt-1 text-xs font-normal text-gray-500 "
                    >
                      Paga con MercadoPago
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="pay-on-delivery"
                      aria-describedby="pay-on-delivery-text"
                      type="radio"
                      name="payment-method"
                      value=""
                      className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                    />
                  </div>

                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="pay-on-delivery"
                      className="font-medium leading-none text-gray-900"
                    >
                      Paga con transferencia
                    </label>
                    <p
                      id="pay-on-delivery-text"
                      className="mt-1 text-xs font-normal text-gray-500"
                    >
                      Paga con transferencia (debes esperar su aprovación)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PayFormPage;
