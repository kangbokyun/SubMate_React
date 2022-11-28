import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminMain from './Page/Admin/AdminMain';
import UserManage from './Page/Admin/UserManage';
import Board from './Page/Board/Board';
import BoardView from './Page/Board/BoardView';
import BoardWrite from './Page/Board/BoardWrite';
import BoardReply from './Page/Board/Reply/BoardReply';
import Chat from './Page/Chat/Chat';
import InChat from './Page/Chat/InChat';
import Main from './Page/Main';
import Mate from './Page/Mate/Mate';
import Login from './Page/Member/Login';
import SignUp from './Page/Member/SignUp';
import Profile from './Page/Profile/Profile';
import SetBoard from './Page/Setting/SetBoard';
import SetChat from './Page/Setting/SetChat';
import SetCustomer from './Page/Setting/SetCustomer';
import SetMate from './Page/Setting/SetMate';
import SetProfile from './Page/Setting/SetProfile';
import Setting from './Page/Setting/Setting';

function AppRoute() {
    return(
        <Router>
            <Routes>
                {/* Init */}
                <Route path = "/" element = { <App /> } />
                
                {/* Member */}
                <Route path = "/Login" element = { <Login /> } />
                <Route path = "/SignUp" element = { <SignUp /> } />
                <Route path = "/Home" element = { <Main /> } />
                <Route path = "/AdminMain" element = { <AdminMain /> } />
                <Route path = "/UserManage" element = { <UserManage /> } />

                {/* Mate */}
                <Route path = "/Mate" element = { <Mate /> } />

                {/* Chat */}
                <Route path = "/Chat" element = { <Chat /> } />
                <Route path = "/InChat" element = { <InChat /> } />

                {/* Board */}
                <Route path = "/Board" element = { <Board /> } />
                <Route path = "/BoardWrite" element = { <BoardWrite /> } />
                <Route path = "/BoardView" element = { <BoardView /> } />
                <Route path = "/BoardReply" element = { <BoardReply /> } />
                
                {/* Profile */}
                <Route path = "/Profile" element = { <Profile /> } />
                
                {/* Setting */}
                <Route path = "/Setting" element = { <Setting /> } />
                <Route path = "/SetMate" element = { <SetMate /> } />
                <Route path = "/SetChat" element = { <SetChat /> } />
                <Route path = "/SetBoard" element = { <SetBoard /> } />
                <Route path = "/SetProfile" element = { <SetProfile /> } />
                <Route path = "/SetCustomer" element = { <SetCustomer /> } />
            </Routes>
        </Router>
    );
}
export default AppRoute;