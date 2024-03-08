import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { GoogleOAuthProvider} from '@react-oauth/google';

const SocialLogin = () => {
    const responseGoogle = async (response) =>{
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/social/login/google/', {
                'access_token': response['credential']
            });

            const GetRes = await axios.get(`http://127.0.0.1:8000/api/social/login/user/${res.data.key}`,
                );

            if (res.status === 200){
                if(res.data.key == GetRes.data.userToken){
                    window.location.replace('/')
                    localStorage.setItem('key', res.data.key)
                }else{
                    window.location.replace('/login')
                }
            }else{
                console.error('Authentication Failed :(')
            }
        }catch(error){
            console.log('Error Authentication', error)
        }

        
    }
  return (
    <>
    <div style={{position: 'absolute', top: 200}}>
        <GoogleOAuthProvider clientId='703726974799-7l44udcrh4vcqk19j1rvtdta6ok1mff0.apps.googleusercontent.com'>
            <GoogleLogin
                clientId="703726974799-7l44udcrh4vcqk19j1rvtdta6ok1mff0.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </GoogleOAuthProvider>
    </div>
      
    </>
  )
}

export default SocialLogin
