import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

const SocialLogin = () => {
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            try {
                const res = await axios.post('http://127.0.0.1:80/api/social/login/google/', {
                    'code': codeResponse.code
                });
                if (res.status === 200) {
                    if (res.data.access && res.data.user.pk && res.data.user.username) {
                        window.location.replace('/');
                        Cookies.set('access', res.data.access, { expires: new Date(new Date().getTime() + 5 * 60 * 1000),  path: '' })
                        Cookies.set('refresh', res.data.refresh, { expires: 1,  path: '' })
                    } else {
                        window.location.replace('/login');
                    }
                } else {
                    console.error('Authentication Failed :(');
                }
            } catch (error) {
                console.error('Authentication Error', error);
            }
        },
        flow: 'auth-code',
        onError: (error) => {
            console.error('Login Failed:', error);
        }
    });

    return (
        <>
        <div style={{ position: 'relative', top: 300, display: 'flex', justifyContent: 'center' }}>
            
        </div>
            <div style={{ position: 'relative', top: 300, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="success" style={{ fontWeight: 700 }} onClick={() => login()}>
                    Login with Google
                </Button>
            </div>
        </>

    );
};

export default SocialLogin;