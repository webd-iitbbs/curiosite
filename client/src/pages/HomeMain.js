import React, { useState ,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

import Home from './Home'
import Login from './Login'

export default function HomeMain() {
        const [isAuth, authModify] = useState(false)
        const user = useSelector(state => state.user)
        useEffect(() => {
                const cookies = new Cookies()
                if(cookies.get('idToken'))
                        authModify(true)
                else
                        authModify(false)
        },[user])
        return (
                isAuth === false?
                <Login />:
                <Home />
        )
}
