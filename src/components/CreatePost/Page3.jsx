
export default function Page3({bottomL,bottomR,setBottoml,setBottomr,setActiveSlide,filterMap,adjustmentMap,activeSlide,setFilterSlide,filterSlide,handleActiveSlider}){
    return (
        <div className="create__model__botton__r">
            <div className="create__model__botton__r__container">
                <div className="create__model__botton__r__height">
                    <div className="create__model__botton__r__flex">
                        <div className="create__model__botton__r__header" role="tablist">
                            <div className={`${ bottomL ? "create__model__botton__r__header__l" : "create__model__botton__r__header__r"}`} aria-disabled="false" role="tab" tabIndex="0" onClick={() => {setBottoml(true);setBottomr(false)}}>
                                <span className="create__model__botton__r__header__span">
                                    Filters
                                </span>
                            </div>
                            <div className={`${ bottomR ? "create__model__botton__r__header__l" : "create__model__botton__r__header__r"}`} aria-disabled="false" role="tab" tabIndex="0" onClick={() => {setBottoml(false);setBottomr(true);setActiveSlide(false)}}>
                                <span className="create__model__botton__r__header__span">
                                    Adjustments
                                </span>
                            </div>
                        </div>
                        {bottomL && (
                            <div className="create__model__botton__r__filters">
                                <div className="create__model__botton__r__filters__flex">
                                    {filterMap}
                                </div>
                            </div>
                        )}
                        {bottomR && (
                            <div className="create__model__botton__r__adjustmnets">
                                <div className="create__model__botton__r__adjustmnets__container">
                                    {adjustmentMap}
                                </div>
                            </div>
                        )}
                        {activeSlide && (
                            <>
                                <hr className="filters__division__line"/>
                                <div  className="create__model__botton__r__filters__slide"  >
                                    <div className="create__model__botton__r__filters__slide__flex">
                                        <div className="create__model__botton__r__filters__slide__width">
                                            <div className="create__model__botton__r__filters__slide__l">
                                                <input type="range" name="filterSlide" id="filterSlide"  className="create__model__botton__r__filters__slide__input" min="0" max="100" value={filterSlide} readOnly onChange={(e) => {setFilterSlide(e.target.value);handleActiveSlider()}} style={{'backgroundImage': `linear-gradient(to right,rgb(38,38,38) 0%, rgb(38, 38, 38) ${filterSlide}%, rgb(219, 219, 219) ${filterSlide}%, rgb(219,219,219) 100%)`}}/>
                                            </div>
                                            <div className="create__model__botton__r__filters__slide__r">
                                                <div className="create__model__botton__r__filters__slide__text">{filterSlide}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )}
                        <div className="create__model__botton__r__adjustments"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}