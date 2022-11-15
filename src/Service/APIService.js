import { API_BASE_URL } from "./App_Config";

const Access_Token = "Access_Token";
const UserInfo = "UserInfo";

export const call = (api, method, request) => {

    let headers = "";

    // alert("HeadersOnCall : " + api);
    if(api === "/Board/BoardWrite") {
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

    if(api === "/Board/BoardWrite") {
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

export const LoginAPI = (memberDTO) => {
    return call("/Auth/Login", "POST", memberDTO)
    .then((response) => {
        if(response.token) {
            // 로컬스토리지에 토큰 저장
            localStorage.setItem("Access_Token", response.token);
            localStorage.setItem("UserInfo", JSON.stringify(response));

            // 토큰이 존재하는 경우 메인 화면으로 리다이렉트
            if(response.role === "ADMIN") {
                window.location.href = "/"; // 추후 어드민페이지 개발예정
            } else {
                window.location.href = "/Home";
            }
        }
    })
};

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

// -/Member===========================================================================================
// Board==============================================================================================

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

// -/Board============================================================================================