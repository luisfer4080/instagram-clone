import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoutes({children}) {
    const {user} = UserAuth();
    const navigate = useNavigate();
 
    useEffect(() => {  
        if(user === null){
            navigate("/",{replace: true})
        }    
    },[user,navigate])


    return children
}



