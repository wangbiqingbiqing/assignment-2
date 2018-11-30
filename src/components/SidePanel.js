import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
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
  }
};

/**
 * This is a left side panel displaying different playlist name.
 * Click playlist and view the songs included
 */
class SidePanel extends Component {
  render() {
    const {classes} = this.props;
    let tableData = [];
    let i = 0;
    if (typeof(this.props.data) === 'object') {
      this.props.data.forEach(listName => {
          tableData.push(
            <TableRow hover key={i}>
              <TableCell key={listName} id={listName}
                         onClick={(event) => this.props.openPlayList(event.currentTarget.id)}
                         style={{textAlign:'center'}}>
                <Link to="/playlist" style={{textDecoration: 'none', color: 'black'}}>
                  {listName}
                </Link>
              </TableCell>
            </TableRow>);
          i++;
        }
      )
    }

    return (
      <React.Fragment>
        <div className={classes.panelPosition}>
          <Typography align="center" variant="h5" className={classes.margin}>
            PlayList
          </Typography>
          <div style={{marginTop:'30px',textAlign:'center'}}>
          {typeof(this.props.data) === 'string' ? this.props.data : null}
          {tableData.length !== 0 &&
          <Table>
            <TableBody>
              {tableData}
            </TableBody>
          </Table>}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SidePanel)