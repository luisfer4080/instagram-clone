
export default function More({handdleActive,active,showText}){

    return(
        <div className='more__pop__container'>
            <span className='header__menu__element'>
                <div className='header__menu__relative' onClick={() => handdleActive(9)}>
                    <a href="#" className='menu__element__link' role='link' tabIndex="0">
                        <div className='menu__element__link__borders'>
                            <div>
                                <div className='menu__element__link__svg__container'>
                                    <div className='menu__element__link__svg'>
                                        <svg aria-label='Settings' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line>
                                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line>
                                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={`${showText ? "show__text" : "hide__text"}`}>
                                <div className='menu__element_link__text__container'>
                                    <div style={{width: "100%"}}>
                                        <div style={{width: "100%"}}>
                                            <span className={`${ active ? "menu__element_link__text__active" : "menu__element_link__text"}`} dir='auto'>
                                                <span className='menu__element_link__text__span'>
                                                    More
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