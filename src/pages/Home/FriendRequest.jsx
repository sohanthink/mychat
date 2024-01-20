import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'


const FriendRequest = () => {
    return (
        <GroupCard cardtitle='Friend Request'>
            {
                [0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div key={index} className="usermainbox">
                        <div className="useritem">
                            <div className="userimagebox">
                                <Image source="" alt='Image' />
                            </div>
                            <div className="userinfobox">
                                <div>
                                    <h3>Kiran</h3>
                                    <p>Dinner?</p>
                                </div>
                                <button>
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default FriendRequest