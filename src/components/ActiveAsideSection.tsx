import Chats from './Chats';
import Calls from './Calls';
import Contacts from './Contacts';
import Notifications from './Notifications';
// import { useDataContext } from '../contexts';
// import { capitalizeFirstCharOfWord } from '../utils';

const ActiveAsideSection = ({ id }: { id: number }) => {
  let activeAsideSection;
  // const { userData, notificationCount } = useDataContext()

  switch (id) {
    case 1:
      activeAsideSection = <Chats
        // name={capitalizeFirstCharOfWord(userData.fullName)}
        // notificationCount={notificationCount}
      />
      break;
    case 2:
      activeAsideSection = <Calls />
      break;
    case 3:
      activeAsideSection = <Contacts />
      break;
    case 4:
      activeAsideSection = <Notifications />
      break;
    default:
      break;
  }

  return activeAsideSection;
}

export default ActiveAsideSection