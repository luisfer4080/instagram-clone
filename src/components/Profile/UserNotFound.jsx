import SideBar from "../SideBar/SideBar";
import MorePop from "../SideBar/MorePop";
import CreateModal from '../CreatePost/CreateModal';

export default function UserNotFound({user}){
    const [show,setShow] = useState(false);
    const [createModal,setCreateModal] = useState(false);

    const showMenu = () => {
        if (show || createModal){
            setShow(false);
            setCreateModal(false)
        }

        return
    }

    const handlerMenu = (data) => {
        if (data == "esconder"){
            setShow(false)
        } else if(data == "mostrar"){
            setShow(true)
        }

        return
    }

    const handlerCreateModal = (data) => {
        if (data == "esconder"){
            setCreateModal(false)
        } else if(data == "mostrar"){
            setCreateModal(true)
        }

        return
    }

    return(
        <div onClick={showMenu}>
            <SideBar menu={handlerMenu} create={handlerCreateModal} show={show} showCreate={createModal} userData={user}/>
            <div className="user__not__found">
                <span className="user__not__found__text">
                    User Not Found
                </span>
            </div>
            <div>
                {show && <MorePop />}
            </div>
            <div>
                {createModal && <CreateModal />}
            </div>
        </div>
    )
}