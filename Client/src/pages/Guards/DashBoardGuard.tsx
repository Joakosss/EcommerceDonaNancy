import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function DashBoardGuard() {
    const {tokens} = useAuthStore();
    console.log(tokens)
    if (tokens?.autorization==="1") {
        return <Navigate to={"*"}></Navigate>
    }
    return <Outlet/>
}

export default DashBoardGuard