import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure, Spacer } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { timeAgo } from "../../utils/timeAgo";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import CommentsModal from "../Comments/CommentsModal";
import { UserAuth } from "../../context/AuthContext";
import useGetUserProfilebyId from "../../hooks/useGetUserProfileById";
import useLikePost from "../../hooks/useLikePost";
import useSavePost from "../../hooks/useSavePost";
import usePostComment from "../../hooks/usePostComment";

export default function PostFooter({isProfilePage, post, newComment,creatorProfile}){
    const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfilebyId(currentUser.uid);
    const commentRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { handleSavePost, isSaved } = useSavePost(post?.id);
	const [showLiked, setShowLiked] = useState(post.likes.includes(userProfile?.uid));
	const [showSaved,setShowSaved] = useState(userProfile?.saved.includes(post?.id));

	useEffect(() => {
		setShowLiked(post.likes.includes(userProfile?.uid))
	},[userProfile])

	useEffect(() => {
		setShowSaved(userProfile?.saved.includes(post?.id))
	},[userProfile])

    const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
		newComment(post.id, comment)
	};

	const hadleShowLike = () => {
		setShowLiked(!showLiked)
		handleLikePost()
	}

	const handleShowSaved = () => {
		setShowSaved(!showSaved)
		handleSavePost()
	}

    return (
        <Box mb={10} marginTop={"auto"} px={[2,1,1,0]} >
			<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
				<Box onClick={hadleShowLike} cursor={"pointer"} fontSize={18} >
					{!showLiked ? <NotificationsLogo /> : <UnlikeLogo />}
				</Box>

				<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
					<CommentLogo />
				</Box>
				<Spacer />
				<Box cursor={"pointer"} fontSize={18} onClick={handleShowSaved}>
					{showSaved ? (
						<svg aria-label="saved" className="profile__svg__display" color="gray" fill="gray" height="24" role="img" viewBox="0 0 24 24" width="24">
							<title>Remove</title>
							<path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
						</svg>
					) : (
						<svg aria-label="save" className="profile__svg__display" color="gray" fill="gray" height="24" role="img" viewBox="0 0 24 24" width="24">
							<title>Save</title>
							<polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
						</svg>
					)}
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={"sm"} color={"gray"}>
				{likes} likes
			</Text>

			{isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
					<Text fontSize='sm' fontWeight={500}>
						{creatorProfile?.username}{" "}
						<Text as='span' fontWeight={400}>
							{post.caption}
						</Text>
				
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)}
					{/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
					{isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
				</>
			)}

			{userProfile && (
				<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"} >
					<InputGroup>
						<Input
							variant={"unstyled"}
							placeholder={"Add a comment..."}
							fontSize={14}
							onChange={(e) => setComment(e.target.value)}
							height={"2.5rem"}
							value={comment}
							ref={commentRef}
						/>
						<InputRightElement>
							<Button
								fontSize={14}
								color={"blue.500"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "gray" }}
								bg={"transparent"}
								onClick={handleSubmitComment}
								isLoading={isCommenting}
							>
								Post
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			)}
		</Box>
    )

}