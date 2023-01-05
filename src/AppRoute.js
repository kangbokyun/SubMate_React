import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminBoard from './Page/Admin/AdminBoard';
import AdminMain from './Page/Admin/AdminMain';
import AdminQnA from './Page/Admin/AdminQnA';
import AdminSetting from './Page/Admin/AdminSetting';
import AdminTendinousList from './Page/Admin/AdminTendinousList';
import NoticeList from './Page/Admin/NoticeList';
import NoticeWrite from './Page/Admin/NoticeWrite';
import ReportList from './Page/Admin/ReportList';
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
import QnA from './Page/Setting/SetC_QnA';
import Tendinous from './Page/Setting/SetC_Tendinous';
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

                {/* Admin */}
                <Route path = "/AdminMain" element = { <AdminMain /> } />
                <Route path = "/UserManage" element = { <UserManage /> } />
                <Route path = "/AdminSetting" element = { <AdminSetting /> } />
                <Route path = "/AdminBoard" element = { <AdminBoard /> } />
                <Route path = "/TendinousList" element = { <AdminTendinousList /> } />
                <Route path = "/QnAList" element = { <AdminQnA /> } />
                <Route path = "/NoticeList" element = { <NoticeList /> } />
                <Route path = "/NoticeWrite" element = { <NoticeWrite /> } />
                <Route path = "//ReportList" element = { <ReportList /> } />

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
                <Route path = "/Customer/QnA" element = { <QnA /> } />
                <Route path = "/Customer/Tendinous" element = { <Tendinous /> } />
            </Routes>
        </Router>
    );
}
export default AppRoute;