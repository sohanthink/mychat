import React, { useEffect, useState } from 'react'
import { FaUserPlus } from "react-icons/fa";
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'



const UserList = () => {
    let [userList, setUserList] = useState([])
    let [updateuserList, setUpdateUserList] = useState([])
    let [friendRequest, SetFriendRequest] = useState([])

    let [friendsid, setFriendsId] = useState([])

    const db = getDatabase();

    const data = useSelector(state => state.loginuserdata.value)
    // console.log(data);

    // userlist from datatbase ===========================================
    useEffect(() => {
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            // const data = snapshot.val();
            let arr = []
            snapshot.forEach(item => {
                if (data.uid != item.key) {
                    arr.push({ ...item.val(), id: item.key })
                }
            })
            setUserList(arr)
        });
        // console.log(userList);
    }, [])

    // console.log(data);
    // send friendrequest data write to  datatbase =========================
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
        });

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


    // already friends data shown for map the user
    useEffect(() => {
        const starCountRef = ref(db, 'friends/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().whoreceivedid && item.val().whosendid);
            })
            setFriendsId(arr)
        });
    }, [])
    // console.log(friendsid);

    useEffect(() => {
        let arr = [];
        userList.forEach((item) => {
            if (!friendsid.includes(item.id)) {
                arr.push(item);
            }
        });
        setUpdateUserList(arr);
    }, [userList, friendsid]);
    console.log(updateuserList);






    return (
        // <GroupCard cardtitle='User Lists'>
        //     {
        //         userList.map((item, index) => (
        //             <div key={index} className="usermainbox">
        //                 <div className="useritem">
        //                     <div className="userimagebox">
        //                         <Image source={item.profileImg} alt='Image' />
        //                     </div>
        //                     <div className="userinfobox">
        //                         <div>
        //                             <h3>{item.name}</h3>
        //                             <p>{item.email}</p>
        //                         </div>
        //                         {
        //                             friendRequest.includes(item.id + data.uid)
        //                                 ?
        //                                 <button onClick={() => handleCancelRequest(item)} className='userbutton'>
        //                                     cancel
        //                                 </button>
        //                                 :
        //                                 friendRequest.includes(data.uid + item.id) ?
        //                                     <button className='userbutton'>
        //                                         Pending
        //                                     </button>
        //                                     :
        //                                     <button onClick={() => handleFriendRequest(item)} className='userbutton'>
        //                                         <FaUserPlus />
        //                                     </button>
        //                         }


        //                     </div>
        //                 </div>
        //             </div>
        //         ))
        //     }
        // </GroupCard>
        <GroupCard cardtitle='User Lists'>
            {
                updateuserList.map((item, index) => (
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
    )
}

export default UserList