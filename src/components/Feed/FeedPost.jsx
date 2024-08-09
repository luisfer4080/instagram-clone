import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<div className="feed__post__border">
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={post.imageURL} alt={"FEED POST IMG"} width={644} height={644}/>
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</div>
	);
};

export default FeedPost;