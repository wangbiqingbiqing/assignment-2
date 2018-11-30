import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from "react";

const styles = {
  card: {
    position: 'relative',
    top: '200px'
  }
};
class InfoPage extends Component{
  render() {
    return (
      <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Card className={this.props.classes.card}>
            <CardContent>
              <Typography align={'center'}>
                {this.props.isLoggedIn?
                  'Welcome! Please select a playlist to shuffle!':
                  'Hi, please log in to shuffle your playlist!'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    )
  }
}
export default withStyles(styles)(InfoPage);