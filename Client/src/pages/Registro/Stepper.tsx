type StepperProps = {
  step: number;
  ChangeStep: (step: number) => void;
};

const steps = [
  { id: 0, label: "Identidad" },
  { id: 1, label: "Información Básica" },
  { id: 2, label: "Contactos" },
  { id: 3, label: "Usuario" },
];

function Stepper({ step, ChangeStep }: StepperProps) {
  const getTextClass = (current: number) =>
    step >= current
      ? "text-primary hover:text-primary/90 cursor-pointer"
      : "text-gray-500 cursor-default";

  return (
    <div className="flex items-center justify-center space-x-2 text-sm sm:text-base  ">
      {steps.map((item, idx) => (
        <div key={item.id} className="flex items-center space-x-2 ">
          <span
            className={`font-medium ${getTextClass(item.id)}`}
            onClick={step >= item.id ? () => ChangeStep(item.id) : () => {}}
          >
            {item.label}
          </span>
          {idx < steps.length - 1 && <span className="text-gray-400">/</span>}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
