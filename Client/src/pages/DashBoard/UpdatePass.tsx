import Modal from "../../components/Modal"
import useAuthStore from "../../store/useAuthStore"
import UpdatePassword from "../UserPages/Profile/UpdatePassword"

type Props = {}

function UpdatePass({}: Props) {
    const {tokens} = useAuthStore()
  return (
    <Modal key={"cambiar"} isOpen={true} onClose={()=>{}}>
        <UpdatePassword id={tokens!.id_usuario} onClose={()=>{}}/>
    </Modal>
  )
}

export default UpdatePass