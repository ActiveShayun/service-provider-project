import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Auth-provider/AuthProvider";
import * as motion from "motion/react-client"

const Navbar = () => {
    const { handleLogOut, user } = useContext(AuthContext)
    const link = <>
        <NavLink to='/' className={({ isActive }) => isActive ? 'underline text-white' : 'text-white font-semibold'} >Home</NavLink>
        <NavLink to='service' className={({ isActive }) => isActive ? 'underline text-white' : 'text-white font-semibold'} >Service</NavLink>
        {
            !user &&
            <NavLink to='/login'
                className={({ isActive }) => isActive ? 'underline text-white' :
                    'text-white font-semibold'} >
                Login</NavLink>
        }
    </>

    const link2 = <>
        <NavLink to='myReview/' className={({ isActive }) => isActive ? 'underline text-white' : 'text-white font-semibold '}>My Review</NavLink>
        <NavLink to='AddService/' className={({ isActive }) => isActive ? 'underline text-white' : 'text-white font-semibold '}>Add Service</NavLink>
        <NavLink to='myService/' className={({ isActive }) => isActive ? 'underline text-white' : 'text-white font-semibold '}>My Service</NavLink>
    </>

    const box = {
        width: 40,
        height: 40,
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
    }
    return (
        <div className="navbar bg-[#3273ED] rounded-tl-md rounded-tr-md">
            <div className="flex-1">
                <img
                    className="w-[40px] h-[40px] rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0agj9cG0DrUd5nehmU65rrvJuzWrkLt-HvQ&s" alt="" />
                <motion.span
                    animate={{ x: 40 }}
                    transition={{ type: "spring", stiffness: 100, repeat: Infinity }}
                    className="font-bold text-white -ml-8 ">GROW TEC</motion.span>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <ul className="flex gap-3 lg:mr-4 ">
                        {link}
                    </ul>
                </div>
                {
                    user &&
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user ? <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoURL} />
                                    :
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                }
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm flex flex-col gap-2 dropdown-content bg-[#1bc0ea] rounded-box z-[600] mt-3 w-52 p-2 shadow">
                            {link2}
                            <button onClick={handleLogOut}
                                className="bg-gray-300 w-full rounded-md">Sign out</button>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;