
export default function Home({handdleActive,active,showText}){
    return (
        <div>
            <div className="header__menu__relative">
                <span className='header__menu__element'>
                    <div className="menu__element__relative" onClick={() => handdleActive(1)}>
                        <a href="/feed/" className="menu__element__link" role='link' tabIndex="0">    
                            <div className="menu__element__link__borders">
                                <div>
                                    <div className="menu__element__link__svg__container">
                                        <div className='menu__element__link__svg'>
                                            <svg aria-label='home' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24'>
                                                { active ? 
                                                    (<path d='M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z'></path>) : 
                                                    (<path d='M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z'></path>)
                                                }
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
                                                        Home
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