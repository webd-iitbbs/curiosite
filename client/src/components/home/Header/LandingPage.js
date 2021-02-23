import React from 'react';
import './LandingPage.css';
import Sidebar from '../SideBars/Sidebar.js';
import Grid from "@material-ui/core/Grid";
import SearchBar from '../SearchBar/SearchBar.js';
import Feeds from '../Feeds/Feeds';

<<<<<<< HEAD
export default function LandingPage(){
=======
export default function LandingPage(props){
>>>>>>> 9435383f3a8eb7187e6ac14961e541eb1669610d
    return(
        <div className="main" >
             <Grid container >
                                <Grid item xs={0} sm={2} >
                                        <Sidebar />
                                </Grid>

                                <Grid item xs={12} sm={10}>
                                        <div className="main_body" >
                                                <SearchBar style={{minheight:"15vh"}}/>       
                                        </div>
<<<<<<< HEAD
                                        <Feeds/>
=======
                                        <Feeds
                                        page={props.page}
                                        />
>>>>>>> 9435383f3a8eb7187e6ac14961e541eb1669610d
                                    
                                </Grid>

                        </Grid>
        </div>
    )
};