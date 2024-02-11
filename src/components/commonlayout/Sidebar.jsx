import React from 'react'
import Image from '../../utilities/Image/Image'
import { Link, NavLink } from 'react-router-dom'
import { FiHome } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const notify = () => {
    toast('Notification message!', {
        position: 'top-right',
        autoClose: 1000, // milliseconds
    });
};


const Sidebar = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    // console.log(auth.currentUser.displayName);
    let handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/')
        })
    }
    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <div className="sidebarBox">
                <div className='topbar'>
                    <div className="imgBox">
                        <Image source={auth && auth.currentUser.photoURL} alt='img' />
                    </div>
                    <h3 className='username'>{auth && auth.currentUser.displayName}</h3>
                </div>
                <div>
                    <ul className='navigation'>
                        <li>
                            <NavLink to='/home'>
                                <FiHome />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/message'>
                                <AiOutlineMessage />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/notification'>
                                <IoIosNotificationsOutline />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/setting'>
                                <IoSettings />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="logout">
                        <Link onClick={handleLogout}>
                            <IoLogOut />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar