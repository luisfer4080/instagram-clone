import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useGetUserProfilebyId from "../../hooks/useGetUserProfileById";
import { useState, useEffect } from "react";
import defaultImg from '../../images/users/Default_pfp.svg.png'; 

const Caption = ({ post }) => {
	const { userProfile, isLoading } = useGetUserProfilebyId(post?.createdBy);
	const [defImg, setDefImg] = useState(defaultImg) ;

	useEffect(() =>{
        if(userProfile){
            if(userProfile.profilePictureUrl != ""){
                setDefImg(userProfile.profilePictureUrl)
            }
        }
    },[userProfile])

	return (
		<Flex gap={4}>
			<Link to={`/profile/${userProfile?.username}`}>
				<Avatar src={defImg} size={"sm"} />
			</Link>
			<Flex direction={"column"}>
				<Flex gap={2}>
					<Link to={`/profile/${userProfile?.username}`}>
						<Text fontWeight={"bold"} fontSize={12}>
							{userProfile?.username}
						</Text>
					</Link>
					<Text fontSize={12}>{post?.caption}</Text>
				</Flex>
				<Text fontSize={10} color={"gray"}>
					{timeAgo(post?.createdAt)}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Caption;
