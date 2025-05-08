import { useForm } from "react-hook-form";
import { usePostMutation } from "../../../../hooks/mutation/UsePostMutation";
import { UsuarioType } from "../../../../types/UsuarioType";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../../components/LoadingOverlay";
import { userTypesConstants } from "../../../../constants/userTypesConstants";
import { useQueryClient } from "@tanstack/react-query";
import Input from "../../../../components/FormComponents/Input";
import Select from "../../../../components/FormComponents/Select";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";

type FormType = {
  run_usuario: string;
  p_nombre: string;
  p_apellido: string;
  s_apellido: string;
  telefono: number;
  id_perfil: string;
};

function CreateUser() {
  const queryClient = useQueryClient();
  pdfMake.vfs = pdfFonts.vfs;

  const [isNewUser, setIsNewUser] = useState<UsuarioType | null>(null);
  const [ispassword, setIspassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>(); //Manejamos el formulario

  const { mutate, isPending } = usePostMutation<UsuarioType>(
    "http://127.0.0.1:8000/api/usuarios",
    {
      onSuccess: (data) => {
        toast.success("Usuario registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
        setIsNewUser(data);
        queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      },
      onError: () => {
        toast.error("Usuario no registrado", {
          hideProgressBar: true,
          position: "top-left",
          autoClose: 1000,
        });
      },
    }
  );

  const onSubmit = (data: FormType) => {
    //Aqui va generar un correo con nombres @donaNancy.cl
    const correo = `${data.p_nombre?.toLowerCase()}.${data.p_apellido?.toLowerCase()}@donaNancy.cl`;
    const nombre_usuario = `${data.p_nombre
      .slice(0, 3)
      .toLowerCase()}.${data.p_apellido.slice(0, 3).toLowerCase()}`;
    const contrasennia = `${data.p_nombre
      .slice(0, 3)
      .toLowerCase()}.${data.p_apellido
      .slice(0, 3)
      .toLowerCase()}${data.telefono.toString().slice(0, 2)}`;
    setIspassword(contrasennia)
    const user: UsuarioType = {
      run_usuario: data.run_usuario,
      nombre_usuario: nombre_usuario,
      p_nombre: data.p_nombre,
      p_apellido: data.p_apellido,
      s_apellido: data.s_apellido,
      telefono: data.telefono,
      id_perfil: data.id_perfil,
      correo: correo,
      contrasenia: contrasennia,
    };
    mutate(user);
  };

  const getDocDefinition = (user: UsuarioType): TDocumentDefinitions => {
    const fullName = [user.p_nombre, user.p_apellido, user.s_apellido]
      .filter(Boolean)
      .join(" ");

    return {
      content: [
        {
          text: "Usuario",
          style: "header",
        },
        {
          style: "detailsTable",
          table: {
            widths: ["auto", "*"],
            body: [
              [
                { text: "Nombre:", style: "label" },
                { text: fullName, style: "value" },
              ],
              [
                { text: "Correo:", style: "label" },
                { text: user.correo, style: "value" },
              ],
              [
                { text: "Teléfono:", style: "label" },
                { text: user.telefono.toString(), style: "value" },
              ],
              [
                { text: "Perfil:", style: "label" },
                {
                  text: userTypesConstants.find(
                    (type) => type.id === isNewUser?.id_perfil
                  )?.descripcion,
                  style: "value",
                },
              ],
              [
                { text: "Usuario:", style: "label" },
                { text: user.nombre_usuario, style: "value" },
              ],
              [
                { text: "Contraseña:", style: "label" },
                { text: ispassword, style: "value" },
              ],
            ],
          },
          layout: "noBorders",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [20, 0, 20, 12] as [number, number, number, number],
          alignment: "center" as const,
        },
        label: {
          fontSize: 12,
          bold: true,
          margin: [20, 4, 20, 4] as [number, number, number, number],
        },
        value: {
          fontSize: 12,
          margin: [20, 4, 20, 4] as [number, number, number, number],
        },
      },
    };
  };

  return (
    <>
      {/* Formulario creando usuario */}
      {isNewUser === null ? (
        <>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
            Registrando un usuario
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              key={"runInput"}
              label="Run* "
              Placeholder="ej: 10100100-8"
              typeInput="text"
              error={errors.run_usuario}
              {...register("run_usuario", {
                required: "Es requerido",
                pattern: {
                  value: /^\d{1,2}\d{3}\d{3}-[\dkK]$/,
                  message: "Rut no válido verifica guion y digito verificador",
                },
              })}
            />
            <Input
              key={"nombreInput"}
              label="Primer Nombre* "
              Placeholder="Tu primer nombre"
              typeInput="text"
              error={errors.p_nombre}
              {...register("p_nombre", {
                required: "Es requerido",
              })}
            />
            <Input
              key={"pApellidoInput"}
              label="Primer Apellido* "
              Placeholder="Tu primer apellido"
              typeInput="text"
              error={errors.p_apellido}
              {...register("p_apellido", {
                required: "Es requerido",
              })}
            />
            <Input
              key={"sApellidoInput"}
              label="Segundo Apellido* "
              Placeholder="Tu segundo apellido"
              typeInput="text"
              error={errors.s_apellido}
              {...register("s_apellido", {
                required: "Es requerido",
              })}
            />
            <Input
              key={"telefonoInput"}
              label="Teléfono* "
              Placeholder="Ej: 912345678"
              typeInput="text"
              error={errors.telefono}
              {...register("telefono", {
                required: "Es requerido",
              })}
            />
            <Select
              key={"tipoUsuarioSelect"}
              label="Tipo de cuenta* "
              options={userTypesConstants.filter(
                (type) =>type.id !== "0"&&type.id !== "1"
              )}
              error={errors.id_perfil}
              {...register("id_perfil", {
                required: "Debes seleccionar una categoría",
                validate: (value) =>
                  value !== "" || "Selecciona una categoría válida",
              })}
            />

            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrar
            </button>
          </form>
        </>
      ) : (
        /* Parte donde se muestran los resultados */
        <>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
              Usuario
            </h1>
            <div
              key={"Nombre"}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-2"
            >
              <dt className="text-sm font-medium text-gray-600 w-24">
                Nombre:
              </dt>
              <dd className="text-lg text-gray-900">
                {isNewUser.p_nombre} {isNewUser.p_apellido}{" "}
                {isNewUser.s_apellido}
              </dd>
            </div>
            <div
              key={"Correo"}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-2"
            >
              <dt className="text-sm font-medium text-gray-600 w-24">
                Correo:
              </dt>
              <dd className="text-lg text-gray-900">{isNewUser.correo}</dd>
            </div>
            <div
              key={"telefono"}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-2"
            >
              <dt className="text-sm font-medium text-gray-600 w-24">
                Teléfono:
              </dt>
              <dd className="text-lg text-gray-900">{isNewUser.telefono}</dd>
            </div>
            <div
              key={"perfil"}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-2"
            >
              <dt className="text-sm font-medium text-gray-600 w-24">
                Perfil:
              </dt>
              <dd className="text-lg text-gray-900">
                {
                  userTypesConstants.find(
                    (type) => type.id === isNewUser.id_perfil
                  )?.descripcion
                }
              </dd>
            </div>
            <div
              key={"nombre_usuario"}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-2"
            >
              <dt className="text-sm font-medium text-gray-600 w-24">
                Usuario:
              </dt>
              <dd className="text-lg text-gray-900">
                {isNewUser.nombre_usuario}
              </dd>
            </div>
            <div
              key={"contrasenia"}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-2"
            >
              <dt className="text-sm font-medium text-gray-600 w-24">
                Contraseña:
              </dt>
              <dd className="text-lg text-gray-900">{ispassword}</dd>
            </div>
          </div>

          <FaRegFilePdf
            className="size-7 text-primary cursor-pointer my-2.5"
            onClick={() =>
              pdfMake.createPdf(getDocDefinition(isNewUser)).open()
            }
          />
        </>
      )}
      {isPending && <LoadingOverlay />}
    </>
  );
}

export default CreateUser;
