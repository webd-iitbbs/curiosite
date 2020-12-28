import { Avatar } from '@material-ui/core';
import React from 'react';
import"./Sidebar.css";
function Sidebar() {
    const recentItem = (topic) => (
        <div className="sidebar__recentitem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    )
    return (
        <div className="Sidebar">
            <div className="sidebar__top">
                <img src="https://www.dqindia.com/wp-content/uploads/2016/09/startup.jpg" alt=""/>
                <Avatar classname="sidebar__avatar"/>
                <h2>Youngturkconsultancy</h2>
                <h4>Startup by IIT Bhubaneswar Alumni</h4>
                <div className="sidebar__info">
                    <p>
                       We have graduated from an IITs working at MNCs like Microdoft, Amazon,Samsung to name a few, We have  GSOCers to guide with open source and national level hackathon winners to help you hone your skills. 
                    </p>
                </div>
            </div>
            
            <div className="sidebar__button">
                <p>Recent</p>
                {recentItem("Competitive coding")}
                {recentItem("Internships")}
                {recentItem("Academics")}
                {recentItem("Social cultural")}
                {recentItem("Sports")}
                
            </div>
        </div>
    )
}

export default Sidebar