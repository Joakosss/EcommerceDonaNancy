import { useQueryClient } from "@tanstack/react-query";
import { ProductType } from "../../../../types/ProductType";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import Input from "../../../../components/FormComponents/Input";
import Textarea from "../../../../components/FormComponents/Textarea";
import Select from "../../../../components/FormComponents/Select";
import useMutatePatchProduct from "../../../../hooks/NewQuerys/productQuerys/useMutatePatchProduct";
import { marcasConstants } from "../../../../constants/marcasConstants";
import { modelosConstants } from "../../../../constants/modelosConstants";

type Props = {
  product: ProductType;
  onClose: () => void;
};
type FormType = {
  nombre: string;
  descripcion: string;
  link_foto?: string;
  precio: number;
  stock: number;
  id_marca: string;
  id_modelo: string;
};

function UpdateProduct({ product, onClose }: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      nombre: product.nombre,
      descripcion: product.descripcion,
      link_foto: product.link_foto,
      precio: product.precio,
      stock: product.stock,
    },
  }); //Manejamos el formulario

  const { mutate, isPending } = useMutatePatchProduct();

  const onSubmit = (data: FormType) => {
    data.precio = Number(data.precio);
    data.stock = Number(data.stock);
    mutate(
      { id: product.id_producto!, newProduct: data },
      {
        onSuccess: () => {
          toast.success("Producto Modificado ", {
            hideProgressBar: true,
            position: "top-left",
            autoClose: 1000,
          });
          queryClient.invalidateQueries({ queryKey: ["productos"] });
          onClose();
        },
        onError: (error) => {
          toast.error("Producto no modificado", {
            hideProgressBar: true,
            position: "top-left",
            autoClose: 1000,
          });
        },
      }
    );
  };

  return (
    <>
      {isPending && <LoadingOverlay />}
      <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
        Modificar un producto
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          key={"nombreInput"}
          label="Nombre* "
          Placeholder="Ingrese nombre del producto"
          typeInput="text"
          error={errors.nombre}
          {...register("nombre", {
            required: "Es requerido",
          })}
        />
        <Textarea
          key={"descripcionInput"}
          label="Descripción* "
          Placeholder="Describe aquí..."
          error={errors.descripcion}
          {...register("descripcion", {
            required: "Es requerido",
          })}
        />

        <Input
          key={"linkFotoInput"}
          label="Link de la foto"
          Placeholder="Ingrese link (Opcional)"
          typeInput="text"
          error={errors.link_foto}
          {...register("link_foto")}
        />
        <Input
          key={"precioInput"}
          label="Precio* "
          Placeholder="ej: 990"
          typeInput="number"
          error={errors.precio}
          {...register("precio", {
            required: "Requerido",
            validate: (value) => value > 0 || "El precio debe ser mayor a 0",
          })}
        />
        <Input
          key={"stockInput"}
          label="stock* "
          Placeholder="ej: 1"
          typeInput="number"
          error={errors.stock}
          {...register("stock", {
            required: "Requerido",
            validate: (value) => value > 0 || "El stock debe ser mayor a 0",
          })}
        />
        <Select
          key={"marcasSelect"}
          label="Marca de producto* "
          options={marcasConstants}
          {...register("id_marca")}
        />
        <Select
          key={"ModeloSelect"}
          label="Tipo de producto* "
          options={modelosConstants}
          {...register("id_modelo")}
        />
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Modificar
        </button>
      </form>
    </>
  );
}

export default UpdateProduct;
