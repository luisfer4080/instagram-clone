
import { useState, useEffect } from "react"
import defaultImg from '../../images/users/Default_pfp.svg.png'

export default function Page4({userProfile,caption,setCaption,countCaption,setCountCamption,location,setLocation,accesibility,setAccesibility,accesibilityShow,setAccessibilityShow,thumbsContainer__s,thumbs__s,advancedShow,setAdvancedShow,hideLikes,setHideLikes,hideComments,setHideComments}){

    const [defImg, setDefImg] = useState(defaultImg) 

    useEffect(() =>{
        if(userProfile){
            if(userProfile.profilePictureUrl != ""){
                setDefImg(userProfile.profilePictureUrl)
            }
        }
    },[userProfile])

    return (
        <div className="create__model__post__info">
            <div className="create__model__post__info__container">
                <div className="create__model__post__info__container__height">
                    <div className="create__model__post__info__container__flex">
                        <div className="create__model__post__info__user">
                            <div className="create__model__post__info__user__container">
                                <div className="create__model__post__info__user__width">
                                    <div className="create__model__post__info__user__position">
                                        <div className="create__model__post__info__user__align">
                                            <div className="create__model__post__info__user__justify">
                                                <div className="create__model__post__info__user__image">
                                                    <div className="create__model__post__info__user__image__container">
                                                        <span className="create__model__post__info__user__image__span" tabIndex="-1" role="link">
                                                            <img alt={`${userProfile ? userProfile.username : "user"}'s profile picture`} className="create__model__post__info__user__image__img" draggable="false" src={defImg} />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="create__model__post__info__user__text">
                                                    <div className="create__model__post__info__user__text__container">
                                                        <div className="create__model__post__info__user__text__flex">
                                                            <span className="create__model__post__info__user__text__display" dir="auto">
                                                                <span className="create__model__post__info__user__text__span">{userProfile ? userProfile.username : "user"}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="create__model__post__info__caption">
                            <div className="create__model__post__info__caption__top">
                                <textarea aria-label="Write a caption..." name="caption" id="caption" className="create__model__post__info__caption__top__container"cols="30" rows="10" value={caption} onChange={(e) => {setCaption(e.target.value);setCountCamption(e.target.value.length)}} spellCheck tabIndex="0"></textarea>
                                {countCaption == 0 && (
                                    <div className="create__model__post__info__caption__top__label">
                                        Write a caption...
                                    </div>
                                )} 
                            </div>
                            <div className="create__model__post__info__caption__bottom">
                                <div className="create__model__post__info__caption__bottom__emojis">
                                    <button type="button" className="create__model__post__info__caption__bottom__emojis__button">
                                        <div className="create__model__post__info__caption__bottom__emojis__align">
                                            <svg aria-label="Emoji" className="create__model__post__info__caption__bottom__emojis__svg" height="20" width="20" fill="currentColor" role="img" viewBox="0 0 24 24">
                                                <title>Emoji</title>
                                                <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                <div className="create__model__post__info__caption__bottom__count">
                                    <span aria-describedby=":rg:" className="create__model__post__info__caption__bottom__count__inherit">
                                        <div className="create__model__post__info__caption__bottom__count__container" role="button" tabIndex="0">
                                            <span className="create__model__post__info__caption__bottom__count__flex">
                                                <span className="create__model__post__info__caption__bottom__count__number">{countCaption}</span>
                                                /
                                                <span className="create__model__post__info__caption__bottom__count__number">2000</span>
                                            </span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="create__model__post__info__location">
                            <label className="create__model__post__info__location__label">
                                <input type="text" name="location" id="location" placeholder="Add Location" className="model__location__input" value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                                <div className="model__location__svg__container">
                                    <svg aria-label="Add Location" className="model__location__svg" fill="currentColor" height="16" width="16" viewBox="0 0 24 24" role="img">
                                        <title>Add location</title>
                                        <path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 0 0 1.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0 0 12.053 1Zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0 1 13.417 0c0 3.985-3.944 8.538-6.709 11.002Z"></path>
                                    </svg>
                                </div>
                            </label>
                        </div>
                        <div className="create__model__post__info__dropdown">
                            <div className="create__model__post__info__dropdown__flex" tabIndex="0" aria-disabled="false" role="button"  onClick={() => setAccessibilityShow(!accesibilityShow)}>
                                <span dir="auto" className="create__model__post__info__dropdown__text" style={{ fontWeight:  accesibilityShow ? "600" : "400"}}>
                                    Accesiblity
                                </span>
                                {accesibilityShow ? (
                                    <span style={{display: "inline-block",transform: "rotate(0deg"}}>
                                        <svg aria-label="Up chevron icon"  className="dropdown__svg" fill="currentColor" width="16" height="16" role="img" viewBox="0 0 24 24">
                                            <title>Up chevron icon</title>
                                            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                                        </svg>
                                    </span>
                                ):(
                                    <span style={{display: "inline-block",transform: "rotate(180deg"}}>
                                        <svg aria-label="Down chevron icon"  className="dropdown__svg" fill="currentColor" width="16" height="16" role="img" viewBox="0 0 24 24">
                                            <title>Down chevron icon</title>
                                            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                                        </svg>
                                    </span>
                                )}
                            </div>
                            {accesibilityShow && (
                                <div className="create__model__post__info__accessibility__b">
                                    <span className="create__model__post__info__accessibility__b__p">
                                        Alt text describes your photos for people with visual impairments. Alt text 
                                        will be automatically created for your photos or you can choose to write your 
                                        own.
                                    </span>
                                    <div className="create__model__post__info__accessibility__b__i">
                                        <div className="create__model__post__info__accessibility__b__i__container">
                                            <aside className="thumbsContainer__s">
                                                {thumbs__s}
                                            </aside>
                                            <div className="create__model__post__info__accessibility__b__input__c">
                                                <input type="text" className="create__model__post__info__accessibility__b__input" placeholder="Write alt text..." spellCheck value={accesibility} onChange={(e) => setAccesibility(e.target.value) }/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="create__model__post__info__dropdown">
                            <div className="create__model__post__info__dropdown__flex" tabIndex="0" aria-disabled="false" role="button"  onClick={() => setAdvancedShow(!advancedShow)}>
                                <span dir="auto" className="create__model__post__info__dropdown__text" style={{ fontWeight:  advancedShow ? "600" : "400"}}>
                                    Advanced Settings
                                </span>
                                {advancedShow ? (
                                    <span style={{display: "inline-block",transform: "rotate(0deg"}}>
                                        <svg aria-label="Up chevron icon"  className="dropdown__svg" fill="currentColor" width="16" height="16" role="img" viewBox="0 0 24 24">
                                            <title>Up chevron icon</title>
                                            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                                        </svg>
                                    </span>
                                ):(
                                    <span style={{display: "inline-block",transform: "rotate(180deg"}}>
                                        <svg aria-label="Down chevron icon"  className="dropdown__svg" fill="currentColor" width="16" height="16" role="img" viewBox="0 0 24 24">
                                            <title>Down chevron icon</title>
                                            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                                        </svg>
                                    </span>
                                )}
                            </div>
                            {advancedShow && (
                                <div className="create__model__post__info__advanced__b">
                                    <div className="create__model__post__info__advanced__b__container">
                                        <div className="create__model__post__info__advanced__b__hide__likes">
                                            <div className="create__model__post__info__advanced__b__hide__likes__c">
                                                <div className="create__model__post__info__advanced__b__hide__likes__c__t">
                                                    <div className="advanced__b__hide__likes__c__t__text">
                                                        <span className="advanced__b__hide__likes__c__t__text__span">
                                                            Hide like and view counts on this post
                                                        </span>
                                                    </div>
                                                    <div className="advanced__b__hide__likes__c__t__switch">
                                                        <div className="advanced__b__hide__likes__c__t__switch__container">
                                                            {hideLikes ? (
                                                                <>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__b__active"></div>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__a__active"></div>
                                                                    <input dir="ltr" type="checkbox" aria-checked="false" role="switch" className="advanced__b__hide__likes__c__t__switch__i" value={hideLikes} onClick={() => setHideLikes(!hideLikes)}/>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__b"></div>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__a"></div>
                                                                    <input dir="ltr" type="checkbox" aria-checked="false" role="switch" className="advanced__b__hide__likes__c__t__switch__i" value={hideLikes} onClick={() => setHideLikes(!hideLikes)}/>
                                                                </>                                                                                           
                                                            )}  
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="create__model__post__info__advanced__b__hide__likes__c__b">
                                                    <span className="create__model__post__info__advanced__b__hide__likes__c__b__text">
                                                        Only you will see the total number of likes and views on this post. You can change this later 
                                                        by going to the ··· menu at the top of the post. To hide like counts on other people's posts, 
                                                        go to your account settings. 
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="create__model__post__info__advanced__b__hide__likes">
                                            <div className="create__model__post__info__advanced__b__hide__likes__c">
                                                <div className="create__model__post__info__advanced__b__hide__likes__c__t">
                                                    <div className="advanced__b__hide__likes__c__t__text">
                                                        <span className="advanced__b__hide__likes__c__t__text__span">
                                                            Turn off commenting
                                                        </span>
                                                    </div>
                                                    <div className="advanced__b__hide__likes__c__t__switch">
                                                        <div className="advanced__b__hide__likes__c__t__switch__container">
                                                            {hideComments ? (
                                                                <>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__b__active"></div>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__a__active"></div>
                                                                    <input dir="ltr" type="checkbox" aria-checked="false" role="switch" className="advanced__b__hide__likes__c__t__switch__i" value={hideComments} onClick={() => setHideComments(!hideComments)} />
                                                                </>
                                                            ):(
                                                                <>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__b"></div>
                                                                    <div className="advanced__b__hide__likes__c__t__switch__a"></div>
                                                                    <input dir="ltr" type="checkbox" aria-checked="false" role="switch" className="advanced__b__hide__likes__c__t__switch__i" value={hideComments} onClick={() => setHideComments(!hideComments)}/>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="create__model__post__info__advanced__b__hide__likes__c__b">
                                                    <span className="create__model__post__info__advanced__b__hide__likes__c__b__text">
                                                        You can change this later by going to the ··· menu at the top of your post.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}