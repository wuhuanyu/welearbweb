import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu from 'material-ui/Menu';
import ListItem from 'material-ui/List';
import Button from 'material-ui/Button';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});


class Header extends React.Component {
    state = {
        anchor: 'left',
        anchorEl: null,
        
    };

    handleMenu = event => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }
    handleClose = () => {
        this.setState({
            anchorEl: null,
        })
    }

    render() {
        const { classes } = this.props;
        const { anchor, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const drawer = (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={'left'}
            >
                <div className={classes.toolbar} />
                <List>
                    {}
                    <Divider/>
                    <ListItem>
                        <Button>
                        <Typography>账户</Typography>
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        );


        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
                    >
                        <Toolbar>
                            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton> */}
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                我们爱学习
            </Typography>
                            {(
                                <div style={{position:'relative'}}>
                                    <IconButton
                                        aria-owns={'menu-appbar'}
                                        aria-haspopup="true"
                                        style={{position:'absoulte',right:'-1000px'}}
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem >我的资料</MenuItem>
                                        <MenuItem >我的账户</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>

                    </AppBar>
                    {drawer}
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Typography>Content</Typography>
                    </main>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);