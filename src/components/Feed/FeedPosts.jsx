import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
	const { isLoading, posts } = useGetFeedPosts();

	return (
		<Container maxW={"container.sm"} py={[0,0,0,3]} px={[0,0,0,0]}>
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
			{!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"} align={"center"}>
						Looks like you dont have any post on your feed
					</Text>
					<Text color={"gray"} align={"center"}>Follow some suggested users to see their posts!!</Text>
				</>
			)}
		</Container>
	);
};

export default FeedPosts;