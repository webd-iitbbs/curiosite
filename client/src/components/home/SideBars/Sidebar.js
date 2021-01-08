import React from 'react';
import"./Sidebar.css";
import { Divider } from '@material-ui/core';
import Widgets from '../Widgets/Widgets';
import Hidden from '@material-ui/core/Hidden';

function Sidebar() {
    const recentItem = (topic) => (
        <div className="sidebar__recentitem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    )
    return (
        <Hidden xsDown>
        <div className="Sidebar">
        
             <div className="sidebar__button" >
                <Widgets/>
            </div>
          
            
            
            <div className="sidebar__button">
                <div style={{color:"#c21808",fontSize:"20px",fontFamily:"inherit",textAlign:"center",textDecoration:"bold"}}>Tags</div>
                <Divider/>
                {recentItem("Competitive coding")}
                {recentItem("Internships")}
                {recentItem("Academics")}
                {recentItem("Social cultural")}
                {recentItem("Sports")}
                
            </div>
            
        </div>
        </Hidden>
    )
}

export default Sidebar