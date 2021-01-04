import React from 'react'
import Header from '../components/home/Header/header.js';
import Feed from '../components/home/Feeds/Feed.js';
import Sidebar from '../components/home/SideBars/Sidebar.js';
import Widgets from '../components/home/Widgets/Widgets.js';

export default function Home() {
        return (
                <div className="App">                  
                        <Header/>
                        <div className="app_body">
                                <Sidebar/>
                                <Feed/>
                                <Widgets/>
                        </div>      
                </div>
        )
}
