import React, { useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';






const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0.5px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


let groupData = {
    groupName: "",
    groupTagName: "",
}

const GroupList = () => {

    const db = getDatabase();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    let [dotInfoActive, setDotInfoActive] = useState(false)
    const [open, setOpen] = React.useState(false);

    let [groupInfo, setGroupInfo] = useState(groupData)

    const userdata = useSelector(state => state.loginuserdata.value)
    // console.log(userdata.uid);


    // modal open
    const handleOpen = () => {
        setOpen(true);
        setDotInfoActive(false)
    };
    // modal close
    const handleClose = () => {
        setOpen(false);
    };

    let handleDotClick = () => {
        setDotInfoActive(!dotInfoActive)
    }

    // modal group create data from input
    let handleChange = (e) => {
        setGroupInfo({
            ...groupInfo,
            [e.target.name]: e.target.value,
        })
    }

    // group create data to the database 
    let handleGrpsubmit = () => {
        // console.log(groupInfo);
        set(push(ref(db, 'groups/')), {
            groupname: groupInfo.groupName,
            grouptagname: groupInfo.groupTagName,
            adminid: userdata.uid,
            adminname: userdata.displayName,
        }).then(() => {
            setGroupInfo({
                groupName: "",
                groupTagName: "",
            })
        }).then(() => {
            setAlertMessage('Group Created successfully!');
            setOpenAlert(true);
            setOpen(false);
        })
    }




    // alert close logic
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };



    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right', }} open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <GroupCard cardtitle='Groups Lists' handleDotClick={handleDotClick}>
                <div className={`dot_info ${dotInfoActive ? 'active' : ''}`}>
                    <ul>
                        <li onClick={handleOpen}>Create a Group</li>
                    </ul>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <div className="create_grp">
                                <h2>Create your Group</h2>
                                <div className='info'>
                                    <TextField onChange={handleChange} name='groupName' value={groupInfo.groupName} margin="dense" id="outlined-basic" label="Group Name" variant="outlined" />
                                    <TextField onChange={handleChange} name='groupTagName' value={groupInfo.groupTagName} margin="dense" id="outlined-basic" label="Group Tagline" variant="outlined" />
                                    <div className='modal_btn'>
                                        <Button onClick={handleGrpsubmit} variant="outlined">Create</Button>
                                        <Button onClick={handleClose} variant="outlined">Close</Button>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Modal>
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
        </>
    )
}

export default GroupList