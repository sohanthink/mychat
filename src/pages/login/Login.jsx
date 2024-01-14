import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './login.css'
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/googlesvg.png';
import LoginImg from '../../../public/login/login.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Image from '../../assets/utilities/Image/Image';
import { IoEyeOutline } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";



const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    border: '1px solid',
    backgroundColor: '#5F34F5',
    borderColor: '#0063cc',
    borderRadius: '8px',
    padding: '20px 0px',

});


const Login = () => {
    const [show, setShow] = useState(false);


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div className="loginBox">
                        <Box>
                            <SectionHeading style='section_heading' text="Login to your account!" />
                            <div className="loginProvidor">
                                <img src={GoogleSvg} alt="" />
                                <span>Login with Google</span>
                            </div>
                            <div className="login_input">
                                <div>
                                    <TextField fullWidth id="outlined-basic" label="Email Addres" variant="standard" />
                                </div>
                                <div className='eye'>
                                    <TextField fullWidth id="outlined" type={show ? "text" : "password"} label="Enter your password" variant="standard" />
                                    <span onClick={() => setShow(!show)}>
                                        {
                                            show
                                                ?
                                                <IoEyeOutline />
                                                :
                                                <GoEyeClosed />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="btn">
                                {/* <Button fullWidth variant="contained">Login to Continue</Button> */}
                                <BootstrapButton fullWidth variant="contained">
                                    Login to Continue
                                </BootstrapButton>
                            </div>
                            <div className="login_footer">
                                <h5>Don’t have an account ? <Link to="/registration"> <span> Sign up</span> </Link></h5>
                            </div>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="image">
                        <Image source={LoginImg} alt="login image" />
                    </div>
                </Grid>
            </Grid >
        </Box >
    )
}

export default Login