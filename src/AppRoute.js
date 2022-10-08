import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Chat from './Pages/Chat/Chat';
import Mate from './Pages/Mate/Mate';
import Login from './Pages/Member/Login';
import MyInfo from './Pages/Member/MyInfo';
import SignUp from './Pages/Member/SignUp';
import PidMain from './Pages/PID/PidMain';
import ProfileMain from './Pages/Profile/ProfileMain';

function AppRoute() {
    return(
        <Router>
            <Routes>
                <Route path = "/" element = { <App /> } />
                <Route path = "/SignUp" element = { <SignUp /> } />
                <Route path = "/Login" element = { <Login /> } />
                <Route path = "/MyInfo" element = { <MyInfo /> } />
                <Route path = "/Pid" element = { <PidMain /> } />
                <Route path = "/Profile" element = { <ProfileMain /> } />
                <Route path = "/Chat" element = { <Chat /> } />
                <Route path = "/Mate" element = { <Mate /> } />
            </Routes>
        </Router>
    );
}
export default AppRoute;