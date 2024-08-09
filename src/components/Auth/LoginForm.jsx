import React, { useState } from 'react';
import {auth} from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import GoogleAuth from './GoogleAuth';
import useShowToast from '../../hooks/useShowToast';

export default function loginForm(){
   
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();
    const [error,setError] = useState('');
    const [showError,setShowError] = useState(false);
    const showToast = useShowToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signIn(email, password);
            navigate("/feed/")
        } catch (e) {
            showToast("Error", e.message, "error");
            setError(e.message);
            setShowError(true)
        }

    }

    return (
        <>
            <div className="login">
                <div className="login__logo">
                    <div aria-disabled="false" role="button" style={{cursor: "pointer"}}>
                        <i className="logo__img" aria-label="Instagram" role="img"></i>
                    </div>
                </div>
                <div className="login__form">
                    <form className="login__form__container" method='post' onSubmit={handleSubmit}>
                        <div className="login__form__input__container">
                            <div className="login__form__input__margin">
                                <div className="login__form__input">
                                    <label className="login__form__input__label">
                                        <input aria-label="Username, or email" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" value={email} onChange={(e) => setEmail(e.target.value)}  required="required" className="label__imput" />
                                        <span className="label__text">Username, or email </span> 
                                    </label>
                                </div>
                            </div>
                            <div className="login__form__input__margin">
                                <div className="login__form__input">
                                    <label className="login__form__input__label">
                                        <input type='password' aria-label="Password" aria-required="true" autoCapitalize="off" autoCorrect="off" maxLength="75" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required="required" className="label__imput"/>
                                        <span className="label__text">Password </span>
                                    </label>
                                </div>
                            </div>
                            {error && showError && (
                                    <div className="error__alert" >
                                        <span className='error__alert__text'>{error}</span>
                                        <span className='error__alert__x' onClick={() => setShowError(false)}>x</span>
                                    </div>
                            )}
                            <div className="login__form__button__container" onClick={handleSubmit}>
                                <button className="login__form__button" >
                                    <div className="login__form__button__text">
                                        Log in
                                    </div>
                                </button>
                            </div>
                            <div className="or__divider-container">
                                <div className="or__divider">
                                    <div className="or__divider__line"></div>
                                    <div className="or__divider__text">or</div>
                                    <div className="or__divider__line"></div>
                                </div>
                            </div>
                            <GoogleAuth prefix="Log in"/>
                        </div>
                    </form> 
                    <a href="" className="forget__password__link" role="link" tabIndex="0">
                        Forgot password?
                    </a>
                </div>
            </div>
            <div className="signup__link__container">
                <span className="signup__text">
                    <p className="signup__link">
                        Don't have an account? 
                        <a href="/signup/" className="signup__link__a">Sign up</a>
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
        </>
    )
}