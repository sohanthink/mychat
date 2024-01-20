import React from 'react'
import './home.css'
import { Box, Grid } from '@mui/material'
import GroupCard from '../../components/home/GroupCard'
import GroupList from './GroupList'
import Friends from './Friends'


const Home = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: '25px' }}>
            <Grid container spacing={0}>

                <Grid xs={4} sx={{ marginBottom: '30px' }}>
                    <GroupList />
                </Grid>

                <Grid xs={4} sx={{ padding: '0px 15px', marginBottom: '30px' }}>
                    <Friends />
                </Grid>

                <Grid xs={4} sx={{ marginBottom: '30px' }}>
                    <GroupCard cardtitle='User Lists' ></GroupCard>
                </Grid>

                <Grid xs={4} sx={{ marginBottom: '30px' }}>
                    <GroupCard cardtitle='Friend Request' ></GroupCard>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Home