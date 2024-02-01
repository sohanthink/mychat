import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { ThemeProvider, styled, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './login.css'
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/googlesvg.png';
import LoginImg from '../../../public/login/login.png';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Image from '../../utilities/Image/Image';
import { IoEyeOutline } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";
import { Alert, Modal } from '@mui/material';
import Paragraph from '../../utilities/Paragraph';
import { MdLockReset } from "react-icons/md";
import { useFormik } from 'formik';
import * as Yup from 'yup';


// text fields customization
const customTheme = (outerTheme) =>
    createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label.Mui-focused': {
                            color: 'white',
                        },
                        'label': {
                            color: 'white',
                            borderColor: 'white'
                        },
                    },
                },
            },
        },
    });

// Button styles from MUI
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

// modal styles from MUI
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#990000',
    // border: '2px solid #EA6C00',
    boxShadow: 24,
    p: 4,
};



const Login = () => {
    const [show, setShow] = useState(false);

    // modal states from MUI
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // login validation ==============================

    // let [loginFormData, setLoginFormData] = useState({
    //     password: "",
    //     email: "",
    // })

    // let handleForm = (e) => {
    //     // setLoginFormData(e.target.value)

    //     // console.log(e.target.name, e.target.value);
    //     let { name, value } = e.target

    //     setLoginFormData({
    //         ...loginFormData,
    //         [name]: value,
    //     })
    // }

    // let [emailError, setEmailError] = useState('');
    // let [passwordError, setpasswordError] = useState('');
    // let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // let handleSubmit = () => {
    //     // email validation checking with regex
    //     if (loginFormData.email) {
    //         if (loginFormData.email.match(emailRegex)) {
    //             setEmailError("")
    //         } else {
    //             setEmailError("Please Enter A Valid Email");
    //         }
    //     } else {
    //         setEmailError("Please Enter An Email")
    //     }

    //     // password validation
    //     if (loginFormData.password) {
    //         setpasswordError("")
    //     } else {
    //         setpasswordError("You must Enter a Password")
    //     }

    //     // submit the data if only there is no error
    //     if (!emailError && !passwordError) {
    //         console.log(loginFormData);
    //     }

    // }

    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required(' Password Required'),
            email: Yup.string()
                .matches(emailRegex, 'Invalid email address')
                .email('Invalid email address')
                .required('Email Required'),
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            console.log(values);
        },
    });



    let [forgot, setForgot] = useState('')
    let handleForgot = (e) => {
        let { value } = e.target
        setForgot({ value })
    }
    let handleForgotSubmit = () => {
        // console.log(forgot.value);
        if (!forgot) {
            console.log("Please Enter Your Email");
        } else if (forgot.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            console.log('Valid Email / A reset link will be sent to your email');
        } else {
            console.log('Please input a valid email');
        }
    }

// added things

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="loginBox">
                            <Box>
                                <SectionHeading
                                    style='section_heading'
                                    text="Login to your account!"
                                />
                                <div className="loginProvidor">
                                    <img src={GoogleSvg} alt="" />
                                    <span>Login with Google</span>
                                </div>
                                <div className="login_input">
                                    <div>
                                        <TextField
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            name='email'
                                            fullWidth id="outlined-basic"
                                            label="Email Addres"
                                            variant="standard"
                                        />
                                        <div className="error">
                                        {
                                            formik.touched.email && formik.errors.email ? (
                                                <Alert severity="error">{formik.errors.email}</Alert>
                                            ) : null
                                        }
                                        </div>
                                    </div>
                                    <div className='eye'>
                                        <TextField
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            name='password'
                                            fullWidth id="outlined"
                                            type={show ? "text" : "password"}
                                            label="Enter your password"
                                            variant="standard"
                                        />
                                        <span onClick={() => setShow(!show)}>
                                            {
                                                show
                                                    ?
                                                    <IoEyeOutline />
                                                    :
                                                    <GoEyeClosed />
                                            }
                                        </span>

                                        {
                                            formik.touched.password && formik.errors.password ? (
                                                <Alert severity="error">{formik.errors.password}</Alert>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="btn">
                                    {/* <Button fullWidth variant="contained">Login to Continue</Button> */}
                                    <BootstrapButton type='submit'fullWidth variant="contained">
                                        Login to Continue
                                    </BootstrapButton>
                                </div>
                                <div className="login_footer">
                                    <h5>Don’t have an account ? <Link to="/registration"> <span> Sign up</span> </Link></h5>
                                    <h5>Forgot Password ? <span onClick={handleOpen}> Click To Reset</span> </h5>
                                </div>
                            </Box>
                        </div>
                    </form>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="image">
                            <Image source={LoginImg} alt="login image" />
                        </div>
                    </Grid>
                </Grid >
            </Box >


            {/* --------------------------------------------------------------------- 
            --------------- forgot password design started here ---------------------
            ---------------------------------------------------------------------- */}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="login_modal_content">
                        <MdLockReset />
                        <SectionHeading text="Forgot Password?" />
                        <Paragraph text="You can reset password here" />
                        <ThemeProvider theme={customTheme(createTheme)}>
                            <TextField
                                name='forgotField'
                                onChange={handleForgot}
                                fullWidth id="outlined-basic"
                                label="Enter Your Email Addres"
                                variant="standard"
                            />
                        </ThemeProvider>
                        <BootstrapButton onClick={handleForgotSubmit} fullWidth variant="contained">
                            Send Link To Reset Password
                        </BootstrapButton>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Login