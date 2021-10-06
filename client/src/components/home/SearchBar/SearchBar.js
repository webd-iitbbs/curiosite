import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setToHome, setToSearch } from '../../../actions/feedStatusActions'
import Cookies from 'universal-cookie'
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


export default function SearchBar(props) {
    const dispatch = useDispatch()
    const classes = useStyles();

  const [search,setSearch] = useState('');
  const [query,setQuery] = useState(['WebD']);
  const [question, setQuestion] = useState({})

//   useEffect(()=>{console.log(query)},[query]);

    const fetchQuestion = async () => {
        const cookies = new Cookies()
        const idToken = cookies.get('idToken')
        const res = await fetch('http://localhost:5000/unanswered_question', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+idToken,
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const data = await res.json()
        // Handle error
        setQuestion(data.question)
    }

    useEffect(() => {
        if(JSON.stringify(question) === JSON.stringify({}))
            fetchQuestion()
    })
  
  const updateSearch = (e)=>{
    setSearch(e.target.value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const queryTags = search.split(',')
    if(search === '')
        dispatch(setToHome())
    else
        dispatch(setToSearch(queryTags))
    setQuery(queryTags);
   setSearch('');
   props.activateSearch()
   props.setSearchTags(queryTags)
  }

  return (
    <Grid container xs={12} justify="space-around"
    style={{ minHeight: '20vh', maxWidth: '100%' }} >
    
      <Grid item md={3} alignItems="center" >
        {
            JSON.stringify(question) !== JSON.stringify({})?
            <Link to={{
                pathname: `/singleQuestion/${question._id}`,
                state: {
                    AuthorEmail: question.author.email,
                    content: question.content,
                    tags: question.tags,
                    name: question.author.firstName + ' ' + question.author.lastName
                }
            }}>
                <Button
                variant="contained"
                size="large"
                    color="default"
                className={classes.margin}
                
                >
                    Random question
                </Button>
            </Link>:
            <div />
        }
      </Grid>
    </Grid>
  );
}

