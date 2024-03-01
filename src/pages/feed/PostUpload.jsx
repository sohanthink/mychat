import React from 'react'
import './feed.css'
import { FaCamera } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'



const PostUpload = () => {
    return (
        <div className="post_box">
            <div className="contents">
                <h3>NEW POSTS</h3>
                <div className="message_navigation">
                    <div className="message_navigation_body">
                        <div className='msgbox'>
                            <input className='postwrite' placeholder='Whats on your mind?' type="text" />
                            <div className="icons">
                                <FaCamera />
                            </div>
                        </div>
                        <button><IoSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostUpload