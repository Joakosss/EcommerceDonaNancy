import { useForm } from "react-hook-form";
import useMutatePatchUser from "../../hooks/NewQuerys/userQuerys/useMutatePatchUser";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay";
import Input from "../../components/FormComponents/Input";

type FormType = {
    contrasenia: string;
    contrasenia2: string;
};

function UpdatePass() {
    const { tokens } = useAuthStore()
    const navigate = useNavigate();
    const id = tokens!.id_usuario
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormType>(); //Manejamos el formulario

    const password = watch("contrasenia");
    const { mutate, isPending } = useMutatePatchUser();

    const onSubmit = (data: FormType) => {
        const newUser = data;
        mutate(
            { id, newUser },
            {
                onSuccess: async () => {
                    await toast.success("Tu contraseña ha sido modificado ", {
                        hideProgressBar: true,
                        position: "top-left",
                        autoClose: 1000,
                    });
                    navigate("DashBoard/");
                },
                onError: () => {
                    toast.error("Tu contraseña no ha modificado", {
                        hideProgressBar: true,
                        position: "top-left",
                        autoClose: 1000,
                    });
                },
            }
        );
    };

    return (
        <section className="bg-gray-200 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6  mx-auto h-screen">


                {isPending && <LoadingOverlay />}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
                    Modificar Contraseña
                </h1>
                <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        key={"contrasenia"}
                        label="Contraseña* "
                        Placeholder="**********"
                        typeInput="password"
                        error={errors.contrasenia}
                        {...register("contrasenia", {
                            required: "Es requerido",
                        })}
                    />
                    <Input
                        key={"contrasenia2"}
                        label="Repite Contraseña* "
                        Placeholder="**********"
                        typeInput="password"
                        error={errors.contrasenia2}
                        {...register("contrasenia2", {
                            required: "Es requerido",
                            validate: (value) =>
                                value === password || "Las contraseñas no coinciden",
                        })}
                    />

                    <button
                        type="submit"
                        className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Modificar
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UpdatePass