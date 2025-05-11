import React, { JSX } from 'react';

interface IconBtnProps {
    label: string;
    icon: JSX.Element;
    activeBtn: [boolean, number, number];
    notificationCount: number;
}

const IconButton = ({label, icon, activeBtn, notificationCount}:IconBtnProps) => {
    const [active, btnID, activeBtnID] = activeBtn;

    return (
        <div className={`relative flex flex-col w-full items-center cursor-pointer hover:text-blue-500 ${active && btnID === activeBtnID ? 'text-blue-600' : ''} overflow-hidden`}>
            <div className="relative">
                <div className=" flex justify-center items-center w-5 h-5 rounded-full ">
                    {icon}
                </div>
                {notificationCount > 0 && <div className="absolute -top-1.5 -right-1.5 flex justify-center items-center text-[9px] p-2 text-white w-3 h-3 rounded-full bg-red-500"> { notificationCount }</div>}
            </div>
            <span className="text-[9px]">{label}</span>
        </div>
    )
}

export default IconButton