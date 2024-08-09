import defaultImg from '../../images/users/Default_pfp.svg.png';
import { useState , useEffect } from 'react';

export default function Profile({handdleActive,active,showText,userProfile}){
    
    const [defImg, setDefImg] = useState(defaultImg); 

    useEffect(() =>{
        if(userProfile){
            if(userProfile.profilePictureUrl != ""){
                setDefImg(userProfile.profilePictureUrl)
            }
        }
    },[userProfile])
    
    return(
        <div>
            <div className='header__menu__relative'>
                <span className='header__menu__element'>
                    <div className='header__menu__relative' onClick={() => handdleActive(8)}>
                        <a href="/profile/" className="menu__element__link" role='link' tabIndex="0">
                            <div className="menu__element__link__borders">
                                <div>
                                    <div className='menu__element__link__svg__container'>
                                        <div className='menu__element__link__svg'>
                                            { active && <div className='small__user__image__border'></div> }
                                            <span className="small__user__image" role='link' tabIndex='-1'>
                                                <img src={defImg} alt="user" draggable='false' /> 
                                            </span>                                                  
                                        </div>
                                    </div>
                                </div>
                                <div className={`${showText ? "show__text" : "hide__text"}`}> 
                                    <div className="menu__element_link__text__container">
                                        <div style={{width: "100%"}}>
                                            <div style={{width: "100%"}}>
                                                <span className={`${ active ? "menu__element_link__text__active" : "menu__element_link__text"}`} dir='auto'>
                                                    <span className='menu__element_link__text__span'>
                                                        Profile
                                                    </span>  
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>   
                    </div> 
                </span>
            </div>
        </div>
    )
}