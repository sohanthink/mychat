import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar';
import './layout.css'


const RootLayout = () => {
    return (
        <>
            <Box>
                <Grid container spacing={0}>
                    <Grid xs={12} xl={2}>
                        <div className="sidebar">
                            <Sidebar />
                        </div>
                    </Grid>
                    <Grid item xs={10} xl={10}>
                        <div className="outletbox">
                            <Outlet />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default RootLayout