import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";
import defaultImg from '../../images/users/Default_pfp.svg.png';
import { useState, useEffect } from "react";

const PostHeader = ({ post, creatorProfile }) => {
	const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);
	const [defImg, setDefImg] = useState(defaultImg); 

	useEffect(() =>{
        if(creatorProfile){
            if(creatorProfile.profilePictureUrl != ""){
                setDefImg(creatorProfile.profilePictureUrl)
            }
        }
    },[creatorProfile])
	
	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2} px={[2,1,1,0]}>
			<Flex alignItems={"center"} gap={2}>
				{creatorProfile ? (
					<Link to={`/profile/${creatorProfile.username}`}>
						<Avatar src={defImg} alt='user profile pic' size={"sm"} />
					</Link>
				) : (
					<SkeletonCircle size='10' />
				)}

				<Flex fontSize={14} fontWeight={600} gap='2'>
					{creatorProfile ? (
						<Link to={`/profile/${creatorProfile.username}`}>{creatorProfile.username}</Link>
					) : (
						<Skeleton w={"100px"} h={"10px"} />
					)}

					<Box color={"gray.500"} fontWeight={400}>• {timeAgo(post.createdAt)}</Box>
				</Flex>
			</Flex>
			<Box cursor={"pointer"}>
				<Button
					size={"xs"}
					bg={"transparent"}
					fontSize={14}
					color={"blue.500"}
					fontWeight={600}
					_hover={{
						color: "white",
					}}
					transition={"0.2s ease-in-out"}
					onClick={handleFollowUser}
					isLoading={isUpdating}
				>
					{isFollowing ? "Unfollow" : "Follow"}
				</Button>
			</Box>
		</Flex>
	);
};

export default PostHeader;