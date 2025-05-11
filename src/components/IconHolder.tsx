import { ReactNode } from "react"

export const IconHolder = ({ children, style="" }: { children: ReactNode, style?: string }) => {
    return (<span className={`cursor-pointer ${style}`}>
        {children}
    </span>)
}