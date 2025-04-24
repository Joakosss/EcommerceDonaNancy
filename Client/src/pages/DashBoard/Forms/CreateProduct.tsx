import { useForm } from "react-hook-form";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { ProductType } from "../../../types/ProductType";
import { toast } from "react-toastify";
import { usePostMutation } from "../../../hooks/UsePostMutation";
import { productCategoryTypesConstants } from "../../../constants/productCategoryTypesConstants";
import { useQueryClient } from "@tanstack/react-query";

type FormType = {
  nombre: string;
  descripcion: string;
  link_foto?: string;
  precio: number;
  stock: number;
  id_categoria: string;
};
function CreateProduct({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>(); //Manejamos el formulario

  const { mutate, isPending } = usePostMutation<ProductType>(
    "http://localhost:3000/productos",
    {
      onSuccess: () => {
        toast.success("Producto registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
        queryClient.invalidateQueries({queryKey:["productos"]});
        onClose();
      },
      onError: () => {
        toast.error("Producto no registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
      },
    }
  );

  const onSubmit = (data: FormType) => {
    data.precio = Number(data.precio)
    data.stock = Number(data.stock)
    mutate(data);
  };

  return (
    <>
      {isPending && <LoadingOverlay />}

      <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
        Registrando un producto
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-3" id="nombreInput">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nombre*{" "}
            {errors.nombre?.message && (
              <small className="text-red-700">
                {errors.nombre?.message as string}{" "}
              </small>
            )}
          </label>
          <input
            type="text"
            id="nombre"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="El nombre"
            {...register("nombre", {
              required: "Es requerido",
            })}
          />
        </div>
        <div className="mt-3" id="descripcionInput">
          <label
            htmlFor="descripcion"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Descripcion*{" "}
            {errors.descripcion?.message && (
              <small className="text-red-700">
                {errors.descripcion?.message as string}
              </small>
            )}
          </label>
          <textarea
            cols={20}
            id="descripcion"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 resize-none"
            placeholder="Describe aquí..."
            {...register("descripcion", {
              required: "Es requerido",
            })}
          />
        </div>
        <div className="mt-3" id="linkFotoInput">
          <label
            htmlFor="link_foto"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Link de la foto{" "}
            {errors.link_foto?.message && (
              <small className="text-red-700">
                {errors.link_foto?.message as string}
              </small>
            )}
          </label>
          <input
            type="url"
            id="link_foto"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="Link de la foto"
            {...register("link_foto")}
          />
        </div>
        <div className="mt-3" id="precioInput">
          <label
            htmlFor="precio"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Precio*{" "}
            {errors.precio?.message && (
              <small className="text-red-700">
                {errors.precio?.message as string}{" "}
              </small>
            )}
          </label>
          <input
            type="number"
            id="precio"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="ej: 990"
            {...register("precio", {
              required: "Requerido",
              validate: (value) => value > 0 || "El precio debe ser mayor a 0",
            })}
          />
        </div>
        <div className="mt-3" id="stockInput">
          <label
            htmlFor="stock"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            stock*{" "}
            {errors.stock?.message && (
              <small className="text-red-700">
                {errors.stock?.message as string}{" "}
              </small>
            )}
          </label>
          <input
            type="number"
            id="stock"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            placeholder="ej: 1"
            {...register("stock", {
              required: "Requerido",
              validate: (value) => value > 0 || "El stock debe ser mayor a 0",
            })}
          />
        </div>
        <div className="mt-3" id="categoriaSelect">
          <label
            htmlFor="id_categoria"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tipo de producto*{" "}
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 cursor-pointer"
            {...register("id_categoria")}
          >
            {productCategoryTypesConstants.map((Category) => (
              <option key={Category.id} value={Category.id}>
                {Category.descripcion}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrar
        </button>
      </form>
    </>
  );
}

export default CreateProduct;
