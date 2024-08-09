import useGetSavedPosts from '../../hooks/useGetSavedPosts';
import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from './ProfilePost';

export default function SavedPosts({user}){
    const { isLoading, savedPosts } =  useGetSavedPosts(user.saved);
    const noPostsFound = !isLoading && savedPosts.length === 0;
	if (noPostsFound) return <NoPostsFound />

    return (
        <Grid
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(3, 1fr)",
			}}
			gap={1}
			columnGap={1}
		>
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={4}>
						<Skeleton w={"full"}>
							<Box h='300px'>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoading && (
				<>
					{savedPosts.map((post) => (
						<ProfilePost post={post} key={post.id} />
					))}
				</>
			)}
		</Grid>
    )
}

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};
