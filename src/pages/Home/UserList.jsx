import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'


const UserList = () => {
    return (
        <GroupCard cardtitle='User Lists'>
            {
                [0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className="usermainbox">
                        <div className="useritem">
                            <div className="userimagebox">
                                <Image source="" alt='Image' />
                            </div>
                            <div className="userinfobox">
                                <div>
                                    <h3>Tejeshwini C</h3>
                                    <p>Yesterday, 6:22pm</p>
                                </div>
                                <button className='userbutton'>
                                    <FaUserPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default UserList