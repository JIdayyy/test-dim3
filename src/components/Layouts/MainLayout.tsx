import { NavLink, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <div className={'w-full text-white bg-black'}>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/about'}>About</NavLink>
      </div>
      <Outlet />
    </div>
  )
}
