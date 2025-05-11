import { ReactNode } from 'react'

const ModalHeader = ({children}:{children: ReactNode}) => {
  return (
    <h1 className="w-full text-2xl flex justify-center items-center bg-slate-200 min-h-12">
        {children}
    </h1>
  )
}

export default ModalHeader