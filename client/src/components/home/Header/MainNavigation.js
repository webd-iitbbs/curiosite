import React from 'react';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom';

// import Home from '../../../pages/Home';
import Layout from './Layout';
import Follows from '../Header/Follows';
import Profile from './Profile';
import Create from './Create';
import LandingPage from './LandingPage';


export default function MainNavigation(){
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact>
                        <LandingPage />
                    </Route>
                    
                    <Route path="/Following">
                        <Follows />
                    </Route>

                    
                    <Route path="/Profile">
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