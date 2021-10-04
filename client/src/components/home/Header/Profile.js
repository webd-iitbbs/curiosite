import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Container, Grid, Paper, TextareaAutosize } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import "./Profile.css";

const totalTags = [
  "hi",
  "webd",
  "compitative",
  "cse",
  "ipl",
  "chess",
  "india",
  "china",
];

const Profile = () => {
  const name = "Akash";
  const email = "ak55@iitbbs.ac.in";

  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState(totalTags)

  const removeTags = (indexToRemove) => {
    const tag = tags[indexToRemove]
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    const newAllTags = allTags
    newAllTags.push(tag)
    setAllTags(newAllTags)
  };

  const addTags = (tag) => {
      const indexToRemove = allTags.indexOf(tag)
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setAllTags([...allTags.filter((_, index) => index !== indexToRemove)])
  };
  return (
    <Container>
      <Paper elevation={15} sx={{ minHeight: 750 }}>
        <Container>
          <TextField
            label="Name"
            defaultValue={`${name}`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth={true}
            sx={{ marginBottom: 5, marginTop: 5 }}
          />
          <TextField
            label="Email"
            defaultValue={`${email}`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth={true}
          />

          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <Typography variant="h5" sx={{ marginTop: 2, marginLeft: 2 }}>
                Your Tags
              </Typography>
              <Card sx={{ minHeight: 400, marginTop: 2, minWidth: 300 }}>
                <ul id="tags">
                  {tags.map((tag, index) => (
                    <li key={index} className="tag">
                      <span className="tag-title">{tag}</span>
                      <span
                        className="tag-close-icon"
                        onClick={() => removeTags(index)}
                      >
                        x
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Grid>

            <Grid item md={6} sm={12}>
              <Typography variant="h5" sx={{ marginTop: 2, marginLeft: 2 }}>
                Total Tags
              </Typography>
              <Card sx={{ minHeight: 400, marginTop: 2 }}>
                <ul id="tags">
                  {allTags.map((tag, index) => (
                    <li key={index} className="tag">
                      <span
                        className="tag-title"
                        onClick={(e) => addTags(e.target.innerText)}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Grid>
            <Button variant="contained" color="success" sx={{ marginLeft: 3 }}>
              Submit New Tags
            </Button>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

export default Profile;
