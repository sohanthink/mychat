import React, { useState, useEffect } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux'




const FriendRequest = () => {

    const userdata = useSelector(state => state.loginuserdata.value)
    const db = getDatabase();
    let [requestList, setRequestList] = useState([])
    // console.log(userdata);


    useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest/');
        onValue(friendrequestRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().whoreceivedid == userdata.uid) {
                    arr.push(item.val())
                }
                // console.log(item.val());
                // console.log(userdata.uid);
                // console.log(item.val().whoreceivedname);
            })
            setRequestList(arr)
            // console.log(requestList);
        });
    }, [])

    // console.log(requestList.length);

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
                                    <button>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </GroupCard>
    )
}

export default FriendRequest