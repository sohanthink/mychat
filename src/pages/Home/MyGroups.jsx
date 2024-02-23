import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { HiOutlineUserGroup } from "react-icons/hi";
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MyGroups = () => {

    const db = getDatabase();
    const userdata = useSelector(state => state.loginuserdata.value)


    let [myGroup, setMyGroup] = useState([])
    let [groupRequest, setgroupRequest] = useState([])
    let [groupName, setGroupName] = useState("")
    let [groupReqBadge, setGroupReqBadge] = useState("")


    //  pending request modal things
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    // all hte group i have created
    useEffect(() => {
        const mygroupRef = ref(db, 'groups/');
        onValue(mygroupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                userdata.uid == item.val().adminid &&
                    arr.push({ ...item.val(), mygrpid: item.key });
            })
            setMyGroup(arr)
        })
        // console.log(group);
    }, [])

    // console.log(myGroup);

    // all the group join request data from collection db firebase
    const handleOpen = (groupid) => {
        setGroupName(groupid.groupname)
        const groupRequestRef = ref(db, 'grouprequest/');
        onValue(groupRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                userdata.uid == item.val().adminid && item.val().groupid == groupid.mygrpid &&
                    arr.push(item.val());
            })
            // dispatch(groupRequest.length)
            setgroupRequest(arr)
        })
        setOpen(true);
    }




    // badge data tried
    // useEffect(() => {
    //     let mygroupid = myGroup.map(badge => badge.mygrpid);
    //     const groupRequestlengthRef = ref(db, 'grouprequest/');
    //     onValue(groupRequestlengthRef, (snapshot) => {
    //         let arr = []
    //         snapshot.forEach((item) => {
    //             if (userdata.uid === item.val().adminid && mygroupid.includes(item.val().groupid)) {
    //                 arr.push(item.val());
    //             }
    //         })
    //         setGroupReqBadge(arr.length)
    //     })
    // }, [myGroup, userdata.uid]);




    return (
        <>
            <GroupCard cardtitle='My Groups' dotname='more'>
                {myGroup.length == 0 ? <p><b><i>Create a group from group lists more button</i></b></p> :
                    myGroup.map((item, index) => (
                        <div key={index} className="usermainbox">
                            <div className="useritem">
                                <div className="userimagebox">
                                    <Image source="https://cdn.openart.ai/uploads/image_W8yBeD0l_1678369948130_512.webp" alt='Image' />
                                </div>
                                <div className="userinfobox">
                                    <div>
                                        <h3>{item.groupname}</h3>
                                        <p>{item.adminname}</p>
                                        <p>{item.grouptagname}</p>
                                    </div>
                                    <span>
                                        <Tooltip title="All Pending Request" arrow>
                                            <Badge badgeContent={6} color="success">
                                                <div onClick={() => handleOpen(item)} className="circle_btn"><HiOutlineUserGroup /></div>
                                            </Badge>
                                        </Tooltip>
                                        <Tooltip title="All Members" arrow>
                                            <Badge badgeContent={4} color="success">
                                                <div className="circle_btn"><HiOutlineUserGroup /></div>
                                            </Badge>
                                        </Tooltip>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </GroupCard>

            {/* all the group join > pending request */}

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box sx={style}>
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <b><i>"{groupName}"</i></b> Group er pulapain lagbo??
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                            {
                                groupRequest.map((item, index) => (
                                    <>
                                        <ListItem key={index} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={item.userprofile} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.username}
                                                secondary={
                                                    <React.Fragment>
                                                        {item.useremail}
                                                    </React.Fragment>
                                                }
                                            />
                                            <div>
                                                <button>Add</button>
                                                <button>Reject</button>
                                            </div>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                ))
                            }
                        </List>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default MyGroups