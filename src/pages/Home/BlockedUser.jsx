import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';



const BlockedUser = () => {

    const db = getDatabase();
    const userdata = useSelector(state => state.loginuserdata.value)
    let [blockList, setBlockList] = useState([])

    // console.log(userdata.uid);
    useEffect(() => {
        const blockuserRef = ref(db, 'block/');
        onValue(blockuserRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (userdata.uid == item.val().blockedbyid || userdata.uid == item.val().blockedid) {
                    arr.push({ ...item.val(), id: item.key })
                }
                // arr.push({ ...item.val(), id: item.key })
            })
            setBlockList(arr)
        });
    }, [])

    // console.log(blockList);

    return (
        <GroupCard cardtitle='Blocked Users'>
            {
                blockList.map((item, index) => (
                    <div key={index} className="usermainbox">
                        <div className="useritem">
                            <div className="userimagebox">
                                {
                                    userdata.uid == item.blockedbyid
                                        ?
                                        <Image source={item.blockedphoto} alt='Image' />
                                        :
                                        <Image source={item.blockedbyphoto} alt='Image' />
                                }
                            </div>
                            <div className="userinfobox">
                                <div>
                                    {
                                        userdata.uid == item.blockedbyid
                                            ?
                                            <>
                                                <h3>{item.blockedname}</h3>
                                                <p>{item.blockedemail}</p>
                                            </>
                                            :
                                            <>
                                                <h3>{item.blockedbyname}</h3>
                                                <p>{item.blockedbyemail}</p>
                                            </>
                                    }

                                </div>
                                {
                                    userdata.uid == item.blockedbyid &&
                                    <button>Unblock</button>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default BlockedUser