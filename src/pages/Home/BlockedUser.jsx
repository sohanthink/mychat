import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'


const BlockedUser = () => {
    return (
        <GroupCard cardtitle='Blocked Users'>
            {
                [0, 1, 2].map((item, index) => (
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
                                <button>Unblock</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default BlockedUser