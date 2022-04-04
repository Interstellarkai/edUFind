import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Comments } from "../../data";
// import { Typography, TextField, Button } from "@mui/material"; (in tutorial but might not be in our project)

// import useStyles from './styles' (in tutorial but might not be in our project)
const CommentContainer = styled.div`
  margin-bottom: 10px;
  /* border-bottom: solid black 1px; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 10px;
`;
const CommentText = styled.div``;
const CommentBy = styled.div`
  font-size: 12px;
`;

const CommentSection = ({ nameOfSchool }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const currentUser = useSelector((state) => state.user.value);

  useEffect(() => {
    if (nameOfSchool) {
      if (Comments[nameOfSchool]) {
        setComments(Comments[nameOfSchool]);
      }
    }
  }, [nameOfSchool]);

  const handleClick = () => {
    if (currentUser.username) {
      console.log("HERE");
      setComments([
        ...comments,
        {
          user_id: currentUser.userId,
          name: currentUser.username,
          school_name: nameOfSchool,
          text: comment,
        },
      ]);
    } else {
      alert("Need to login to post comment!");
    }
  };

  //   console.log("COMMENTS", Comments[nameOfSchool]);
  //   console.log("SCHNAME", nameOfSchool);
  return (
    <div>
      <div
        className="commentsOuterContainer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className="commentsInnerContainer"
          style={{
            height: "200px",
            width: "400px",
            overflowY: "auto",
            marginRight: "30px",
            padding: "0 10px",
          }}
        >
          {comments.length ? (
            comments.map((i) => (
              <CommentContainer>
                <CommentText>{i.text} </CommentText>
                <CommentBy>~{i.name} </CommentBy>
              </CommentContainer>
            ))
          ) : (
            <i>Be the first to post! </i>
          )}
        </div>
        <div style={{ width: "70%" }}>
          <h2>Write a Comment</h2>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment}
            variant="contained"
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
