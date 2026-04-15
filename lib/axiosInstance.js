import axios from "axios";
import { AUTH_TOKEN_KEY, LOGOUT_EVENT } from "@/constants/others";
import { eventEmitter } from "./events";
import { getCookie } from "./clientHelpers";
import { BASE_URL } from "@/constants/apiConstants";

/**
 * Axios Instance to use with auth token
 *
 */
export const apiAUTH = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

/**
 * Axios Instance to use without auth token
 *
 */
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

apiAUTH.interceptors.request.use(async (req) => {
  const token = getCookie(AUTH_TOKEN_KEY);

  // if no token is in the cookies then logout the user
  if (!token) {
    eventEmitter.emit(LOGOUT_EVENT);
  }

  // If access token is valid,this attaches it to the request and proceeds
  if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    // }
  }
});

//  Emits logout event on 401 Unauthorized errors

let logoutTriggered = false;

apiAUTH.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && !logoutTriggered) {
      logoutTriggered = true;
      eventEmitter.emit(LOGOUT_EVENT);
      console.warn("🔒 401 detected — logout triggered");

      // reset after a short cooldown
      setTimeout(() => (logoutTriggered = false), 3000);
    }
    return Promise.reject(error);
  }
);

export const postAPIAuthFormData = async (url, params, tokenInit) => {
  const token = getCookie(AUTH_TOKEN_KEY);
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}${url}`,
      data: params,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokenInit ? tokenInit : token}`,
      },
    });
    return response;
  } catch (error) {
    
  }
};