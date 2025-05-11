import { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import Main from '../components/Main'
import { useDataContext } from '../contexts'
import Modal from '../components/Modal'
import Dial from '../components/Dial'
import ShareProfile from '../components/ShareProfile'
import NewChat from '../components/NewChat'
import ExpiredTokenNotification from '../components/ExpiredTokenNotification'
import { useNavigate } from 'react-router-dom'
import { decodeJWT } from '../utils'

const Home = () => {
  const { modalVisibility } = useDataContext();
  const [activeModalChild, setActiveModalChild] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [expiryTime, setExpiryTime] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { exp } = decodeJWT(token);
        const expiry = new Date(exp * 1000);
        setExpiryTime(expiry.toISOString());

        const now = Math.floor(Date.now() / 1000);
        const timeout = (exp - now) * 1000;
        

        if (timeout > 0) {
          setTimeout(logout, timeout);
          setTimeout(() => setTokenExpired(true), timeout - (10 * 1000));
        } else {
          logout(); // Already expired
        }
      } catch (err) {
        console.error("Invalid token", err);
        setTokenExpired(true);
        logout();
      }
    }
  }, []);

  const getActiveModalChild = (activeModalName: string) => {
    setActiveModalChild(activeModalName);
  }

  let activeComponent;

  switch (activeModalChild) {
    case "dialBtn":
      activeComponent = (<Modal>
        <Dial />
      </Modal>)
      break;
    case "shareProfileBtn":
      activeComponent = (<Modal>
        <ShareProfile />
      </Modal>)
      break;
    case "newChatBtn":
      activeComponent = (<Modal>
        <NewChat />
      </Modal>)
      break;
    default:
      break;
  }

  return (
    <div className="relative w-full flex h-dvh">
      <Aside modalChild={getActiveModalChild} />
      <Main modalChild={getActiveModalChild} />
      {modalVisibility && activeComponent}
      {tokenExpired && <ExpiredTokenNotification expiryTime={expiryTime}/>}
    </div>
  )
}

export default Home