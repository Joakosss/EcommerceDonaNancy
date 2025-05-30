import { useForm } from "react-hook-form";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Input from "../../../../components/FormComponents/Input";
import Textarea from "../../../../components/FormComponents/Textarea";
import Select from "../../../../components/FormComponents/Select";
import useMutatePostProduct from "../../../../hooks/NewQuerys/productQuerys/useMutatePostProduct";
import { marcasConstants } from "../../../../constants/marcasConstants";
import { modelosConstants } from "../../../../constants/modelosConstants";

type FormType = {
  nombre: string;
  descripcion: string;
  link_foto: string;
  precio: number;
  stock: number;
  id_marca: string;
  id_modelo: string;
};
function CreateProduct({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutatePostProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>(); //Manejamos el formulario

  const onSubmit = (data: FormType) => {
    data.precio = Number(data.precio);
    data.stock = Number(data.stock);
    data.link_foto = data.link_foto || "";
    mutate(data, {
      onSuccess: () => {
        toast.success("Producto registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["productos"] });
        onClose();
      },
      onError: (error) => {
        toast.error("Producto no registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
      },
    });
  };

  return (
    <>
      {isPending && <LoadingOverlay />}
      <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
        Registrando un producto
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          Registrar
        </button>
      </form>
    </>
  );
}

export default CreateProduct;
