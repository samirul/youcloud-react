import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '@mui/material/Button';

const SocialLogin = () => {
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/social/login/google/', {
                    'code': codeResponse.code
                });
                if (res.status === 200) {
                    if (res.data.access && res.data.user.pk && res.data.user.username) {
                        window.location.replace('/');
                        localStorage.setItem('access', res.data.access);
                        localStorage.setItem('refresh', res.data.refresh);
                    } else {
                        window.location.replace('/login');
                    }
                } else {
                    console.error('Authentication Failed :(');
                }
            } catch (error) {
                if (error.response.status === 500){
                    document.getElementById('msg').innerText = "Email already Exist."
                }
            }
        },
        flow: 'auth-code',
        onError: (error) => {
            console.error('Login Failed:', error);
        }
    });

    return (
        <>
        <p id ='msg' style={{ position: 'relative', top: 250, display: 'flex', justifyContent: 'center', color: '#fff'}}></p>
        <div style={{ position: 'relative', top: 420, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="success" style={{fontWeight: 700}} onClick={() => login()}>
                Login with Google
            </Button>
        </div>
        </>
        
    );
};

export default SocialLogin;