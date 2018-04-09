import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import axios from 'axios';
import { Launcher } from 'react-chat-window';
import BulletinList from './BulletinList'
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import { Base64 } from 'js-base64';
import Blank from './Blank';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';


class BulletinBoard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bulletins:[],
            bulletinDialog:false,
            newBulletin:'',
        }
    }

    async _loadBulletin(){

        const course_id =this.props.course.id;

        let _bulletinRes = await axios.get(`http://localhost:3000/api/v1/course/${course_id}/bulletin`);
        this.setState({
            bulletins: _bulletinRes.data.data.map(bulletin => {
                bulletin.publish_time = (new Date(bulletin.publish_time).toLocaleDateString());
                return bulletin;
            })
        });
    }

    async componentWillMount(){
        await this._loadBulletin();
    }

    _toggleDialog(open){
        this.setState({
            bulletinDialog:open
        })
    }

    _addBulletin(){
        let newBulletin = this.state.newBulletin;
        const {course}=this.props;
        (async () => {
                let _response = await axios.post(`http://localhost:3000/api/v1/course/${course.id}/bulletin`,
                    {
                        body: newBulletin,
                    }, {
                        //TODO: check login
                        headers: {
                            authorization: Base64.encode(`11:${localStorage.getItem('id')}:${localStorage.getItem('token')}`)
                        }
                    }
                );

                if (_response.status === 200) {
                    alert("bulletin send ok");
                    await this._loadBulletin();
                }
            }
        )();
    }

    _reset(){
        this.setState({
            bulletinDialog:false,
            newBulletin:'',
        });
    }


    render(){
        const {course}=this.props;
        return (course&&(<div>
            <Typography variant='display2'>
                {'公告牌'}
            </Typography>
            <Blank />
            <BulletinList bulletinData={this.state.bulletins} avatar={"http://localhost:3000/images/" + course.images[0]} />
            <Blank />
            <Button variant='fab' color="primary" aria-label="add" onClick={()=>this._toggleDialog(true)}>
                <AddIcon />
            </Button>

            <Dialog
                open={this.state.bulletinDialog} onClose={()=>this._toggleDialog(false)}>
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
                    <Button onClick={this._reset.bind(this)}>
                        取消
                    </Button>
                    <Button onClick={() => {
                        this._addBulletin();
                        this._reset();
                    }
                    }>
                        发布
                    </Button>
                </DialogActions>
            </Dialog>
        </div>))
    }
}


export default BulletinBoard;


