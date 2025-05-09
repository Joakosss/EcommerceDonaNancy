import { FaSpinner } from "react-icons/fa";

const spinner = () => {
  return (
    <div className="relative top-30">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div role="status">
          <FaSpinner size={80} className="animate-spin text-primary" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default spinner;
