import React from 'react';

class CourseDetail extends React.Component{
    constructor(){
        super();
        this.state={
            course_id:-1
        }
    };

    componentWillMount(){
        const course_id=this.props.match.params['courseId'];
        this.setState({
            course_id:course_id,
        });
    }
    render(){
        return(
            <div>
                {`this is course:${this.state.course_id}`}
            </div>
        )
    }
}

export default CourseDetail;