
import React from 'react';
import axios from 'axios';
import { Launcher } from 'react-chat-window';
import { Base64 } from 'js-base64';


class Chatter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            messageList:[],
        }
    }

    addOtherMsg(msg){
        this.setState({
            messageList:[...this.state.messageList,{
                author:'them',
                type:'text',
                data:{text:msg}
            }]
        });
    }

    _onMsgSend(msg) {
        console.log('chatter ',msg);
        (async ()=>{
            await axios.post(`http://localhost:3000/api/v1/course/${this.props.courseId}/message`, {
                body:msg.data.text ,
            }, {
                headers: {
                    authorization: Base64.encode(`11:${localStorage.getItem('id')}:${localStorage.getItem('token')}`)
                }
            });
        })();
        this.setState({
            messageList:[...this.state.messageList,msg]
        });
    }


    render(){
        const courseName=this.props.title;
        return(<div>
            <Launcher
                agentProfile={{
                    teamName: courseName,
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMsgSend.bind(this)}
                messageList={this.state.messageList}
                showEmoji
            />
        </div>)
    }
}

export default Chatter;