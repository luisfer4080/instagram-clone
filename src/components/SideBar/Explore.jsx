
export default function Explore({handdleActive,active,showText}){
    
    return(
        <div>
            <span className='header__menu__element'>
                <div className="header__menu__relative" onClick={() => handdleActive(3)}>
                    <a href="#" className="menu__element__link" role='link' tabIndex="0">
                        <div className="menu__element__link__borders">
                            <div>
                                <div className="menu__element__link__svg__container">
                                    <div className="menu__element__link__svg">
                                        { active ? 
                                            (
                                                <svg aria-label='Explore' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                    <path d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z"></path>
                                                </svg>
                                            )
                                            :(
                                                <svg aria-label='Explore' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                    <polygon fill='none' points='13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></polygon>
                                                    <polygon fillRule='evenodd' points='10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056'></polygon>
                                                    <circle cx='12.001' cy='12.005' fill='none' r='10.5' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></circle>
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
                                                    Explore
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