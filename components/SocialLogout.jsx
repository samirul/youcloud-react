import React from 'react'
import { googleLogout} from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Button from '@mui/material/Button';

const SocialLogout = () => {
    const handleLogout = () => {
        try {
            googleLogout()
            localStorage.clear('access')
            localStorage.clear('refresh')
            console.log('Logged out successfully');
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
