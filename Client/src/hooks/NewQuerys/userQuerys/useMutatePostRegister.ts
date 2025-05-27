import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { UsuarioType } from "../../../types/UsuarioType"

function useMutatePostRegister() {
    return useMutation({
        mutationFn:async(user:UsuarioType)=>{
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/usuarios",user)
                return response.data
            } catch (error:any) {
                throw new Error(error.response?.data.detail || "La solicitud de registro falló")
            }
        }
    })
}

export default useMutatePostRegister