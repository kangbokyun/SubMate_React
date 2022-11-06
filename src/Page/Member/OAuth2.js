const CLIENT_ID = "3c73c8374f5519345083d69160599e90"; // Rest API
const REDIRECT_URI =  "http://localhost:3000/Home"; // Redirect URI

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
