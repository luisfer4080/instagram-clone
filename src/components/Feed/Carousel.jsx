import React, { useState } from 'react';
import Avatar from './Avatar';
import leftArrow from '../../images/icons/angle-left-solid.svg';
import rightArrow from '../../images/icons/angle-right-solid.svg';
import '../../css/feed.css';

const Carousel = ({following}) => {

    const handleSlide = (direction)=>{
        const slider = document.getElementsByClassName('carousel-body')[0];
        if (direction === "left")
            slider.scrollBy(-400, 0);
        else 
            slider.scrollBy(400,0);
    }

    return (
        <section className='check'>
            <div className='arrow-btn left-icon' onClick={()=>handleSlide('left')}>
                <img src={leftArrow} alt="left-angle" />
            </div>
            <div className='arrow-btn right-icon' onClick={()=>handleSlide('right')} >
                <img src={rightArrow} alt="left-angle" />
            </div>
            <div className="carousel-body">
                {following?.map((item,index) => 
                    <Avatar key={index} user={item} />
                )}
            </div>
        </section>
    )
}

export default Carousel