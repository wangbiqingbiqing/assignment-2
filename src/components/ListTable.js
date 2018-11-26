import Button from "@material-ui/core/es/Button/Button";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import React, {Component} from 'react';
import {SONG_KEY} from "../constants/keys";

class ListTable extends Component {

  render() {
    let listData = this.props.data;
    let displayNum = this.props.displayNum;
    console.log(displayNum, listData);
    let tableBody = [];
    for (let j = 1; j <= Math.min(displayNum, listData.length); j++) {
      let song = listData[j - 1];
      let tableRow = Object.entries(song).map(([key, value]) => {
        if (key !== SONG_KEY.SONG_ID && key !== SONG_KEY.LYRICS) {
          return (<TableCell key={value}>{value}</TableCell>)
        }
      });
      tableBody.push(<TableRow key={song.songId}>
        <TableCell key={j}>{j}</TableCell>
        {tableRow}{this.props.isPeekList ? <TableCell>
        <Button variant="outlined" size="small" color="inherit" onClick={() => this.props.skipSong(song.songId)}>
          skip
        </Button>
      </TableCell> : null}
      </TableRow>)
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>{SONG_KEY.SONG_NAME}</TableCell>
            <TableCell>{SONG_KEY.ARTIST}</TableCell>
            <TableCell>{SONG_KEY.ALBUM}</TableCell>
            <TableCell>{SONG_KEY.TIME}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody}
        </TableBody>
      </Table>
    );
  }

}

export default ListTable