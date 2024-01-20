import React from 'react'
import './home.css'
import { Box, Grid } from '@mui/material'
import GroupCard from '../../components/home/GroupCard'
import GroupList from './GroupList'
import Friends from './Friends'
import UserList from './UserList'
import FriendRequest from './FriendRequest'
import MyGroups from './MyGroups'
import BlockedUser from './BlockedUser'


const Home = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: '25px' }}>
            <Grid container spacing={0}>

                <Grid xs={4} sx={{ marginBottom: '30px' }}>
                    <GroupList />
                </Grid>

                <Grid xs={4} sx={{ padding: '0px 30px', marginBottom: '30px' }}>
                    <Friends />
                </Grid>

                <Grid xs={4} sx={{ marginBottom: '30px' }}>
                    <UserList />
                </Grid>

                <Grid xs={4} sx={{ marginBottom: '30px' }}>
                    <FriendRequest />
                </Grid>

                <Grid xs={4} sx={{ padding: '0px 30px', marginBottom: '30px' }}>
                    <MyGroups />
                </Grid>

                <Grid xs={4} sx={{ marginBottom: '30px' }}>
                    <BlockedUser />
                </Grid>

            </Grid>
        </Box >
    )
}

export default Home