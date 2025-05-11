import { useRef, useState } from 'react'
import IconButton from './IconButton'
import { AccountCircle, CallIcon, ChatIcon, ContactIcon, DialIcon, MoreIcon, NotificationIcon, } from '../assets/svg';
import { NavLink, useNavigate } from 'react-router-dom';
import ActiveAsideSection from './ActiveAsideSection';
import { useDataContext } from '../contexts';
import { ModalChildProps } from '../interfaces';
import { capitalizeFirstCharOfWord } from '../utils';
import { apiUploadFile } from '../utils/useApi';

const Aside = ({ modalChild }: ModalChildProps) => {
  const [activeID, setActiveID] = useState(1);
  const [visible, setVisible] = useState(false);
  const { toggleModalVisibility, notificationCount, userData, getUserData } = useDataContext();
  // const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const navBtn = [
    {
      id: 1,
      label: "Chats",
      icon: <ChatIcon />
    },
    {
      id: 2,
      label: "Calls",
      icon: <CallIcon />
    },
    {
      id: 3,
      label: "Contacts",
      icon: <ContactIcon />
    },
    {
      id: 4,
      label: "Notifications",
      icon: <NotificationIcon />
    },
  ]

  const handleActiveBtn = (id: number) => {
    setActiveID(id);
  }

  const logout = () => {
    localStorage.clear();
    navigate('/', { replace: true })
  }


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // console.log(file)

    try {
      // // For preview
      // const previewURL = URL.createObjectURL(file);
      // setPreview(previewURL);

      // Optional: Upload logic
      const formData = new FormData();
      formData.append('avatar', file, file.name);

      console.log(formData)

      const uploaded = await apiUploadFile(`/users/upload-profile`, formData);

      if (!uploaded?.data?.avatar) {
        throw new Error("Upload failed or avatar URL missing.");
      }

      const uD = localStorage.getItem('userData');

      if (uD) {
        const updatedUser = { ...JSON.parse(uD), avatar: uploaded.data.avatar };

        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(updatedUser));

        // Update global/user state
        getUserData(updatedUser);
      }


    } catch (error) {
      console.error('Upload failed:', error);

    }
  };

  return (
    <div className="flex flex-col w-1/5 shadow-2xs border border-y-0 border-l-0 border-r-slate-200 px-3 py-2">
      <div className="relative flex justify-between items-center">
        <div className="flex gap-1">
          <div className="relative flex justify-center items-center ">
            <div className="flex w-10 h-10 rounded-full overflow-hidden cursor-pointer" onClick={handleAvatarClick}>
              {userData.avatar ? <img src={`${import.meta.env.VITE_SERVER_BASEURL}${userData.avatar}`} alt="avatar" className='object-fill' /> : <AccountCircle />}
              <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                onChange={handleFileChange} // implement this for upload logic
              />
            </div>
            <div className="absolute bottom-1 right-0 w-3 h-3 rounded-full bg-orange-300"></div>
          </div>
          <div className="flex flex-col justify-between">
            <p className="flex gap-2 text-sm">
              <span className='font-medium'>{capitalizeFirstCharOfWord(userData.fullName)}</span>
              <span className='text-xs flex items-center'>$0.00</span>
            </p>
            <p className="text-xs font-light cursor-pointer">Set a status</p>
          </div>
        </div>
        <div className='flex justify-center items-center font-bold text-sm w-6 h-6 cursor-pointer' onClick={() => setVisible(vis => !vis)}>
          <MoreIcon />
        </div>
        {visible && <div className="absolute -bottom-32 -right-10 border min-w-50 shadow-2xl bg-white z-50 rounded-sm overflow-hidden">

          {
            ['Settings', 'My Profile', 'Logout'].map((item) => (item === 'Logout'
              ? <p className="text-sm font-medium p-2 hover:bg-slate-50 cursor-pointer" key={item} onClick={logout}>{item}</p>
              : <p className="text-sm font-medium p-2 hover:bg-slate-50 cursor-pointer" key={item}>{item}</p>))
          }

        </div>}
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <input type="text" placeholder='People, groups, messages' className='w-full outline-none px-2 h-10 rounded-sm text-sm border border-slate-200' />
        <div className='flex justify-center items-center font-bold px-1 cursor-pointer w-10 rounded-sm bg-slate-200 hover:bg-slate-300' onClick={() => { toggleModalVisibility(); modalChild("dialBtn") }}>
          <DialIcon />
        </div>
      </div>

      <div className="flex justify-between py-2 gap-2 mt-5">
        {
          navBtn.map(btn => <NavLink to='' key={btn.id} className={`flex justify-center w-full`} onClick={() => handleActiveBtn(btn.id)}>
            {({ isActive }) => (
              <IconButton label={btn.label} icon={btn.icon} activeBtn={[isActive, btn.id, activeID]} notificationCount={notificationCount} />
            )}
          </NavLink>)
        }
      </div>

      <ActiveAsideSection id={activeID} />

    </div>
  )
}

export default Aside