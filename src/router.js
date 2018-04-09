import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import CourseDetail from './components/CourseDetail';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

export default (props) => {
    return (

        <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
            <Switch>
                <Route path={'/'} exact component={App} />
                <Route path={'/course/:courseId'} exact component={CourseDetail} />
            </Switch>
</Router>

        </MuiPickersUtilsProvider>
    )
}