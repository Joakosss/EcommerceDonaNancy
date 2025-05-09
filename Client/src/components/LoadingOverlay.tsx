import { FaSpinner } from "react-icons/fa";

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-[30%] bg-white/50">
      <div
        role="status"
        className="fixed top-[30%] left-1/2 transform -translate-x-1/2"
      >
        <FaSpinner className="animate-spin text-primary/80" size={100}/>
      </div>
    </div>
  );
};

export default LoadingOverlay;