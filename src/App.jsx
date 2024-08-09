import './App.css';
import { Routes, Route } from "react-router-dom";
import UserFeed from './routes/UserFeed';
import YourProfile from './routes/YourProfile';
import Profile from './routes/Profile';
import Root from './routes/Root';
import SignUp from './routes/SignUp';
import ProtectedRoutes from "./components/Auth/protectedRoutes";
import LogInRedirect from './components/Auth/LogInRedirect';
import { AuthContextProvider } from './context/AuthContext';

function App(){

    return (
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<LogInRedirect><Root /></LogInRedirect>}/>
                <Route path='/signup' element={<LogInRedirect><SignUp /></LogInRedirect>}/>
                <Route path='/feed' element={<ProtectedRoutes><UserFeed /></ProtectedRoutes>}/>
                <Route path='/profile' element={<ProtectedRoutes><YourProfile /></ProtectedRoutes>}/>
                <Route path='/profile/:username' element={<Profile />}/> 
            </Routes> 
        </AuthContextProvider>
    )
}

export default App
