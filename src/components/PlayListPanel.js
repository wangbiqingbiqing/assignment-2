import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Paper from "@material-ui/core/Paper/Paper";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core/styles/index";
import Shuffle from '@material-ui/icons/Shuffle';
import React, {Component} from 'react';
import Link from "react-router-dom/Link";
import SongListTable from "./ListTable";

const styles = {
  panelPosition: {
    position: 'absolute',
    top: '68px',
    bottom: '68px',
    width: '83%',
    overflowY: 'auto'
  },
  margin: {
    marginTop: '50px'
  },
  link:{
    textDecoration: 'none'
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
    let message = '';
    if (this.props.playlist.length === 0) {
      message = 'Opps, no song in this playlist. You can shuffle other lists!';
    }
    if (!this.props.isLoggedIn) {
      message = 'Please log in before shuffle play!';
    }

    return (
      <React.Fragment>
        <div className={classes.panelPosition}>
          <Grid container spacing={8} justify="center"
                alignItems="center" className={classes.margin}>
            <Grid item xs={10}>
              <Typography variant="h5" gutterBottom>
                {this.props.playlistName}
                {this.props.playlist.length === 0 ? null :
                  <IconButton color="inherit">
                    <Link to="/peeklist" className={classes.link}>
                      <Tooltip title="Shuffle this playlist" placement="right">
                        <Shuffle onClick={this.shufflePlaylist}/>
                      </Tooltip>
                    </Link>
                  </IconButton>
                }
              </Typography>

            </Grid>
            <Grid item xs={10}>
              <div>{message}</div>
            </Grid>
            {
              this.props.playlist.length !== 0 &&
              <Grid item xs={10}>
                <Paper>
                  <SongListTable data={this.props.playlist} isPeekList={false} displayNum={this.props.playlist.length}/>
                </Paper>
              </Grid>
            }
          </Grid>
        </div>
      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PlayListPanel)