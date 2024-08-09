import LoginForm from '../components/Auth/LoginForm';
import Footer from '../components/Auth/Footer';
import { UserAuth } from '../context/AuthContext';
 
export default function Root(){

    const {user} = UserAuth();
    if(user !== null) return null
        
    return(
        <>
            <div className='authot__container'>
                <h1 className='author__title'>Instagram Clone by Luis Marquez</h1>
            </div>
            <div className="root">
                <div className="root__image"></div>
                <div className="root__login">
                    <LoginForm />
                </div>
            </div>
            <div className="root__footer__container">
                <Footer />
            </div>
        </>
    )   
}