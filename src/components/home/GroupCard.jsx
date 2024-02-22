import React, { Children } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

const GroupCard = ({ cardtitle, children, handleDotClick }) => {
    return (
        <div className="groupcard">
            <div className="group_heading">
                <h4>{cardtitle}</h4>
                <div className="dots">
                    <BsThreeDotsVertical onClick={handleDotClick} />
                </div>
            </div>
            {children}
        </div >
    )
}

export default GroupCard