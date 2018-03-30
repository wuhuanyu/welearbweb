import React from 'react';
import {BrowserRouter as Router ,Route} from 'react-router-dom';
import App from './App';
import CourseDetail from './components/course_detail';

export default (props)=>{
    return(
        <Router>
            <div>
                <Route path={'/'} exact component={App}/>
                <Route path={'/course/:courseId'} exact component={CourseDetail}/>
            </div>
        </Router>
    )
}