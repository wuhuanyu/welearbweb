
import React from "react";
import axios from 'axios';
import Typography from 'material-ui/Typography';
import CourseCard from './course_card';
import Grid from 'material-ui/Grid';
import Divider from "material-ui/Divider";
import { height } from "window-size";
class CourseGrids extends React.Component{
    constructor(){
        super();
        this.state={
            courses:[],
        }
    }

   async componentWillMount(){
        const {api}=window.context;
       let _response=await axios.get(api+'acc/tea/1/course');
       let courses=_response.data.data;
       this.setState({
           courses:courses,
       });
    }
    render(){
        let courseCards=this.state.courses.map(data=>{
            return(
                <Grid item key={data.id}>
                <CourseCard
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
                <div
                style={{height:20}}
                ></div>
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