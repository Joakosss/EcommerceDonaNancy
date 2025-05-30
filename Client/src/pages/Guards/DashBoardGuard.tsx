import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function DashBoardGuard() {
    const { access, tokens, logout } = useAuthStore();
    const navigate = useNavigate()
    if (!tokens || tokens === null || !tokens.access_token) {
        navigate("/")
        logout()
    }

    if (access) {
        return <Navigate to={"/admin/changePassword"}></Navigate>
    }

    if (tokens?.autorization === "1") {
        return <Navigate to={"*"}></Navigate>
    }
    if (tokens?.autorization !== "1") {
        return <Outlet />
    }
    return <Navigate to={"/"}></Navigate>
}

export default DashBoardGuard