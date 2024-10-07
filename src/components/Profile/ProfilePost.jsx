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
	InputGroup,
	FormControl,
} from "@chakra-ui/react";

import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { database, storage } from "../../firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import useGetUserProfilebyId from "../../hooks/useGetUserProfileById";
import useUpdatePost from "../../hooks/useUpdatePost";
import useShowToast from "../../hooks/useShowToast";
import defaultImg from '../../images/users/Default_pfp.svg.png'; 
import Caption from "../Comments/Caption";
import Comment from "../Comments/Comment";
import PostFooter from "../Feed/PostFooter";
import { deleteObject, ref } from "firebase/storage";
import { EmojiMenu, AddLocation, UpArrow, DownArrow } from "../../assets/constants";

export default function ProfilePost({post}){
	const [inputs,setInputs] = useState({
        caption: "",
        location: "",
		accesibility: "",
    }); 
	const [captionCount,setCaptionCount] = useState(post.caption.length)
	const { isOpen: isPostOpen , onOpen: onPostOpen, onClose: onPostClose } = useDisclosure();
	const { isOpen: isMenuOpen , onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
	const { isOpen: isUpdateOpen , onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
	const [aPost,setAPost] = useState(post);
    const showToast = useShowToast();
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(post.createdBy);
	const { isUpdating ,UpdatePost } = useUpdatePost();
    const [defImg, setDefImg] = useState(defaultImg); 
    const [isDeleting, setIsDeleting] = useState(false);
	const [showAccessibility,setShowAccessibility] = useState(false);

    useEffect(() =>{
        if(userProfile){
            if(userProfile.profilePictureUrl != ""){
                setDefImg(userProfile.profilePictureUrl)
            }
        }
    },[userProfile])

    const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return
		if (isDeleting) return

		try{
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(database, "user", userProfile.uid);
			await deleteDoc(doc(database, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			showToast("Success", "Post deleted successfully", "success");
		}catch(e){
			showToast("Error", e.message, "error");
		}finally{
			setIsDeleting(false)
		}
    }

	const newComment = (postId, comment) => {
		const newComment = {
			comment,
			createdAt: Date.now(),
			createdBy: currentUser.uid,
			postId,
		};
		
		setAPost( () => {
			if (postId=== aPost.id){
				return {
					...aPost,
					comments: [...aPost.comments, newComment],
				};
			}
			return aPost
		})
	};

	const HandleUpdate = async () => {
		
		try{
			await UpdatePost(post,inputs);
			onUpdateClose();
			onMenuClose();
		}catch(e){
			showToast("Error", e.message, "error");
		}
	}

    return (
        <>
            <GridItem
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onPostOpen}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"blackAlpha.700"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<AiFillHeart size={20} color="white" />
							<Text fontWeight={"bold"} ml={2} color="white">
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} color="white"/>
							<Text fontWeight={"bold"} ml={2} color="white">
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image src={post.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
			</GridItem>

            <Modal isOpen={isPostOpen} onClose={onPostClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton pt={"18px"} _hover={{}}/>
					<ModalBody bg={useColorModeValue('white', 'gray.700')} p={"0px"}>
						<Flex
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							h={"90vh"}
							p={"0px"}
						>
							<Flex
								overflow={"hidden"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Image src={post.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"}/>
							</Flex>
							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }} pt={"14px"}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={defImg} size={"sm"} name='As a Programmer' />
										<Text fontWeight={"bold"} fontSize={12}>
											{userProfile && userProfile.username}
										</Text>
									</Flex>

									{currentUser?.uid === userProfile?.uid && (
										<Button
											size={"sm"}
											bg={"transparent"}
											borderRadius={4}
											p={1}
											onClick={onMenuOpen}
											_hover={{}}
										>
											...
										</Button>
									)}
								</Flex>

								<Divider my={4} bg={"gray.500"} />

								<VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
									{/* CAPTION */}
									{aPost.caption && <Caption post={aPost} />}
									{/* COMMENTS */}
									{aPost.comments.map((comment) => (
										<Comment key={comment.id} comment={comment} post={aPost} />
									))}
								</VStack>
								
								<Divider my={4} bg={"gray.8000"} />

								<PostFooter isProfilePage={true} post={post} newComment={newComment} creatorProfile={userProfile}/>

							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal isOpen={isMenuOpen} onClose={onMenuClose} isCentered={true} >
				<ModalOverlay />
				<ModalContent>
					<ModalBody bg={useColorModeValue('white', 'gray.700')} paddingTop={"10px"} paddingBottom={"10px"} borderRadius={"15px"}>
						<Flex
							gap='4'
							w={"100%"}
							h={"32vh"}
							p={"0px"}
						>
							<Box
								overflow={"hidden"}
								borderColor={"whiteAlpha.300"}
								justifyContent={"center"}
								alignItems={"center"}
								w={"100%"}
							>
								<Button
									bg={"transparent"}
									color={'black'}
									fontSize={"20px"}
									onClick={onUpdateOpen}
									w={"100%"}
									cursor={"pointer"}
									textAlign={"center"}
									_hover={{}}
								>
									Update Post
								</Button>
								<Divider my={4} bg={"gray.500"} />
								<Button
									bg={"transparent"}
									color={"red"}
									fontSize={"20px"}
									onClick={handleDeletePost}
									isLoading={isDeleting}
									w={"100%"}
									cursor={"pointer"}
									textAlign={"center"}
									_hover={{}}
								>
									Delete Post
								</Button>
								<Divider my={4} bg={"gray.500"} />
								<Button
									bg={"transparent"}
									color={"black"}
									fontSize={"20px"}
									onClick={onMenuClose}
									w={"100%"}
									cursor={"pointer"}
									textAlign={"center"}
									_hover={{}}
								>
									Cancel
								</Button>
							</Box>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal isOpen={isUpdateOpen} onClose={onUpdateClose} isCentered={true} size={{ base: "1.5xl", md: "3xl" }}  borderRadius={"8px"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Flex h={"3vh"}>
							<Box bg={"transparent"} color={"black"} onClick={onUpdateClose} fontSize={"14px"} cursor={"pointer"}>Cancel</Box>
							<Spacer />
							<Box bg={"transparent"} color={"black"} fontSize={"14px"}>Edit Post</Box>
							<Spacer />
							<Box bg={"transparent"} color={"rgb(0, 149, 246)"} onClick={HandleUpdate} fontSize={"14px"} cursor={"pointer"}>Done</Box>
						</Flex>
					</ModalHeader>
					<ModalBody bg={useColorModeValue('white', 'gray.700')} p={"0px"} borderTop={"1px solid"} borderTopColor={"#d3cfce"}>
						<Flex
							gap='4'
							w={"100%"}
							mx={"auto"}
							h={"65vh"}
							p={"0px"}
						>
							<Flex
								overflow={"hidden"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Flex
								overflow={"hidden"}
								borderColor={"whiteAlpha.300"}
								flex={1}
								justifyContent={"center"}
								alignItems={"center"}
								w={"50%"}
								h={"100%"}
								>
									<Image src={post.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"}/>
								</Flex>
								<Flex flexDir={"column"} px={5} pt={"14px"} w={"50%"} h={"100%"} overflow={"scroll"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={defImg} size={"sm"} name='As a Programmer' />
										<Text fontWeight={"bold"} fontSize={12}>
											{userProfile && userProfile.username}
										</Text>
									</Flex>
									<FormControl id="caption">
										<Textarea
											value={inputs.caption}
											onChange={(e) => {setInputs({...inputs,caption: e.target.value});setCaptionCount(e.target.value.length)}}
											placeholder={post.caption ? post.caption : "Add Caption"}
											size='sm'
											border={"none"}
											cols={"30"}
											rows={"10"}
											_focusVisible={{outline: "none"}}
											resize={"none"}
											pl={"0px"}
										/>
									</FormControl>
									<Flex justifyContent={"space-between"}>
										<EmojiMenu />
										<Text>{captionCount} / 2000</Text>
									</Flex>
									<FormControl id="caption" borderTop={"1px solid #d3cfce"} mb={"15px"} w={"100%"}>
										<InputGroup>
											<Input
												value={inputs.location}
												onChange={(e) => {setInputs({...inputs,location: e.target.value})}}
												placeholder={post.location ? post.location : "Add Location" }
												w={"100%"}
												pl={"0px"}
												_focusVisible={{outline: "none"}}
												border={"none"}
												fontSize={"14px"}
												color={"black"}
											/>
											<InputRightElement>
												<AddLocation />
											</InputRightElement>
										</InputGroup>
									</FormControl>
									<Flex justifyContent={"space-between"} mb={"10px"} onClick={() => setShowAccessibility(!showAccessibility) }>
										<Text fontWeight={"600"}>Accessibility</Text>
										{showAccessibility ? <UpArrow /> : <DownArrow />}
									</Flex>
									{showAccessibility && (
										<Box>
											<Text fontSize={"13px"} mb={"10px"}>
												Alt text describes your photos for people with visual impairments. Alt text will be 
												automatically created for your photos or you can choose to write your own.
											</Text>
											<Flex mb={"10px"}>
												<Image src={post.imageURL} alt='profile post' w={"60px"} h={"40px"} paddingRight={"16px"}/>
												<FormControl id="accesibility">
													<Input
														value={post.accessibility}
														onChange={(e) => {setInputs({...inputs,accesibility: e.target.value})}}
														placeholder={post.accesibility ? post.accesibility : "Add Alt Text" }
														size='sm'
														_focusVisible={{outline: "none"}}
														border={"none"}
													/>
												</FormControl>
											</Flex>
										</Box>
									)}
								</Flex>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
        </>
    )
}

