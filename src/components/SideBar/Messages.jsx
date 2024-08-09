
export default function Messages({handdleActive,active,showText}){

    return(
        <div>
            <div data-visualcompletion="ignore">
                <div className="header__message_element">
                    <div>
                        <span className='header__menu__element'>
                            <div className="header__menu__relative" onClick={() => handdleActive(5)}>
                                <a href="#" className="menu__element__link" role='link' tabIndex="0">
                                    <div className="menu__element__link__borders">
                                        <div>
                                            <div className="menu__element__link__svg__container">
                                                <div className="menu__element__link__svg">
                                                    { active ? 
                                                        (
                                                            <svg aria-label='Direct' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                                <path d="M22.91 2.388a.69.69 0 0 0-.597-.347l-20.625.002a.687.687 0 0 0-.482 1.178L7.26 9.16a.686.686 0 0 0 .778.128l7.612-3.657a.723.723 0 0 1 .937.248.688.688 0 0 1-.225.932l-7.144 4.52a.69.69 0 0 0-.3.743l2.102 8.692a.687.687 0 0 0 .566.518.655.655 0 0 0 .103.008.686.686 0 0 0 .59-.337L22.903 3.08a.688.688 0 0 0 .007-.692" fillRule="evenodd"></path>
                                                            </svg>
                                                        )
                                                        :(
                                                            <svg aria-label='Direct' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                                <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                                                <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                                                            </svg>
                                                        )
                                                    }
                                                </div>
                                                <div className="messages__count__container">
                                                    <div className="messages__count">1</div>
                                                    </div>  
                                            </div>
                                        </div>
                                        <div className={`${showText ? "show__text" : "hide__text"}`}>
                                            <div className="menu__element_link__text__container">
                                                <div style={{width: "100%"}}>
                                                    <div style={{width: "100%"}}>
                                                        <span className={`${ active ? "menu__element_link__text__active" : "menu__element_link__text"}`} dir='auto'>
                                                            <span className='menu__element_link__text__span'>
                                                                Messages
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
            </div>
        </div>
    )
}