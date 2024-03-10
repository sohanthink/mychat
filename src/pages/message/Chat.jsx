import React, { useEffect, useState, useRef } from 'react'
import './chat.css'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Image from '../../utilities/Image/Image';
import { MdEmojiEmotions } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getStorage, ref as imgref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const Chat = () => {

    const [progressStatus, setProgressStatus] = useState(0);

    // last message preview always when send msg
    const chatBoxRef = useRef(null);
    const lastMessageRef = useRef(null);
    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const db = getDatabase();
    const storage = getStorage();

    // data from redux
    let dispatch = useDispatch()
    const userdata = useSelector(state => state.loginuserdata.value);
    const activechatdata = useSelector((state) => state.activechat.activechat)


    let [msg, setMsg] = useState("")

    let [singleMsgData, setSingleMsgdata] = useState([])
    let [grpMsgData, setGrpMsgdata] = useState([])


    // send message when press enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleMessage();
        }
    };


    // send message to the database
    let handleMessage = () => {
        if (msg != "") {
            if (activechatdata.type == "single") {
                set(push(ref(db, 'singlemsg/')), {
                    whosendname: userdata.displayName,
                    whosendid: userdata.uid,
                    whoreceivedname: activechatdata.friendname,
                    whoreceivedid: activechatdata.friendid,
                    message: msg,
                    date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)}`
                }).then(() => {
                    setMsg("")
                })
            } else {
                if (activechatdata.type == "mygroup") {
                    set(push(ref(db, 'groupmsg/')), {
                        whosendname: userdata.displayName,
                        whosendid: userdata.uid,
                        whoreceivedname: activechatdata.groupname,
                        whoreceivedid: activechatdata.mygrpid,
                        message: msg,
                        date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)}`
                    }).then(() => {
                        setMsg("")
                    })
                } else if (activechatdata.type == "joined") {
                    set(push(ref(db, 'groupmsg/')), {
                        whosendname: userdata.displayName,
                        whosendid: userdata.uid,
                        whoreceivedname: activechatdata.groupname,
                        whoreceivedid: activechatdata.groupid,
                        message: msg,
                        date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)}`
                    }).then(() => {
                        setMsg("")
                    })
                }
            }
        }
    }

    // fetch single message data from firebase
    useEffect(() => {
        const singlemsgRef = ref(db, 'singlemsg/');
        onValue(singlemsgRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().whosendid == userdata.uid && item.val().whoreceivedid == activechatdata.friendid ||
                    item.val().whosendid == activechatdata.friendid && item.val().whoreceivedid == userdata.uid) {
                    arr.push(item.val())
                }
            })
            setSingleMsgdata(arr)
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        });
    }, [activechatdata, lastMessageRef.current])

    // fetch group message data from firebase  
    useEffect(() => {
        const grpmsgRef = ref(db, 'groupmsg/');
        onValue(grpmsgRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val())
            })
            setGrpMsgdata(arr)
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        });
    }, [activechatdata, lastMessageRef.current])


    // image send from chat to database
    let handleImgUpload = (e) => {
        let mainimg = (e.target.files[0]);
        const storageRef = imgref(storage, `messageimg/${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, mainimg);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                setProgressStatus(progress)
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProgressStatus(0)

                    if (activechatdata.type == "single") {
                        set(push(ref(db, 'singlemsg/')), {
                            whosendname: userdata.displayName,
                            whosendid: userdata.uid,
                            whoreceivedname: activechatdata.friendname,
                            whoreceivedid: activechatdata.friendid,
                            img: downloadURL,
                            date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)}`
                        }).then(() => {
                            setMsg("")
                        })
                    } else {
                        if (activechatdata.type == "mygroup") {
                            set(push(ref(db, 'groupmsg/')), {
                                whosendname: userdata.displayName,
                                whosendid: userdata.uid,
                                whoreceivedname: activechatdata.groupname,
                                whoreceivedid: activechatdata.mygrpid,
                                img: downloadURL,
                                date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)}`
                            }).then(() => {
                                setMsg("")
                            })
                        } else if (activechatdata.type == "joined") {
                            set(push(ref(db, 'groupmsg/')), {
                                whosendname: userdata.displayName,
                                whosendid: userdata.uid,
                                whoreceivedname: activechatdata.groupname,
                                whoreceivedid: activechatdata.groupid,
                                img: downloadURL,
                                date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)}`
                            }).then(() => {
                                setMsg("")
                            })
                        }
                    }
                });
            }
        );

    }




    return (
        <>
            <div className="chat">
                <div className="chat_body">
                    <div className="head">
                        <div className="avatar">
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot">
                                {
                                    activechatdata != '' ?
                                        <Avatar sx={{ width: '70px', height: '70px' }} alt="Remy Sharp" src={activechatdata != null ? activechatdata.friendphoto : ""} />
                                        :
                                        <Avatar sx={{ width: '70px', height: '70px' }} alt="Remy Sharp" src="https://cdn.vox-cdn.com/thumbor/2E78dg_Cpbdh3nv6z0KKhOhYs6c=/0x0:1100x580/1200x800/filters:focal(520x151:696x327)/cdn.vox-cdn.com/uploads/chorus_image/image/71921482/bkq6gtrpcnw43vsm5zm62q3z.0.png" />
                                }
                            </StyledBadge>
                        </div>
                        <div>
                            <h3>
                                {activechatdata != null ?
                                    activechatdata.friendname ?
                                        activechatdata.friendname
                                        :
                                        activechatdata.groupname.type == "mygroup" ?
                                            activechatdata.groupname :
                                            activechatdata.groupname
                                    :
                                    ""
                                }
                                {/* {
                                    activechatdata != null &&
                                    activechatdata.friendname
                                } */}

                            </h3>
                            <h6>online</h6>
                        </div>
                    </div>
                    <div ref={chatBoxRef} className="message_body">
                        <div className="message_body_container ">
                            {/* <div className='msg'>
                                <p className='getmsg'>hi, this is nai</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi, this is nai</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>

                            <div className='msg'>
                                <p className='getimg'>
                                    <Image source="https://sm.ign.com/ign_me/cover/b/batman-reb/batman-reboot_ar4j.jpg" />
                                </p>
                            </div>
                            <div className='msg'>
                                <p className='sendimg'>
                                    <Image source="https://sm.ign.com/ign_me/cover/b/batman-reb/batman-reboot_ar4j.jpg" />
                                </p>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi, this is nai</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='getvideo'>
                                    <video width="300" controls>
                                        <source src="movie.mp4" type="video/mp4" />
                                        <source src="movie.ogg" type="video/ogg" />
                                    </video>
                                </p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='sendvideo'>
                                    <video width="300" controls>
                                        <source src="movie.mp4" type="video/mp4" />
                                        <source src="movie.ogg" type="video/ogg" />
                                    </video>
                                    <h6 className='time'>Today,10.30</h6>
                                </p>
                            </div>
                            <div className='msg'>
                                <p className='sendaudio'>
                                    <audio controls>
                                        <source src="horse.ogg" type="audio/ogg" />
                                        <source src="horse.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio tag.
                                    </audio>
                                    <h6 className='time'>Today,10.30</h6>
                                </p>
                            </div>
                            <div className='msg'>
                                <p className='getaudio'>
                                    <audio controls>
                                        <source src="horse.ogg" type="audio/ogg" />
                                        <source src="horse.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio tag.
                                    </audio>
                                    <h6 className='time'>Today,10.30</h6>
                                </p>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi, this is nai</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi, this is nai</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi, this is nai</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi, this is nai</p>
                                <h6 className='time'>{moment("2024-3-5 20:19", "YYYYMMDD hh:mm").fromNow()}</h6>
                            </div> */}

                            {
                                activechatdata ?
                                    activechatdata.type == "single" ?
                                        singleMsgData.map((item, index) => (
                                            item.whosendid == userdata.uid
                                                ?
                                                <div className='msg'>
                                                    {
                                                        item.message
                                                            ?
                                                            <>
                                                                <p className='sendmsg'>
                                                                    {item.message}
                                                                </p>
                                                                <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                                {index === singleMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                            </>
                                                            :
                                                            <>
                                                                <p className='sendimg'>
                                                                    <Image source={item.img} />
                                                                    <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                                </p>
                                                                {index === singleMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                            </>
                                                    }


                                                </div>
                                                :
                                                <div className='msg'>
                                                    {
                                                        item.message
                                                            ?
                                                            <p className='getmsg'>
                                                                {item.message}
                                                            </p>
                                                            :
                                                            <p className='getimg'>
                                                                <Image source={item.img} />
                                                            </p>
                                                    }
                                                    <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                    {index === singleMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                </div>
                                        ))
                                        :
                                        activechatdata.type == "mygroup"
                                            ?
                                            grpMsgData.map((item, index) => (
                                                item.whosendid == userdata.uid && item.whoreceivedid == activechatdata.mygrpid
                                                    ?
                                                    <div className='msg'>
                                                        {
                                                            item.message
                                                                ?
                                                                <>
                                                                    <p className='sendmsg'>
                                                                        {item.message}
                                                                    </p>
                                                                    <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                                    {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                                </>
                                                                :
                                                                <>
                                                                    <p className='sendimg'>
                                                                        <Image source={item.img} />
                                                                        <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                                    </p>
                                                                    {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                                </>
                                                        }


                                                        {/*                                                         
                                                        <p className='sendmsg'>{item.message}</p>
                                                        <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                        {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />} */}
                                                    </div>
                                                    : item.whoreceivedid == activechatdata.mygrpid &&
                                                    <div className='msg'>
                                                        {
                                                            item.message
                                                                ?
                                                                <p className='getmsg'>
                                                                    {item.message}
                                                                </p>
                                                                :
                                                                <p className='getimg'>
                                                                    <Image source={item.img} />
                                                                </p>
                                                        }
                                                        <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                        {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                        {/*                                                         
                                                        <p className='getmsg'>{item.message}</p>
                                                        <h6 className='time'> {moment(item.date, "YYYYMMDD hh:mm").fromNow()} by {item.whosendname}</h6>
                                                        {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />} */}
                                                    </div>
                                            ))
                                            :
                                            activechatdata.type == "joined" &&
                                            grpMsgData.map((item, index) => (
                                                item.whosendid == userdata.uid && item.whoreceivedid == activechatdata.groupid
                                                    ?
                                                    <div className='msg'>
                                                        {
                                                            item.message
                                                                ?
                                                                <>
                                                                    <p className='sendmsg'>
                                                                        {item.message}
                                                                    </p>
                                                                    <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                                    {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                                </>
                                                                :
                                                                <>
                                                                    <p className='sendimg'>
                                                                        <Image source={item.img} />
                                                                        <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                                    </p>
                                                                    {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />}
                                                                </>
                                                        }

                                                        {/*                                                         
                                                        <p className='sendmsg'>{item.message}</p>
                                                        <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                        {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />} */}
                                                    </div>
                                                    : item.whoreceivedid == activechatdata.groupid &&
                                                    < div className='msg' >

                                                        {
                                                            item.message
                                                                ?
                                                                <p className='getmsg'>
                                                                    {item.message}
                                                                </p>
                                                                :
                                                                <p className='getimg'>
                                                                    <Image source={item.img} />
                                                                </p>
                                                        }
                                                        <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</h6>
                                                        {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />}



                                                        {/* <p className='getmsg'>{item.message}</p>
                                                        <h6 className='time'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()} by {item.whosendname}</h6>
                                                        {index === grpMsgData.length - 1 && <div ref={lastMessageRef} />} */}
                                                    </div>
                                            ))
                                    :
                                    ""

                            }
                        </div>
                    </div>

                    <div className="message_navigation">
                        <div className="message_navigation_body">
                            <div className='msgbox'>
                                <input onKeyDown={handleKeyDown} className='msgwrite' value={msg} onChange={(e) => setMsg(e.target.value)} type="text" />
                                <div className="icons">
                                    <MdEmojiEmotions />
                                    <label>
                                        <input onChange={handleImgUpload} type="file" hidden />
                                        <FaCamera />
                                    </label>
                                </div>
                            </div>
                            <button onClick={handleMessage}>
                                {
                                    progressStatus != 0
                                        ?
                                        <div>
                                            {Math.round(progressStatus)}%
                                        </div>
                                        :
                                        <IoSend />}
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Chat