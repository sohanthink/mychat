import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SectionHeading from '../../components/SectionHeading';
import LoginImg from '../../../public/login/login.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Image from '../../assets/utilities/Image/Image';
import './register.css'



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
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div className="image">
                        <Image source={LoginImg} alt="login image" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="loginBox">
                        <Box>
                            <SectionHeading style='section_heading' text="Get started with easily register" />
                            <div className="login_input">
                                <TextField fullWidth id="email" label="Email Addres" variant="outlined" />
                                <TextField fullWidth id="name" label="Ful name" variant="outlined" />
                                <TextField fullWidth id="password" label="Password" type="password" variant="outlined" />
                            </div>
                            <div className="btn">
                                {/* <Button fullWidth variant="contained">Login to Continue</Button> */}
                                <BootstrapButton fullWidth variant="contained">
                                    Sign up
                                </BootstrapButton>
                            </div>
                            <div className="login_footer">
                                <h5>Already  have an account ?  <Link to="/"> <span> Sign In</span> </Link></h5>
                            </div>
                        </Box>
                    </div>
                </Grid>

            </Grid >
        </Box >
    )
}

export default Login