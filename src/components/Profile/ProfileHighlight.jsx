
export default function ProfileHighlight(){
    return (
        <div className="profile__highlight" role="menu">
            <div className="profile__highlight__container">
                <div className="profile__highlight__display" role="presentation">
                    <div className="profile__highlight__flex">
                        <ul className="profile__highlight__list">
                            <li style={{transform: "translateX(0px)", width: "24px"}}></li>
                            <li style={{transform: "translateX(132px)", width: "24px"}}></li>
                            <li className="highlight__list__element" tabIndex="-1">
                                <div className="highlight__list__element__container">
                                    <div className="highlight__list__element__padding" aria-disabled="false" role="menu-item" tabIndex="0">
                                        <div className="highlight__icon">
                                            <canvas height="87" width="87" className="highlight__icon__canvas"></canvas>
                                            <div className="highlight__icon__contianer">
                                                <svg aria-label="Plus icon" className="highlight__icon__svg" color="rgb(199,199,199)" fill="rgb(199,199,199)" height="44" width="44" role="img" viewBox="0 0 24 24">
                                                    <title>Plus icon</title>
                                                    <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="highlight__text">
                                            <span className="highlight__text__contaier">
                                                <span className="highlight__text__span">New</span>
                                            </span>
                                        </div>
                                    </div> 
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>
        </div>
    )
} 