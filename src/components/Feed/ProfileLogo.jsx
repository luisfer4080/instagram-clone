import { UserAuth } from '../../context/AuthContext';
import defaultImg from '../../images/users/Default_pfp.svg.png';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { Image } from '@chakra-ui/react';
import { useEffect, useState} from 'react';

const ProfileLogo = ({act}) => {
    const { getCurrent } = UserAuth();
    const currentUser = getCurrent();
    const {userProfile} = useGetUserProfileById(currentUser?.uid);
    const [defImg, setDefImg] = useState(defaultImg); 

    useEffect(() =>{
        if(userProfile){
            if(userProfile.profilePictureUrl != ""){
                setDefImg(userProfile.profilePictureUrl)
            }
        }
    },[userProfile])

    return (
        <>
            { act ?(
                <Image src={defImg} borderRadius='full' width={"35px"} height={"full"} border={"1px"} borderColor={"black"}/>     
            ):(
                <Image src={defImg} borderRadius='full' width={"35px"} height={"full"}/> 
            )}
        </>
    )
}

export default ProfileLogo;