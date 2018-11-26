import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/es/Button/Button";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Search from '@material-ui/icons/Search';
import React, {Component} from "react";
import Link from "react-router-dom/es/Link";
import logo from '../pictures/teamSpiritLogo.PNG';

const styles = theme => ({
  toolBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  image: {
    width: 30,
    height: 30,
  }
})

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
    }
  };

  render() {
    const {classes} = this.props;
    let text = this.props.isLoggedIn;

    return (
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          <img className={classes.image} src={logo} alt="TeamSpirit"/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search onClick={this.handleClick}/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyDown={this.handleKeyUp}
            />
          </div>
          {
            this.props.isLoggedIn ?
              <div>
                <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                  <Button color="inherit" onClick={this.props.logout}>LOGOUT</Button>
                </Link>
              </div> :
              <div>
                <Link to="/playlist" style={{textDecoration: 'none', color: 'white'}}>
                  <Button color="inherit" onClick={this.props.login}>LOGIN</Button>
                </Link>
              </div>
          }
        </Toolbar>

      </AppBar>
    )
  }
}

export default withStyles(styles)(HeaderBar);