import React from 'react';
import Comment from './Comment';
import List from 'material-ui/List';

const CommentList=(props)=>{
    const {commentData}=props;
    const comments=commentData.map(comment=>(
        <Comment key={comment.id} id={comment.id} author={comment.author} avatar={comment.avatar} time={comment.time} body={comment.body} />
    ))
    return(
       <List>
           {comments}
       </List>
    )
};

export default CommentList;
