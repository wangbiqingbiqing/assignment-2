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
  margin: {
    marginTop: '50px'
  },
  playlist:{
    borderBottom: 'grey solid 1px',
    marginTop:'10px',
    marginBottom:'10px',
    textAlign:'center',
    paddingBottom:'10px'
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
              <Link to="/playlist" style={{textDecoration: 'none', color: 'black'}} key={listName}>
                <div key={listName} id={listName}
                     onClick={(event) => this.props.openPlayList(event.currentTarget.id)}
                     className={classes.playlist}>
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
          <Typography align="center" variant="h5" className={classes.margin}>
            PlayList
          </Typography>
          <div style={{marginTop: '30px', textAlign: 'center'}}>
            {typeof(this.props.data) === 'string' ? this.props.data : null}
            {playlistData.length !== 0 &&
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