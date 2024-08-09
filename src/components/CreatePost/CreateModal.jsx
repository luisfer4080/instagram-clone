
import { useEffect, useState,useCallback, useRef } from "react";
import '../../css/create__post__modal.css';
import {useDropzone} from 'react-dropzone';
import CreateHeader from "./CreateHeader";
import Filter from './Filters';
import Adjustment from './Adjustment';
import Aden from '../../images/static/Aden.jpg';
import Clarendon from '../../images/static/Clarendon.jpg';
import Crema from '../../images/static/Crema.jpg';
import Gingham from '../../images/static/Gingham.jpg';
import Juno from '../../images/static/Juno.jpg';
import Lark from '../../images/static/Lark.jpg';
import Ludwig from '../../images/static/Ludwig.jpg';
import Moon from '../../images/static/Moon.jpg';
import Normal from '../../images/static/Normal.jpg';
import Perpetua from '../../images/static/Perpetua.jpg';
import Reyes from '../../images/static/Reyes.jpg';
import Slumber from '../../images/static/Slumber.jpg';
import { UserAuth } from "../../context/AuthContext";
import CreateBigHeader from "./CreateBigHeader";
import Page3 from "./Page3";
import Page4 from "./Page4";
import  useGetUserProfilebyId from '../../hooks/useGetUserProfileById';
import { useLocation } from "react-router-dom";
import useShowToast from '../../hooks/useShowToast';
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString, uploadBytes } from "firebase/storage";
import { database, storage } from "../../firebase";


const thumbsContainer = { 
    display: 'flex',
    flexDirection: 'row',
};

const thumbsContainer__s = {
    height: '44px',
    width: '44px',
    overflow: 'visible',
    borderRadius: '0',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    display: 'flex',
    boxSizing: 'border-box',
    flexShrink: '0',
    alignItems: 'stretch',
    alignSelf: 'auto',
    justifyContent: 'flex-start',
    position: 'relative',
    flexGrow: 0,
}
  
const thumb = {
    width: '400px',
    height: '400px',
    boxSizing: 'border-box'
};

const thumb__b = {
    width: '388px',
    height: '388px',
    boxSizing: 'border-box'
};

const thumb__s = {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    alignSelf: 'auto',
    position: 'relative',
    flexGrow: 0,
};
  
const thumbInner = {
    display: 'flex',
    minWidth: 0,
};
  
const img = {
    display: 'block',
    width: '400px',
    height: '400px'
};

const img__b = {
    display: 'block',
    width: '388px',
    height: '388px'
};

const img__s = {
    width: '44px',
    height: '66.7586px',
    transform: 'translateX(0px) translateY(0px) scale(1)',
    transition: 'none 0s ease 0s',
    alignItems: 'stretch',
    border: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    font: 'inherit',
    fontSize: '100%',
    margin: 0,
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    verticalAlign: 'baseline'
};


const filterArray = [
    {
        id: 1,
        name: 'aden',
        src: Aden,
        active: false
    },
    {
        id: 2,
        name: 'clarendon',
        src: Clarendon,
        active: false
    },
    {
        id: 3,
        name: 'crema',
        src: Crema,
        active: false
    }
    ,
    {
        id: 4,
        name: 'gingham',
        src: Gingham,
        active: false
    }
    ,
    {
        id: 5,
        name: 'juno',
        src: Juno,
        active: false
    }
    ,
    {
        id: 6,
        name: 'lark',
        src: Lark,
        active: false
    }
    ,
    {
        id: 7,
        name: 'ludwig',
        src: Ludwig,
        active: false
    },
    {
        id: 8,
        name: 'moon',
        src: Moon,
        active: false
    },
    ,
    {
        id: 9,
        name: 'original',
        src: Normal,
        active: false
    },
    {
        id: 10,
        name: 'perpetua',
        src: Perpetua,
        active: false
    },
    {
        id: 11,
        name: 'reyes',
        src: Reyes,
        active: false
    },
    {
        id: 12,
        name: 'slumber',
        src: Slumber,
        active: false
    }
]

