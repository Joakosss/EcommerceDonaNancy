import { useQueryClient } from "@tanstack/react-query";
import { ProductType } from "../../../../types/ProductType";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import { productCategoryTypesConstants } from "../../../../constants/productCategoryTypesConstants";
import { usePatchMutation } from "../../../../hooks/mutation/usePatchMutation";
import Input from "../../../../components/FormComponents/Input";
import Textarea from "../../../../components/FormComponents/Textarea";
import Select from "../../../../components/FormComponents/Select";
import { PedidoType } from "../../../../types/PedidoType";

type Props = {
  pedido: PedidoType;
  onClose: () => void;
};
type FormType = {
  fecha: Date;
  total: number;
  comprobante_pago?: string | null;
  id_estado_pedido: string;
  id_usuario: string;
  id_forma_pago: string;
  id_entrega: string;
};

function UpdatePedido({ pedido, onClose }: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      fecha: new Date(pedido.fecha),
      total: pedido.total,
      comprobante_pago: pedido.comprobante_pago,
      id_estado_pedido: pedido.id_estado_pedido,
      id_usuario: pedido.id_usuario,
      id_forma_pago: pedido.id_forma_pago,
      id_entrega: pedido.id_entrega,
    },
  }); //Manejamos el formulario

  const { mutate, isPending } = usePatchMutation<ProductType>(
    `http://localhost:3000/productos/${product.id}`,
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
      onError: () => {
        toast.error("Producto no modificado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
      },
    }
  );

  const onSubmit = (data: FormType) => {
    data.precio = Number(data.precio);
    data.stock = Number(data.stock);
    mutate(data);
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
          key={"categoriaSelect"}
          label="Tipo de producto* "
          options={productCategoryTypesConstants}
          {...register("id_categoria")}
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

export default UpdatePedido;
