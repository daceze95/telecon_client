import { AccountCircle, CallIcon, PersonPlusOne, SearchIcon, SettingsIcon } from "../assets/svg"
import { SERVER_BASEURL } from "../config/config"
import { UserDataProps } from '../interfaces'
import { IconHolder } from './IconHolder'

const ActiveChatHeader = ({ userData }: { userData: UserDataProps }) => {
    const icons = [
        {
            id: 1,
            icon: <SearchIcon />
        },
        {
            id: 2,
            icon: <AccountCircle />
        },
        {
            id: 3,
            icon: <PersonPlusOne />
        },
    ]
    return (
        <div className="bg-slate-400 flex items-center w-full h-[3.125rem] px-2">
            <div className="flex gap-1 mr-auto">
                <div className="relative flex items-center ">
                    <div className="flex w-10 h-10 rounded-full overflow-hidden border">
                        {userData.avatar ? <img src={`${SERVER_BASEURL}${userData.avatar}`} alt="avatar" className='object-fill' /> : <AccountCircle />}
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <p className="flex gap-2 text-sm">
                        <span className='font-medium text-sm'>{(userData.fullName).toUpperCase()}</span>
                        <span className='text-xs flex items-center cursor-pointer'><SettingsIcon /></span>
                    </p>
                    <p className="text-xs font-light cursor-pointer">No. of participant</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {
                    icons.map(icon => (
                        <IconHolder key={icon.id}>
                            {icon.icon}
                        </IconHolder>
                    ))
                }
                <button className="flex items-center gap-2 cursor-pointer h-10 rounded-full bg-slate-500 hover:bg-slate-600 font-semibold text-slate-200 px-3 "><span className="text-sm font-light"><CallIcon w="24" h="24" /></span> Start call</button>
            </div>
        </div>

    )
}

export default ActiveChatHeader