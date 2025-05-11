import { useState } from 'react';
import { CopiedIcon, CopyIcon, EmailIcon } from '../assets/svg'
import { useDataContext } from '../contexts'
import ModalHeader from './ModalHeader';

const ShareProfile = () => {
  const { copyText, isTextCopied, userData} = useDataContext();
  const [isSelected, setIsSelected] = useState(0);

  const listItems = [
    {
      id: 1,
      icon: <CopyIcon/>,
      text: "https://localhost:5000/@arinze-ezeokwuegbu/invite" //TODO:
    },
    {
      id: 2,
      icon: <EmailIcon/>,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam et corporis."
    },
    {
      id: 3,
      icon: <CopyIcon/>,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam et corporis."
    },
  ]

  return (
    <div className="absolute flex flex-col w-full h-full flex-1">
      <ModalHeader>Share and connect</ModalHeader>
      <div className="p-4 w-full flex-1">
        <p className="font-light text-sm">Connect with anyone by sharing a link to your profile with them - even if they are not on telecon </p>
        <div className="flex w-[240px] rounded-2xl mx-auto min-h-60 max-h-60 my-5 overflow-hidden">
          <img src={`${import.meta.env.VITE_SERVER_BASEURL}${userData.avatar}`} alt="user profile img" className='object-fill'/>
        </div>

        {
          listItems.map( item => (<div className="w-full flex items-center py-2 gap-2 mb-1 border border-x-0 border-t-0 text-sm border-b-slate-300" key={item.id}>
            <div className='flex justify-center items-center w-6 h-6 text-slate-400/90 cursor-pointer' onClick={() =>  {copyText(item.text); setIsSelected(item.id)}}>
              {item.id === isSelected && isTextCopied ? <CopiedIcon/> : item.icon}
            </div>
            <div>{item.text}</div>
          </div>))
        }

      </div>

    </div>
  )
}

export default ShareProfile