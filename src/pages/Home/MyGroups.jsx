import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useSelector } from 'react-redux';


const MyGroups = () => {

    const db = getDatabase();
    const userdata = useSelector(state => state.loginuserdata.value)
    let [myGroup, setMyGroup] = useState([])

    useEffect(() => {
        const mygroupRef = ref(db, 'groups/');
        onValue(mygroupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                userdata.uid == item.val().adminid &&
                    arr.push(item.val());
            })
            setMyGroup(arr)
        })
        // console.log(group);
    }, [])


    return (
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
                                    <p>{item.grouptagname}</p>
                                </div>
                                <span>
                                    Today, 8:56pm
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default MyGroups