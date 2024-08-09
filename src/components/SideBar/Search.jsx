
export default function Search({handdleActive,active,showText}){

    return (
        <div>
            <span className='header__menu__element'>
                <div className="header__menu__relative" onClick={() => {handdleActive(2)}}>
                    <a href="#" className="menu__element__link" role='link' tabIndex="0"> 
                        <div className="menu__element__link__borders">
                            <div>
                                <div className="menu__element__link__svg__container">
                                    <div className="menu__element__link__svg">
                                        { active ? 
                                            (
                                                <svg aria-label='Search' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                    <path d='M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3'></path>
                                                    <line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' x1='16.511' x2='21.643' y1='16.511' y2="21.643"></line>
                                                </svg>
                                            )
                                            :(
                                                <svg aria-label='Search' className='menu__element__link__svg__display' color='rgb(0,0,0)' fill='rgb(0,0,0)' height="24px" width="24px" viewBox='0 0 24 24' role='img'>
                                                    <path d='M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></path>
                                                    <line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' x1='16.511' x2='22' y1='16.511' y2="22"></line>
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
                                            <span className={`${ active ? "menu__element_link__text__active" : "menu__element_link__text"}`}>
                                                <span className='menu__element_link__text__span'>
                                                    Search
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