import React from 'react';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom';

// import Home from '../../../pages/Home';
import Layout from './Layout';
<<<<<<< HEAD
import Follows from '../Header/Follows';
=======

>>>>>>> 9435383f3a8eb7187e6ac14961e541eb1669610d
import Profile from './Profile';
import Create from './Create';
import LandingPage from './LandingPage';


export default function MainNavigation(){
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact>
<<<<<<< HEAD
                        <LandingPage />
                    </Route>
                    
                    <Route path="/Following">
                        <Follows />
                    </Route>

                    
                    <Route path="/Profile">
=======
                        <LandingPage
                        page={'home'}
                        />
                    </Route>
                    
                    <Route path="/following">
                        <LandingPage
                        page={'follows'}
                        />
                    </Route>

                    
                    <Route path="/profile">
>>>>>>> 9435383f3a8eb7187e6ac14961e541eb1669610d
                        <Profile />
                    </Route>

                    
                    <Route path="/CreatePost">
                        <Create />
                    </Route>

                </Switch>
            </Layout>
        </Router>
        
        
        );

}