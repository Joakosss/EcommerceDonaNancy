function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      {/* Imagen */}
      <div className="h-56 w-full">
        <svg
          className="w-full h-full text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="pt-6">
        {/* Titulo */}
        <div className="h-[48px] max-h-[48px]">
          <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>
        </div>
        {/* Precio */}
        <div className="mt-4  w-full">
          <div className="h-5 bg-gray-200 rounded-full max-w-[150px]"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
