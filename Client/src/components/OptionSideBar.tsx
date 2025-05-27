import { IconType } from "react-icons/lib";

type OptionSideBarProps = {
  Icon?: IconType;
  text: string;
  onClick: () => void;
};

function OptionSideBar({ Icon, text, onClick }: OptionSideBarProps) {
  return (
    <li>
      <button
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer min-w-[13rem]"
        onClick={onClick}
      >
        {Icon && (
          <Icon
            className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
            size={21}
          />
        )}
        <span className="ms-3">{text}</span>
      </button>
    </li>
  );
}
export default OptionSideBar;
