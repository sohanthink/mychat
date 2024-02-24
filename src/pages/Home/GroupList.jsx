import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, set, push, onValue, } from "firebase/database";
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

    let [group, setGroup] = useState([])
    let [groupRequest, setGroupRequest] = useState([])

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

    // my group create data to the database 
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



    // all the public groups shown to the frontend
    useEffect(() => {
        const groupRef = ref(db, 'groups/');
        onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                userdata.uid != item.val().adminid &&
                    arr.push({ ...item.val(), id: item.key });
            })
            setGroup(arr)
        })
        // console.log(group);
    }, [])


    // my group join request data to the database 
    let handleGroupJoinRequest = (item) => {
        set(push(ref(db, 'grouprequest/')), {
            groupid: item.id,
            groupname: item.groupname,
            grouptagname: item.grouptagname,
            adminid: item.adminid,
            adminname: item.adminname,
            userid: userdata.uid,
            username: userdata.displayName,
            userprofile: userdata.photoURL,
            useremail: userdata.email,
        }).then(() => {
            setAlertMessage('Group join request sent');
        })
    }

    // check active user sent a group request or not? by matching id to show pending button
    useEffect(() => {
        const grouprequestRef = ref(db, 'grouprequest/');
        onValue(grouprequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                // console.log(item.val().userid);
                // console.log(userdata.uid);
                userdata.uid == item.val().userid &&
                    arr.push(item.val().groupid);
            })
            // console.log(arr.userid);
            setGroupRequest(arr)
        })
        // console.log(groupRequest);
    }, [])



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
                {group.length == 0 ? <p><b><i>No Public Groups found</i></b></p> :
                    group.map((item, index) => (
                        <div key={index} className="usermainbox">
                            <div className="useritem">
                                <div className="userimagebox">
                                    <Image source="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a3429ccc-21eb-4b69-a59f-162ed8342734/dftdrcx-d43e7da2-b165-44eb-a263-b9d6b1d56bd3.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EzNDI5Y2NjLTIxZWItNGI2OS1hNTlmLTE2MmVkODM0MjczNFwvZGZ0ZHJjeC1kNDNlN2RhMi1iMTY1LTQ0ZWItYTI2My1iOWQ2YjFkNTZiZDMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UOelmC8JCvk5rGVZqXzOKX1b8LCsy3MeQ5iIQ9ITbiw" alt='Image' />
                                </div>
                                <div className="userinfobox">
                                    <div>
                                        <h3>{item.groupname}</h3>
                                        <p>{item.adminname}</p>
                                        <p>{item.grouptagname}</p>
                                    </div>
                                    {
                                        groupRequest.indexOf(item.id) !== -1 ?
                                            <button> pending </button>
                                            :
                                            <button onClick={() => handleGroupJoinRequest(item)}> Join </button>
                                    }
                                    {/* <button onClick={() => handleGroupJoinRequest(item)}> Join </button> */}
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