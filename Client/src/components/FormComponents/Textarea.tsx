import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  error?: FieldError;
  Placeholder: string;
};

function Textarea({ label, error, Placeholder, ...props }: Props) {
  return (
    <div className="mt-3" id={label}>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
        {error && <small className="text-red-700">{error.message}</small>}
      </label>
      <textarea
        cols={20}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 resize-none outline-none"
        placeholder={Placeholder}
        {...props}
      />
    </div>
  );
}

export default Textarea;
