import { Avatar } from '@material-ui/core';
import React ,{forwardRef}from 'react'
import InputOption from './InputOption';
import "./Post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';


const Post = forwardRef(({name,description,author,message,photoUrl,content,tagList},ref) => {
    return (
        <a href="/CreatePost">
        <div ref={ref} className="Post">
            <div className="post__header">
                <Avatar/>
                <div className="post__info">
                    <h2>{author}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="post__body">
                {/* <p>{message}</p> */}
                <p>{content}</p>
            </div>
            <div className="post__buttons">
                    {/* <InputOption Icon={ThumbUpAltIcon}  title="Like" color="gray"/> 
                    <InputOption Icon={ChatOutlinedIcon}  title="Comment" color="gray"/> */}
            </div>
        </div>
        </a>
    )
}
)
export default Post;