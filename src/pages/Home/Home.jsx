import React, { useEffect } from 'react'
import './home.css'
import { Box, Grid } from '@mui/material'
import GroupList from './GroupList'
import Friends from './Friends'
import UserList from './UserList'
import FriendRequest from './FriendRequest'
import MyGroups from './MyGroups'
import BlockedUser from './BlockedUser'
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const data = useSelector(state => state.loginuserdata.value)
    const navigate = useNavigate();

    useEffect(() => {
        if (data == null) {
            navigate('/')
        }
    }, [data, navigate])



    // console.log(loginuser);
    return (
        <Box sx={{ flexGrow: 1, padding: '10px' }}>
            <Grid container spacing={0.5}>

                <Grid xs={12} md={6} xl={4} sx={{ marginBottom: '30px' }}>
                    <GroupList />
                </Grid>

                <Grid xs={12} md={6} xl={4} sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                    <Friends />
                </Grid>

                <Grid xs={12} md={6} xl={4} sx={{ marginBottom: '30px' }}>
                    <UserList />
                </Grid>

                <Grid xs={12} md={6} xl={4} sx={{ marginBottom: '30px' }}>
                    <FriendRequest />
                </Grid>

                <Grid xs={12} md={6} xl={4} sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                    <MyGroups />
                </Grid>

                <Grid xs={12} md={6} xl={4} sx={{ marginBottom: '30px' }}>
                    <BlockedUser />
                </Grid>

            </Grid>
        </Box >
    )
}

export default Home