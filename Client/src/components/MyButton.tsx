import { ReactNode } from "react";

type MyBotonProps = {
  variant?: "primary" | "secondary" | "secondaryFull";
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  preBuildChildren?: "shopingCart" | undefined;
};

function MyButton({
  variant = "primary",
  onClick = () => {},
  children,
  preBuildChildren,
}: MyBotonProps) {
  const styles = {
    primary:
      "inline-flex whitespace-nowrap items-center justify-center text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md",
    secondaryFull:
      "inline-flex whitespace-nowrap items-center justify-center text-sm py-2.5 px-4 w-full font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-primary-700",
    secondary:
      "inline-flex whitespace-nowrap items-center justify-center text-sm py-2.5 px-4 w-auto font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-primary-700",
  };
  const preBuilds = {
    shopingCart: (
      <>
        <svg
          className="-ms-2 me-2 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>
        Añadir al carro
      </>
    ),
  };

  return (
    <button className={styles[variant]} onClick={onClick}>
      {preBuildChildren ? preBuilds[preBuildChildren] : children}
    </button>
  );
}

export default MyButton;
