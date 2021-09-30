import React from "react";
import Card from "@mui/material/Card";
import { Container, Grid, Paper, TextareaAutosize } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SingleQuestion = (props) => {
  const { AuthorEmail, content, name, tags, questionData } =
    props.location.state;
  console.log(props.location.state);

  const AnsArray = [
    { author: "Akash", content: "Karnatak" },
    { author: "Khushi", content: "Kotdwara" },
    { author: "Prakash", content: "Hydrabad" },
    { author: "Adi", content: "Roorkee" },
    { author: "Happy", content: "Punjab" },
    { author: "Aman", content: "UK" },
  ];

  return (
    <Container>
      <Grid>
        <Grid item>
          <Card sx={{ minWidth: 650 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Email : {AuthorEmail}
              </Typography>

              <Typography variant="h5">Question</Typography>
              <br />
              <Typography variant="body2">{content}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xm={12}>
          <Paper
            elevation={15}
            sx={{ minWidth: 635 }}
            style={{ marginTop: 20, minHeight: 50, textAlign: "center" }}
          >
            <Typography sx={{ color: "text.primary", fontSize: 24 }}>
              Tags:
              {tags.map((element) => (
                <Typography
                  sx={{
                    fontSize: 18,
                    display: "inline-block",
                    color: "#C21808",
                  }}
                  color="text.secondary"
                >
                  {`${element} , `}
                </Typography>
              ))}
            </Typography>
          </Paper>
        </Grid>

        <Grid xs={12} sx={{ minWidth: 635, marginTop: 5 }}>
          {AnsArray.map((ans) => (
            <Card style={{ marginBottom: 15 }}>
              <CardContent sx={{ minHeight: 50 }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  By : {ans.author}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 18,
                    display: "inline-block",
                  }}
                  color="text.primary"
                >
                  {ans.content}
                </Typography>
              </CardContent>
              <div style={{ marginBottom: 4 }}>
                <Button
                  style={{
                    textDecoration: "none",
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  variant="outlined"
                  color="primary"
                >
                  Upvote
                </Button>
                <Button
                  style={{ textDecoration: "none" }}
                  variant="contained"
                  color="error"
                >
                  DownVote
                </Button>
              </div>
            </Card>
          ))}
        </Grid>

        <Grid item>
          <Typography variant="h5" style={{ marginBottom: 5 }}>
            Want to ans?
          </Typography>
          <Card style={{ marginBottom: 15 }} sx={{ minWidth: 650 }}>
            <CardContent sx={{ minHeight: 50 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                By : {name}
              </Typography>

              <TextareaAutosize
                style={{
                  maxWidth: 600,
                  minWidth: 600,
                  maxHeight: 300,
                  minHeight: 300,
                  overflow: "auto",
                }}
              />
            </CardContent>
            <div style={{ marginBottom: 4 }}>
              <Button
                style={{
                  textDecoration: "none",
                  marginLeft: 5,
                  marginRight: 5,
                }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleQuestion;
