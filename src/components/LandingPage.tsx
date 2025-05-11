import { useDataContext } from '../contexts'
import { useOutletContext } from 'react-router-dom';
import { AccountCircle } from '../assets/svg';
import { capitalizeFirstCharOfWord } from '../utils';

const LandingPage = () => {
    const { toggleModalVisibility, userData } = useDataContext();
    const modalChild = useOutletContext<(modalName: string) => void>();

    return (
        <div className="flex flex-col justify-between items-center h-dvh">
            <div className="flex flex-col w-3/4 h-3/4 pt-10 pb-5 justify-between">
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <div className="relative flex justify-center items-center">
                            <div className="w-[6.25rem] h-[6.25rem] flex overflow-hidden rounded-full border">
                               { userData.avatar ? <img src={`${import.meta.env.VITE_SERVER_BASEURL}${userData.avatar}`} alt="avatar" className='object-fill'/> : <AccountCircle />}
                            </div>
                            {/* <div className="absolute bottom-3 right-1 w-4 h-4 rounded-full bg-orange-300"></div> */}
                        </div>
                        <div className="flex flex-col justify-between gap-2">
                            <span className='font-extralight text-3xl'>Welcome!</span>
                            <span className='font-semibold text-5xl'>{capitalizeFirstCharOfWord(userData.fullName)}</span>
                        </div>
                    </div>
                    <button className='rounded-full font-extralight text-sm border border-blue-500 px-4 py-1 cursor-pointer self-end text-blue-500' onClick={() => { toggleModalVisibility(); modalChild("shareProfileBtn") }}>Share profile</button>
                </div>

                <p className="font-extralight text-2xl">Here are some quick actions to get you started</p>

                <div className="flex justify-between w-full gap-4">
                    <div className="w-1/2 h-[18.75rem] rounded-xl border"></div>
                    <div className="w-1/2 h-[18.75rem] rounded-xl border"></div>
                </div>
            </div>

            <div className="flex flex-col p-2 pb-5 items-center gap-4">
                <div className="flex flex-col p-2 items-center">
                    <p className="font-semibold">You are signed in as {" "}
                        <i>{userData.email}</i></p>
                    <p className="font-extralight">Try <span className="text-blue-500">switching accounts</span> if you do not see your contacts or conversation history</p>
                </div>

                <p className="text-blue-500 font-bold underline">Learn more</p>
            </div>
        </div>
    )
}

export default LandingPage