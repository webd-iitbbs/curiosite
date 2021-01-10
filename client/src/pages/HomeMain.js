import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

import Home from './Home'
import Login from './Login'
import { loginUser } from '../actions/userSessionActions'

export default function HomeMain() {

        const dispatch = useDispatch()
        const [isAuth, authModify] = useState(false)
        const user = useSelector(state => state.user)
        useEffect(() => {
                if(isAuth === false)
                {
                        const cookies = new Cookies()
                        var requestMade = false
                        const timerId = setInterval(async () => {
                                const token = cookies.get('idToken')
                                if(token)
                                {
                                        if(requestMade === false)
                                        {
                                                const res = await fetch('http://localhost:5000/googleAuth',{
                                                        method: 'POST',
                                                        headers: {
                                                                'Authorization':'Bearer '+token,
                                                                'Content-Type':'application/json',
                                                                'Accept':'application/json'
                                                        }
                                                })
                                                const data = await res.json()
                                                const { firstName, lastName, email } = data.user
                                                dispatch(loginUser(firstName, lastName, email))
                                                requestMade = true        
                                        }
                                        authModify(true)
                                        clearInterval(timerId)
                                }
                        },100)
                }
        })
        return (
                isAuth === false?
                <Login />:
                <Home />
        )
}
