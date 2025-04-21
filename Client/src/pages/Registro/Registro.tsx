import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/NancySmall.svg";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Stepper from "./Stepper";
import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";
import { useRegister } from "../../hooks/useRegister";
import { UsuarioType } from "../../types/UsuarioType";

type FormType = {
  nombre_usuario: string;
  contrasenia: string;
  confirmar_contrasenia: string;
  p_nombre: string;
  s_nombre?: string;
  p_apellido: string;
  s_apellido: string;
  telefono: number;
  correo_electronico: string;
  direccion?: string;
};

function Registro() {
  const methods = useForm<FormType>({
    mode: "onChange",
  });
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const ChangeStep = (step: number) => setStep(step);

  const registerMutation = useRegister();
  const navigate = useNavigate()
  const onSubmit = (data: FormType) => {
    registerMutation.mutate({ user: data },{onSuccess:()=>{
      navigate("/login")
    }});
  };

  return (
    <section className="bg-gray-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={"/"}
          className="flex items-center mb-6 text-2xl font-semibold dark:text-black"
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Registrándose
            </h1>
            <Stepper step={step} ChangeStep={ChangeStep} />
            <FormProvider {...methods}>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {step === 1 && <Paso1 onNext={nextStep} />}
                {step === 2 && <Paso2 onNext={nextStep} />}
                {step === 3 && (
                  <>
                    <Paso3 onNext={nextStep} />
                    <button
                      type="submit"
                      className=" mt-3 w-full text-white bg-[#1c4364] hover:bg-[#1c4464e5]  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Unirme
                    </button>
                  </>
                )}
                <p className="text-sm font-light text-gray-500 ">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-[#1c4364] hover:underline "
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
  );
}

export default Registro;
