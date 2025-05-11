import { Link } from 'react-router-dom';
import { AccountCircle, EditIcon } from '../assets/svg'
import { apiGet } from '../utils/useApi';
import { useEffect, useState } from 'react';
import { capitalizeFirstCharOfWord } from '../utils';

// interface ChatProps {
//     name: string;
//     notificationCount: number;
// }

interface Users {
    avatar: string;
    email: string;
    fullName: string;
    password: string;
    verified: boolean;
    __v: number;
    _id: string;
}

const Chats = () => { //{ name, notificationCount }: ChatProps
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] = useState(true);  // loading state
    const [error, setError] = useState<string | null>(null);  // error state
    const notificationCount = 0

    useEffect(() => {

        const getUsers = async () => {
            try {
                const response = await apiGet(`${import.meta.env.VITE_SERVER_URL_WITH_API_VERSION}/users`);
                setUsers(response.data.data);  // axios stores data in `.data`
                // console.log(response.data.data)
            } catch (err: unknown) {
                console.error('Error fetching users:', err);
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        getUsers()

    }, [])

    if (loading) <LoadingChats />

    return (
        <>
            <div className="flex justify-between items-center py-3 gap-2 border border-x-0 border-b-0 border-t-slate-200">
                <span className='text-sm'>Recent chats</span>
                <div className=" flex justify-center items-center p-1 w-8 h-8 rounded-full text-white bg-blue-600 cursor-pointer">
                    <EditIcon />
                </div>
            </div>
            {/* TODO: */}
            <div className="w-full flex flex-col flex-1 overflow-y-scroll gap-2 py-2">
                {users.map((user) => (
                    <Link to={`/${user._id}`} key={`${user._id}`}>
                        <div className="flex justify-between cursor-pointer hover:bg-slate-200 py-2 px-0.5 rounded-sm">
                            <div className="flex gap-1">
                                <div className="relative flex justify-center items-center">
                                    {/* <div className="w-10 h-10 rounded-full border"></div> */}
                                    {user.avatar ? <img src={`${import.meta.env.VITE_SERVER_BASEURL}${user.avatar}`} alt="profile image" className="w-10 h-10 rounded-full" /> : <AccountCircle />}
                                    {/* <div className="absolute bottom-1 right-0 w-3 h-3 rounded-full bg-orange-300"></div> */}
                                </div>
                                <div className="flex flex-col justify-between">
                                    <span className={`${user.fullName.length > 18 ? 'font-xs' : 'font-sm'}`}>{user.fullName.length > 15 ? `${capitalizeFirstCharOfWord(user.fullName.slice(0, 15))}...` : capitalizeFirstCharOfWord(user.fullName)}</span>
                                    <p className="text-xs font-light">Set a status</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p className='flex justify-center text-right text-[11px] font-light w-fit'>10/17/2023</p>
                                {notificationCount > 0 && <div className={`flex justify-center items-center h-4 rounded-full px-1 bg-red-500 self-end text-[8px] text-white ${notificationCount > 99 ? 'max-w-8' : 'w-4'}`}>{notificationCount}</div>}
                            </div>
                        </div>
                    </Link>
                ))}
                {loading && [...Array(4)].map((_, i) => <LoadingChats key={i}/>)}
            </div>
        </>
    )
}

export default Chats

const LoadingChats = () => {
    return (
        <div className="flex justify-between animate-pulse cursor-pointer hover:bg-slate-200 py-2 px-0.5 rounded-sm">
            <div className="flex gap-1">
                <div className="relative flex justify-center items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                </div>
                <div className="flex flex-col justify-between">
                    <span className="font-sm bg-slate-200 w-30 h-4"></span>
                    <p className="text-xs font-light bg-slate-200 w-40 h-4"></p>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end">
                <p className='flex justify-center text-right text-[11px] bg-slate-200 font-light w-10 h-4'></p>
            </div>
        </div>
    )
}