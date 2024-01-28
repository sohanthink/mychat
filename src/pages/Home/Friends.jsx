import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'

const Friends = () => {
    return (
        <GroupCard cardtitle='Friends'>
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
                                <span>
                                    Today, 8:56pm
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default Friends