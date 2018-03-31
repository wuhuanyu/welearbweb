import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';
const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 180,
  },
};

function CourseCard(props) {
  const { classes } = props;
  const {imageSrc,description,name,courseId}=props;

  return (
    <div>
      <Card className={classes.card}  >
        <CardMedia
          className={classes.media}
          image={imageSrc}
          title={name}
          />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
          {name}
          </Typography>
          <Typography component="p">
          {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            分享
          </Button>
          <Link
            to={`/course/${courseId}`}
            style={{textDecoration:'none'}}
          >
          <Button size="small" color="primary">
          详细
          </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseCard);