import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Sidebar from '../SideBars/Sidebar.js';
import Grid from "@material-ui/core/Grid";
import SearchBar from '../SearchBar/SearchBar.js';
import Feeds from '../Feeds/Feeds';

export default function LandingPage(props){
    const [searchStatus, setStatus] = useState(false)
    const [searchTags, setTags] = useState([])
    const activateSearch = () => { setStatus(!searchStatus) }
    useEffect(() => { setTags(searchTags) }, [searchTags])
    const setSearchTags = (tags) => { setTags([...tags]) }
    
    return(
        <div className="main" >
             <Grid container >
                                <Grid item xs={0} sm={2} >
                                        <Sidebar />
                                </Grid>

                                <Grid item xs={12} sm={10}>
                                        <div className="main_body" >
                                                <SearchBar style={{minheight:"15vh"}} activateSearch={activateSearch}
                                                setSearchTags={setSearchTags}
                                                />       
                                        </div>
                                        <Feeds
                                        page={props.page}
                                        searchStatus={searchStatus}
                                        tags={searchTags}
                                        />
                                    
                                </Grid>

                        </Grid>
        </div>
    )
};