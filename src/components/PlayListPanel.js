import Grid from "@material-ui/core/es/Grid/Grid";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import {withStyles} from "@material-ui/core/styles/index";
import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";
import SongListTable from "./ListTable";
import Shuffle from '@material-ui/icons/Shuffle';

const styles = {
  margin: {
    marginTop: '5%'
  }
};

class PlayListPanel extends Component {
  constructor(props) {
    super(props);
    this.shufflePlaylist = this.shufflePlaylist.bind(this);
  }

  shufflePlaylist() {
    if (this.props.isLoggedIn) {
      this.props.shufflePlaylist();
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={8} justify="center"
              alignItems="center" className={classes.margin}>
          <Grid item xs={10}>
            <Typography variant="h5" gutterBottom>
              Playlist
            </Typography>
          </Grid>
          {this.props.playlist.length === 0 ? null :
            <Grid item xs={10}>
              <div style={{float: 'right'}}>
                <IconButton color="inherit">
                  <Link to="/peeklist" style={{textDecoration: 'none'}}>
                    <Shuffle onClick={this.shufflePlaylist}/>
                  </Link>
                </IconButton>
              </div>
            </Grid>
          }
          {
            this.props.playlist.length === 0 ?
              <div>Opps, no song in this playlist. You can shuffle other lists!</div> :
              <Grid item xs={10}>
                <Paper>
                  <SongListTable data={this.props.playlist} isPeekList={false} displayNum={this.props.playlist.length}/>
                </Paper>
              </Grid>
          }
        </Grid>
      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PlayListPanel)