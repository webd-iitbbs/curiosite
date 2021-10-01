import React, {useEffect, useState, useRef} from "react";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Card from "@mui/material/Card";
import { Container, Grid, Paper, TextareaAutosize } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import './Post.css'

const SingleQuestion = (props) => {
  const { AuthorEmail, content, name, tags, questionData } =
    props.location.state;
    const user = useSelector(state => state.user)

  const { id } = useParams()
  const [answers, setAnswers] = useState([])
  const [initRequest, setRequestStatus] = useState(false)
  const textInput = useRef(null)

  const cookie = new Cookies()
  const idToken = cookie.get('idToken')

  const requestAnswers = async () => {
    const questionId = id
    const res = await fetch('http://localhost:5000/question_answers?id='+questionId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+idToken,
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = await res.json()
    // Handle errors
    const newAnswers = []
    data.answers.forEach(answer => {
        const ans = {
            author: answer.author.email,
            content: answer.content
        }
        newAnswers.push(ans)
    });
    setAnswers(newAnswers)
    setRequestStatus(true)
  }
  useEffect(() => {
      if(initRequest === false)
      {
        requestAnswers()
      }
  })

  const AnsArray = [
    { author: "Akash", content: "Karnatak" },
    { author: "Khushi", content: "Kotdwara" },
    { author: "Prakash", content: "Hydrabad" },
    { author: "Adi", content: "Roorkee" },
    { author: "Happy", content: "Punjab" },
    { author: "Aman", content: "UK" },
  ];

  const submitAnswer = async content => {
      const res = await fetch('http://localhost:5000/answer', {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer '+idToken,
              'Content-type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              email: user.email,
              question: id,
              answer: content
          })
      })
      const data = await res.json()
      // Handle error
      const newAnswers = [...answers]
      newAnswers.push({
          author: user.email,
          content
      })
      setAnswers(newAnswers)
  }

  const handleSubmit = () => {
      const content = textInput.current.value
      if(content === "")
        return
      submitAnswer(content)
  }

  return (
    <Container>
      <Grid>
        <Grid item>
          <Card sx={{ minWidth: 650 }}>
            <CardContent>
            <Typography
                sx={{ fontSize: 15 }}
                color="text.primary"
              >
                <b>{name}</b>
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <b>{AuthorEmail}</b>
              </Typography>

              <Typography variant="h5">{content}</Typography>
              <br />
              <Typography variant="body2">{}</Typography>
              <div className="post__tags">
                {
                    tags.map((tag, index) => (
                        <a className="tag-ele" href="https://google.com" target="_blank" key={index}>
                            {tag}
                        </a>
                    ))
                }
            </div>
            </CardContent>
          </Card>
        </Grid>
        

        <Grid xs={12} sx={{ minWidth: 635, marginTop: 5 }}>
          {answers.map((ans) => (
            <Card style={{ marginBottom: 15 }}>
              <CardContent sx={{ minHeight: 50 }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                <b>{ans.author}</b>
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
              </Typography>

              <TextareaAutosize
              ref={textInput}
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
                onClick={handleSubmit}
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
