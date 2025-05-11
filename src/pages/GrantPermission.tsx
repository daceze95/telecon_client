function GrantPermission() {

    return (
      <div className="flex flex-col w-full h-dvh items-center">
        <div className="flex flex-col items-center justify-center gap-4 flex-1 w-full p-4">
          <div className="flex justify-center items-center w-24 h-24 rounded-full border font-bold">S</div>{/*logo*/}
            <p className="text-xl font-bold mt-5">Click "Allow" so others can see and hear you in the call</p>
            <Button
              text="Continue without audio or video"
              className="w-fit rounded-full h-[2.5rem] text-black text-sm border font-semibold cursor-pointer py-[2px] px-10"
            />

        </div>
      </div>
    )
  }
  
  export default GrantPermission
  
  
  const Button = ({ text, ...others }:{text:string; [x:string]:string}) => {
    return (
      <button type="button" {...others}>
        {text}
      </button>
    )
  }