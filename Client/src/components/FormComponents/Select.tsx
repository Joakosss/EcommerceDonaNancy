import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  error?: FieldError;
  options: { id: number | string; descripcion: string }[];
};

function Select({ label, error, options, ...props }: Props) {
  return (
    <div className="mt-3" id={label}>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
        {error && <small className="text-red-700">{error.message}</small>}
      </label>
      <select
        className={"bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 cursor-pointer outline-none"}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className={option.id === "" ? "text-gray-600" : ""}
          >
            {option.descripcion}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
