import { Button, TextField } from "@mui/material";
import react, { useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Typography, TextField, Button } from "@mui/material"; (in tutorial but might not be in our project)

// import useStyles from './styles' (in tutorial but might not be in our project)

const CommentSection = () => {
    
    const [comments, setComments] = useState([1, 2, 3, 4]);
    const [comment, setComment] = useState('');

    const currentUser = useSelector((state) => state.user.value);

    const handleClick = () => {

        //const finalComment = `${currentUser.username}: ${comment}`; commented for now, work on this

        //dispatch(commentPost(finalComment)) commented for now, work on this
    };

    return (
        <div>
            <div className="commentsOuterContainer" style = {{ display: 'flex', justifyContent: 'space-between'}}>
                <div className="commentsInnerContainer" style = {{ height: '200px', overflowY: 'auto', marginRight: '30px' }}>
                    <h1>Comments</h1>
                    {comments.map((c, i) => (
                        <h2 key = {i}>
                            Comment {i}
                        </h2>
                    ))}
                </div>
                <div style={{ width: '70%' }}>
                        <h2>
                            Write a Comment
                        </h2>
                        <TextField 
                            fullWidth
                            rows = {4}
                            variant = 'outlined'
                            label = 'Comment'
                            multiline
                            value = {comment}
                            onChange = {(e) => setComment(e.target.value)}
                        />
                        <Button style = {{ marginTop: '10px' }} fullWidth disabled = {!comment} variant = 'contained' onClick = {handleClick}>
                            Comment
                        </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;