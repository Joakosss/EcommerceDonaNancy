import { Link } from "react-router-dom";
import cartC from "../images/SadCart.svg";

function Page404() {
  return (
    <div className="grid place-items-center  h-full w-full">
      <img src={cartC} className="max-h-[500px]" />
      <h4 className="text-2xl font-bold text-[#1c4364]">Upss..</h4>
      <p className="text-xl font-bold text-[#1c4364]">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link className="text-white bg-primary hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center" to={"/"}>Ir a la página de inicio</Link>
    </div>
  );
}

export default Page404;
