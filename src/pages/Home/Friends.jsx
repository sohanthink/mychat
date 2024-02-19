import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';



const Friends = () => {

    const db = getDatabase();
    const userdata = useSelector(state => state.loginuserdata.value)
    let [friends, setFriends] = useState([])

    // console.log(userdata.uid);

    useEffect(() => {
        const starCountRef = ref(db, 'friends/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            let arr = []
            snapshot.forEach((item) => {
                console.log(item.val());
                if (userdata.uid == item.val().whoreceivedid || userdata.uid == item.val().whosendid) {
                    arr.push(item.val())
                }
            })
            setFriends(arr)
        });
    }, [])
    console.log(friends);

    return (
        <GroupCard cardtitle='Friends'>
            {
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

                                    {/* <p>{item.whoreceivedemail}</p> */}
                                </div>
                                <span>
                                    Today
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default Friends