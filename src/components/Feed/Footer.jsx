import defaultImg from '../../images/users/Default_pfp.svg.png';
import { useState , useEffect } from 'react';
import SuggestedUsers from './SuggestedUsers';

export default function Footer(props){

    const [defImg, setDefImg] = useState(defaultImg); 

    useEffect(() =>{
        if(props.userData){
            if(props.userData.profilePictureUrl != ""){
                setDefImg(props.userData.profilePictureUrl)
            }
        }
    },[props.userData])

    return(
        <footer className='user__feed__footer'>
            <div className="user__feed__footer__container">
                <div className="user__feed__footer__top">
                    <div className="feed__footer__top__container">
                        <div className="feed__footer__top__display">
                            <div className="feed__footer__top__flex">
                                <div className="feed__footer__top__position">
                                    <div className="feed__footer__top__justify">
                                        <div className="feed__footer__image">
                                            <div className="feed__footer__image__container">
                                                <div className="feed__footer__image__display" role='button' aria-disabled="true" tabIndex="0">
                                                    <canvas className='feed__footer__image__canvas' height="54px" width="54px" />
                                                    <a href="#" className="feed__footer__image__link" role='link' tabIndex="0">
                                                        <img src={defImg} alt="user profile picture" draggable="false" className='feed__footer__image__img'/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feed__footer__username">
                                            <div className="feed__footer__username__container">
                                                <div className="feed__footer__username__flex">
                                                    <div className="feed__footer__username__top">
                                                        <a href="/profile" role='link' tabIndex="0" className="feed__footer__username__top__link">{props.userData && props.userData.username}</a>
                                                    </div>
                                                    <span className="feed__footer__username__botton">
                                                        <span className="feed__footer__username__botton__container">
                                                            <div className="feed__footer__username__botton__flex">
                                                                <span className="feed__footer__username__botton__display">
                                                                    {props.userData && props.userData.email}
                                                                </span>
                                                            </div>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feed__footer__switch">
                                            <div className="feed__footer__switch__container">
                                                <button className="feed__footer__switch__button" type='button'>
                                                    <span className="feed__footer__switch__text">
                                                        Switch
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feed__footer__sugestions">
                    <div className="feed__footer__sugestions__container">
                        <div className="feed__footer__sugestions__flex">
                            <div className="feed__footer__sugestions__title">
                                <div className="feed__footer__sugestions__title__left">
                                    <span className="feed__footer__sugestions__title__left__container">
                                        Suggested for you
                                    </span>
                                </div>
                                <a  href='#' className="feed__footer__sugestions__title__right" tabIndex="0" role='link'>
                                    <span className="feed__footer__sugestions__title__right__container">
                                       See All 
                                    </span>
                                </a>
                            </div>
                            <SuggestedUsers />
                        </div>
                    </div>
                </div>
                <div className="feed__footer__bottom">
                    <div className="feed__footer__bottom__padding">
                        <nav className='feed__footer__bottom__list'>
                            <ul className="feed__footer__bottom__list__ul">
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">About</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Help</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Press</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">API</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Jobs</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Privacy</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Terms</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Location</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Language</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                                <li className="feed__footer__bottom__list__element">
                                    <a href='#' className="footer__bottom__list__element__link" rel='nofollow noopener noreferrer'>
                                        <span className="footer__bottom__list__element__display">Meta Verified</span>
                                    </a>
                                    <span className="after__doot"></span>
                                </li>
                            </ul>
                        </nav>
                        <div className='feed__footer__bottom__text'>
                            <span className='feed__footer__bottom__text__container'>© 2023 Programed by Luis Marquez</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )

}
