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
}

export const Data = createContext<DataProps>(
    {
        userData: {
            fullName: '',
            email: '',
            verified: false,
            avatar: ''
        },
        notificationCount: 0,
        modalVisibility: false,
        toggleModalVisibility: () => { },
        copyText: () => { },
        isTextCopied: false,
        getUserData: () => { },
    }
)

export const useDataContext = () => {
    const context = useContext(Data);
    return context;
}