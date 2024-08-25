import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Link, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import SocialLogin from './SocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'js-cookie';



const Login = () => {
    axios.defaults.withXSRFToken = true
    const paperStyle = { padding: 20, height: '40vh', width: 280, margin: "19px auto", backgroundColor: '#ffff' }
    const btnstyle = { margin: '12px 0' }

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [alert, setAlert] = React.useState(false)
    const [alertType, setAlertType] = React.useState('')
    const [alertMsg, setAlertMsg] = React.useState('')
    const [open, setOpen] = React.useState(false);

    
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:80/api/auth/login/', {
                'email': email,
                'password': password,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            if (res.status === 200) {
                if (res.data.access && res.data.user.pk && res.data.user.username) {
                    window.location.replace('/');
                    setAlert(true);
                    setAlertType('success');
                    setAlertMsg('Login Successful.');
                    Cookies.set('access', res.data.access, { expires: new Date(new Date().getTime() + 5 * 60 * 1000),  path: '' })
                    Cookies.set('refresh', res.data.refresh, { expires: 1,  path: '' })
                } else {
                    window.location.replace('/login');
                }
            } else {
                setAlert(true)
                setAlertType('error')
                setAlertMsg('Login Failed, Please Check your Username or Password.')
            }
        } catch (error) {
            setAlert(true)
            setAlertType('error')
            setAlertMsg('Login Failed, Please Check your Username or Password.')
        }
    }


    return (

        <Grid>
            {alert ? <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>
                <Alert severity={alertType}>{alertMsg}</Alert>
            </div> : ""}

            <div style={{ position: 'relative', top: 200, display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <Paper elavation={12} style={paperStyle}>
                        <Grid align='center'>
                            <div style={{ fontSize: 10, fontWeight: 600 }}>You Cloud</div>
                            <h2 style={{ fontWeight: 700 }}>Login</h2>
                        </Grid>

                        <TextField id="standard-basic" label="Email" variant="standard" placeholder='Enter Your Email ID' fullWidth required value={email} onChange={e => setEmail(e.target.value)} />

                        <TextField id="standard-basic" label="Password" variant="standard" placeholder='Enter Your Password' type='password' fullWidth required value={password} onChange={e => setPassword(e.target.value)} />

                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

                        <Button style={{ btnstyle, fontWeight: 700 }} type='submit' color='success' variant="contained" onClick={handleOpen} fullWidth>Login</Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Typography style={{ marginTop: 10, fontWeight: 700, fontSize: 12 }}>
                            <Link href="#" >
                                Forgot Password?
                            </Link>
                        </Typography>

                        <Typography style={{ fontWeight: 700, fontSize: 12 }}>Don't have an account?
                            <Link href="/register" style={{ marginLeft: 100, position: 'relative', right: 100 }} >
                                Sign Up Here.
                            </Link>
                        </Typography>
                    </Paper>
                </form>
            </div>

            <div style={{ position: 'relative', bottom: 100, display: 'flex', justifyContent: 'center' }}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}><SocialLogin /></GoogleOAuthProvider>
            </div>

        </Grid>

    )
}

export default Login