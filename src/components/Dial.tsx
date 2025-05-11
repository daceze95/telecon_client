import React, { useState } from 'react'
import { DeleteIcon, PhoneIcon } from '../assets/svg';
import { DialBtnProps } from '../interfaces';

const Dial = () => {
  const [dialState, setDialState] = useState<string>("");
  const dialPad = [
    { id: 1, text: "1", char: "" },
    { id: 2, text: "2", char: "abc" },
    { id: 3, text: "3", char: "def" },
    { id: 4, text: "4", char: "ghi" },
    { id: 5, text: "5", char: "jkl" },
    { id: 6, text: "6", char: "mno" },
    { id: 7, text: "7", char: "pqrs" },
    { id: 8, text: "8", char: "tuv" },
    { id: 9, text: "9", char: "wxyz" },
    { id: 10, text: ",", char: "" },
    { id: 11, text: "0", char: "+" },
    { id: 12, text: "#", char: "" },
    { id: 13, text: ".", char: "" },
    { id: 14, text: <PhoneIcon />, char: "" },
    { id: 15, text: <DeleteIcon />, char: "" },
  ];

  const handleClick = (dial: DialBtnProps) => {
    if (dial.id <= 12) {
      setDialState(prevDial => typeof prevDial === 'string' ? prevDial + dial.text : '');
      return;
    }

    if (dial.id === 14) {
      console.log("Calling...");
      return;
    }

    if (dial.id === 15) {
      setDialState(prevDial => prevDial.slice(0, prevDial.length - 1));
      return;
    }

  }

  return (
    <div className="absolute flex flex-col w-full h-full flex-1">
      <h1 className="w-full text-2xl flex justify-center items-center bg-slate-200 min-h-12">
        Share and connect
      </h1>
      <div className="p-4 w-full flex-1">
        <p className="font-light text-sm">Connect with anyone by sharing a link to your profile with them - even if they are not on telecon </p>
        <p className="flex items-center w-full min-h-12 max-h-12 text-lg font-semibold bg-slate-400 text-white my-5 overflow-hidden px-1">{dialState ? dialState : "Phone number"}</p>
        <div className="w-full min-h-30 max-h-30 my-5 overflow-hidden"></div>

        <div className="grid grid-cols-3 grid-rows-4 gap-2">
          {dialPad.map(dialBtn => (
            <div key={dialBtn.id} className='flex flex-col items-center cursor-pointer font-semibold text-xl' onClick={() => handleClick(dialBtn)}>
              {dialBtn.id === 14
                ? <span className='font-light text-xs bg-slate-400 hover:bg-slate-500 rounded-full w-12 h-12 flex items-center justify-center'>{dialBtn.text}</span>
                : (
                  <>
                    <span className='font-semibold text-lg'>{dialBtn.text}</span>
                    {dialBtn.char && <span className='font-light text-xs'>{dialBtn.char}</span>}
                  </>
                )}
            </div>
          )
          )}
        </div>

      </div>

    </div>
  )
}

export default Dial