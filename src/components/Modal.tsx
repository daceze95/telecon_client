import { useDataContext } from '../contexts'
import { ModalProps } from '../interfaces';

const Modal = ({ btnPosition='right', children }: ModalProps) => {
    const { toggleModalVisibility } = useDataContext();
  return (
    <div className="absolute top-0 bottom-0 right-0 w-full h-dvh flex justify-center items-center bg-slate-400/80 ">
        <div className="relative flex flex-col min-w-1/3 min-h-3/4 bg-white">
            <button className={`absolute ${btnPosition === 'right' ? 'right-0' : 'left-0'} top-0 w-5 h-5 p-2 border flex justify-center items-center cursor-pointer mt-2 mr-2 hover:bg-slate-300 hover:text-white z-50`} onClick={toggleModalVisibility}>X</button>
            {children}
        </div>
    </div>
  )
}

export default Modal