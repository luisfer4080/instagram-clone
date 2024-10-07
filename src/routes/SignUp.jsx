import Footer from '../components/Auth/Footer';
import React, { useState } from 'react';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, setDoc, where } from "firebase/firestore";
import {database} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import GoogleAuth from '../components/Auth/GoogleAuth';
import { query } from 'firebase/database';
import useShowToast from '../hooks/useShowToast';
import { Flex,Image,Box,Text,Link,FormControl,Button,Divider,AbsoluteCenter, Container} from '@chakra-ui/react';
import logo from '../images/icons/instagram-text-icon.svg';

export default function singUp(){

    const {user} = UserAuth();
    if(user !== null) return null

    const [inputs,setInputs] = useState({
        email:"",
        name: "",
        username: "",
        password: ""
    })

    const [errorMessage,setErrorMessage] = useState('');
    const [showError,setShowError] = useState(false);
    const navigate = useNavigate();
    const { createUser } = UserAuth();
    const showToast = useShowToast();

    const signUp  = async (e) => {

        e.preventDefault();
        setErrorMessage('');

        if(!inputs.email || !inputs.username || !inputs.password || !inputs.name ){
            setErrorMessage('Please fill all the fields');
            return
        }

        const userRef = collection(database,"user");

        const q = query(userRef, where("username","==",inputs.username));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
            setErrorMessage('Username Already Exist');
            return 
        }

        try{
            const userCredentials = await createUser(inputs.email,inputs.password);
            
            if(userCredentials && auth.currentUser){
                updateProfile(auth.currentUser,{
                    displayName : inputs.username 
                });

                const newDoc = {
                    uid: userCredentials.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    password: inputs.password,
                    name: inputs.name,
                    bio: "",
                    profilePictureUrl: "",
                    followers: [],
                    following: [],
                    posts: [],
                    saved: [],
                    createdAT: Date.now()
                };

                await setDoc(doc(database, "user", userCredentials.user.uid), newDoc);
                localStorage.setItem("user-info",JSON.stringify(newDoc));

                navigate("/");
                showToast("Success", "You have sign up successfully", "success");
            }

        }catch(e){
            setErrorMessage(e.message);
            console.log(e.message);
            setShowError(true)
        }

        
        
    }

    return (
        <>
            <Container minHeight={"100vh"} maxW={"95%"} mt={"12px"} centerContent>
                <Box w={"350px"}>
                    <Box w={"100%"} borderWidth={"1px"} borderColor={"rgb(219, 219, 219)"} justifyContent={"center"} alignItems={"center"} pt={"10px"} pb={"10px"} mb={"15px"}>
                        <Image src={logo} w={"80%"} h={"51px"} m={"36px auto 12px auto"}/>
                        <Text m={"0px 40px 10px 40px"} color={"#737373"}fontSize={"17px"} fontWeight={"600"} textAlign={"center"}>
                            Sign up to see photos and videos from your friends
                        </Text>
                        <GoogleAuth prefix="Sign up"/>
                        <Box position='relative' padding='2' w={"full"} color={"rgb(219, 219, 219)"}>
                            <Divider />
                            <AbsoluteCenter bg='white' px='4' >
                                <Text color="rgb(115, 115, 115)" fontSize=".8125rem">
                                    OR
                                </Text>
                            </AbsoluteCenter>
                        </Box>   
                        <form method='post' onSubmit={signUp}>
                            <FormControl m={"6px 40px 6px 40px"} id='username' border={"1px solid rgb(219, 219, 219)"} w={"268px"}>
                                <label className="login__form__input__label">
                                    <input aria-label="Username, or email" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" value={inputs.email} onChange={(e) => setInputs({...inputs,email: e.target.value})}  required="required" className="label__imput" />
                                    <span className="label__text">Email </span> 
                                </label>
                            </FormControl>
                            <FormControl m={"0px 40px 6px 40px"} id='username' border={"1px solid rgb(219, 219, 219)"} w={"268px"}>
                                <label className="login__form__input__label">
                                    <input aria-label="Full name" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" value={inputs.name} onChange={(e) => setInputs({...inputs,name: e.target.value})}  required="required" className="label__imput" />
                                    <span className="label__text">Full Name</span> 
                                </label>
                            </FormControl>
                            <FormControl m={"0px 40px 6px 40px"} id='username' border={"1px solid rgb(219, 219, 219)"} w={"268px"}>
                                <label className="login__form__input__label">
                                    <input aria-label="Username" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" className="label__imput" value={inputs.username} onChange={(e) => setInputs({...inputs,username: e.target.value})} required="required" />
                                    <span className="label__text">Username</span> 
                                </label>
                            </FormControl>
                            <FormControl m={"0px 40px 6px 40px"} id='password' border={"1px solid rgb(219, 219, 219)"} w={"268px"}>
                                <label className="login__form__input__label">
                                    <input  type='password' aria-label="Password" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="password" className="label__imput" value={inputs.password} onChange={(e) => setInputs({...inputs,password: e.target.value})} required="required" />
                                    <span className="label__text">Password</span> 
                                </label>
                            </FormControl>
                            <Box m={"10px 40px"} fontSize={"12px"} color={"#737373"} textAlign={"center"}>
                                <Box mb={"10px"}>
                                    <Text>
                                        People who use our service may have uploaded your contact information to Instagram.
                                    </Text>
                                    <Link color={"rgb(0, 55, 107)"} fontSize={"12px"}>
                                        Learn More
                                    </Link>
                                </Box>
                                <Box>
                                    <Text>
                                        By signing up, you agree to our
                                    </Text>
                                    <Link color={"rgb(0, 55, 107)"} fontSize={"12px"}>
                                        Terms,
                                    </Link>
                                    <Link color={"rgb(0, 55, 107)"} fontSize={"12px"}>
                                        Privacy Policy,
                                    </Link>
                                    <Link color={"rgb(0, 55, 107)"} fontSize={"12px"}>
                                        Cookies Policy
                                    </Link>
                                </Box>
                            </Box>
                            <Button type='submit' bg={"rgb(0, 149, 246)"} w={"268px"} m={"8px 40px"} borderRadius={"8px"} fontSize={"14px"} color={"rgb(255,255,255)"} p={"7px 16px"} lineHeight={"18px"} fontWeight={"600"} h={"35px"} opacity={".7"}  _hover={{ bg: 'rgb(0, 149, 246)' }}>
                               Sign up
                            </Button>
                        </form>
                    </Box>

                    <Box display={"flex"} borderWidth={"1px"} borderColor={"rgb(219, 219, 219)"} pt={"10px"} pb={"10px"} mb={"10px"} alignItems={"center"}>
                        <Flex m={"15px auto"}>
                            <Text fontSize={"14px"}> Have an account?</Text>
                            <Link href="/" fontSize={"14px"} color={"rgb(0, 149, 246)"} ml={"5px"}>Log in</Link>
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
                </Box>
                <Box p={"0px 16x 0px 16px"}>
                    <Footer />
                </Box>
            </Container>
        </>
    )
}