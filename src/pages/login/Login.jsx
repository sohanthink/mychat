import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './login.css'
import SectionHeading from '../../assets/components/SectionHeading';
import GoogleSvg from '../../../public/googlesvg.png';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#5F34F5',
    borderColor: '#0063cc',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));

const Login = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div className="loginBox">
                        <Box>
                            <SectionHeading style='section_heading' text="Login to your account!" />
                            <div className="loginProvidor">
                                <img src={GoogleSvg} alt="" srcset="" />
                                <span>Login with Google</span>
                            </div>
                            <div className="login_input">
                                <TextField fullWidth id="outlined-basic" label="Email Addres" variant="standard" />
                                <TextField fullWidth id="outlined-basic" label="Enter your password" variant="standard" />
                            </div>
                            <div className="btn">
                                {/* <Button fullWidth variant="contained">Login to Continue</Button> */}
                                <BootstrapButton fullWidth variant="contained">
                                    Login to Continue
                                </BootstrapButton>
                            </div>
                            <div className="login_footer">
                                <h5>Don’t have an account ? <span> Sign up</span></h5>
                            </div>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <h2>ok</h2>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login