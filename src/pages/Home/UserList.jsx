import React, { useEffect, useState } from 'react'
import { FaUserPlus } from "react-icons/fa";
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image/Image'
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
    let [userList, setUserList] = useState([])

    const db = getDatabase();


    // userlist from datatbase
    useEffect(() => {
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            // const data = snapshot.val();
            let arr = []
            snapshot.forEach(item => {
                arr.push(item.val())
            })
            setUserList(arr)
        });
        // console.log(userList);
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
                                <button className='userbutton'>
                                    <FaUserPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </GroupCard>
    )
}

export default UserList