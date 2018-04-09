
import React from "react";
import axios from 'axios';
import Typography from 'material-ui/Typography';
import Course from './Course';
import Grid from 'material-ui/Grid';
import Blank from './Blank';
class CourseGrids extends React.Component{
    constructor(){
        super();
        this.state={
            courses:[],
        }
    }

   async componentWillMount(){
        const {api}=window.context;

        const {subscribeHandler}=this.props;
      let _response=await axios.get(api+`acc/tea/${localStorage.getItem('id')}/course`);
       let courses=_response.data.data;
       subscribeHandler(courses.map(c=>c['id']));
      this.setState({
           courses:courses,
       });

       
    }
    render(){
        let courseCards=this.state.courses.map(data=>{
            return(
                <Grid item key={data.id}>
                <Course
                  courseId={data.id}
                  name={data.name}
                  description={data.desc}
                  imageSrc={data.images&&data.images.length>0? (window.context.image_api+data.images[0]):null}
                />
                </Grid>
            );
        })
        return(
            <div>
                <Typography variant='display1' >
                    {'我教授的课程'}
                </Typography>
                <Blank />
                <Grid 
                container
                justify="center"
                spacing={16}
                >
                {courseCards}
                </Grid>
           </div>
        )
    }
}

export default CourseGrids;