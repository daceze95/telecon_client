import { ReactNode, useEffect, useState } from "react";
import { Data } from ".";
import { UserDataProps } from "../interfaces";

const DataProvider = ({ children }: { children: ReactNode }) => {
  const initialUserData = {
    fullName: "",
    email: "",
    verified: false,
    avatar: "",
  };
  const localStorageUserData = JSON.parse(
    localStorage.getItem("userData") || JSON.stringify(initialUserData)
  );
  const [userData, setUserData] = useState<UserDataProps>(localStorageUserData); //initialUserData
  const [notificationCount, setNotificationCount] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isTextCopied, setIsTextCopied] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisibility((modalVisible) => !modalVisible);
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsTextCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsTextCopied(false), 3000);
    }
  };

  //   const handleSubmit = async (e: FormEvent) => {
  //         e.preventDefault();

  //         try {
  //             const res = await apiPost(`/auth/login`, state);
  //             const {fullName, email, verified, avatar} = res.data.data;
  //             localStorage.setItem('userData', JSON.stringify({fullName, email, verified, avatar}));
  //             getUserData({ fullName, email, verified, avatar });
  //             localStorage.setItem("token", res.data.token);
  //             setTimeout(() => navigate('/', { replace: true }), 1500);

  //         } catch (error) {
  //             console.log(error)
  //         }
  // }

  const getUserData = (userData: UserDataProps) => {
    setUserData((uData) => ({ ...uData, ...userData }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      getUserData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <Data.Provider
      value={{
        userData,
        getUserData,
        notificationCount,
        modalVisibility,
        toggleModalVisibility,
        copyText,
        isTextCopied,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default DataProvider;




// import { ReactNode, useEffect, useState } from "react";
// import { Data } from ".";
// import { UserDataProps } from "../interfaces";
// import { isTokenExpired } from "../utils";

// const DataProvider = ({ children }: { children: ReactNode }) => {
//   const initialUserData = {
//     fullName: "",
//     email: "",
//     verified: false,
//     avatar: "",
//   };
//   const localStorageUserData = JSON.parse(
//     localStorage.getItem("userData") || JSON.stringify(initialUserData)
//   );
//   const [userData, setUserData] = useState<UserDataProps | null>(null); //initialUserData
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [modalVisibility, setModalVisibility] = useState(false);
//   const [isTextCopied, setIsTextCopied] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("userData");

//     if (token && !isTokenExpired(token) && userData) {
//       setUserData(JSON.parse(userData));
//       setIsAuthenticated(true);
//     } else {
//       setUserData(null);
//       setIsAuthenticated(false);
//       localStorage.removeItem("token");
//       localStorage.removeItem("userData");
//     }
//   }, []);

//   const toggleModalVisibility = () => {
//     setModalVisibility((modalVisible) => !modalVisible);
//   };

//   const copyText = async (text: string) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setIsTextCopied(true);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setTimeout(() => setIsTextCopied(false), 3000);
//     }
//   };

//   const getUserData = (userData: UserDataProps) => {
//     setUserData((uData) => ({ ...uData, ...userData }));
//   };

//   const login = (user: UserDataProps, token: string) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("userData", JSON.stringify(user));
//     setUserData(user);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userData");
//     setUserData(null);
//     setIsAuthenticated(false);
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       getUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("userData", JSON.stringify(userData));
//   }, [userData]);

//   return (
//     <Data.Provider
//       value={{
//         userData,
//         getUserData,
//         notificationCount,
//         modalVisibility,
//         toggleModalVisibility,
//         copyText,
//         isTextCopied,
//         login,
//         logout,
//         isAuthenticated,
//       }}
//     >
//       {children}
//     </Data.Provider>
//   );
// };

// export default DataProvider;
