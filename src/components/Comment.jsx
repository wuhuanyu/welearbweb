import React from 'react';
import PropTypes from 'prop-types';
import {ListItem,ListItemText,ListSubheader} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const Comment=(props)=>{
    const {id,avatar,time,body,author}=props;
    return(
        <ListItem>
            <Avatar src={`http://localhost:3000/avatars/${avatar}`} alt={`avatar for ${id}`}/>
            <ListItemText>{body}</ListItemText>
            <ListSubheader>{author}</ListSubheader>
        </ListItem>
    )
}

Comment.propTypes={
    id:PropTypes.string.isRequired,
    avatar:PropTypes.string.isRequired,
    time:PropTypes.number.isRequired,
    body:PropTypes.string.isRequired,
    author:PropTypes.string.isRequired,
}

export default Comment;
