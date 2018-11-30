import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import React, {Component} from 'react';
import {SONG_KEY} from "../constants/keys";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Redo from '@material-ui/icons/Redo';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';

class ListTable extends Component {

  render() {
    let listData = this.props.data;
    let displayNum = this.props.displayNum;
    let tableBody = [];
    for (let j = 1; j <= displayNum; j++) {
      let song = listData[j - 1];
      let tableRow = Object.entries(song).map(([key, value]) => {
        return (key !== SONG_KEY.SONG_ID ? <TableCell key={value}>{value}</TableCell> : null)
      });
      tableBody.push(<TableRow key={j}>
        <TableCell key={j}>{j}</TableCell>
        {tableRow}{this.props.isPeekList ? <TableCell>
        <IconButton variant="outlined" size="small" color="inherit">
          <Tooltip title="Skip this song" placement="left">
            <Redo onClick={() => this.props.skipSong(j)}/>
          </Tooltip>
        </IconButton>
        <IconButton variant="outlined" size="small" color="inherit">
          <Tooltip title="Start with this song" placement="right">
            <PlayArrow onClick={() => this.props.jumpToPlay(j)}/>
          </Tooltip>
        </IconButton>
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
            {this.props.isPeekList ?<TableCell></TableCell>:null}
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