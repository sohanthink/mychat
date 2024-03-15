import React, { useState } from 'react'
import './feed.css'
import { FaCamera } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { getDatabase, push, ref, set } from "firebase/database";
import { Snackbar, Alert } from '@mui/material';




const PostUpload = () => {

    const db = getDatabase();
    const userdata = useSelector(state => state.loginuserdata.value);
    // console.log(userdata);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    let [post, SetPost] = useState("")


    // alert close logic
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    let handlePostBox = (e) => {
        SetPost(e.target.value)
    }

    // Get the current date and time
    const currentDateAndTime = new Date();

    // Extract individual components
    const year = currentDateAndTime.getFullYear();
    const month = currentDateAndTime.getMonth() + 1; // Months are zero-indexed, so January is 0, February is 1, etc.
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    let handlePost = () => {
        // console.log(post, formattedDateTime);

        set(push(ref(db, 'posts/')), {
            whopostid: userdata.uid,
            whopostname: userdata.displayName,
            whopostphoto: userdata.photoURL,
            feed: post,
            posttime: formattedDateTime
        }).then(() => {
            setOpenAlert(true);
            setAlertMessage('The post was successfully Posted');
            SetPost("")
        })
    }


    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right', }} open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <div className="post_box">
                <div className="contents">
                    <h3>NEW POSTS</h3>
                    <div className="message_navigation">
                        <div className="message_navigation_body">
                            <div className='msgbox'>
                                <input value={post} onChange={(e) => handlePostBox(e)} className='postwrite' placeholder='Whats on your mind?' type="text" />
                                <div className="icons">
                                    <FaCamera />
                                </div>
                            </div>
                            <button onClick={handlePost}><IoSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostUpload