import React, { useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'



const GroupList = () => {

    let [dotInfoActive, setDotInfoActive] = useState(false)


    let handleDotClick = () => {
        setDotInfoActive(!dotInfoActive)
    }




    return (
        <GroupCard cardtitle='Groups Lists' handleDotClick={handleDotClick}>
            <div className={`dot_info ${dotInfoActive ? 'active' : ''}`}>
                <ul>
                    <li>Create a Group</li>
                </ul>
            </div>
            {
                [0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className="usermainbox">
                        <div className="useritem">
                            <div className="userimagebox">
                                <Image source="" alt='Image' />
                            </div>
                            <div className="userinfobox">
                                <div>
                                    <h3>name</h3>
                                    <p>mern stack developer</p>
                                </div>
                                <button>
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default GroupList