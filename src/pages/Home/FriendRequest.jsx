import React, { useState, useEffect } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";




const FriendRequest = () => {

    const userdata = useSelector(state => state.loginuserdata.value)
    const db = getDatabase();
    let [requestList, setRequestList] = useState([])
    // console.log(userdata);



    // friend request data shown on the list
    useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest/');
        onValue(friendrequestRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().whoreceivedid == userdata.uid) {
                    arr.push({ ...item.val(), id: item.key })
                }
                // console.log(item.val());
                // console.log(userdata.uid);
                // console.log(item.val().whoreceivedname);
            })
            setRequestList(arr)
            // console.log(requestList);
        });
    }, [])


    // friend request data delete from the list
    let handleReject = (id) => {
        remove(ref(db, "friendrequest/" + id))
    }
    // friend request accept data sent to a collection on firebase
    let handleAccept = (item) => {
        // console.log(item);
        set(push(ref(db, 'friends/')), {
            ...item,
        }).then(() => {
            remove(ref(db, "friendrequest/" + item.id))
        })
    }



    return (
        <GroupCard cardtitle='Friend Request'>
            {
                requestList.length == 0 ? <p><b><i>No Friend Request Found</i></b></p> :
                    requestList.map((item, index) => (
                        <div key={index} className="usermainbox">
                            <div className="useritem">
                                <div className="userimagebox">
                                    <Image source={item.whosendphoto} alt='Image' />
                                </div>
                                <div className="userinfobox">
                                    <div>
                                        <h3>{item.whosendname}</h3>
                                        <p>{item.whosendemail}</p>
                                    </div>
                                    <div className='btn_grp'>
                                        <button onClick={() => handleAccept(item)}><FaCheckCircle title='Accept' /></button>
                                        <button onClick={() => handleReject(item.id)}><MdDelete title='reject' /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </GroupCard >
    )
}

export default FriendRequest