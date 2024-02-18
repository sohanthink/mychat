import React, { useEffect, useState } from 'react'
import { FaUserPlus } from "react-icons/fa";
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux'



const UserList = () => {
    let [userList, setUserList] = useState([])
    let [friendRequest, SetFriendRequest] = useState([])


    const db = getDatabase();

    const data = useSelector(state => state.loginuserdata.value)
    console.log(data);

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


    // send friendrequest data write to  datatbase =========================
    let handleFriendRequest = (item) => {
        // console.log("k click korche :", data.uid);
        // console.log("kake click korche :", item.id);
        set(push(ref(db, 'friendrequest/')), {
            whosendid: data.uid,
            whosendname: data.displayName,
            whoreceivedid: item.id,
            whoreceivedname: item.name,
        });
    }

    // friendrequest read from datatbase ===========================================
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





    return (
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
                                        <button onClick={() => handleFriendRequest(item)} className='userbutton'>
                                            cancel
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