import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const loginSignup = [
    {
      id: 1,
      path: '/register',
      text: 'Signup'
    },
    {
      id: 2,
      path: '/login',
      text: 'Login'
    },
  ]
  return (
    <div className="flex w-full">
      <nav className="flex w-full p-2 list-none gap-3">
        <Link to={"/"} className="font-bold mr-auto text-2xl">Telecon</Link>

        {loginSignup.map(nLink => <NavLink to={nLink.path} key={nLink.id} className="cursor-pointer px-2">
          {({ isActive }) => (
            <span className={isActive && pathname === nLink.path ? "font-bold" : ""}>{nLink.text}</span>
          )}
        </NavLink>)}
      </nav>
    </div>
  )
}

export default Navbar