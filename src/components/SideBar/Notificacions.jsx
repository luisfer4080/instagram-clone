
export default function Notificacions({handdleActive,active,showText}){
    return(
        <div>
            <span className='header__menu__element'>
                <div className='header__menu__relative' onClick={() => handdleActive(6)}>
                    <a href="#" className="menu__element__link" role='link' tabIndex="0">
                        <div className="menu__element__link__borders">
                            <div>
                                <div className='menu__element__link__svg__container'>
                                    <div className='menu__element__link__svg'>
                                        { active ? 
                                            (
                                                <svg aria-label='Notificacions' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                    <title>Notificacions</title>
                                                    <path d="M17.075 1.987a5.852 5.852 0 0 0-5.07 2.66l-.008.012-.01-.014a5.878 5.878 0 0 0-5.062-2.658A6.719 6.719 0 0 0 .5 8.952c0 3.514 2.581 5.757 5.077 7.927.302.262.607.527.91.797l1.089.973c2.112 1.89 3.149 2.813 3.642 3.133a1.438 1.438 0 0 0 1.564 0c.472-.306 1.334-1.07 3.755-3.234l.978-.874c.314-.28.631-.555.945-.827 2.478-2.15 5.04-4.372 5.04-7.895a6.719 6.719 0 0 0-6.425-6.965Z"></path>
                                                </svg>
                                            )
                                            :(
                                                <svg aria-label='Notificacions' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                    <title>Notificacions</title>
                                                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                                </svg>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`${showText ? "show__text" : "hide__text"}`}>
                                <div className="menu__element_link__text__container">
                                    <div style={{width: "100%"}}>
                                        <div style={{width: "100%"}}>
                                            <span className={`${ active ? "menu__element_link__text__active" : "menu__element_link__text"}`} dir='auto'>
                                                <span className='menu__element_link__text__span'>
                                                    Notificacions
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
    )
}