import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import LensIcon from '@material-ui/icons/LensOutlined';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import QueueMusic from '@material-ui/icons/QueueMusic'
import SkipNext from '@material-ui/icons/SkipNext';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Slider from "@material-ui/lab/es/Slider/Slider";
import React, {Component} from 'react'
import Link from "react-router-dom/es/Link";
import logo from '../pictures/teamSpiritLogo.PNG';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  toolBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  playActions: {
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  margin: {
    marginLeft: '15px',
    marginRight: '15px'
  },
  songInfo: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
  },
  playStatus: {
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  image: {
    width: 30,
    height: 30,
  },
  slider: {
    padding: '22px 0px',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    backgroundColor: '#fff',
  },
  trackBefore: {
    backgroundColor: '#fff',
  },
  trackAfter: {
    backgroundColor: '#fff',
  },
  root: {
    width: '50%',
  }
};

class BottomBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      playingTime: 0,
      volume: 50,
    };

    this.muteVolume = this.muteVolume.bind(this);
    this.resetVolume = this.resetVolume.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
    this.playingTimeChange = this.playingTimeChange.bind(this);
    this.playNext = this.playNext.bind(this);
  }

  playNext() {
    if (this.props.isLoggedIn) {
      this.props.playNext();
    }
  }

  muteVolume() {
    this.setState({
      mute: true,
      volume: 0,
    });
  }

  resetVolume() {
    this.setState({
      mute: false,
      volume: 50,
    })
  }

  volumeChange(event, value) {
    this.setState({
      volume: value
    });
    if (value === 0) {
      this.setState({
        mute: true
      });
    } else {
      this.setState({
        mute: false
      });
    }
  }

  playingTimeChange(event, value) {
    this.setState({
      playingTime: value
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>

          <div className={classes.playActions}>
            <IconButton color="inherit">
              {!this.props.isPlayOn ?
                <PlayArrow onClick={this.props.handleSwitchOn}/> :
                <Pause onClick={this.props.handleSwitchOff}/>}
            </IconButton>
            <IconButton aria-label="Next" color="inherit">
                <SkipNext onClick={this.playNext}/>
            </IconButton>
          </div>
          <div className={classes.songInfo}>
            <div className={classes.margin}><img className={classes.image} src={logo} alt="TeamSpirit"/></div>
            <div className={classes.margin}>{this.props.song.songName}</div>
            <Slider className={classes.margin} value={this.state.playingTime} onChange={this.playingTimeChange}
                    classes={{
                      container: classes.slider,
                      thumbIconWrapper: classes.thumbIconWrapper,
                      trackBefore: classes.trackBefore,
                      trackAfter: classes.trackAfter,
                      root: classes.root,
                    }}
                    thumb={<LensIcon style={{color: '#2196f3'}}
                    />}
            />
          </div>

          <div className={classes.playStatus}>
            <div>
              <IconButton color="inherit">
                {!this.state.mute ?
                  (<VolumeUp onClick={this.muteVolume}/>)
                  :
                  (<VolumeOff onClick={this.resetVolume}/>)}
              </IconButton>
            </div>
            <Slider value={this.state.volume} onChange={this.volumeChange}
                    classes={{
                      container: classes.slider,
                      thumbIconWrapper: classes.thumbIconWrapper,
                      trackBefore: classes.trackBefore,
                      trackAfter: classes.trackAfter,
                      root: classes.root,
                    }}
                    thumb={<LensIcon style={{color: '#2196f3'}}/>}

            />

            <div>
              <IconButton color="inherit" onClick={this.props.getPeekList}>
                <Link to="/peeklist" style={{textDecoration: 'none', color: 'white'}}>
                  <Tooltip title="View Queue" placement="left">
                    <QueueMusic/>
                  </Tooltip>
                </Link>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(BottomBar);