// This file is shared across the demos.

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import AssignmentIcon from 'material-ui-icons/Assignment';
import FaceIcon from 'material-ui-icons/Face';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';


export const Categories =(props)=> {
    const {handler}=props;
    const Blank=(p)=>(
      <div style={{height:10}}>

      </div>
    );
    const _handler=(idx)=>{
        console.log('click '+idx);
        handler(idx);
    }
   
  return  (
  <div>
    <ListItem button onClick={()=>_handler(0)}>
      <ListItemIcon>
          <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="我的课程" />
    </ListItem>
    <Blank/>

    <ListItem button onClick={()=>_handler(1)}>
      <ListItemIcon>
        <FaceIcon/>
      </ListItemIcon>
      <ListItemText primary="聊天室" />
    </ListItem>
    <Blank/>
    <ListItem button onClick={()=>_handler(2)}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="信息发布" />
    </ListItem>
    <Blank/>
    <ListItem button onClick={()=>_handler(3)}>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="草稿" />
    </ListItem>
  </div>
);}

export const otherMailFolderListItems =(props)=> (
  <div>
    <ListItem button>
      <ListItemIcon>
          <AccountCircleIcon/>
      </ListItemIcon>
      <ListItemText primary="账户" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem> */}
  </div>
);
