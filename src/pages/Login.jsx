import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Login = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={6}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>xs=4</Item>
                </Grid>
            </Grid>
        </Box>
        // <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    )
}

export default Login