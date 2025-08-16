import { createContext, useContext } from "react";
import { UserDataProps } from "../interfaces";

interface DataProps {
  userData: UserDataProps;
  notificationCount: number;
  modalVisibility: boolean;
  toggleModalVisibility: () => void;
  copyText: (text: string) => void;
  isTextCopied: boolean;
  getUserData: (userData: UserDataProps) => void;
//   login: (user: UserDataProps, token: string) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
}

export const Data = createContext<DataProps | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(Data);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


// {
//   userData: {
//     fullName: "",
//     email: "",
//     verified: false,
//     avatar: "",
//   },
//   notificationCount: 0,
//   modalVisibility: false,
//   toggleModalVisibility: () => {},
//   copyText: () => {},
//   isTextCopied: false,
//   getUserData: () => {},
// }