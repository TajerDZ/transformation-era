/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createUserSlice = (set: any, _get: any) => {
  // Get token once to avoid multiple calls
  const token = cookies.get("token") || "";
  // Decode token safely
  let decodedToken: { id?: string; role?: string } = {};
  if (token) {
    try {
      decodedToken = jwtDecode(token) as { id?: string; role?: string };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return {
    token,
    isNotActive: false,
    isError: false,
    isNetworkError: false,
    isAuth: !!token,
    userData: JSON.parse(localStorage.getItem("userData") || "{}"),
    idUser: decodedToken.id || "",
    roleUser: decodedToken.role || "",
    // Function to update token and decode it
    updateToken: (newToken: string) => {
      cookies.set("token", newToken, { path: "/" });
      try {
        const decoded = jwtDecode(newToken) as {
          id?: string;
          role?: string;
        };
        set({
          token: newToken,
          isAuth: !!newToken,
          idUser: decoded.id || "",
          roleUser: decoded.role || "",
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    },

    // Function to update user data
    updateUserData: (newUserData: any) => {
      localStorage.setItem("userData", JSON.stringify(newUserData));
      set({ userData: newUserData });
    },

    // Function to handle logout
    logout: () => {
      cookies.remove("token", { path: "/" });
      localStorage.removeItem("userData");
      set({
        token: "",
        isAuth: false,
        isError: false,
        userData: {},
        idUser: "",
      });
    },
  };
};
