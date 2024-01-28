import { Box, Grid, ListItem } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';
import './layout.css'


const RootLayout = () => {
    return (
        <>
            <Box>
                <Grid container spacing={0}>
                    <Grid xs={2}>
                        <div className="sidebar">
                            <Sidebar />
                        </div>
                    </Grid>
                    <Grid xs={10}>
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