import React from 'react'
import Image from '../../utilities/Image/Image'
import { NavLink } from 'react-router-dom'
import { FiHome } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";





const Sidebar = () => {
    return (
        <div className="sidebarBox">
            <div className='topbar'>
                <div className="imgBox">
                    <Image source='' alt='img' />
                </div>
                <h3 className='username'>Sohan Mollah</h3>
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
                    <IoLogOut />
                </div>
            </div>
        </div>
    )
}

export default Sidebar