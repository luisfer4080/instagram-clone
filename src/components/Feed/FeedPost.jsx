import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<Box borderBottom={"1px solid rgb(219, 219, 219)"} w={{base: '100%', md: '100%', lg: '630px'}}>
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2}  borderRadius={4} overflow={"hidden"} width={["full","full","full",630]}  height={[375,469,469,600]}>
				<Image src={post.imageURL} alt={post.id} objectFit='cover' boxSize={"100%"} />
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</Box>
	);
};

export default FeedPost;