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
import Blank from './Blank';
import * as constants from '../constants';
import { Base64 } from 'js-base64';
import BulletinBoard from "./BulletinBoard";
import HomeworkUploader from './HomeworkUploader';
import Chatter from './Chatter';

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

class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course_id: props.match.params['courseId'],
            course: null,
        };

    };

    async componentWillMount() {
        const course_id = this.props.match.params['courseId'];
        this.mqttClient = (require('mqtt')).connect({
            hostname: 'localhost',
            port: '9001',
            path: '/mqtt',
        });
        this.mqttClient.on('connect', () => {
            console.log('in course detail mqtt client connnected ');
            this.mqttClient.subscribe(''+course_id,()=>{
                console.log('subscribe to ', course_id);
            })
        });
        this.mqttClient.on('message', (topic, payload) => {
            console.log('course_detail received a message ',payload.toString());
            let content=JSON.parse(payload.toString());
            switch (content['type']){
                case  constants.new_message:{
                    let msgContent=content['payload'];
                    if(+(msgContent['sender_id'])===+(localStorage.getItem("id"))&&+(msgContent['type'])===constants.ACC_T_Tea){
                        return;
                    }
                    this.chatter.addOtherMsg(msgContent['body']);
                }
            }
        });

        let _response = await axios.get(`http://localhost:3000/api/v1/course/${course_id}`);
        let course = _response.data.data;
        this.setState({
            course: course,
        });
    }
    render() {
        const { classes } = this.props;
        const { course,courseId} = this.state;

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
                            <BulletinBoard course={this.state.course}/>
                        </Grid>

                        <Grid item xs={5}>
                            <HomeworkUploader />
                        </Grid>
                        <Chatter
                            ref={instance=>this.chatter=instance}
                            title={this.state.course.name}
                            courseId={this.state.course.id}/>
                    </Grid>
                </div>
            </div>
        ));
    }
}





export default withStyles(styles)(CourseDetail);