const adjustmentsArray =[
    {
        id: 1,
        name : "brightness",
        value : 0,
        reset: false
    },
    {
        id: 2,
        name : "contrast",
        value : 0,
        reset: false 
    },
    {
        id: 3,
        name : "fade",
        value : 0,
        reset: false
    },
    {
        id: 4,
        name : "saturation",
        value : 0,
        reset: false
    },
    {
        id: 5,
        name : "temeperature",
        value : 0,
        reset: false
    },
    {
        id: 6,
        name : "vignette",
        value : 0,
        reset: false
    }
]


export default function CreateModal (props){

    const [showSmall,setShowSmall] = useState(true);
    const [showBig,setShowBig] = useState(false);
    const [title,setTitle] = useState();
    const [title1,setTitle1] = useState(true);
    const [title2,setTitle2] = useState(false);
    const [title3,setTitle3] = useState(false);
    const [title4,setTitle4] = useState(false);
    const [modalClick,setModalClick] = useState(false);
    const [files,setFiles] = useState([]);
    const [fileInput,setFileInput] = useState("");
    const [selectedFile,setSelectedFile] =useState(null);
    const [filter,setFilter] = useState(filterArray);
    const [activeSlide,setActiveSlide] = useState(false);
    const [filterSlide,setFilterSlide] = useState(100);
    const [adjustments,setAdjustments] = useState(adjustmentsArray);
    const [bottomL,setBottoml] = useState(true);
    const [bottomR,setBottomr] = useState(false);
    const [caption,setCaption] = useState("");
    const [countCaption,setCountCamption] = useState(0);
    const [location,setLocation] = useState("");
    const [accesibilityShow,setAccessibilityShow] = useState(false);
    const [accesibility,setAccesibility] = useState("");
    const [advancedShow,setAdvancedShow] = useState(false);
    const [hideLikes,setHideLikes] = useState(false);
    const [hideComments,setHideComments] = useState(false);
    const [filterActValue,setFilterActValue] = useState({});
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser.uid);
    const { isLoading, handleCreatePost } = useCreatePost();
    const fileRef = useRef(null);
    let thumbs;
    let thumbs__b;
    let thumbs__s;


    const showToast = useShowToast();

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles);
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setTitle(1);
        setFileInput("drop")
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        if(files){
            return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        }else{
            return
        }
        
    }, []);

    const modalClickHandler = useCallback((e) => {
    
        console.log(e.currentTarget.id);

        if(e.currentTarget.id == 'modalContainer'){
            props.create("esconder");
            setModalClick(false);
            return
        }

        setModalClick(true);

        return

      }, [modalClick]);
    

    const handlePost = async () =>{

        let postFile = null;

        const postObject = {
            'filter': activeSlide && filterActValue,
            'adjustments': adjustments,
            'caption': caption,
            'location': location,
            'accesibility': accesibility,
            'hideLikes': hideLikes,
            'hideComments': hideComments,
        }

        console.log(postObject);
        console.log(files[0].preview);

        
        try{
            await handleCreatePost(files,postObject);
            props.create("esconder");
            setModalClick(false)
        }catch(e){
            showToast("Error",e.message,"error")
        }
        

    }  

    useEffect(() => {
        switch(title){
            case 1:
                setTitle1(false);
                setTitle2(true);
                setTitle3(false);
                setTitle4(false);
                setShowSmall(true);
                setShowBig(false);
                return
            case 2:
                setTitle1(false);
                setTitle2(false);
                setTitle3(true);
                setTitle4(false);
                setShowSmall(false);
                setShowBig(true);
                return
            case 3:
                setTitle1(false);
                setTitle2(false);
                setTitle3(false);
                setTitle4(true);
                setShowSmall(false);
                setShowBig(true);
                return
            default:
                setTitle1(true);
                setTitle2(false);
                setTitle3(false);
                setTitle4(false);
                setShowSmall(true);
                setShowBig(false);
                return
        }
    },[title])


    const handleMedias = useCallback( e => {
        const buttonFiles = e.target.files;

        setFiles(Array.from(buttonFiles).map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        setTitle(1)  
    },[]) 

    if(files){
        thumbs = files.map(file => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />
                </div>
            </div>
        ));

        thumbs__b = files.map(file => (
            <div style={thumb__b} key={file.name}>
                <div style={thumbInner}>
                    <img
                    src={file.preview}
                    style={img__b}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />
                </div>
            </div>
        ));

        thumbs__s = files.map(file => (
            <div style={thumb__s} key={file.name}>
                <div style={thumbInner}>
                    <img 
                        src={file.preview}
                        style={img__s} 
                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />
                </div>
            </div>    
        ));
    }

    const activeFilter = (id) => {

        setFilter(oldFilter=> oldFilter.map(filt => {
            return filt.id === id ? 
                {...filt, active: true} :
                {...filt, active: false}
        }));

        setActiveSlide(true)
    }

    const handleActiveSlider = () => {

        const slideObject = {'id': 0, 'value': filterSlide};

        filter.map(filt => {
            if (filt.active){
                slideObject.id = filt.id
            }
        })

        setFilterActValue(slideObject)
    } 

    const showReset = (id) => {

        setAdjustments(oldAdjustment=> oldAdjustment.map(adjust => {
            return adjust.id === id ? 
                {...adjust, reset: true} :
                {...adjust, reset: false}
        }))
    }

    const hideReset = () => {
        setAdjustments(oldAdjustment => oldAdjustment.map(adjust => {
            return {...adjust, reset: false}      
        }))
    }

    const handleAdjustment = (id,value) => {
        setAdjustments(oldAdjustment=> oldAdjustment.map(adjust => {
            return adjust.id === id ? 
                {...adjust, value: value} :
                {...adjust}
        }))
    }

    const filterMap = filter.map(filt => (
        <Filter key={filt.id} id={filt.id} name={filt.name} src={filt.src} active={filt.active} clickActive={activeFilter} />
    ))

    const adjustmentMap = adjustments.map(adjust => (
        <Adjustment key={adjust.id} id={adjust.id} name={adjust.name} reset={adjust.reset} value={adjust.value} hoverOn={showReset} hoverOff={hideReset} handleAdjustment={handleAdjustment} />
    ))


    return (
        <div className="create__modal" data-bs-backdrop="static" id="modalContainer" onClick={modalClickHandler}>
            <div className="create__modal__position">
                <div className="create__modal__height">
                    <div className="create__modal__background"></div>
                    <div className="create__modal__x">
                        <div className="create__modal__x__container" role="button" tabIndex="0">
                            <div className="create__modal__x__flex">
                                <svg aria-label="Close" className="create__modal__x__svg" fill="currentColor" height="18" width="18" role="img" viewBox="0 0 24 24">
                                    <title>Close</title>
                                    <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="create__modal__box">
                        <div className="create__model__box__container">
                            <div className="create__model__box__flex">
                                <div id="modalClick" aria-label="Create New Post" onClick={(e) => {e.stopPropagation();modalClickHandler(e)}} role="dialog" className="create__model__box__display">
                                    <div className="create__model__box__margin">
                                        <div className="create__model__box__height">
                                            <div className={`${ showSmall ? "create__model__box__size" : "hide" }`}>
                                                <div className="create__model__box__border">
                                                    <CreateHeader title={title} title1={title1} title2={title2} title3={title3} title4={title4} setTitle={setTitle} />
                                                    <div className="create__model__botton">
                                                        <div className="create__model__botton__container">
                                                            <div className="create__model__botton__flex">
                                                                { title1 ?
                                                                    ( 
                                                                        <div className="create__model__botton__padding">
                                                                            <svg aria-label="Icon to represent media such as images or videos" className="create__model__botton__svg" fill="currentColor" width="96" height="77" role="img" viewBox="0 0 97.6 77.3">
                                                                                <title>Icon to represent media such as images or videos</title>
                                                                                <path fill="currentColor" d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"></path>
                                                                                <path fill="currentColor" d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"></path>
                                                                                <path fill="currentColor" d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"></path>
                                                                            </svg>
                                                                            <div className="create__model__botton__title" {...getRootProps()}>
                                                                                <input {...getInputProps()} />
                                                                                <span className="create__model__botton__title__span" dir="auto"> 
                                                                                    { isDragActive ? "Drag photos and videos here" : "Drag 'n' drop some files here, or click to select files"}
                                                                                </span>
                                                                            </div>
                                                                            <div className="create__model__botton__button">
                                                                                <div className="create__model__botton__button__container">
                                                                                    <button className="create__model__botton__button__display" onClick={() => fileRef.current.click()}>Select from computer</button>
                                                                                    <input type="file" hidden accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime" className="create__model__botton__button__display" onChange={handleMedias} ref={fileRef}  multiple />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ):(
                                                                        <aside style={thumbsContainer}>
                                                                            {thumbs}
                                                                        </aside>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="create__model__botton__b">
                                                            <div className="create__model__botton__b__cont">
                                                                <div className="create__model__botton__b__height"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${ showBig ? "create__model__box__size__big" : "hide" }`}>
                                                <div className="create__model__box__border__big">
                                                    <CreateBigHeader title={title} title1={title1} title3={title3} title4={title4} setTitle={setTitle} handlePost={handlePost} />
                                                    <div className="create__model__botton__big">
                                                        <div className="create__model__botton__l__container">
                                                            <div className="create__model__botton__flex__big">
                                                                <aside style={thumbsContainer}>
                                                                    {thumbs__b}
                                                                </aside>
                                                            </div>
                                                        </div>
                                                        {title3 ? 
                                                            <Page3 bottomL={bottomL} bottomR={bottomR} setBottoml={setBottoml} setBottomr={setBottomr} activeSlide={activeSlide} setActiveSlide={setActiveSlide} filterMap={filterMap} adjustmentMap={adjustmentMap} filterSlide={filterSlide} setFilterSlide={setFilterSlide} handleActiveSlider={handleActiveSlider} />
                                                            :<Page4 userProfile={userProfile} caption={caption} setCaption={setCaption} countCaption={countCaption} setCountCamption={setCountCamption} location={location} setLocation={setLocation} accesibility={accesibility} setAccesibility={setAccesibility} accesibilityShow={accesibilityShow} setAccessibilityShow={setAccessibilityShow} thumbsContainer__s={thumbsContainer__s} thumbs__s={thumbs__s} advancedShow={advancedShow} setAdvancedShow={setAdvancedShow} hideLikes={hideLikes} setHideLikes={setHideLikes} hideComments={hideComments} setHideComments={setHideComments}/>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
function useCreatePost(){
    const showToast = useShowToast()
    const [isLoading, setIsLoading] = useState(false)
    const { pathname } = useLocation();
    
    const { getCurrent } = UserAuth()
    const currentUser = getCurrent()
    const {userProfile} = useGetUserProfilebyId(currentUser.uid)

    const handleCreatePost = async (files,postObject) => {
        if (isLoading) return;
		if (!files) throw new Error("Please select an image");
		setIsLoading(true);

        console.log(postObject)

        const newPost = {

            filter: postObject.filter,
            adjustments: postObject.adjustments,
            caption: postObject.caption,
            location: postObject.location,
            accesibility: postObject.accesibility,
            hideLikes: postObject.hideLikes,
            hideComments: postObject.hideComments,
			likes: [],
			comments: [],
            imageURL : "",
			createdAt: Date.now(),
			createdBy: userProfile.uid,
		}

        try {
            const postDocRef = await addDoc(collection(database, "posts"), newPost);
            const userDocRef = doc(database, "user", userProfile.uid);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            
            await uploadBytes(imageRef, files[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              })

            const downloadURL = await getDownloadURL(imageRef);

            console.log(downloadURL)

            await updateDoc(postDocRef, { imageURL: downloadURL });

            showToast("Success", "Post created successfully", "success");
        }catch(e){
            showToast("Error", e.message, "error");
            console.log(e.message)
        }finally{
            setIsLoading(false);
        }

    }

    return { isLoading, handleCreatePost };
}