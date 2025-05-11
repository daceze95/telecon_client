import { Outlet } from 'react-router-dom';
import { ModalChildProps } from '../interfaces';

const Main = ({modalChild}:ModalChildProps) => {
  return (
    <div className="w-4/5">
        <Outlet context={modalChild}/>
    </div>
  )
}

export default Main