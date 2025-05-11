

function Join() {

  return (
    <div className="flex flex-col w-full h-dvh items-center">
      <div className="flex flex-col items-center justify-center gap-4 flex-1 w-full md:w-1/3 p-4">
        <div className="flex justify-center items-center w-24 h-24 rounded-full border font-bold">S</div>{/*logo*/}
        <div className="flex flex-col items-center gap-2 w-full text-center">
          <p className="text-2xl font-light">You've been invited to join a</p>
          <p className="text-2xl font-light">Telecon Conversation</p>
        </div>
        <div className="flex flex-col items-center gap-4 w-full text-center mt-10">
          <Button
            text="Join as guest"
            className="w-full rounded-full h-[3.125rem] text-white font-medium cursor-pointer py-2 bg-blue-700"
          />
          <Button
            text="Sign in or create"
            className="w-full rounded-full h-[3.125rem] text-black border border-slate-200 shadow-2xl font-medium cursor-pointer py-2 bg-white"
          />
        </div>
      </div>
    </div>
  )
}

export default Join


const Button = ({ text, ...others }:{text:string; [x:string]: string}) => {
  return (
    <button type="button" {...others}>
      {text}
    </button>
  )
}