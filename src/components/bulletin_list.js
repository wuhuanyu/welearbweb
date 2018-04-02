import React from 'react';
import Bulletin from './bulletin';
import { withStyles } from 'material-ui/styles';
import { List, Card } from 'material-ui';
const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    }
});
class BulletinList extends React.Component {
    constructor() {
        super();
    }

    render() {
        let { bulletinData, classes,avatar } = this.props;
        let bulletins = bulletinData.map(bulletin => {
            return (
                <Bulletin key={bulletin.id} body={bulletin.body} publishTime={bulletin.publish_time} avatar={avatar} />
            )
        });
        return (
            <div className={classes.root}>
            <Card>
            <List>
                {bulletins}
            </List>
            </Card>
            </div>
        );
    }
}

export default withStyles(styles)(BulletinList);