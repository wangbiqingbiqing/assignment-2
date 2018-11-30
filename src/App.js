import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import BottomBarCon from "./containers/BottomBarCon";
import HeaderBarCon from "./containers/HeaderBarCon";
import InfoPageCon from "./containers/InfoPageCon";
import PeekQueuePanelCon from "./containers/PeekQueuePanelCon";
import PlayListPanelCon from "./containers/PlayListPanelCon";
import SidePanelCon from "./containers/SidePanelCon";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <HeaderBarCon/>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            <SidePanelCon/>
          </Grid>
          <Grid item xs={10}>

            <Switch>
              <Route exact path={'/playlist'} component={PlayListPanelCon}/>
              <Route exact path={'/peeklist'} component={PeekQueuePanelCon}/>
              <Route exact path={'/'} component={InfoPageCon}/>
            </Switch>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BottomBarCon/>
        </Grid>
      </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
