import React from 'react';
import './Widgets.css';
import InfoIcon from "@material-ui/icons/Info";
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
            <h2>Quora News</h2>
            <InfoIcon/>
            </div>
            {newsArticle("Web and design society ,IIT BHubneswar developed quora app.","Top news - 9880 readers")}
            {newsArticle("Neuromancers  ,IIT BHubneswar developed Discover People app.","Top news - 4980 readers")}
            {newsArticle("Nagsen Waghmare from IIT BHubneswar developed Ashwamedha Sport fest website.","Top news - 1880 readers")}
        </div>
    )
}

export default Widgets