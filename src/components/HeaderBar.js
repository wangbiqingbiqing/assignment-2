import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/es/Button/Button";
import {withStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from "react";
import Link from "react-router-dom/es/Link";
import logo from '../images/teamSpiritLogo.PNG';

const styles = {
  toolBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 30,
    height: 30,
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
};

class HeaderBar extends Component {

  render() {
    const {classes} = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          <img className={classes.image} src={logo} alt="TeamSpirit"/>
          <div>
            <Typography align="center" variant="h5" color="inherit">
              Shuffle Player
            </Typography>
          </div>
          {
            this.props.isLoggedIn ?
              <div>
                <Link to="/" className={classes.link}>
                  <Button color="inherit" onClick={this.props.logout}>LOGOUT</Button>
                </Link>
              </div> :
              <div>
                <Link to="/" className={classes.link}>
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