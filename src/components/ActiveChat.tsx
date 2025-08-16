import { SendIcon } from "../assets/svg";
import { SERVER_BASEURL } from "../config/config";
import { useDataContext } from "../contexts"
import { socket } from "../socketIO/socket";
import ActiveChatHeader from "./ActiveChatHeader";
import { IconHolder } from "./IconHolder";

const ActiveChat = () => {
  const { userData } = useDataContext();

  socket.on("welcome", (arg) => {
    console.log(arg)
  })

  return (
    <div className="w-full h-full flex flex-col flex-1">
      <ActiveChatHeader userData={userData} />

      {/* receiver */}
      <div className="w-full p-2 flex-1 flex flex-col gap-2 overflow-y-scroll">
        <div className=" flex flex-col p-2 shadow max-w-2/5 shadow-amber-50 rounded-sm">
          <img src="/w3images/bandmember.jpg" alt="Avatar" className="w-8 h-8 rounded-full border"/>
          <p className="my-1">Hello. How are you today? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolore quidem facere omnis rem, repellat, fugit labore quia ipsam ducimus voluptatum! Error odit reprehenderit, alias laboriosam molestiae magni odio inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, incidunt impedit non explicabo possimus placeat saepe, maiores repudiandae dicta consectetur, culpa suscipit nostrum illum! Quis placeat provident porro voluptas similique.</p>
          <span className="w-full text-right text-sm text-slate-400">11:00</span>
        </div>

        {/* sender */}
        <div className="container shadow max-w-2/5 bg-slate-50 p-2 flex flex-col items-end self-end rounded-sm">
          <img src={`${SERVER_BASEURL}${userData.avatar}`} alt="Avatar" className="w-8 h-8 rounded-full border"/>
          <p className="text-right my-1">Hey! I'm fine. Thanks for asking! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolore quidem facere omnis rem, repellat, fugit labore quia ipsam ducimus voluptatum! Error odit reprehenderit, alias laboriosam molestiae magni odio inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, incidunt impedit non explicabo possimus placeat saepe, maiores repudiandae dicta consectetur, culpa suscipit nostrum illum! Quis placeat provident porro voluptas similique.</p>
          <span className="w-full text-left text-sm text-slate-400">11:01</span>
        </div>
        <div className="container shadow max-w-2/5 bg-slate-50 p-2 flex flex-col items-end self-end rounded-sm">
          <img src={`${SERVER_BASEURL}${userData.avatar}`} alt="Avatar" className="w-8 h-8 rounded-full border"/>
          <p className="text-right my-1">Hey! I'm fine. Thanks for asking! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolore quidem facere omnis rem, repellat, fugit labore quia ipsam ducimus voluptatum! Error odit reprehenderit, alias laboriosam molestiae magni odio inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, incidunt impedit non explicabo possimus placeat saepe, maiores repudiandae dicta consectetur, culpa suscipit nostrum illum! Quis placeat provident porro voluptas similique.</p>
          <span className="w-full text-left text-sm text-slate-400">11:01</span>
        </div>
        <div className=" flex flex-col p-2 shadow max-w-2/5 shadow-amber-50 rounded-sm outline outline-slate-500/10">
          <img src="/w3images/bandmember.jpg" alt="Avatar" className="w-8 h-8 rounded-full border"/>
          <p className="my-1">Hello. How are you today? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolore quidem facere omnis rem, repellat, fugit labore quia ipsam ducimus voluptatum! Error odit reprehenderit, alias laboriosam molestiae magni odio inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, incidunt impedit non explicabo possimus placeat saepe, maiores repudiandae dicta consectetur, culpa suscipit nostrum illum! Quis placeat provident porro voluptas similique.</p>
          <span className="w-full text-right text-sm text-slate-400">11:00</span>
        </div>
      </div>


      {/* text form */}
      <form className="bg-slate-400 w-full min-h-[3.125rem]  flex justify-center p-2">
        <div className="border border-slate-500 w-2/4 rounded-md overflow-hidden flex box-border">
          <div contentEditable={true} id="" className="text-slate-100 w-full outline-0 p-2 resize-none overflow-y-auto max-h-[300px]" />
          <div className="flex items-end">
            <IconHolder style="min-w-10 flex justify-center items-center text-3xl border border-y-0 border-r-0 border-l-slate-300 pb-2">
              <SendIcon/>
            </IconHolder>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ActiveChat