import React from 'react'
import { googleLogout} from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

const SocialLogout = () => {
    const handleLogout = () => {
        try {
            googleLogout()
            Cookies.remove('access', { path: '' })
            Cookies.remove('refresh', { path: '' })
            window.location.replace('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
      };

    return (
        <>
            <div style={{position: 'relative', top: 420, display: 'flex', justifyContent: 'center' }}>
                <GoogleOAuthProvider>
                    <Button variant="contained" color="error" style={{fontWeight: 700}} onClick={handleLogout}>Logout</Button>
                </GoogleOAuthProvider>
            </div>
        </>
    )
}

export default SocialLogout
