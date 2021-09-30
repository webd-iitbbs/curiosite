import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import InputOption from "./InputOption";
import "./Post.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import { Link } from "react-router-dom";
import SingleQuestion from "./SingleQuestion";

const Post = ({ questionData }) => {
  const AuthorEmail = questionData.author.email;
  const { content, tags } = questionData;
  const name = `${questionData.author.firstName}  ${questionData.author.lastName}`;

  const id = questionData._id;

  const newTo = {
    pathname: `/singleQuestion/${id}`,
    state: {
      AuthorEmail: AuthorEmail,
      content: content,
      tags: tags,
      name: name,
      questionData: questionData,
    },
  };
  console.log(newTo);
  return (
    <Link to={newTo}>
      <div className="Post">
        <div className="post__header">
          <Avatar />
          <div className="post__info">
            <h2>{name}</h2>
            <p>{AuthorEmail}</p>
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
    </Link>
  );
};
export default Post;
