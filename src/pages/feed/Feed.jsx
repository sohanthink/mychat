import { Box, Grid } from '@mui/material'
import React from 'react'
import Posts from './Posts'
import './feed.css'
import PostUpload from './PostUpload'





const Feed = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: '10px' }}>
                <Grid container spacing={0.5}>

                    <Grid xs={12} md={12} xl={12} sx={{ marginBottom: '30px' }}>
                        <PostUpload />
                    </Grid>

                    <Grid xs={12} md={12} xl={12} sx={{ marginBottom: '30px' }}>
                        <Posts />
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Feed