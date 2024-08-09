import {useState} from "react";

export default function YourProfileMenu ({activeMenu,activeMenuHandler}){
    
    const [act,setAct] = useState(true)
    const active = "profile__menu__links__active profile__menu__links__mr"
    const normal = "profile__menu__links profile__menu__links__mr"

    const handleActive = (id) => {
        if (activeMenu === id){
            return
        }else if(id === 1){
            setAct(!act);
            activeMenuHandler(1)
            return
        }else if(id === 2){
            setAct(!act);
            activeMenuHandler(2)
            return
        }

    } 

    return (
        <div className="profile__menu">
            <a className={act ? active : normal} href="#" aria-selected="true" role="tab" tabIndex="0" onClick={() => handleActive(1)}>
                <div className="profile__menu__container">
                    <div className="profile__menu__icon">
                        {act ? (
                            <svg aria-label="" className="profile__svg__display" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="12" role="img" viewBox="0 0 24 24" width="12">
                                <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                            </svg>
                        ) : (
                            <svg aria-label="" className="profile__svg__display" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="12" role="img" viewBox="0 0 24 24" width="12">
                                <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                            </svg>
                        )}
                        
                    </div>
                    <span>POSTS</span>
                </div>
            </a>
            <a className={act ? normal : active} href="#" aria-selected="false" role="tab" tabIndex="0" onClick={() =>  handleActive(2)}>
                <div className="profile__menu__container">
                    <div className="profile__menu__icon">
                        {!act ? (
                            <svg aria-label="" className="profile__svg__display" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="12" role="img" viewBox="0 0 24 24" width="12">
                                <title>Remove</title>
                                <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
                            </svg>
                        ) : (
                            <svg aria-label="" className="profile__svg__display" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="12" role="img" viewBox="0 0 24 24" width="12">
                                <title>Save</title>
                                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                            </svg>
                        )}
                        
                    </div>
                    <span>SAVED</span>
                </div>
            </a>
        </div>
    )
}
