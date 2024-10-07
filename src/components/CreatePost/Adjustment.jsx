import React from "react"

export default function Adjustment(props) {

    const handdleDivide = (num) => {

        let positive = num;

        if (positive < 0){
            positive = -positive;
            return (100 - positive) / 2
        }else if (positive > 0){
            return (+positive + 100) / 2
        }

    } 

    return (
        <div className="create__model__botton__r__adjustmnets__flex" onMouseEnter={() => props.hoverOn(props.id)} onMouseLeave={() => props.hoverOff()} >
            <div className="create__model__botton__r__adjustmnets__text">
                <span dir="auto" className="create__model__botton__r__adjustmnets__span">
                    {props.name}
                </span>
                { props.value != 0  && props.reset && <div className="create__model__botton__r__adjustmnets__slide__reset"  >Reset</div> }
            </div>
            <div className="create__model__botton__r__adjustmnets__slide">
                <div className="create__model__botton__r__adjustmnets__slide__container">
                    <div className="create__model__botton__r__filters__slide__l">
                        {props.id == 6 
                            ? <input type="range" name="filterSlide" id="filterSlide"  className="create__model__botton__r__filters__slide__input" min="0" max="100" value={props.value} readOnly onChange={(e) => props.handleAdjustment(props.id,e.target.value)} style={{'backgroundImage': `linear-gradient(to right,rgb(38,38,38) 0%, rgb(38, 38, 38) ${props.value}%, rgb(219, 219, 219) ${props.value}%, rgb(219,219,219) 100%)`}}/>
                            : <input type="range" name="filterSlide" id="filterSlide"  className="create__model__botton__r__filters__slide__input" min="-100" max="100" value={props.value} readOnly onChange={(e) => props.handleAdjustment(props.id,e.target.value)} style={{'backgroundImage': `linear-gradient(to right,rgb(219, 219, 219) 0%, rgb(219,219,219) ${props.value < 0 ? handdleDivide(props.value) : "50"}%, rgb(38, 38, 38) ${props.value < 0 ? handdleDivide(props.value) : "50"}%, rgb(38, 38, 38) ${props.value > 0 ? handdleDivide(props.value) : "50"}%, rgb(219,219,219) ${props.value > 0 ? handdleDivide(props.value) : "50"}%,rgb(219,219,219) 100%)`}}/>
                        }   
                    </div>
                    <div className="create__model__botton__r__filters__slide__r">
                        <div className="create__model__botton__r__filters__slide__text">{props.value}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}