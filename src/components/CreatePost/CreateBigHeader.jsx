
export default function CreateBigHeader({title,title1,title3,title4,setTitle,handlePost}){

    return(
        <div className="create__model__top__big">
            <div className="create__model__top__flex">
                <div className="create__model__top__container">
                    <div className="create__model__top__c">
                        <h1 dir="auto" tabIndex="-1" className="create__model__top__c__h1">
                            <div className="create__model__top__c__text">
                                {title3 && <p>Edit</p>}
                                {title4 && <p>Create New Post</p>}
                            </div>
                        </h1>
                    </div>
                    {!title1 && (
                        <div className="create__model__top__arrow" onClick={() => setTitle(title - 1)}>
                            <div className="create__model__top__arrow__container">
                                <div className="create__model__top__arrow__display">
                                    <div className="create__model__top__arrow__flex">
                                        <span style={{display: "inline-block",transform: "rotate(0deg)"}}>
                                            <svg aria-label="Back"  className="create__model__top__arrow__svg" fill="currentColor" role="img" height="24" width="24" viewBox="0 0 24 24">
                                                <title>Back</title>
                                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line>
                                                <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="create__model__top__link">
                        <div className="create__model__top__link__container">
                            <div className="create__model__top__link__button" role="button" tabIndex="0">
                                {title3 && <p onClick={() => setTitle(3)}>Next</p>}
                                {title4 && <p onClick={() => handlePost()}>Share</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}