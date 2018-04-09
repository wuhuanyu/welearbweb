import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentList from './CommentList';
class CommentsBoard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            commentData:[],
            next:-1,
        }
    }

    async componentWillMount(){
        const {courseId}=this.props;
        let _response=await axios.get(`http://localhost:3000/api/v1/course/${courseId}/comment`);
        let commentData=_response.data.data;
        let next=_response.data.next;
        this.setState(prv=>{
            return {
                commentData:[...prv.commentData,...commentData],
                next:next,
            }
        })
    }

    render(){
        return ((this.state.commentData.length!==0)&&
            <CommentList  commentData={this.state.commentData}/>
        );
    }
}

CommentsBoard.PropTypes={
    courseId:PropTypes.string.isRequired,
}

export default CommentsBoard;

