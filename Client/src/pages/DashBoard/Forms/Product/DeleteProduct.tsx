import { useDeleteMutation } from "../../../../hooks/mutation/useDeleteMutation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  idProduct: string;
  onClose: () => void;
};

function DeleteProduct({ idProduct, onClose }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteMutation(
    `http://localhost:3000/productos/${idProduct}`,
    {
      onSuccess: () => {
        toast.success("Producto eliminado ", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["productos"] });
        onClose();
      },
      onError: () => {
        toast.error("Producto no eliminado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
      },
    }
  );
  return (
    <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
      <svg
        className="text-gray-400  w-11 h-11 mb-3.5 mx-auto"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <p className="mb-4 text-gray-500 ">
        ¿Estás seguro de que quieres eliminar este producto?
      </p>
      <div className="flex justify-center items-center space-x-4">
        <button
          data-modal-toggle="deleteModal"
          type="button"
          className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
          onClick={() => onClose()}
        >
          No, cancelar
        </button>
        <button
          type="submit"
          className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300   "
          onClick={() => mutate()}
        >
          Sí, Estoy seguro
        </button>
      </div>
    </div>
  );
}

export default DeleteProduct;
