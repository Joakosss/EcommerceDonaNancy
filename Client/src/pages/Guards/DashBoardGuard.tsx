import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function DashBoardGuard() {
    const {tokens} = useAuthStore();

    if (tokens?.autorization==="1") {
        return <Navigate to={"*"}></Navigate>
    } 
    if (tokens?.autorization!=="1") {
        return <Outlet/>
    } 
    return <Navigate to={"/"}></Navigate>
}

export default DashBoardGuard