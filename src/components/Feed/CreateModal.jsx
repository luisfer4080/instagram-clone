import { useEffect, useState, useRef, useCallback } from 'react';
import { UserAuth } from '../../context/AuthContext';
import useGetUserProfilebyId from "../../hooks/useGetUserProfileById";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom";
import { database, storage } from "../../firebase";
import {useDropzone} from 'react-dropzone';
import useShowToast from '../../hooks/useShowToast';
import Filter from '../CreatePost/Filters';
import Adjustment from '../CreatePost/Adjustment';
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
import defaultImg from '../../images/users/Default_pfp.svg.png';
import { 
    EmojiMenu, 
    Location,
    UpArrow,
    DownArrow,
} from "../../assets/constants";
import {
    Avatar,
    Button,
    Divider,
    Flex,
    GridItem,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure,
    useColorModeValue,
    Spacer,
    ModalHeader,
    Box,
    Textarea,
    Input,
    InputRightElement,
    InputLeftAddon,
    InputGroup,
    FormControl,
} from "@chakra-ui/react";

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
    width: '100%',
    height: '300px',
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
    width: '100%',
    height: '300px'
};

const img__b = {
    display: 'block',
    width: '158px',
    height: '158px'
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

const CreateModal = ({isOpen,onOpen,onClose,handleModalOpen}) => {
    const { isOpen: isImageOpen , onOpen: onImageOpen, onClose: onImageClose } = useDisclosure();
    const { isOpen: isFiltersOpen , onOpen: onFiltersOpen, onClose: onFiltersClose } = useDisclosure();
    const { isOpen: isLastOpen , onOpen: onLastOpen, onClose: onLastClose } = useDisclosure();
    const [files,setFiles] = useState([]);
    const [title,setTitle] = useState();
    const [FirstPage,setFirstPage] = useState(true)
    const [filters,setFilters] = useState(filterArray);
    const [adjustments,setAdjustments] = useState(adjustmentsArray);
    const [activeSlide,setActiveSlide] = useState(false);
    const [filterSlide,setFilterSlide] = useState(100);
    const [filterMenu,setFilterMenu] = useState(true)
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser?.uid);
    const [defImg, setDefImg] = useState(defaultImg); 
    const [caption,setCaption] = useState("");
    const [countCaption,setCountCamption] = useState(0);
    const [location,setLocation] = useState("");
    const { isLoading, handleCreatePost } = useCreatePost();
    const [filterActValue,setFilterActValue] = useState({});
    const [accesibility,setAccesibility] = useState("");
    const [showAccesibility,setShowAccesbility] = useState(false);
    const [showAdvanced,setShowAdvanced] = useState(false);
    const [hideLikes,setHideLikes] = useState(false);
    const [hideComments,setHideComments] = useState(false);
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

    useEffect(()=>{
        switch(title){
            case 1:
                setFirstPage(true)
                return;
            case 2:
                onClose();
                onFiltersOpen();
                return;
            case 3:
                onFiltersClose();
                onImageOpen();
                return;
            case 4:  
                onFiltersClose();
                onLastOpen();
                return;
            case 5:
                setFilterMenu(true);
                return;
            case 6:
                setFilterMenu(false);
                setActiveSlide(false);
                return;
            case 7:
                onLastClose();
                onFiltersOpen();
                return;
            case 8:
                onLastClose();
                handlePost();
                handleModalOpen(false);
                return;
            case 9:
                setFirstPage(false)
                return; 
            default:
                onOpen();
                return;
        }
    },[title])

    const handlePost = async () =>{

        const postObject = {
            'filter': activeSlide && filterActValue,
            'adjustments': adjustments,
            'caption': caption,
            'location': location,
            'accesibility': accesibility,
            'hideLikes': hideLikes,
            'hideComments': hideComments,
        }

        try{
            await handleCreatePost(files,postObject);
        }catch(e){
            showToast("Error",e.message,"error")
        }
    }  

    const handleMedias = useCallback( e => {
        const buttonFiles = e.target.files;

        setFiles(Array.from(buttonFiles).map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        setTitle(9);
    },[]) 

    useEffect(() =>{
        if(userProfile){
            if(userProfile.profilePictureUrl != ""){
                setDefImg(userProfile.profilePictureUrl)
            }
        }
    },[userProfile])

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

    const activeFilter = (id) => {

        setFilters(oldFilter=> oldFilter.map(filt => {
            return filt.id === id ? 
                {...filt, active: true} :
                {...filt, active: false}
        }));

        setActiveSlide(true)
    }

    const handleActiveSlider = () => {
        const slideObject = {'id': 0, 'value': filterSlide};

        filters.map(filt => {
            if (filt.active){
                slideObject.id = filt.id
            }
        })

        setFilterActValue(slideObject)

    } 

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

    const filterMap = filters.map(filt => (
        <Filter key={filt.id} id={filt.id} name={filt.name} src={filt.src} active={filt.active} clickActive={activeFilter} />
    ))

    const adjustmentMap = adjustments.map(adjust => (
        <Adjustment key={adjust.id} id={adjust.id} name={adjust.name} reset={adjust.reset} value={adjust.value} hoverOn={showReset} hoverOff={hideReset} handleAdjustment={handleAdjustment} />
    ))

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader h={"30px"}>
                        {(FirstPage) ? (
                            <Flex h={"10px"} justifyContent={"center"}>
                                <Box bg={"transparent"} color={"black"} fontSize={"14px"}>Create a Post</Box>
                            </Flex>
                        ) : (
                            <Flex>
                                <Box bg={"transparent"} color={"black"} onClick={() => setTitle(1)} fontSize={"14px"} cursor={"pointer"}>Back</Box>
                                <Spacer />
                                <Box bg={"transparent"} color={"black"} fontSize={"14px"}>Crop</Box>
                                <Spacer />
                                <Box bg={"transparent"} color={"rgb(0, 149, 246)"} onClick={() => setTitle(2)} fontSize={"14px"} cursor={"pointer"}>Next</Box>
                            </Flex>
                        )}   
                    </ModalHeader>
                    <ModalBody bg={useColorModeValue('white', 'gray.700')} borderTop={"1px solid"} borderTopColor={"#d3cfce"} py={"10px"} px={"0px"} borderBottomRadius={"8px"}>
                        {(FirstPage) ? (
                            <Flex>
                                <Box>
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
                                </Box>
                            </Flex>
                        ) : (
                            <aside style={thumbsContainer}>
                                {thumbs}
                            </aside>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isFiltersOpen} onClose={onFiltersClose} isCentered={true} borderRadius={"8px"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex h={"3vh"}>
                            <Box bg={"transparent"} color={"black"} onClick={() => setTitle(3)} fontSize={"14px"} cursor={"pointer"}>Back</Box>
                            <Spacer />
                            <Box bg={"transparent"} color={"black"} fontSize={"14px"}>Filter</Box>
                            <Spacer />
                            <Box bg={"transparent"} color={"rgb(0, 149, 246)"} onClick={() => setTitle(4)} fontSize={"14px"} cursor={"pointer"}>Next</Box>
                        </Flex>
                    </ModalHeader>
                    <ModalBody bg={useColorModeValue('white', 'gray.700')} p={"0px"} borderTop={"1px solid"} borderTopColor={"#d3cfce"}>
                        <aside style={thumbsContainer}>
                            {thumbs__b}
                        </aside>
                        <Box>
                            <Flex>
                                <Text onClick={() => setTitle(5)}>Filters</Text>
                                <Text onClick={() => setTitle(6)}>Adjustments</Text>
                            </Flex>
                            {filterMenu ? filterMap : adjustmentMap}
                            {activeSlide && (
                                <Box>
                                    <RangeSlider
                                        aria-label={['min', 'max']}
                                        defaultValue={[0, 100]}
                                        value={filterSlide}
                                        onChange={(e) => {setFilterSlide(e.target.value);handleActiveSlider()}}
                                    >
                                        <RangeSliderTrack bg="gray">
                                            <RangeSliderFilledTrack bg="black"/>
                                        </RangeSliderTrack>
                                        <RangeSliderThumb index={0} />
                                        <RangeSliderThumb index={1} />
                                    </RangeSlider>
                                </Box>
                            )}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isLastOpen} onClose={onLastClose} isCentered={true} borderRadius={"8px"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex h={"3vh"}>
                            <Box bg={"transparent"} color={"black"} onClick={() => setTitle(7)} fontSize={"14px"} cursor={"pointer"}>Back</Box>
                            <Spacer />
                            <Box bg={"transparent"} color={"black"} fontSize={"14px"}>Create a New Post</Box>
                            <Spacer />
                            <Box bg={"transparent"} color={"rgb(0, 149, 246)"} onClick={() => setTitle(8)} fontSize={"14px"} cursor={"pointer"}>Share</Box>
                        </Flex>
                    </ModalHeader>
                    <ModalBody bg={useColorModeValue('white', 'gray.700')} p={"0px"} borderTop={"1px solid"} borderTopColor={"#d3cfce"}>
                        <aside style={thumbsContainer}>
                            {thumbs__b}
                        </aside>
                        <Box>
                            <Box px={"8px"}>
                                <Flex>
                                    <Image src={defImg} borderRadius='full' width={"70px"} height={"full"}/> 
                                    <Text color={"black"} fontSize={"14px"}>{userProfile ? userProfile.username : "user"}</Text>
                                </Flex>
                                <Textarea placeholder='Write a caption...' resize={"none"} value={caption} onChange={(e) => {setCaption(e.target.value);setCountCamption(e.target.value.length)}} />
                                <Flex justifyContent={"space-between"}>
                                    <EmojiMenu />"
                                    <Text color={"rgb(199,199,199)"} fontFamily={"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"}> {countCaption} / 2000</Text>
                                </Flex>
                            </Box>
                            <Divider orientation='horizontal' />
                            <InputGroup>
                                <InputLeftAddon><Location /></InputLeftAddon>
                                <Input type='text' id='location' name='location' value={location} onChange={(e) => {setLocation(e.target.value)}} placeholder='Add a Location' />
                            </InputGroup>
                            <Divider orientation='horizontal' />
                            <Flex justifyContent={"space-between"} onClick={() => setShowAccesbility(!showAccesibility)}>
                                <Text>Accesibility</Text>
                                { showAccesibility ? <UpArrow /> : <DownArrow /> }
                            </Flex>
                            {showAccesibility && (
                                <>
                                    <Text>
                                        Alt text describes your photos for people with visual impairments. 
                                        Alt text will be automatically created for your photos or you can 
                                        choose to write your own.
                                    </Text>
                                    <InputGroup>
                                        <InputLeftAddon>{thumb__s}</InputLeftAddon>
                                        <Input type='text' id='accesibility' name='accesibility' value={accesibility} onChange={(e) => setAccesibility(e.target.value) } placeholder="Write alt text..." />
                                    </InputGroup>
                                </>
                            )}
                            <Flex justifyContent={"space-between"} onClick={() => setShowAdvanced(!showAdvanced)}>
                                <Text>Advanced Settings</Text>
                                { showAdvanced ? <UpArrow /> : <DownArrow /> }
                            </Flex>
                            {showAdvanced && (
                                <>
                                    <Flex>
                                        <Text>Hide like and view counts on this post</Text>
                                        <Switch size='md' colorScheme="orange" value={hideLikes} onClick={() => setHideLikes(!hideLikes)}/>
                                    </Flex>
                                    <Text mb={"10px"}>
                                        Only you will see the total number of likes and views on this post. You can change this later 
                                        by going to the ··· menu at the top of the post. To hide like counts on other people's posts, 
                                        go to your account settings. 
                                    </Text>
                                    <Flex>
                                        <Text>Hide like and view counts on this post</Text>
                                        <Switch size='md' colorScheme="orange" value={hideComments} onClick={() => setHideComments(!hideComments)}/>
                                    </Flex>
                                    <Text>
                                        You can change this later by going to the ··· menu at the top of your post.
                                    </Text>
                                </>
                            )}
                        </Box>    
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateModal;

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

