import { Box, Grid } from '@mui/material'
import React from 'react'

const Feed = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1, padding: '10px' }}>
                <Grid container spacing={0.5}>

                    <Grid xs={12} md={12} xl={12} sx={{ marginBottom: '30px' }}>
                        <h2>things will go here</h2>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Feed