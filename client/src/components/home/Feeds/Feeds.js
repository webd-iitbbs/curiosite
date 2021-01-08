import React from 'react';
import "./Feed.css";
import Post from './Post';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: "2px 4px",
      display: "column",
      alignItems: "center",
      maxWidth: 4000,
      marginLeft: theme.spacing(1)
    },}));


export default function Feeds(){ 
    const classes = useStyles();
    return (
  <div className={classes.root}>
      <Post/>
      <Post/>
      <Post/>
      
  </div>     
)
};