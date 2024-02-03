import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SectionHeading from '../../components/SectionHeading';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../utilities/Image/Image';
import './register.css'
import Paragraph from '../../utilities/Paragraph';
import RegImg from '../../assets/images/registration/registration.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';



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

// toastify code Using Formik ==============================================================

    
const notify = () => {
    toast('Notification message!', {
      position: 'top-right',
      autoClose: 1000, // milliseconds
    });
  };



const Register = () => {



    let [loading, SetLoading] = useState(false)

    // Validation code Using Formik ==============================================================
    const navigate = useNavigate();
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(25, 'Must be 25 characters or less')
                .required('Name Required'),
            password: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required(' Password Required')
                .min(6, 'At Least 6 characters Required'),
            email: Yup.string()
                .matches(emailRegex, 'Invalid email address')
                .email('Invalid email address')
                .required('Email Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            // Your form submission logic here

            const auth = getAuth();
            SetLoading(true)
            createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential)=>{
                toast.success("Registered Successfully");
                navigate('/')
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                if(errorCode == "auth/email-already-in-use"){
                    toast.error("Email is already in use");    
                }
                else{
                    toast.error("An error occurred. Please try again later.");
                }
            })


            setTimeout(()=>{
                SetLoading(false)
            },[2000])


            // Reset the form after successful submission
            resetForm();
          },
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div className="image">
                        <Image source={RegImg} alt="login image" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="loginBox">
                        <Box>
                            <SectionHeading style='section_heading' text="Get started with easily register" />
                            <Paragraph style="reg_subheading" text='Free register and you can enjoy it.' />
                            <form onSubmit={formik.handleSubmit}>
                                <div className="login_input">
                                    <div>
                                        <TextField onChange={formik.handleChange}
                                            value={formik.values.email}
                                            fullWidth name='email'
                                            id="email"
                                            label="Email Addres"
                                            variant="outlined" />

                                        {
                                            formik.touched.email && formik.errors.email ? (
                                                <Alert severity="error">{formik.errors.email}</Alert>
                                            ) : null
                                        }
                                    </div>
                                    <div>
                                        <TextField onChange={formik.handleChange}
                                            value={formik.values.name}
                                            fullWidth name='name'
                                            id="name"
                                            label="Ful name"
                                            variant="outlined" />

                                        {
                                            formik.touched.name && formik.errors.name ? (
                                                <Alert severity="error">{formik.errors.name}</Alert>
                                            ) : null
                                        }
                                    </div>
                                    <div>
                                        <TextField onChange={formik.handleChange}
                                            value={formik.values.password}
                                            fullWidth name='password'
                                            id="password"
                                            label="Password"
                                            type="password"
                                            variant="outlined" />

                                        {
                                            formik.touched.password && formik.errors.password ? (
                                                <Alert severity="error">{formik.errors.password}</Alert>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="btn">
                                    {
                                        loading
                                        ?
                                        <LoadingButton
                                        className='loading'
                                        loading
                                        fullWidth
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        >
                                            Sign Up
                                        </LoadingButton>
                                        :
                                        <BootstrapButton type='submit' fullWidth variant="contained">
                                            Sign Up
                                        </BootstrapButton>
                                    }
                                    
                                </div>
                            </form>
                            <div className="login_footer">
                                <h5>Already  have an account ?  <Link to="/"> <span> Sign In</span> </Link></h5>
                            </div>
                        </Box>
                    </div>
                </Grid>

            </Grid >


            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />


        </Box >
    )
}

export default Register