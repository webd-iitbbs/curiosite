import React from 'react'
import Header from '../components/home/Header/header.js';
import Sidebar from '../components/home/SideBars/Sidebar.js';
import Grid from "@material-ui/core/Grid";
import SearchBar from '../components/home/SearchBar/SearchBar.js';
import Feeds from '../components/home/Feeds/Feeds';
export default function Home() {
        return (
                <div className="App">
                        <Header />
                        <Grid container >
                                <Grid item xs={0} sm={2} >
                                        <Sidebar />
                                </Grid>

                                <Grid item xs={12} sm={10}>
                                        <div className="app_body" >
                                                <SearchBar style={{minheight:"15vh"}}/>       
                                        </div>
                                        <Feeds/>
                                    
                                </Grid>

                        </Grid>
                </div>
        )
}
