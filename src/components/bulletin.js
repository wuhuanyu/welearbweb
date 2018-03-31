import React from 'react';
import Typography from 'typeface-roboto';
import { ListItem,ListItemText,ListItemAvatar } from 'material-ui/List';
import { Divider } from 'material-ui';
import Avatar from 'material-ui/Avatar';

export default (props) => {
    const { id, body, publishTime,avatar} = props;
    // console
    return (
        <div key={id} style={{width:'100%',maxWidth:400}}>
            <ListItem>
                <Avatar src={avatar}/>
                <ListItemText primary={body} secondary={publishTime} />
            </ListItem>
            <Divider />
        </div>
    )
};