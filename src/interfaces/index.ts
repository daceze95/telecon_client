import { JSX, ReactNode } from "react";

export interface ModalChildProps {
  modalChild: (activeModalName: string) => void;
}

export interface DialBtnProps {
  id: number;
  text: string | JSX.Element;
  char: string;
}

export interface KeyValueProps {
  [x: string]: string;
}

export interface UserDataProps {
  fullName: string;
  email: string;
  avatar: string;
  verified: boolean;
}

export interface ModalProps { 
  btnPosition?: 'right' | 'left'; 
  children: ReactNode 
}
