import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL_WITH_API_VERSION,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const capitalizeFirstCharOfWord = (text: string) => {
  let newText = "";
  const wordArr = text.split(" ");

  for (let i = 0; i < wordArr.length; i++) {
    newText += `${wordArr[i].charAt(0).toUpperCase()}${wordArr[i].slice(1)} `;
  }
  return newText.trim();
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return true; // if token is invalid or can't be decoded, treat it as expired
  }
};

export const decodeJWT = (token: string) => {
  const payload = token.split('.')[1];
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}
