import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Grid from 'material-ui/Grid';
import CourseCard from './course_card';
import axios from 'axios';
import { Launcher } from 'react-chat-window';
import BulletinList from './bulletin_list';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import { DateTimePicker } from 'material-ui-pickers';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import DropzoneComponent from 'react-dropzone-component';
import {Base64} from 'js-base64';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const Blank = (props) => (
    <div style={{ height: 10 }}>
    </div>
)
class HomeworkUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            body: null,
        }
        this.eventHandlers = {
            addedfile: (file) => console.log(file),
        }
        this.djsConfig = {
            autoProcessQueue: false,
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif"
        }
        this.componentConfig = {
            postUrl: 'no',
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
        }
    }

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date,
            body: null,
        });
    }


    render() {
        let selectedDate = this.state.selectedDate;
        return (
            <div>
                <Card style={{ padding: 10 }}>
                    <React.Fragment>
                        <div className="picker">
                            <DateTimePicker
                                fullWidth
                                value={selectedDate}
                                disablePast
                                ampm={false}
                                onChange={this.handleDateChange}
                                label="Deadline"
                            />
                        </div>
                    </React.Fragment>
                    <TextField
                        label="Homework body"
                        multiline
                        rows="10"
                        margin="normal"
                        fullWidth
                    />
                    <DropzoneComponent
                        config={this.componentConfig}
                        eventHandlers={this.eventHandlers}
                        djsConfig={this.djsConfig} />
                </Card>

                <Blank />
                <Button variant="raised" color="primary">
                    Cancel
                    </Button>
                <Button variant="raised" color="primary" style={{ marginLeft: 20 }}>
                    Upload
                    </Button>
            </div>
        )
    }

}

class CourseDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            course_id: -1,
            course: null,
            messageList: [],

            bulletinData: [


            ],
            bulletinDialog: false,
            newBulletin: null,
        }
    };

    _onHandlerAddBulletin() {
        this.setState(prv => {
            return {
                bulletinDialog: !prv.bulletinDialog,
            }
        })
    }
    _onMsgSend(msg) {
        this.setState(prv => {
            return {
                messageList: [...prv.messageList, msg]
            }
        });
    }

    _publishBulletin() {
        console.log(this.state.newBulletin);
        let newBulletin = this.state.newBulletin;
        (async () => {
            let _response = await axios.post(`http://localhost:3000/api/v1/course/${this.props.match.params['courseId']}/bulletin`,
                {
                    body: newBulletin,
                }, {
                    //TODO: check login
                    headers: {
                        authorization: Base64.encode(`11:${localStorage.getItem('id')}:${localStorage.getItem('token')}`)
                    }
                }
            )
            console.log(_response.data);
            if(_response.status===200){
                await this.refreshBulletin();
            }
        }
        )();
    }

    _sendMsg(text) {
        this.setState(prv => {
            return {
                messageList: [...prv.messageList, {
                    author: 'Me',
                    type: 'text',
                    data: { text }
                }]
            }
        })
    }
    
    async refreshBulletin(){
        const course_id = this.props.match.params['courseId'];
        
        let _bulletinRes = await axios.get(`http://localhost:3000/api/v1/course/${course_id}/bulletin`);
        this.setState({
            bulletinData: _bulletinRes.data.data.map(bulletin => {
                // let localDate=
                bulletin.publish_time = (new Date(bulletin.publish_time).toLocaleDateString());
                return bulletin;
            })

        });
    }

    async componentWillMount() {
        const course_id = this.props.match.params['courseId'];
        this.setState({
            course_id: course_id,
        });
        let _response = await axios.get(`http://localhost:3000/api/v1/course/${course_id}`);
        let course = _response.data.data;
        let _bulletinRes = await axios.get(`http://localhost:3000/api/v1/course/${course_id}/bulletin`);

        this.setState({
            course: course,
            bulletinData: _bulletinRes.data.data.map(bulletin => {
                // let localDate=
                bulletin.publish_time = (new Date(bulletin.publish_time).toLocaleDateString());
                return bulletin;
            })
        });
    }
    render() {
        const { classes } = this.props;
        const { course, bulletinData } = this.state;

        return (course && (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            我们爱学习
                  </Typography>
                        <Button color="inherit">
                            Home
                  </Button>
                    </Toolbar>
                </AppBar>
                <div>
                    <Blank />
                    <Grid container spacing={24} direction='row'>
                        <Grid item xs={3}>
                            <CourseCard
                                name={course.name}
                                description={course.desc}
                                courseId={course.id}
                                imageSrc={"http://localhost:3000/images/" + course.images[0]}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='display2'>
                                {'公告牌'}
                            </Typography>
                            <Blank />
                            <BulletinList bulletinData={bulletinData} avatar={"http://localhost:3000/images/" + course.images[0]} />
                            <Blank />
                            <Button variant='fab' color="primary" aria-label="add" onClick={this._onHandlerAddBulletin.bind(this)}>
                                <AddIcon />
                            </Button>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography variant='display2'>
                                Homework
                        </Typography>
                            <Blank />
                            <HomeworkUploader />
                        </Grid>

                        <Dialog
                            open={this.state.bulletinDialog} onClose={() => { this.setState({ bulletinDialog: false }) }}>
                            <DialogTitle>{'发布公告'}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {'公告发布后无法撤回,公告发出后，可能会存在延迟，但网页会自动更新'}
                                </DialogContentText>
                                <TextField autoFocus margin="dense" id="body" label="新公告" fullWidth onChange={(e) => {
                                    this.setState({
                                        newBulletin: e.target.value,
                                    })
                                }} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.setState({ bulletinDialog: false })}>
                                    取消
                             </Button>
                                <Button onClick={() => {
                                    this._publishBulletin();
                                    this.setState({ bulletinDialog: false, newBulletin: false });
                                }
                                }>
                                    发布
                             </Button>
                            </DialogActions>
                        </Dialog>

                        <Launcher
                            agentProfile={{
                                teamName: course.name,
                                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                            }}
                            onMessageWasSent={this._onMsgSend.bind(this)}
                            messageList={this.state.messageList}
                            showEmoji
                        />
                    </Grid>
                </div>
            </div>
        ));
    }
}





export default withStyles(styles)(CourseDetail);


// class HomeworkUploader extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     uploadHandler(detail) {
//         //deadline body
//         const { uploadHandler } = this.props;
//         uploadHandler(detail);
//         // let {deadline,body}=detail;

//     }
//     render() {
//         const { uploadConfig } = this.props;
//         return (<div>
//             <HomeworkUploader uploadHandler={this.uploadHandler.bind(this)} />
//             <DropzoneComponent config={uploadConfig.config} eventHandlers={uploadConfig.eventHandlers} djsConfig={uploadConfig.djsConfig} />
//         </div>)
//     }

// }




