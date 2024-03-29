import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, set, onValue, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { MdBlock } from "react-icons/md";
import { TbFriendsOff } from "react-icons/tb";
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const notify = () => {
    toast("Notification message!", {
        position: "top-right",
        autoClose: 1000, // milliseconds
    });
};

const Friends = () => {

    const db = getDatabase();
    const userdata = useSelector(state => state.loginuserdata.value)
    let [friends, setFriends] = useState([])

    // console.log(userdata.uid);


    // friends data from firebase
    useEffect(() => {
        const starCountRef = ref(db, 'friends/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            let arr = []
            snapshot.forEach((item) => {
                // console.log(item.val());
                if (userdata.uid == item.val().whoreceivedid || userdata.uid == item.val().whosendid) {
                    arr.push({ ...item.val(), id: item.key })
                }
            })
            setFriends(arr)
        });
    }, [])
    // console.log(friends);


    let handleUnfriend = (item) => {
        // console.log(item.id);
        remove(ref(db, "friends/" + item.id)).then(() => {
            toast.success("UnFriend Success");
        })
    }


    // block data from firebase
    let handleBlock = (item) => {
        // console.log(item, userdata.uid);
        // console.log('block clicked');
        // console.log(item.id);
        if (userdata.uid == item.whosendid) {
            set(push(ref(db, 'block/')), {
                blockedbyid: item.whosendid,
                blockedbyname: item.whosendname,
                blockedbyemail: item.whosendemail,
                blockedbyphoto: item.whosendphoto,
                blockedid: item.whoreceivedid,
                blockedname: item.whoreceivedname,
                blockedemail: item.whoreceivedemail,
                blockedphoto: item.whoreceivedphoto,
            }).then(() => {
                remove(ref(db, "friends/" + item.id)).then(() => {
                    toast.success("Blocked Success");
                })
            })
        } else {
            set(push(ref(db, 'block/')), {
                blockedbyid: item.whoreceivedid,
                blockedbyname: item.whoreceivedname,
                blockedbyemail: item.whoreceivedemail,
                blockedbyphoto: item.whoreceivedphoto,
                blockedid: item.whosendid,
                blockedname: item.whosendname,
                blockedemail: item.whosendemail,
                blockedphoto: item.whosendphoto,
            }).then(() => {
                remove(ref(db, "friends/" + item.id)).then(() => {
                    toast.success("Blocked Success");
                })
            })
        }
    }




    return (
        <>
            <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick
                rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
            <GroupCard cardtitle='Friends'>
                {
                    friends.length == 0 ? <p><b><i>Gorib. kono bondhu nai!</i></b></p> :
                        friends.map((item, index) => (
                            <div key={index} className="usermainbox">
                                <div className="useritem">
                                    <div className="userimagebox">
                                        <Image source={item.whoreceivedphoto} alt='Image' />
                                    </div>
                                    <div className="userinfobox">
                                        <div>
                                            {
                                                userdata.uid == item.whoreceivedid
                                                    ?
                                                    <>
                                                        <h3>{item.whosendname}</h3>
                                                        <p>{item.whosendemail}</p>
                                                    </>
                                                    :
                                                    <>
                                                        <h3>{item.whoreceivedname}</h3>
                                                        <p>{item.whoreceivedemail}</p>
                                                    </>
                                            }


                                        </div>
                                        <span>
                                            <Button onClick={(() => handleBlock(item))} title='block user' size="small" color="error">
                                                <MdBlock />
                                            </Button>
                                            <button onClick={() => handleUnfriend(item)} title='unfriend'><TbFriendsOff /></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </GroupCard>
        </>
    )
}

export default Friends