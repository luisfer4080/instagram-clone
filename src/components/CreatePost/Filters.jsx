import React from "react";

export default function Filter(props) {

  return (
    <div className="create__model__botton__r__filters__element" onClick={() => props.clickActive(props.id)}>
      <button className="create__model__botton__r__filters__element__button" type="button">
          <div className={`${props.active ? "create__model__botton__r__filters__element__img__a" : "create__model__botton__r__filters__element__img" }`}>
              <img alt={`Filter: ${props.name}`}  className="create__model__botton__r__filters__element__picture" src={props.src} />
          </div>
          <div className={`${props.active ? "create__model__botton__r__filters__element__text__a" : "create__model__botton__r__filters__element__text"}`}>
              {props.name}
          </div>
      </button>
    </div>
  )
}