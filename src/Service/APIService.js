import { API_BASE_URL } from "./App_Config";

const Access_Token = "Access_Token";
const UserInfo = "UserInfo";

export const call = (api, method, request) => {

    let headers = "";

    if(
        api === "/Board/BoardWrite" || api === "/Auth/SignUp" || 
        api === "/Board/ViewUpdate" || api === "/Board/Heart" || 
        api === "/Admin/ChangeRole" || api === "/Mate/Users"  || 
        api === "/Mate/Profile"     || api === "/Mate/UserHeart" || 
        api === "/Mate/ClickHeart"
    ) {
        headers = new Headers({
            // "Content-Type": "multipart/form-data",
        });
    } else {
        headers = new Headers({
            "Content-Type": "application/json",
        });
    }

    // 로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem("Access_Token");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if(
        api === "/Board/BoardWrite" || api === "/Auth/SignUp" || 
        api === "/Board/ViewUpdate" || api === "/Board/Heart" || 
        api === "/Admin/ChangeRole" || api === "/Mate/Users"  || 
        api === "/Mate/Profile"     || api === "/Mate/UserHeart" || 
        api === "/Mate/ClickHeart"
    ) {
        if (request) {
            // GET method
            options.body = request;
            console.log(request);
        }
    } else {
        if (request) {
            // GET method
            options.body = JSON.stringify(request);
            console.log(request)
        }
    }
    let temp;
    return fetch(options.url, options)
    .then ((response) =>{
        if(response.status=== 403 && response.url === "http://localhost:8080/User/UserCheck"){
            window.location.href = "/Login";
        }
        return response
    })
    .then((response) =>
        response.json().then((json) => {
          if (!response.ok) {
            // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
            return Promise.reject(json);
          }
            console.log(response)
            temp = json;
          return temp;
        })
    )
    .catch((error) => {
        // 추가된 부분
        if(error === null){
            console.log("에러발생")
        }
            console.log(error)
        if (error.status === 403) {
            window.location.href = "/Login"; // redirect
        }else if(error.error === "Login failed"){
            alert("로그인에 실패하였습니다. (아이디, 비밀번호 재확인 필요)")
        }else if(error.error === "NOTUSER"){
            alert("로그인 권한이 존재하지 않습니다.(관리자 로그인 권한 수락 필요)")
        }     
        return Promise.reject(error);
    });

}

// Member=============================================================================================

// 회원가입
export const SignUpAPI = (formData) => {
    return call("/Auth/SignUp", "POST", formData)
    .then((res) => {
        if(res) {
            alert("회원가입 되었습니다.");
            window.location.href = "/Login"
        } else {
            alert("회원가입에 실패했습니다.");
        }
    })
};
export const SignUpNoImgAPI = (memberDTO) => {
    return call("/Auth/SignUpNoImg", "POST", memberDTO)
    .then((res) => {
        console.log(res.status);
        if(res) {
            alert("회원가입 되었습니다.");
            window.location.href = "/Login";
        } else {
            alert("회원가입 실패 :: 관리자에게 문의");
        }
    })
};

// 서브메이트 로그인
export const LoginAPI = (memberDTO) => {
    return call("/Auth/Login", "POST", memberDTO)
    .then((response) => {
        if(response.token) {
            // 로컬스토리지에 토큰 저장
            localStorage.setItem("Access_Token", response.token);
            localStorage.setItem("UserInfo", JSON.stringify(response));

            // 토큰이 존재하는 경우 메인 화면으로 리다이렉트
            if(response.mrole === "ADMIN") {
                window.location.href = "/AdminMain"; // 추후 어드민페이지 개발예정
            } else {
                window.location.href = "/Home";
            }
        }
    })
};

// 로그아웃
export const LogoutAPI = () => {
    // localStorage.setItem(Access_Token, null);
    localStorage.clear(Access_Token);
    // localStorage.setItem(UserInfo, null);
    localStorage.clear(UserInfo);
    if(!!localStorage.getItem(Access_Token)) {
        alert("오류 :: 관리자에게 문의하세요.");
    } else {
        alert("로그아웃 되었습니다.");
        window.location.href = "/";
    }
};

// 유저매니저 권한 업데이트
export const ChangeRole = (formData) => {
    return call("/Admin/ChangeRole", "POST", formData)
    .then((res) => {
        console.log("/Admin/UserManage, Res : ", res);
    })
};

// -/Member===========================================================================================
// Board==============================================================================================

// 게시글(이미지 있음) 쓰기
export const BoardWriteAPI = (formData) => {
    return call("/Board/BoardWrite", "POST", formData)
    .then((response) => {
        if(response) {
            alert("글 등록되었습니다.");
            window.location.href = "/Board";
        } else {
            alert("글 등록 실패 :: 관리자에게 문의");
        }
    })
};

// 게시글(이미지없음) 쓰기
export const BoardWriteNoImgAPI = (boardDTO) => {
    if(boardDTO.mno === undefined) {
        let info = JSON.parse(localStorage.getItem("UserInfo"));
        boardDTO.mno = info.mno;
    }
    if(boardDTO.bwriter === undefined) {
        let info = JSON.parse(localStorage.getItem("UserInfo"));
        boardDTO.bwriter = info.mnickname;
    }
    return call("/Board/BoardWriteNoImg", "POST", boardDTO)
    .then((res) => {
        if(res) {
            alert("글 등록되었습니다.");
            window.location.href = "/Board";
        } else {
            alert("글 등록 실패 :: 관리자에게 문의");
        }
    })
};


// 댓글/대댓글 쓰기
export const ReplyWriteAPI = (replyDTO) => {
    return call("/Board/ReplyWrite", "POST", replyDTO)
    .then((res) => {
        if(res) {
            alert("댓글 등록되었습니다.");
            window.location.href = "/BoardReply";
        } else {
            alert("댓글 등록 실패");
        }
    })
};

// -/Board============================================================================================
// Heart============================================================================================

// 게시글 하트
export const BoardHeart = (formData) => {
    return call("/Board/Heart", "POST", formData)
    .then((res) => {
        if(res) {
            console.log(res);
        }
    })
};

// 유저 하트
export const UserHeart = (heartDTO) => {
    return call("/Mate/UserHeart", "POST", heartDTO)
    .then((res) => {
        console.log(res);
    })
};

// -/Heart============================================================================================