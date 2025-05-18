import { Link } from "react-router-dom";
import { marcasConstants } from "../../../constants/marcasConstants";
import { modelosConstants } from "../../../constants/modelosConstants";
import { productCategoryTypesConstants } from "../../../constants/productCategoryTypesConstants";

type OptionBarProps = {
  categoryId: number;
};

function OptionBar({ categoryId }: OptionBarProps) {
  return (
    <div>
      <div className="m-1 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-medium flex flex-col">
            Categorias
          </h3>
          {productCategoryTypesConstants.map((category) => (
            <Link
              to={`/productos/${category.slug.toLowerCase()}/`}
              key={category.id}
              className="text-gray-700 text-sm sm:text-base hover:text-primary/80"
            >
              {category.descripcion}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-medium flex flex-col">
            Marcas
          </h3>
          <label
            htmlFor="todasMarca"
            className="text-gray-700 text-sm sm:text-base flex items-center"
          >
            <input
              defaultChecked
              type="radio"
              name="marca"
              id="todasMarca"
              value=""
              className="w-4 h-4 cursor-pointer"
            />
            Todas
          </label>
          {marcasConstants.map((marca) => (
            <label
              htmlFor={marca.descripcion}
              className="text-gray-700 text-sm sm:text-base flex items-center"
            >
              <input
                type="radio"
                name="marca"
                id={marca.descripcion}
                value={marca.id}
                className="w-4 h-4 cursor-pointer"
              />
              {marca.descripcion}
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-medium flex flex-col">
            Modelos
          </h3>
          <label
            htmlFor="modelo"
            className="text-gray-700 text-sm sm:text-base flex items-center"
          >
            <input
              defaultChecked
              type="radio"
              name="modelo"
              id="modelo"
              value=""
              className="w-4 h-4 cursor-pointer"
            />
            Todas
          </label>
          {modelosConstants
            .filter((modelo) => modelo.categoryId === String(categoryId))
            .map((modelo) => (
              <label
                htmlFor={modelo.descripcion}
                className="text-gray-700 text-sm sm:text-base flex items-center"
              >
                <input
                  type="radio"
                  name="modelo"
                  id={modelo.descripcion}
                  value={modelo.id}
                  className="w-4 h-4 cursor-pointer"
                />
                {modelo.descripcion}
              </label>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OptionBar;
