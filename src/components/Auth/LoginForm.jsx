import React, { useState } from 'react';
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import GoogleAuth from './GoogleAuth';
import useShowToast from '../../hooks/useShowToast';
import { Flex,Image,Box,Text,Link,FormControl,Button,Divider,AbsoluteCenter} from '@chakra-ui/react';
import logo from '../../images/icons/instagram-text-icon.svg';
import { color } from 'framer-motion';

export default function loginForm(){
   
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();
    const showToast = useShowToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signIn(email, password);
            navigate("/feed/")
        } catch (e) {
            showToast("Error", e.message, "error");
        }

    }

    return (
        <>
            <Box w={"100%"} borderWidth={"1px"} borderColor={"rgb(219, 219, 219)"} justifyContent={"center"} alignItems={"center"} pt={"10px"} pb={"10px"} mb={"15px"}>
                <Image src={logo} w={"80%"} h={"51px"} m={"36px auto 12px auto"}/>
                <form method='post' onSubmit={handleSubmit}>
                    <FormControl m={"32px 40px 6px 40px"} id='username' border={"1px solid rgb(219, 219, 219)"} w={"268px"}>
                        <label className="login__form__input__label">
                            <input aria-label="Username, or email" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" value={email} onChange={(e) => setEmail(e.target.value)}  required="required" className="label__imput" />
                            <span className="label__text">Username, or email </span> 
                        </label>
                    </FormControl>
                    <FormControl m={"0px 40px 6px 40px"} id='password' border={"1px solid rgb(219, 219, 219)"} w={"268px"}>
                        <label className="login__form__input__label">
                            <input type='password' aria-label="Password" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required="required" className="label__imput"/>
                            <span className="label__text">Password </span>
                        </label>
                    </FormControl>
                    <Button type='submit' bg={"rgb(0, 149, 246)"} w={"268px"} m={"8px 40px"} borderRadius={"8px"} fontSize={"14px"} color={"rgb(255,255,255)"} p={"7px 16px"} lineHeight={"18px"} fontWeight={"600"} h={"35px"} opacity={".7"}  _hover={{ bg: 'rgb(0, 149, 246)' }}>
                        Log in
                    </Button>
                </form>

                <Box position='relative' padding='2' w={"full"}>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' >
                        <Text color="rgb(115, 115, 115)" fontSize=".8125rem">
                            OR
                        </Text>
                    </AbsoluteCenter>
                </Box>   

                <GoogleAuth prefix="Log in"/>
                
                <Box display={"flex"} w={"full"} justifyContent={"center"} mt={"12px"} alignItems={"center"}>
                    <Link color={"rgb(0, 55, 107)"} fontSize={"12px"} >Forgot password?</Link>
                </Box>
                
            </Box>

            <Box display={"flex"} borderWidth={"1px"} borderColor={"rgb(219, 219, 219)"} pt={"10px"} pb={"10px"} mb={"10px"} alignItems={"center"}>
                <Flex m={"15px auto"}>
                    <Text fontSize={"14px"}> Don't have an account? </Text>
                    <Link href="/signup/" fontSize={"14px"} color={"rgb(0, 149, 246)"} ml={"5px"}>Sign up</Link>
                </Flex>
            </Box>

            <Box w={"100%"} alignItems={"center"}>
                <Text m={"10px 20px 20px 20px"} textAlign={"center"}>
                    Get the app
                </Text>
                <Flex mt={"10px"} mb={"10px"} justifyContent={"center"} alignItems={"center"}>
                    <Link href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DF4AE9A08-BB11-4DCE-A599-29278B02962D%26utm_content%3Dlo%26utm_medium%3Dbadge' mr={"8px"}>
                        <Image src='https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png' h={"40px"}/>
                    </Link>
                    <Link href='ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1366%2C728'>
                        <Image src='https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png' h={"40px"}/>
                    </Link>  
                </Flex>
            </Box>
        </>
    )
}