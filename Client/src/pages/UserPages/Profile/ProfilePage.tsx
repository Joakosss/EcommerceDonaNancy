import { FaHouse, FaIdCard, FaUser } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useQueryGetUsers from "../../../hooks/NewQuerys/userQuerys/useQueryGetUsers";
import { FaEdit, FaEnvelope, FaPhone } from "react-icons/fa";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import Modal from "../../../components/Modal";
import UpdateUser from "./UpdateUser";
import { UsuarioType } from "../../../types/UsuarioType";
import UpdatePassword from "./UpdatePassword";

type ModalState =
  | { type: "update"; data: UsuarioType }
  | { type: "pass" }
  | { type: null };

function ProfilePage() {
  const [isModal, setIsModal] = useState<ModalState>({ type: null });

  const { id } = useParams();

  const {
    data: yourUser,
    isLoading,
    isError,
  } = useQueryGetUsers({ id_usuario: id! });

  if (isLoading || !yourUser) return <div>Cargando</div>;
  if (isError) return <div>Error</div>;

  return (
    <section className="bg-white py-8 antialiased  md:py-8">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <h2 className="mb-4 text-xl font-semibold sm:text-2xl md:mb-6 text-shadow-primary">
          Mis datos
        </h2>
        <div className="py-4 md:py-8 bg-white rounded px-4 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16 ">
            <div className="space-y-4 flex flex-col items-center place-content-center">
              <div className="flex space-x-4">
                <FaUser className="h-16 w-16 text-primary" />
                <div>
                  <h2 className="flex items-center text-xl font-bold leading-none text-primary sm:text-2xl">
                    {yourUser[0].s_nombre === null
                      ? `${yourUser[0].p_nombre} ${yourUser[0].p_apellido} ${yourUser[0].s_apellido}`
                      : `${yourUser[0].p_nombre} ${yourUser[0].s_nombre} ${yourUser[0].p_apellido} ${yourUser[0].s_apellido}`}
                  </h2>
                  <p className="text-lg font-medium text-shadow-primary sm:text-xl">
                    {yourUser[0].nombre_usuario}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <ItemProfile key="idCard" text="Rut" icon={FaIdCard}>
                {yourUser[0].run_usuario}
              </ItemProfile>
              <ItemProfile key="phone" text="Número de teléfono" icon={FaPhone}>
                {yourUser[0].telefono}
              </ItemProfile>
              <ItemProfile key="email" text="Email" icon={FaEnvelope}>
                {yourUser[0].correo}
              </ItemProfile>
              <ItemProfile key="direccion" text="Dirección" icon={FaHouse}>
                {yourUser[0].direccion
                  ? yourUser[0].direccion
                  : "Sin dirección"}
              </ItemProfile>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-auto"
                  onClick={() => {
                    setIsModal({ type: "update", data: yourUser[0] });
                  }}
                >
                  <FaEdit />
                  Editar tu perfil
                </button>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-auto"
                  onClick={() => {
                    setIsModal({ type: "pass" });
                  }}
                >
                  <FaEdit />
                  Cambiar contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        key={"Modal"}
        isOpen={isModal.type !== null}
        onClose={() => {
          setIsModal({ type: null });
        }}
      >
        {isModal.type === "update" && (
          <UpdateUser
            key={"UpdateUser"}
            onClose={() => {
              setIsModal({ type: null });
            }}
            user={yourUser[0]}
          />
        )}
        {isModal.type === "pass" && (
          <UpdatePassword
            key={"UpdatePassword"}
            onClose={() => {
              setIsModal({ type: null });
            }}
            id={yourUser[0].id_usuario!}
          />
        )}
      </Modal>
    </section>
  );
}

export default ProfilePage;

type ItemProfileProps = {
  text: string;
  icon: IconType;
  children: ReactNode;
};
function ItemProfile({ text, icon: Icon, children }: ItemProfileProps) {
  return (
    <dl>
      <dt className="font-semibold text-shadow-primary">{text}</dt>
      <dd className="flex items-center gap-1 text-gray-700">
        <Icon />
        {children}
      </dd>
    </dl>
  );
}
