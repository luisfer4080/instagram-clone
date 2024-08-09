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
            <div className="signup__container">
                <main className="signup__main" role='main'>
                    <div className="signup__main__container">
                        <div className="signup">  
                            <div className="signup__element">
                                <div className="login__logo">
                                    <div aria-disabled="false" role="button" style={{cursor: "pointer"}}>
                                        <i className="logo__img" aria-label="Instagram" role="img"></i>
                                    </div>
                                </div>
                                <form className='singup__form' method='post' onSubmit={signUp}>
                                    <h2 className='signup__title' tabIndex="-1"> Sign up to see photos and videos from your friends</h2>
                                    <GoogleAuth prefix="Sign up"/>
                                    <div className="or__divider__container">
                                        <div className="or__divider">
                                            <div className="or__divider__line"></div>
                                            <div className="or__divider__text">or</div>
                                            <div className="or__divider__line"></div>
                                        </div>
                                    </div>
                                    <div className="login__form__input__margin">
                                        <div className="login__form__input">
                                            <label className="login__form__input__label">
                                                <input aria-label="Email" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="email" className="label__imput" value={inputs.email} onChange={(e) => setInputs({...inputs,email: e.target.value})} required="required" type='email' />
                                                <span className="label__text">Email</span> 
                                            </label>
                                        </div>
                                    </div>
                                    <div className="login__form__input__margin">
                                        <div className="login__form__input">
                                            <label className="login__form__input__label">
                                                <input aria-label="Full Name" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="name" className="label__imput" value={inputs.name} onChange={(e) => setInputs({...inputs,name: e.target.value})} required="required" />
                                                <span className="label__text">Full Name</span> 
                                            </label>
                                        </div>
                                    </div>
                                    <div className="login__form__input__margin">
                                        <div className="login__form__input">
                                            <label className="login__form__input__label">
                                                <input aria-label="Username" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" className="label__imput" value={inputs.username} onChange={(e) => setInputs({...inputs,username: e.target.value})} required="required" />
                                                <span className="label__text">Username</span> 
                                            </label>
                                        </div>
                                    </div>
                                    <div className="login__form__input__margin">
                                        <div className="login__form__input">
                                            <label className="login__form__input__label">
                                                <input  type='password' aria-label="Password" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="password" className="label__imput" value={inputs.password} onChange={(e) => setInputs({...inputs,password: e.target.value})} required="required" />
                                                <span className="label__text">Password</span> 
                                            </label>
                                        </div>
                                    </div>
                                    <p className='signup__form__text'>
                                        <span className='signup___span'>
                                            <span className='signup__form__span__top'>
                                                People who use our service may have uploaded your contact information to Instagram.
                                                <a href="" className='signup__form__span__top__link' rel="nofollow noreferrer" role="link" tabIndex="0" target="_blank">
                                                    Learn More
                                                </a> 
                                            </span>
                                            <br />
                                            <br />
                                            By signing up, you agree to our
                                            <a href="" className='signup__form__span__top__link' rel="nofollow noreferrer" role="link" tabIndex="0" target="_blank">
                                                Terms
                                            </a>
                                            , 
                                            <a href="" className='signup__form__span__top__link' rel="nofollow noreferrer" role="link" tabIndex="0" target="_blank">
                                                Privacy Policy
                                            </a>  
                                            and 
                                            <a href="" className='signup__form__span__top__link' rel="nofollow noreferrer" role="link" tabIndex="0" target="_blank">
                                                Cookies Policy
                                            </a> 
                                        </span>
                                    </p>
                                    { errorMessage && showError && (
                                        <>
                                            <div className="error__alert" >
                                                <span className='error__alert__text'>{errorMessage}</span>
                                                <p className='error__alert__x' onClick={() => setShowError(false)}>x</p>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <div className="signup__blue">
                                            <button className='signup__blue__button' onClick={signUp}>Sign up</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="signup__element">
                                <span className="signup__text">
                                    <p className="signup__link">
                                        Have an account? 
                                        <a href="/" className="signup__link__a">Log in</a>
                                    </p>
                                </span>
                            </div>
                            <div className="get__app__container">
                                <div className="get__app">
                                    <span className="get__app__text"> Get the app </span>
                                </div>
                                <div className="get__it__from">
                                    <a aria-label="Get it from Google Play" href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DF4AE9A08-BB11-4DCE-A599-29278B02962D%26utm_content%3Dlo%26utm_medium%3Dbadge" className="get__it__from__google" rel="nofollow noreferrer" role="link" tabIndex="0" target="_blank">
                                        <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Get it from Google Play" className="google__play__img" />
                                    </a>
                                    <a aria-label="Get it from Microsoft" href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1366%2C728" className="get__it__from__microsoft" rel="nofollow noreferrer" role="link" tabIndex="0" target="_blank">
                                        <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it from Microsoft" className="microsoft__img" />
                                    </a>
                                </div>
                            </div>
                        </div>  
                    </div>
                </main>
                <div className="root__footer__container">
                  <Footer />
                </div>
            </div>
        </>
    )
}