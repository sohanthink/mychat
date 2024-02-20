import React, { useEffect, useState } from 'react'
import { FaUserPlus } from "react-icons/fa";
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
    toast("Notification message!", {
        position: "top-right",
        autoClose: 1000, // milliseconds
    });
};

const UserList = () => {
    let [userList, setUserList] = useState([])
    let [updateuserList, setUpdateUserList] = useState([])
    let [friendRequest, SetFriendRequest] = useState([])

    const db = getDatabase();
    let [friendsid, setFriendsId] = useState([])

    const data = useSelector(state => state.loginuserdata.value)
    // console.log(data);



    // userlist from datatbase without map with friends ============================
    // useEffect(() => {
    //     const usersRef = ref(db, 'users/');
    //     onValue(usersRef, (snapshot) => {
    //         // const data = snapshot.val();
    //         let arr = []
    //         snapshot.forEach(item => {
    //             if (data.uid != item.key) {
    //                 arr.push({ ...item.val(), id: item.key })
    //             }
    //         })
    //         setUserList(arr)
    //     });
    //     // console.log(userList);
    // }, [])

    // already friends data shown for map the user
    useEffect(() => {
        const starCountRef = ref(db, 'friends/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid == item.val().whoreceivedid) {
                    arr.push(item.val().whosendid);
                } else if (data.uid == item.val().whosendid) {
                    arr.push(item.val().whoreceivedid);
                }
            })
            setFriendsId(arr)
        });
    }, [])
    // console.log(friendsid);


    // userlist from datatbase ===========================================
    useEffect(() => {
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            // const data = snapshot.val();
            let arr = []
            snapshot.forEach(item => {
                if (data.uid != item.key && !friendsid.find(el => el == item.key)) {
                    arr.push({ ...item.val(), id: item.key })
                }
                // console.log(item);
                // if (!item.id.includes(friendsid)) {
                //     arr.push(item);
                // }
            })
            setUserList(arr)
        });
        // console.log(userList);
    }, [friendsid])

    // useEffect(() => {
    //     const usersRef = ref(db, 'users/');
    //     onValue(usersRef, (snapshot) => {
    //         // const data = snapshot.val();
    //         let arr = []
    //         snapshot.forEach(item => {
    //             if (data.uid != item.key && !friendsid.includes(item.key)) {
    //                 arr.push({ ...item.val(), id: item.key })
    //             }
    //             // console.log(item);
    //             // if (!item.id.includes(friendsid)) {
    //             //     arr.push(item);
    //             // }

    //         })
    //         setUserList(arr)
    //     });
    //     // console.log(userList);
    // }, [friendsid])

    // console.log(data);
    // send friendrequest data write to  datatbase =========================



    // friend request send to firebase

    let handleFriendRequest = (item) => {
        // console.log("k click korche :", data.uid);
        // console.log("kake click korche :", item.id);
        // console.log(item);

        set(push(ref(db, 'friendrequest/')), {
            whosendid: data.uid,
            whosendname: data.displayName,
            whosendemail: data.email,
            whosendphoto: data.photoURL,
            whoreceivedid: item.id,
            whoreceivedname: item.name,
            whoreceivedemail: item.email,
            whoreceivedphoto: item.profileImg,
        }).then(() => {
            toast.success("FriendRequest Sent Success");
        })
    }

    // friendrequest read from datatbase for request send status handaling ====================
    useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest/');
        onValue(friendrequestRef, (snapshot) => {
            // const data = snapshot.val();
            let arr = []
            snapshot.forEach(item => {
                arr.push(item.val().whoreceivedid + item.val().whosendid)
            })
            SetFriendRequest(arr)
        });
        // console.log(friendRequest);
    }, [])



    let handleCancelRequest = (item) => {
        console.log('cancel clicked', item.id);
    }










    return (
        <>
            <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick
                rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />

            <GroupCard cardtitle='User Lists'>
                {
                    userList.map((item, index) => (
                        <div key={index} className="usermainbox">
                            <div className="useritem">
                                <div className="userimagebox">
                                    <Image source={item.profileImg} alt='Image' />
                                </div>
                                <div className="userinfobox">
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.email}</p>
                                    </div>
                                    {
                                        friendRequest.includes(item.id + data.uid)
                                            ?
                                            <button onClick={() => handleCancelRequest(item)} className='userbutton'>
                                                cancel
                                            </button>
                                            :
                                            friendRequest.includes(data.uid + item.id) ?
                                                <button className='userbutton'>
                                                    Pending
                                                </button>
                                                :
                                                <button onClick={() => handleFriendRequest(item)} className='userbutton'>
                                                    <FaUserPlus />
                                                </button>
                                    }


                                </div>
                            </div>
                        </div>
                    ))
                }
            </GroupCard>
        </>
    )
}

export default UserList