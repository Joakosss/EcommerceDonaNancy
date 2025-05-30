import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/NancySmall.svg";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Stepper from "./Stepper";
import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";
import { usePostMutation } from "../../hooks/mutation/UsePostMutation";
import Paso0 from "./Paso0";
import { UsuarioType } from "../../types/UsuarioType";
import { AxiosError } from "axios";
import Modal from "../../components/Modal";
import NancySmall from "../../images/NancySmall.svg";
import useMutatePostRegister from "../../hooks/NewQuerys/userQuerys/useMutatePostRegister";
type FormType = {
  nombre_usuario: string;
  contrasenia: string;
  confirmar_contrasenia: string;
  run_usuario: string;
  p_nombre: string;
  s_nombre?: string;
  p_apellido: string;
  s_apellido: string;
  telefono: number;
  correo: string;
  direccion?: string;
};

function Registro() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);

  const methods = useForm<FormType>({
    mode: "onChange",
  });
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const ChangeStep = (step: number) => setStep(step);

  const { mutate, error } = useMutatePostRegister();



  const onSubmit = (data: FormType) => {
    const { confirmar_contrasenia, ...rest } = data;
    const usuarioConPerfil = {
      ...rest,
      id_perfil: "1",
    };
    mutate(usuarioConPerfil, {
      onSuccess: () => {
        setIsModal(true);
      },
    });
  };

  return (
    <>
      <section className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <Link
            to={"/"}
            className="flex items-center mb-6 text-2xl font-semibold"
          >
            <img
              className="w-[130px] h-[130px]"
              src={logo}
              alt="logo"
              loading="eager"
            />
          </Link>

          <div className="w-full  rounded-lg shadow  md:mt-0 sm:max-w-lg xl:p-0 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
                Registrándose
              </h1>
              <Stepper step={step} ChangeStep={ChangeStep} />
              {error?.message && (
                <small className="font-bold text-red-600">
                  {error.message}
                </small>
              )}
              <FormProvider {...methods}>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  {step === 0 && <Paso0 onNext={nextStep} />}
                  {step === 1 && <Paso1 onNext={nextStep} />}
                  {step === 2 && <Paso2 onNext={nextStep} />}
                  {step === 3 && (
                    <>
                      <Paso3 onNext={nextStep} />
                      <button
                        type="submit"
                        className=" mt-3 w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Unirme
                      </button>
                    </>
                  )}
                  <p className="text-sm font-light text-gray-500 ">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                      to={"/login"}
                      className="font-medium text-primary hover:underline "
                    >
                      Conectarse
                    </Link>
                  </p>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isModal} onClose={() => navigate("/login")}>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
            ¡Te registraste con éxito!
          </h2>
          <img src={NancySmall} alt="logo nancy" className="w-20" />
          <p className="text-md font-medium md:text-lg">
            Nos alegra tenerte aquí.
          </p>
        </div>
        <button
          type="button"
          className=" mt-3 w-full text-white bg-primary hover:bg-primary/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>
      </Modal>
    </>
  );
}

export default Registro;
