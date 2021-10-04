import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import Cookies from "universal-cookie";
import Card from "@mui/material/Card";

import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  TextField,
} from "@material-ui/core";

import "./Create.css";
import { useHistory } from "react-router";
import { Container } from "@mui/material";

const Create = () => {
  const history = useHistory();

  const Totaltags = [
    "hi",
    "webd",
    "compitative",
    "cse",
    "ipl",
    "chess",
    "india",
    "china",
  ];

  const newUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [query, setquery] = useState("");
  const [result, setResult] = useState({ Finalquery: "", Finaltags: [] });
  const [tags, setTags] = useState([]);
  const [loadingQuestion, setLoader] = useState(false);
  const [status, setStatus] = useState("");

  const removeAllTags = () => {
    setTags([]);
  };

  const makeRequest = async () => {
    // Make request to backend
    const cookies = new Cookies();
    const token = cookies.get("idToken");
    const res = await fetch("http://localhost:5000/question", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        question: query,
        email: user.email,
        tags,
      }),
    });
    const data = await res.json();
    setTimeout(() => {
      setResult((preState) => ({
        ...preState,
        Finalquery: query,
        Finaltags: tags,
      }));
      removeAllTags(result.Finaltags);
      setquery("");
    }, 0);
    if (data.error === undefined) {
      setTimeout(() => {
        setLoader(false);
        setStatus("Success");
      }, 0);
    } else {
      setStatus("Failure");
    }
  };

  useEffect(() => {
    if (user !== {}) {
      console.log(newUser);
      setUser(newUser);
    }
    console.log(result);
    if (status != "") {
      setTimeout(() => {
        setStatus("");
      }, 2000);
    }
  }, [user, result, history]);

  const handleSubmit = (e) => {
    if (query === "") return;
    e.preventDefault();
    setLoader(true);
    makeRequest();
    history.push("/");
  };

  const handleQuery = (e) => {
    setquery(e.target.value);
  };

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  return (
    <Container>
      <Paper elevation={15} sx={{ minHeight: 750 }}>
        <Container>
          <CssBaseline />

          <Typography variant="h4" align="center" component="h1" gutterBottom>
            Raise A New Question
          </Typography>
          <Typography variant="h5" align="center" component="h2" gutterBottom>
            Ask Query
          </Typography>
          <Typography paragraph align="center">
            Add Tags to your Question for Better Reach
          </Typography>

          <Paper style={{ padding: 16 }}>
            <form>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item sm={12} xs={12}>
                  <TextField
                    required
                    error={query === ""}
                    helperText={query === "" ? "Cannot be left empty!" : " "}
                    label="Note"
                    type="text"
                    value={query}
                    onChange={handleQuery}
                    fullWidth
                    autoFocus
                    multiline
                    placeholder="Ask Your Question Here"
                  />
                </Grid>

                <Grid item xs={12} style={{ marginTop: 36 }}>
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={12}>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, marginLeft: 2 }}
                      >
                        Your Tags
                      </Typography>
                      <Card
                        sx={{ minHeight: 400, marginTop: 2, minWidth: 300 }}
                      >
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
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, marginLeft: 2 }}
                      >
                        Total Tags
                      </Typography>
                      <Card sx={{ minHeight: 400, marginTop: 2 }}>
                        <ul id="tags">
                          {Totaltags.map((tag, index) => (
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
                  </Grid>
                </Grid>

                <Grid item style={{ marginTop: 10 }}>
                  <div
                    style={{
                      color: status == "Success" ? "green" : "red",
                      paddingBottom: "5px",
                    }}
                  >
                    {status === "Success"
                      ? "Question posted successfully!"
                      : status === "Failure"
                      ? "Question not posted. Please retry later!"
                      : status}
                  </div>
                  {loadingQuestion === false ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={45}
                      width={45}
                      visible={true}
                    />
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Paper>
    </Container>
  );
};

export default Create;
