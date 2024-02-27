import React from 'react'
import GroupList from '../Home/GroupList'
import Friends from '../Home/Friends'
import { Box, Grid } from '@mui/material'
import Chat from './Chat'




const Message = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: '10px' }}>
            <Grid container spacing={0.5}>

                <Grid xs={6} md={6} xl={4} sx={{ marginBottom: '30px' }}>
                    <GroupList />
                    <Friends />
                </Grid>
                <Grid xs={6} md={6} xl={8} sx={{ padding: '0px 10px', marginBottom: '30px' }}>
                    <Chat />
                </Grid>

            </Grid>
        </Box >
    )
}

export default Message