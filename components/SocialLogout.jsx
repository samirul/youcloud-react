import React from 'react'
import { googleLogout} from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';


const SocialLogout = () => {
    const handleLogout = () => {
        try {
            googleLogout()
            localStorage.clear('key')
            console.log('Logged out successfully');
            window.location.replace('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
      };

    return (
        <>
            <div style={{position: 'absolute', top: 200}}>
                <h1>cat</h1>
                <GoogleOAuthProvider>
                    <button onClick={handleLogout}>Logout</button>
                </GoogleOAuthProvider>
            </div>
        </>
    )
}

export default SocialLogout
