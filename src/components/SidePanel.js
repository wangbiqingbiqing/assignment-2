import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";

/**
 * This is a left side panel displaying different playlist name.
 * Click playlist and view the songs included
 */
class SidePanel extends Component {
  render() {

    let tableData = [];
    if (typeof(this.props.data) === 'object') {
      this.props.data.forEach(listName =>
        tableData.push(
          <TableRow key={listName} onClick={event => this.props.openPlayList}>
            <Link to="/playlist" style={{textDecoration: 'none', color: 'white'}}>
              <TableCell>
                {listName}
              </TableCell>
            </Link>
          </TableRow>))
    }

    return (
      <React.Fragment>
        <div style={{height: '100%', minHeight: 700, borderRight: 'grey solid', marginTop: '64px'}}>
          <Typography align="center" variant="h5">
            PlayList
          </Typography>
          {typeof(this.props.data) === 'string' ? this.props.data : null}
          {tableData.length !== 0 &&
          <Table>
            <TableBody>
              {tableData}
            </TableBody>
          </Table>}
        </div>
      </React.Fragment>
    )
  }
}

export default (SidePanel)