import { useEffect, useState } from "react";
import { UserAuth } from '../../context/AuthContext';
import  useGetUserProfilebyId from '../../hooks/useGetUserProfileById';
import useFollowUser from "../../hooks/useFollowUser";
import defaultImg from '../../images/users/Default_pfp.svg.png';

export default function SuggestedUser({ user, setUser }){
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser.uid);
    const [defImg, setDefImg] = useState(defaultImg);

    useEffect(() =>{

        if (user && user.profilePictureUrl != ""){
            setDefImg(user.profilePictureUrl)
        } else {
            setDefImg(defaultImg)
        }
    },[])

    const onFollowUser = async () => {
		await handleFollowUser();
	};

    return (
        <div className="footer__sugestions__element">
            <div className="footer__sugestions__element__container">
                <div className="footer__sugestions__element__flex">
                    <div className="footer__sugestions__element__display">
                        <div className="sugestion__element__image">
                            <div className="sugestion__element__image__container">
                                <div className="sugestion__element__image__display" aria-disabled="true" tabIndex="-1" role='button'> 
                                    <canvas className='sugestion__element__image__canvas' height="54px" width="54px" />
                                    <a href={`/profile/${user.username}`} className="sugestion__element__image__link" role='link' tabIndex="0">
                                        <img src={ defImg } alt="suggestion profile picture" draggable="false" className='sugestion__element__image__img'/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="sugestion__element__username">
                            <div className="sugestion__element__username__container">
                                <div className="sugestion__element__username__flex">
                                    <div className="sugestion__element__username__top">
                                        <div style={{display: "inline-block"}}>
                                            <a href={`/profile/${user.username}`} tabIndex="0" role='link' className="sugestion__element__username__top__link">
                                                <div className="sugestion__element__username__top__display">
                                                    <div className="sugestion__element__username__top__flex">
                                                        <span className='sugestion__element__username__top_text'>{user.username}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <span className="sugestion__element__username__botton" dir="auto">
                                        <span className="sugestion__element__username__botton__text">Followed by ayoOguseinde +1 more</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        { userProfile && (userProfile.uid !== user.uid) && (
                            <div className="sugestion__element__follow">
                                <div className="sugestion__element__follow__container">
                                    <button type='button' className='sugestion__element__follow__button' onClick={onFollowUser}>
                                        <div className="sugestion__element__follow__flex">
                                            <div className="sugestion__element__follow__text" dir="auto">
                                                {isFollowing ? "Unfollow" : "Follow"}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}