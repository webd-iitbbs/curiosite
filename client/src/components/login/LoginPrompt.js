import { Grid } from '@material-ui/core'
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'


import { loginUser } from '../../actions/userSessionActions'
import './login.css'





export default function LoginPrompt() {

        const dispatch = useDispatch()
        const CLIENT_ID = "850052351064-g49rc9ins4606o33ujpgdocc31p9fu2m.apps.googleusercontent.com"

        const onSignIn = async function (googleUser) {
                const idToken = googleUser.getAuthResponse().id_token
                //save idToken on a cookie
                const gAuthCookie = new Cookies();
                //cookie to be set to httpOnly

                const profile = googleUser.getBasicProfile()
                const fullName = profile.getName()
                const userDetails = {
                        firstName: fullName.split(" ")[0],
                        lastName: fullName.split(" ")[1],
                        email: profile.getEmail()
                }

                if (userDetails.email.includes("@iitbbs.ac.in")) {
                        gAuthCookie.set('idToken', idToken, {
                                path: '/'
                        })
                        const res = await fetch("http://localhost:5000/googleAuth", {
                                method: 'POST',
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + idToken
                                },
                                body: JSON.stringify(userDetails)
                        })
                        const data = await res.json()
                        console.log(data)
                        //Auth failure to be handled

                        dispatch(loginUser(data.user.firstName, data.user.lastName, data.user.email))

                }
                // Cookies to removed After logout..
                // else{
                // document.cookie = 'SID=; path=/; domain=.google.com; expires=' + new Date(0).toUTCString();
                
              
                
                // console.log(userDetails);
                // }
                }



        

        return (



                <Grid container xs={12} sm={12} className="mainBody">
                        <div className="container">
                                <div className="form-box">
                                        <div className="header-form">
                                                <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{ fontSize: "110px", color: "white" }}></i></h4>
                                                <div className="image">
                                                </div>
                                        </div>
                                        <div className="body-form">
                                                <form>

                                                        <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                        <span style={{ fontSize: "100px", color: "#c21808", letterSpacing: "1px" }}> Quora </span>
                                                                </div>

                                                                <div id="login-motto">
                                                                        <b>To Ask. To Answer.</b>
                                                                </div>

                                                        </div>

                                                        <div id="warning-motto">
                                                                <b style={{ color: "#c21808" }}>Please Use Insitute Mail for Login</b>
                                                        </div>
                                                        <div id="login-button-section">

                                                                <GoogleLogin

                                                                        clientId={CLIENT_ID}
                                                                        onSuccess={onSignIn}
                                                                       
                                                                       
                                                                />

                                                        </div>
                                                </form>

                                        </div>
                                </div>
                        </div>

                </Grid>

        )
}
