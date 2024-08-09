import defaultImg from '../../images/users/Default_pfp.svg.png'; 
import { useEffect, useState } from "react";

export default function ProfileImg({profile}){
    const [defImg, setDefImg] = useState(defaultImg); 

    useEffect(() =>{
        if(profile){
            if(profile.profilePictureUrl != ""){
                setDefImg(profile.profilePictureUrl)
            }
        }
    },[profile])

    return(
        <div className="profile__image__container">
            <div className="profile__image">
                <div className="profile__image__borders">
                    <button className="profile__image__button">
                        <img src={defImg}alt="profile_1" />
                    </button>
                </div>
            </div>
        </div>
    )
}