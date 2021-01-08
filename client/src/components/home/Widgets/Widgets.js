import React from 'react';
import './Widgets.css';
import { Divider } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
function Widgets() {

        const newsArticle = (heading,subtitle) => (
                <div className="widgets__Article">

                    <div className="widgets__Articleleft">
                    <FiberManualRecordIcon/>
                    </div>
                    <div className="widgets__Articleright">
                        <h4>{heading}</h4>
                        <p>{subtitle}</p>
                    </div>

                </div>
        );

return (
        <div className="Widgets">
            <div className="Widgets__header">
            <div style={{color:"#c21808",fontSize:"20px",fontFamily:"inherit",textAlign:"center",textDecoration:"bold"}}>Trending</div>
                <Divider/>
            </div>
            {newsArticle("Web and design society ,IIT BHubneswar developed quora app.","Top news - 9880 readers")}
            {newsArticle("Neuromancers  ,IIT BHubneswar developed Discover People app.","Top news - 4980 readers")}
            {newsArticle("Nagsen Waghmare from IIT BHubneswar developed Ashwamedha Sport fest website.","Top news - 1880 readers")}
        </div>
    )
}

export default Widgets