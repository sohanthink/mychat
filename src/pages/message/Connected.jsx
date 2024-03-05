import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import { Button } from '@mui/material'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, set, onValue, remove, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillMessage } from "react-icons/ai";
import { chatUserInfo } from '../../slices/activechat/activechatSlice';



const Connected = () => {

    const db = getDatabase();
    const userdata = useSelector(state => state.loginuserdata.value);


    let dispatch = useDispatch()



    let [friends, setFriends] = useState([])
    let [myGroup, setMyGroup] = useState([])
    let [joinedGroup, setJoinedGroup] = useState([])
    console.log(friends);

    // my friends data from firebase
    useEffect(() => {
        const starCountRef = ref(db, 'friends/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            let arr = []
            snapshot.forEach((item) => {
                // console.log(item.val());
                if (userdata.uid == item.val().whoreceivedid) {
                    arr.push({
                        friendid: item.val().whosendid,
                        friendmail: item.val().whosendemail,
                        friendphoto: item.val().whosendphoto,
                        friendname: item.val().whosendname,
                    })
                } else if (userdata.uid == item.val().whosendid) {
                    arr.push({
                        friendid: item.val().whoreceivedid,
                        friendmail: item.val().whoreceivedemail,
                        friendphoto: item.val().whoreceivedphoto,
                        friendname: item.val().whoreceivedname
                    })
                }
            })
            setFriends(arr)

        });
    }, [])



    // all the group i have created
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
    }, [])
    // console.log(myGroup);


    // for checking i am on what what groups
    useEffect(() => {
        const joinedgrpRef = ref(db, 'groupmembers/');
        onValue(joinedgrpRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                userdata.uid == item.val().userid &&
                    arr.push({
                        adminname: item.val().adminname,
                        groupid: item.val().groupid,
                        groupname: item.val().groupname,
                        grouptagname: item.val().grouptagname,
                    });
            })
            setJoinedGroup(arr)
        })
    }, [])


    // msg a single friend
    let handleFriendMsg = (item) => {
        // console.log('clicked', item);
        localStorage.removeItem('connectedfriend');
        localStorage.setItem('connectedfriend', JSON.stringify(item));
        dispatch(chatUserInfo({ ...item, type: "single" }))
        // console.log(item);
    }

    // let handleFriendMsg = (item) => {
    //     // localStorage.removeItem('connectedfriend');
    //     localStorage.removeItem('connectedfriend');
    //     let friendsArr = [{
    //         friendid: item.friendid,
    //         friendphoto: item.friendphoto,
    //         friendemail: item.friendmail,
    //         friendname: item.friendname,
    //         type: "single",
    //     }];

    //     localStorage.setItem('connectedfriend', JSON.stringify(friendsArr));
    //     dispatch(chatUserInfo(friendsArr));
    //     // console.log(friendsArr[0].friendname);
    // }

    // msg to my groups
    let handleMygroupMsg = (item) => {
        console.log('clicked', item);
        localStorage.removeItem('connectedfriend');
        localStorage.setItem('connectedfriend', JSON.stringify(item));
        dispatch(chatUserInfo({ ...item, type: "mygroup" }))
    }

    // msg to joined group
    let handleJoinedGrp = (item) => {
        console.log('clicked', item);
        localStorage.removeItem('connectedfriend');
        localStorage.setItem('connectedfriend', JSON.stringify(item));
        dispatch(chatUserInfo({ ...item, type: "joined" }))
    }

    return (
        <>
            <GroupCard cardtitle='All Connected'>
                {
                    friends.map((item, index) => (
                        <div key={index} className="usermainbox">
                            <div className="useritem">
                                <div className="userimagebox">
                                    <Image source={item.friendphoto} alt='Image' />
                                </div>
                                <div className="userinfobox">
                                    <div>
                                        <>
                                            <h3>{item.friendname}</h3>
                                            <p>{item.friendmail}</p>

                                        </>
                                    </div>
                                    <span>
                                        <Button onClick={() => handleFriendMsg(item)} title='block user' size="small" color="error">
                                            <AiFillMessage />
                                        </Button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    myGroup.map((item, index) => (
                        <div key={index} className="usermainbox">
                            <div className="useritem">
                                <div className="userimagebox">
                                    <Image source='https://i.pinimg.com/originals/01/f8/de/01f8de9e93b94f2e192b0b1120120328.png' alt='Image' />
                                </div>
                                <div className="userinfobox">
                                    <div>
                                        <>
                                            <h3>{item.groupname} <h6> (my group)</h6></h3>
                                            <p>{item.grouptagname}</p>
                                            <p>Admin : {item.adminname}</p>

                                        </>
                                    </div>
                                    <span>
                                        <Button title='block user' size="small" color="error">
                                            <AiFillMessage onClick={() => handleMygroupMsg(item)} />
                                        </Button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    joinedGroup.map((item, index) => (
                        <div key={index} className="usermainbox">
                            <div className="useritem">
                                <div className="userimagebox">
                                    <Image source='https://hips.hearstapps.com/hmg-prod/images/tom-jerry-movie-tom-1605689120.jpg?crop=0.536xw:1.00xh;0.221xw,0&resize=980:*' alt='Image' />
                                </div>
                                <div className="userinfobox">
                                    <div>
                                        <>
                                            <h3>{item.groupname}<h6> (Joined)</h6></h3>
                                            <p>Admin : {item.adminname}</p>

                                        </>
                                    </div>
                                    <span>
                                        <Button title='message' size="small" color="error">
                                            <AiFillMessage onClick={() => handleJoinedGrp(item)} />
                                        </Button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </GroupCard >
        </>
    )
}

export default Connected