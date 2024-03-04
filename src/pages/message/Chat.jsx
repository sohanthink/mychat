import React, { useEffect, useState } from 'react'
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


    let dispatch = useDispatch()

    const activechatdata = useSelector((state) => state.activechat.activechat)
    // console.log(state);
    console.log(activechatdata);

    let [activechatName, setActiveChatNAme] = useState("")
    // if (activechatdata == null) {
    //     return
    // }


    // useEffect(() => {
    //     let activeChatName = ''
    //     if (activechatdata != null) {
    //         if (activechatdata.friendname) {
    //             activeChatName = activechatdata.friendname
    //         } else if (activechatdata.type == 'mygroup') {
    //             activeChatName = activechatdata.groupname
    //         } else if (activechatdata.type == 'joined') {
    //             activeChatName = activechatdata.groupname
    //         }
    //     }
    //     setActiveChatNAme(activeChatName)

    // }, [activechatdata])






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
                                {/* {
                                    activechatdata != '' ?
                                        <Avatar sx={{ width: '70px', height: '70px' }} alt="Remy Sharp" src={activechatdata.friendphoto} />
                                        :
                                        <Avatar sx={{ width: '70px', height: '70px' }} alt="Remy Sharp" src="https://cdn.vox-cdn.com/thumbor/2E78dg_Cpbdh3nv6z0KKhOhYs6c=/0x0:1100x580/1200x800/filters:focal(520x151:696x327)/cdn.vox-cdn.com/uploads/chorus_image/image/71921482/bkq6gtrpcnw43vsm5zm62q3z.0.png" />
                                } */}
                            </StyledBadge>
                        </div>
                        <div>
                            <h3>
                                {/* {
                                    activechatdata.friendname ?
                                        activechatdata.friendname
                                        :
                                        activechatdata.groupname.type == "mygroup" ?
                                            activechatdata.groupname :
                                            activechatdata.groupname
                                } */}
                                {
                                    activechatdata != null &&
                                    activechatdata.friendname
                                }

                            </h3>
                            <h6>online</h6>
                        </div>
                    </div>
                    <div className="message_body">
                        <div className="message_body_container">
                            <div className='msg'>
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
                                <p className='getmsg'>hi, this is nai</p>
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
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi, this is nai</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                            <div className='msg'>
                                <p className='sendmsg'>hi,</p>
                                <h6 className='time'>Today,10.30</h6>
                            </div>
                        </div>
                    </div>
                    <div className="message_navigation">
                        <div className="message_navigation_body">
                            <div className='msgbox'>
                                <input className='msgwrite' type="text" />
                                <div className="icons">
                                    <MdEmojiEmotions />
                                    <FaCamera />
                                </div>
                            </div>
                            <button><IoSend />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat