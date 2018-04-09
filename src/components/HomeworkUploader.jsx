import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import axios from 'axios';
import { Launcher } from 'react-chat-window';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import { DateTimePicker } from 'material-ui-pickers';
import DropzoneComponent from 'react-dropzone-component';
import { Base64 } from 'js-base64';
import Blank from './Blank';
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

export default HomeworkUploader;