const isLogin = () => !!localStorage.getItem("Access_Token");
export default isLogin;