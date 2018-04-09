import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Launcher } from 'react-chat-window';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import { DateTimePicker } from 'material-ui-pickers';
import DropzoneComponent from 'react-dropzone-component';
import { Base64 } from 'js-base64';
import Blank from './Blank';
import * as Constants from '../constants';

function paramName() {
    return 'upload';
}
class HomeworkUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            body: null,
        }
        this.eventHandlers = {
            init:dz=>this.dropzone=dz,
            addedfile: (file) => console.log(file)
        };

        this.componentConfig = {
            postUrl:`http://localhost:3000/api/v1/course/${props.courseId}/question`,
            // iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,

    }
    }

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date,
        });
    };

    upload(){
        this.dropzone.processQueue();
    }


    render() {
        let selectedDate = this.state.selectedDate;
        return (
            <div>
                <Typography variant='display2'>
                    Homework
                </Typography>
                <Blank />
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
                        onChange={(e)=>this.setState({body:e.target.value})}
                    />
                    <DropzoneComponent
                        config={this.componentConfig}
                        eventHandlers={this.eventHandlers}
                        djsConfig={{
                            autoProcessQueue: false,
                            parallelUploads:5,
                            addRemoveLinks: true,
                            uploadMultiple:true,
                            maxFiles:5,
                            paramName:paramName,
                            params:{
                                type:Constants.QA,
                                body:this.state.body,
                            },
                            headers:{
                                authorization:Base64.encode(`11:${localStorage.getItem("id")}:${localStorage.getItem("token")}`)
                            }
                        }} />
                </Card>

                <Blank />
                <Button variant="raised" color="primary">
                    Cancel
                </Button>
                <Button variant="raised" color="primary" style={{ marginLeft: 20 }} onClick={this.upload.bind(this)}>
                    Upload
                </Button>
            </div>
        )
    }
}

export default HomeworkUploader;