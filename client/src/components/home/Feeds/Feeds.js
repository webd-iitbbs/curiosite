import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import InfiniteScroll from 'react-infinite-scroller'
import "./Feed.css";
import Post from './Post';

import { setToHome, setToFollows } from '../../../actions/feedStatusActions'

import Spinner from 'react-loader-spinner';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
        root: {
                padding: "2px 4px",
                display: "column",
                alignItems: "center",
                maxWidth: 4000,
                marginLeft: theme.spacing(1)
        },
}));


export default function Feeds(props) {

        const [feedState, modifyFeedState] = useState({
                feedList: [],
                skipPage: 0,
                tagsQuestionListSaturated: false,
                totalQuestionListSaturated: false,
                feedFetchDateTime: (new Date()).getTime()
        })
        const feed = useSelector(state => state.feed)
        //Add loading state

        const idToken = (new Cookies()).get('idToken')

        const createFollowsFeed = async () => {
                const fetchUri = 'http://localhost:5000/follows_questions?limit=5&skip=' + feedState.skipPage + '&date=' + feedState.feedFetchDateTime
                const res = await fetch(fetchUri, {
                        method: 'POST',
                        headers: {
                                'Authorization': 'Bearer ' + idToken,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                                tags: [],
                                tagsQuestionListSaturated: feedState.tagsQuestionListSaturated
                        })
                })
                const data = await res.json()
                if (!data.error) {
                        const newFeedState = { ...feedState }
                        newFeedState.tagsQuestionListSaturated = data.tagsQuestionListSaturated
                        newFeedState.totalQuestionListSaturated = data.totalQuestionListSaturated
                        if (data.questionList.length !== 0)
                                newFeedState.feedFetchDateTime = data.questionList[data.questionList.length - 1].creationTime
                        newFeedState.feedList = newFeedState.feedList.concat(data.questionList)
                        modifyFeedState(newFeedState)
                }
                else {
                        //Handle error
                        //If unauthenticated redirect to login page
                }
        }

        const createFeed = () => {
            createFollowsFeed()
        }

        const classes = useStyles();
        const loader = <div className="loader">
                <Button variant="primary" disabled>
                        <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                        />
    Loading...
  </Button>

        </div>

        return (
                <div className={classes.root}>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={createFeed}
                                hasMore={!feedState.totalQuestionListSaturated}
                                loader={loader}
                                threshold={0}
                        >
                                <div>
                                        {
                                                feedState.feedList.map((question, index) => {
                                                        return <Post
                                                                key={index}
                                                                content={question.content}
                                                                author={question.author.email}
                                                                tagList={question.tags}
                                                        />
                                                })
                                        }
                                </div>
                            </InfiniteScroll>
                </div>
        )
};