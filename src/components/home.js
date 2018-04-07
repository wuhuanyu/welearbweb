import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { Categories } from '../tileData';
import CourseGrids from './courses';
import Button from 'material-ui/Button';
import ReactMaterialNotifications from 'react-materialui-notifications';
import Message from 'material-ui-icons/Message';
import Dialog, { DialogContent, DialogTitle, DialogContentText, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Base64 } from 'js-base64';

const NotificationSystem = require('react-notification-system');
const drawerWidth = 240;
const mqtt=require('mqtt');
// const mqttClient=require('../global').mqtt;



const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Home extends React.Component {
  _notificationSystem = null

  constructor() {
    super();
    this.state = {
      open: false,
      siderBarIdx: 0,
      haveLogin: false,
      loginForm: false,

      subscribe: [],
      heartbeatId: null,
    }
  }

  _subscribeHandler(ids) {
    this.setState({
      subscribe: ids,
    });
    let mqtt = window.mqttClient;
    ids.forEach(id => mqtt.subscribe('' + id));
    // mqtt.subscribe()
  }


  _showNotification(msg) {
    let m = `You've got New Message to ${msg['course_name']} \n ${msg['body']}`
    toast.info(m, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT
    });

  }
  _dispatchMessage(msg) {

    this._showNotification(JSON.parse(msg)['payload']);
  }

  async _doLogout() {
    await axios.post('http://localhost:3000/api/v1/acc', {
        name: localStorage.getItem('username'),
        password: localStorage.getItem("password"),
        type: 11,
        action: 'logout',
    });

    sessionStorage.clear();
    localStorage.clear();
    if (this.state.heartbeatId) {
      clearInterval(this.state.heartbeatId);
    }
    this.setState({
      haveLogin: false,
      username: null,
      password: null,
      id: null,
    });
  }


  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount() {
    this._doLogin();

    let client = mqtt.connect({
      hostname:'localhost',
      port:9001,
      path:'/mqtt',
    });
    client.on('connect', () => {
      console.log('client connect to mqtt');
    });
    client.on('message', (topic, data) => {
      this._dispatchMessage(data.toString());
    })
    window.mqttClient = client;

  }
  componentWillUnmount() {
    console.log('home will unmount');
    let client = window.mqttClient;
    this.state.subscribe.forEach(id => client.unsubscribe('' + id));
    window.mqttClient.end(()=>{
      console.log('mqttt client disconnnect');
    }
  );}

  _handleLoginForm() {
    if (this.state.haveLogin) {
      (async () => {
        await this._doLogout();
      })();
      this.setState({
        haveLogin: false,
      })
      return;
    }
    this.setState(prv => {
      return {
        loginForm: !prv.loginForm,
      }
    })
  }

  _doLogin() {

    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    if (username && password) {

      (async () => {
        try {
          let _response = await axios.post('http://localhost:3000/api/v1/acc', {
            name: username,
            password: password,
            type: 11,
            action: 'login',
          });
          let token = _response.data.token, id = +(_response.data.id);
       
          localStorage.setItem('token', token);
          localStorage.setItem('id', id);
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          let refreshTokenId = setInterval(async () => {
            await axios.get('http://localhost:3000/api/v1/heartbeat', {
              headers: {
                'authorization': Base64.encode(`11:${id}:${token}`)
              }
            });
          }, 25 * 60 * 1000);
          this.setState({
            heartbeatId: refreshTokenId,
            haveLogin:true,
          });
        } catch (error) {
          alert('wrong');
        }

      })();
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  siderBarHandler = (idx) => {
    this.setState({
      siderBarIdx: idx,
    });
  }
  _loginFormClose() {
    this.setState({
      loginForm: false,
    })
  }

  getCurrentContent = () => {
    //for placeholder
    const { siderBarIdx } = this.state;
    let placeholder = (<div>
      PlaceHolder+{siderBarIdx}
    </div>);

    let content;
    switch (siderBarIdx) {
      case 0: content = <CourseGrids subscribeHandler={this._subscribeHandler.bind(this)} />; break;
      default: content = placeholder; break;
      // case 1: content=placeholder;break;
    }
    return content;
  }


  render() {
    const { classes, theme } = this.props;
    const { haveLogin } = this.state;

    return (
      <div className={classes.root}>
        {/* <NotificationSystem ref="notificationSystem"/> */}
        <ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              我们爱学习
            </Typography>
            <Button color="inherit" onClick={this._handleLoginForm.bind(this)}>{haveLogin ? 'Logout' : 'Login'}</Button>

            {/* Diglog
              * login form dialog
             */}
            <Dialog open={this.state.loginForm} onClose={this._loginFormClose.bind(this)} aria-labelledby="form-dialog-title">
              <DialogTitle id="login-form-title">Login</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please Login first,make sure you are a teacher! Student login is not allowed!
               </DialogContentText>
                <TextField autoFocus margin="dense" id="username" label="User Name" type="text" fullWidth onChange={(e) => this.setState({ username: e.target.value })} />
                <TextField autoFocus margin="dense" id="password" label="Password" type="password" fullWidth onChange={(e) => this.setState({ password: e.target.value })} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this._loginFormClose.bind(this)} color="primary">
                  Cancel
               </Button>
                <Button onClick={() => {
                  localStorage.setItem('username', this.state.username);
                  localStorage.setItem('password', this.state.password);
                  this._doLogin.bind(this)();
                  this._loginFormClose.bind(this)();
                }}>
                  Login
               </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>

        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <Divider />
          <List>
            <Categories handler={this.siderBarHandler.bind(this)} />
          </List>
          <Divider />

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.haveLogin&&(this.getCurrentContent())}
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);
