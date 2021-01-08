import React from 'react';
import "./SearchBar.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 4000
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },

}));


export default function SearchBar() {
  const classes = useStyles();

  return (
    <Grid container xs={12} justify="space-around"
    style={{ minHeight: '20vh', maxWidth: '100%' }} >
      <Grid item xs={12} md={8}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search Using Tags Seprated using ',' "
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      
      <Grid item md={3} alignItems="center" >
        <Button
          variant="contained"
          size="large"
            color="default"
          className={classes.margin}

        >
          UnAnsered Question
        </Button>
      </Grid>
    </Grid>
  );
}

// export default Feed;