import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Paper from "@material-ui/core/Paper/Paper";
import {withStyles} from "@material-ui/core/styles/index";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import Shuffle from '@material-ui/icons/Shuffle';
import React, {Component} from 'react';
import {SONG_KEY} from "../constants/keys";
import ListTable from "./ListTable";

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
  textField: {
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '10px'
  },
  peekNum: {
    float: 'right'
  }
};

class PeekQueuePanel extends Component {

  render() {
    const {classes} = this.props;
    const peekNum = this.props.peekNum;
    let message = '';
    if (!this.props.playlistName || this.props.peekList.length === 0) {
      message = 'Please select a playlist to shuffle';
    }
    if (!this.props.isLoggedIn) {
      message = 'Please log in before shuffle play';
    }
    return (
      <React.Fragment>
        <div className={classes.panelPosition}>
          <Grid container spacing={8} justify="center"
                alignItems="center" className={classes.margin}>
            <Grid item xs={10}>
              <Typography variant="h5" gutterBottom>
                Play Queue
                {this.props.peekList.length === 0 ? null :
                  <IconButton color="inherit">
                    <Tooltip title="Reshuffle the playing queue" placement="right">
                      <Shuffle onClick={this.props.reshufflePlaylist}/>
                    </Tooltip>
                  </IconButton>}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <div>
                Now Playing
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{}</TableCell>
                        <TableCell>{SONG_KEY.SONG_NAME}</TableCell>
                        <TableCell>{SONG_KEY.ARTIST}</TableCell>
                        <TableCell>{SONG_KEY.ALBUM}</TableCell>
                        <TableCell>{SONG_KEY.TIME}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{}</TableCell>
                        <TableCell>{this.props.currentSong.songName}</TableCell>
                        <TableCell>{this.props.currentSong.artist}</TableCell>
                        <TableCell>{this.props.currentSong.album}</TableCell>
                        <TableCell>{this.props.currentSong.time}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </Grid>
            <Grid item xs={10}>
              <Grid container>
                <Grid item xs={12}>
                  <div>
                    Next Up
                  </div>
                  <div><Typography gutterBottom>{message}</Typography></div>
                  {this.props.peekList.length !== 0 &&
                  <Paper>
                    <ListTable data={this.props.peekList} isPeekList={true}
                               skipSong={(queueIndex) => this.props.skipSong(queueIndex)}
                               jumpToPlay={(queueIndex) => this.props.jumpToPlay(queueIndex)}
                               displayNum={peekNum}/>
                  </Paper>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PeekQueuePanel)