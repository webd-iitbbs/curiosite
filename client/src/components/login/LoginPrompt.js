import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'

import { loginUser } from '../../actions/userSessionActions'
import './login.css'

export default function LoginPrompt() {

        const dispatch = useDispatch()
        const CLIENT_ID="850052351064-g49rc9ins4606o33ujpgdocc31p9fu2m.apps.googleusercontent.com"

        const onSignIn = async function(googleUser){
                const idToken = googleUser.getAuthResponse().id_token
                //save idToken on a cookie
                const profile = googleUser.getBasicProfile()
                const fullName = profile.getName()
                const userDetails = {
                        firstName: fullName.split(" ")[0],
                        lastName: fullName.split(" ")[1],
                        email: profile.getEmail()
                }
                const res = await fetch("http://localhost:5000/googleAuth",{
                        method:'POST',
                        headers:{
                                'Accept':'application/json',
                                'Content-Type':'application/json',
                                'Authorization':'Bearer ' + idToken
                        },
                        body:JSON.stringify(userDetails)
                })
                const data = await res.json()
                console.log(data)
                //Auth failure to be handled

                dispatch(loginUser(data.user.firstName, data.user.lastName, data.user.email))
        }

        return (
                <div id="login-main">
                        <div id="login-body">
                                <div id="login-logo">
                                        Quora
                                </div>
                                <div id="login-motto">
                                        <i>To Ask. To Answer.</i>
                                </div>
                                <div id="login-button-section">
                                        <GoogleLogin
                                        clientId={CLIENT_ID}
                                        onSuccess={onSignIn}
                                        />
                                        <b>or</b>
                                        <div id="inbuilt-login-section">
                                                <button>Login</button>
                                                <button>Signup</button>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}
