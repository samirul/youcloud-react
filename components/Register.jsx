import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Link, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import SocialLogin from './SocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';


const Register = () => {
    axios.defaults.withXSRFToken = true
    const paperStyle = { padding: 20, height: '45vh', width: 280, margin: "19px auto", backgroundColor: '#ffff' }
    const btnstyle = { margin: '12px 0' }

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmpassword, setconfirmPassword] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:80/api/registration/', {
                'username': username,
                'email': email,
                'password1': password,
                'password2': confirmpassword,

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }

            });
            if (res.status === 201) {
                    window.location.replace('/login');
                    
            } else {
                console.error('Registration Failed :(');
            }
        } catch (error) {
            console.error('Registration Failed', error);
        }
    }


    return (

        <Grid>
            <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Here is a gentle confirmation that your action was successful.
            </Alert>
            </div>
            <div style={{ position: 'relative', top: 200, display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <Paper elavation={12} style={paperStyle}>
                        <Grid align='center'>
                            <div style={{ fontSize: 10, fontWeight: 600 }}>You Cloud</div>
                            <h2 style={{ fontWeight: 700 }}>Register</h2>
                        </Grid>

                        <TextField id="standard-basic" label="Username" variant="standard" placeholder='Enter Your Username' fullWidth required value={username} onChange={e => setUsername(e.target.value)} />

                        <TextField id="standard-basic" label="Email" variant="standard" placeholder='Enter Your Email ID' fullWidth required value={email} onChange={e => setEmail(e.target.value)} />

                        <TextField id="standard-basic" label="Password" variant="standard" placeholder='Enter Your Password' type='password' fullWidth required value={password} onChange={e => setPassword(e.target.value)} />

                        <TextField id="standard-basic" label="Confirm Password" variant="standard" placeholder='Enter Your Confirm Password' type='password' fullWidth required value={confirmpassword} onChange={e => setconfirmPassword(e.target.value)} />


                        <FormControlLabel control={<Checkbox defaultChecked />} label="T" />

                        <Button style={{ btnstyle, fontWeight: 700 }} type='submit' color='success' variant="contained" fullWidth>Register</Button>

                        <Typography style={{ fontWeight: 700, fontSize: 12, marginTop: 10 }}>Already have an account?
                            <Link href="/login" style={{ marginLeft: 100, position: 'relative', right: 100 }} >
                                Login Here.
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

export default Register