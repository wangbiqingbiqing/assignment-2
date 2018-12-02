import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";

const styles = {
  panelPosition: {
    position: 'absolute',
    top: '68px',
    bottom: '68px',
    width: '17%',
    borderRight: 'grey solid'
  },
  typography: {
    marginTop: '50px'
  },
  playlistItem:{
    borderBottom: 'grey solid 1px',
    marginTop:'10px',
    marginBottom:'10px',
    textAlign:'center',
    paddingBottom:'10px'
  },
  playlist:{
    marginTop: '30px',
    textAlign:'center'
  },
  link:{
    textDecoration: 'none',
    color: 'black'
  }
};

/**
 * This is a left side panel displaying different playlist name.
 * Click playlist and view the songs included
 */
class SidePanel extends Component {
  render() {
    const {classes} = this.props;
    let playlistData = [];
    if (typeof(this.props.data) === 'object') {
      this.props.data.forEach(listName => {
          playlistData.push(
              <Link to="/playlist" key={listName} className={classes.link}>
                <div id={listName}
                     onClick={(event) => this.props.openPlayList(event.currentTarget.id)}
                     className={classes.playlistItem}>
                  {listName}
                </div>
              </Link>
            )
        }
      )
    }

    return (
      <React.Fragment>
        <div className={classes.panelPosition}>
          <Typography align="center" variant="h5" className={classes.typography}>
            PlayList
          </Typography>
          <div  className={classes.playlist}>
            {typeof(this.props.data) === 'string' ? this.props.data :
            <div>
              {playlistData}
            </div>}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SidePanel)